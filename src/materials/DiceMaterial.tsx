import { DiceStyle } from "../types/DiceStyle";
import { DiceType } from "../types/DiceType";
import { GalaxyMaterial } from "./galaxy/GalaxyMaterial";
import { GemstoneMaterial } from "./gemstone/GemstoneMaterial";
import { GlassMaterial } from "./glass/GlassMaterial";
import { IronMaterial } from "./iron/IronMaterial";
import { NebulaMaterial } from "./nebula/NebulaMaterial";
import { SunriseMaterial } from "./sunrise/SunriseMaterial";
import { SunsetMaterial } from "./sunset/SunsetMaterial";
import { WalnutMaterial } from "./walnut/WalnutMaterial";

export function DiceMaterial({
  diceStyle,
  diceType,
}: {
  diceStyle: DiceStyle;
  diceType: DiceType;
}) {
  const stressProps = {
    color: "#ff3b3b",
    emissive: "#7a0000",
    emissiveIntensity: 0.45,
    roughness: 0.2,
    metalness: 0.1,
  };

  if (diceType === "D6_STRESS") {
    switch (diceStyle) {
      case "GALAXY":
        return <GalaxyMaterial {...stressProps} />;
      case "GEMSTONE":
        return <GemstoneMaterial {...stressProps} />;
      case "GLASS":
        return <GlassMaterial {...stressProps} />;
      case "IRON":
        return <IronMaterial {...stressProps} />;
      case "NEBULA":
        return <NebulaMaterial {...stressProps} />;
      case "SUNRISE":
        return <SunriseMaterial {...stressProps} />;
      case "SUNSET":
        return <SunsetMaterial {...stressProps} />;
      case "WALNUT":
        return <WalnutMaterial {...stressProps} />;
      default:
        throw Error(`Dice style ${diceStyle} error: not implemented`);
    }
  }

  switch (diceStyle) {
    case "GALAXY":
      return <GalaxyMaterial />;
    case "GEMSTONE":
      return <GemstoneMaterial />;
    case "GLASS":
      return <GlassMaterial />;
    case "IRON":
      return <IronMaterial />;
    case "NEBULA":
      return <NebulaMaterial />;
    case "SUNRISE":
      return <SunriseMaterial />;
    case "SUNSET":
      return <SunsetMaterial />;
    case "WALNUT":
      return <WalnutMaterial />;
    default:
      throw Error(`Dice style ${diceStyle} error: not implemented`);
  }
}
