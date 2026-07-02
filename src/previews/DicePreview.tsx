import { styled } from "@mui/material/styles";

import { DiceStyle } from "../types/DiceStyle";
import { DiceType } from "../types/DiceType";

import * as galaxyPreviews from "./galaxy";
import * as gemstonePreviews from "./gemstone";
import * as glassPreviews from "./glass";
import * as ironPreviews from "./iron";
import * as nebulaPreviews from "./nebula";
import * as sunrisePreviews from "./sunrise";
import * as sunsetPreviews from "./sunset";
import * as walnutPreviews from "./walnut";

const previews: Record<DiceStyle, Record<DiceType, string>> = {
  GALAXY: { ...galaxyPreviews, D6_STRESS: galaxyPreviews.D6 },
  GEMSTONE: { ...gemstonePreviews, D6_STRESS: gemstonePreviews.D6 },
  GLASS: { ...glassPreviews, D6_STRESS: glassPreviews.D6 },
  IRON: { ...ironPreviews, D6_STRESS: ironPreviews.D6 },
  NEBULA: { ...nebulaPreviews, D6_STRESS: nebulaPreviews.D6 },
  SUNRISE: { ...sunrisePreviews, D6_STRESS: sunrisePreviews.D6 },
  SUNSET: { ...sunsetPreviews, D6_STRESS: sunsetPreviews.D6 },
  WALNUT: { ...walnutPreviews, D6_STRESS: walnutPreviews.D6 },
};

interface PreviewImageProps {
  size?: "small" | "medium" | "large";
}

const PreviewImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "size",
})<PreviewImageProps>(({ size }) => ({
  width: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
  height: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
}));

type DiePreviewProps = {
  diceType: DiceType;
  diceStyle: DiceStyle;
  size?: "small" | "medium" | "large";
};

export function DicePreview({ diceType, diceStyle, size }: DiePreviewProps) {
  return (
    <PreviewImage
      src={previews[diceStyle][diceType]}
      alt={`${diceStyle} ${diceType} preview`}
      size={size}
    />
  );
}
