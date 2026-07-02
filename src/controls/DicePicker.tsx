import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { DicePreview } from "../previews/DicePreview";

import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";

export function DicePicker() {
  const counts = useDiceControlsStore((state) => state.diceCounts);

  const diceById = useDiceControlsStore((state) => state.diceById);
  const handleDiceCountIncrease = useDiceControlsStore(
    (state) => state.incrementDieCount
  );
  const clearRoll = useDiceRollStore((state) => state.clearRoll);
  const roll = useDiceRollStore((state) => state.roll);
  function clearRollIfNeeded() {
    if (roll) {
      clearRoll();
    }
  }

  const visibleDiceEntries = Object.entries(counts).filter(([id]) => {
    const die = diceById[id];
    return die?.type === "D6" || die?.type === "D6_STRESS";
  });

  return (
    <>
      {visibleDiceEntries.map(([id, count]) => {
        const die = diceById[id];
        if (!die) {
          return null;
        }
        const label = die.type === "D6_STRESS" ? "Стресс" : "Обычные";
        return (
          <Badge
            badgeContent={count}
            sx={{
              ".MuiBadge-badge": {
                bgcolor: "background.default",
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.30), rgba(255, 255, 255, 0.30))",
                pointerEvents: "none",
              },
            }}
            overlap="circular"
            key={id}
          >
            <IconButton
              onClick={() => {
                handleDiceCountIncrease(id);
                clearRollIfNeeded();
              }}
              sx={{ p: 0 }}
            >
              <Stack alignItems="center" gap={0.25}>
                <DicePreview diceStyle={die.style} diceType={die.type} />
                <Typography variant="caption" sx={{ fontSize: "7px", lineHeight: 1.1 }}>
                  {label}
                </Typography>
              </Stack>
            </IconButton>
          </Badge>
        );
      })}
    </>
  );
}
