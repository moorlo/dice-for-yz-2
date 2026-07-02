import { useMemo } from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { getCombinedDiceValue } from "../helpers/getCombinedDiceValue";
import { DiceRoll } from "../types/DiceRoll";
import { Die, isDie } from "../types/Die";
import { Dice, isDice } from "../types/Dice";
import { DicePreview } from "../previews/DicePreview";

export function DiceResults({
  diceRoll,
  rollValues,
  expanded,
  onExpand,
}: {
  diceRoll: DiceRoll;
  rollValues: Record<string, number>;
  expanded: boolean;
  onExpand: (expand: boolean) => void;
}) {
  const finalValue = useMemo(() => {
    return getCombinedDiceValue(diceRoll, rollValues);
  }, [diceRoll, rollValues]);

  const diceValueLabel = useMemo(() => {
    const allDice = diceRoll.dice.filter(isDie);
    const regular = sortDice(
      allDice.filter((d) => d.type === "D6"),
      rollValues,
      diceRoll.combination
    );
    const stress = sortDice(
      allDice.filter((d) => d.type === "D6_STRESS"),
      rollValues,
      diceRoll.combination
    );

    const formatValues = (diceGroup: Die[]) =>
      diceGroup.map((d) => rollValues[d.id]).join(" ");

    if (regular.length > 0 && stress.length > 0) {
      return `Обычные ${formatValues(regular)} / Стресс ${formatValues(stress)}`;
    }

    if (regular.length > 0) {
      return `Обычные ${formatValues(regular)}`;
    }

    if (stress.length > 0) {
      return `Стресс ${formatValues(stress)}`;
    }

    return String(finalValue);
  }, [diceRoll, rollValues, finalValue]);

  return (
    <Stack alignItems="center" maxHeight="calc(100vh - 100px)">
      <Tooltip
        title={expanded ? "Hide Breakdown" : "Show Breakdown"}
        disableInteractive
      >
        <Button
          sx={{ pointerEvents: "all", padding: 0.5, minWidth: "40px" }}
          onClick={() => onExpand(!expanded)}
          color="inherit"
        >
          <Typography variant="h6" color="white" sx={{ whiteSpace: "normal", textAlign: "center" }}>
            {diceValueLabel}
          </Typography>
        </Button>
      </Tooltip>
      <Grow
        in={expanded}
        mountOnEnter
        unmountOnExit
        style={{ transformOrigin: "50% 0 0" }}
      >
        <Stack overflow="auto" sx={{ pointerEvents: "all" }}>
          <DiceResultsExpanded diceRoll={diceRoll} rollValues={rollValues} />
        </Stack>
      </Grow>
    </Stack>
  );
}

function combination(dice: Dice) {
  if (dice.combination === "HIGHEST") {
    return ">";
  } else if (dice.combination === "LOWEST") {
    return "<";
  } else if (dice.combination === "NONE") {
    return ",";
  } else {
    return "+";
  }
}

function sortDice(
  die: Die[],
  rollValues: Record<string, number>,
  combination: "HIGHEST" | "LOWEST" | "SUM" | "NONE" | undefined
) {
  return die.sort((a, b) => {
    const aValue = rollValues[a.id];
    const bValue = rollValues[b.id];
    if (combination === "HIGHEST") {
      return bValue - aValue;
    } else if (combination === "LOWEST") {
      return aValue - bValue;
    } else {
      return 0;
    }
  });
}

function DiceGroup({
  dice,
  rollValues,
}: {
  dice: Die[];
  rollValues: Record<string, number>;
}) {
  return (
    <Stack
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 8,
      }}
    >
      {dice.map((d) => (
        <Stack
          key={d.id}
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{
            px: 1,
            py: 0.75,
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "999px",
            bgcolor: "rgba(255,255,255,0.06)",
          }}
        >
          <DicePreview diceStyle={d.style} diceType={d.type} size="small" />
          <Typography color="white">{rollValues[d.id]}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function DiceResultsExpanded({
  diceRoll,
  rollValues,
}: {
  diceRoll: DiceRoll;
  rollValues: Record<string, number>;
}) {
  const regularDice = useMemo(
    () =>
      sortDice(
        diceRoll.dice.filter(isDie).filter((d) => d.type === "D6"),
        rollValues,
        diceRoll.combination
      ),
    [diceRoll, rollValues]
  );
  const stressDice = useMemo(
    () =>
      sortDice(
        diceRoll.dice.filter(isDie).filter((d) => d.type === "D6_STRESS"),
        rollValues,
        diceRoll.combination
      ),
    [diceRoll, rollValues]
  );
  const dice = useMemo(() => diceRoll.dice.filter(isDice), [diceRoll]);

  return (
    <Stack divider={<Divider />} gap={2} sx={{ minWidth: 320 }}>
      <Stack direction="row" gap={1} justifyContent="center" flexWrap="wrap">
        <Stack flex={1} minWidth="160px" gap={1}>
          <Typography color="white" fontWeight={700} textAlign="center">
            Обычные
          </Typography>
          {regularDice.length > 0 ? (
            <DiceGroup dice={regularDice} rollValues={rollValues} />
          ) : (
            <Typography color="white" textAlign="center">
              Нет
            </Typography>
          )}
        </Stack>
        <Stack flex={1} minWidth="160px" gap={1}>
          <Typography color="white" fontWeight={700} textAlign="center">
            Стресс
          </Typography>
          {stressDice.length > 0 ? (
            <DiceGroup dice={stressDice} rollValues={rollValues} />
          ) : (
            <Typography color="white" textAlign="center">
              Нет
            </Typography>
          )}
        </Stack>
      </Stack>
      {dice.map((d, i) => (
        <DiceResultsExpanded key={i} diceRoll={d} rollValues={rollValues} />
      ))}
      {diceRoll.bonus && (
        <Typography textAlign="center" lineHeight="28px" color="white">
          {diceRoll.bonus > 0 && "+"}
          {diceRoll.bonus}
        </Typography>
      )}
    </Stack>
  );
}
