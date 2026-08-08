import { type MotherSign, motherSigns } from "../data/motherSigns";

export interface FaSign {
  id: string; // e.g. "gbe-gbe" (mother), "gbe-yeku" (derived)
  isMother: boolean;
  nameFon: string;
  nameYoruba: string;
  nameFrench: string;
  leftMother: MotherSign;
  rightMother: MotherSign;
  patternLeft: [number, number, number, number];
  patternRight: [number, number, number, number];
  vodounName: string;
  vodounDescFr: string;
  vodounDescFon: string;
  meaningFr: string;
  meaningFon: string;
  proverbsFr: string[];
  proverbsFon: string[];
}

// Extract the base name (prefix) of a mother sign
export function getCleanName(sign: MotherSign, lang: "fon" | "yoruba" | "french"): string {
  if (lang === "fon") {
    return sign.nameFon.replace("-Méjì", "").replace("Méjì", "").trim();
  } else if (lang === "yoruba") {
    let name = sign.nameYoruba;
    if (name.startsWith("Eji-")) {
      return name.substring(4); // Remove Eji-
    }
    return name.replace("-Meji", "").replace("Meji", "").trim();
  } else {
    let name = sign.nameFrench;
    if (name.startsWith("Ji-")) {
      return name.substring(3);
    }
    return name.replace("-Meji", "").replace("Meji", "").trim();
  }
}

// Generate the complete list of 256 signs
export function generateAll256Signs(): FaSign[] {
  const allSigns: FaSign[] = [];

  // Double loop to generate all combinations
  // In Fa, the left column and right column form the sign
  for (let i = 0; i < motherSigns.length; i++) {
    for (let j = 0; j < motherSigns.length; j++) {
      const left = motherSigns[i];
      const right = motherSigns[j];
      const isMother = i === j;

      if (isMother) {
        // Predefined mother sign
        allSigns.push({
          id: `${left.nameFon.toLowerCase().replace(/[^a-z0-9]/g, "")}-meji`,
          isMother: true,
          nameFon: left.nameFon,
          nameYoruba: left.nameYoruba,
          nameFrench: left.nameFrench,
          leftMother: left,
          rightMother: right,
          patternLeft: left.pattern,
          patternRight: right.pattern,
          vodounName: left.vodoun.name,
          vodounDescFr: left.vodoun.descriptionFr,
          vodounDescFon: left.vodoun.descriptionFon,
          meaningFr: left.meaningFr,
          meaningFon: left.meaningFon,
          proverbsFr: left.proverbsFr,
          proverbsFon: left.proverbsFon,
        });
      } else {
        // Derived sign
        const prefixLeftFon = getCleanName(left, "fon");
        const prefixRightFon = getCleanName(right, "fon");
        const nameFon = `${prefixLeftFon}-${prefixRightFon}`;

        const prefixLeftYoruba = getCleanName(left, "yoruba");
        const prefixRightYoruba = getCleanName(right, "yoruba");
        const nameYoruba = `${prefixLeftYoruba}-${prefixRightYoruba}`;

        const prefixLeftFrench = getCleanName(left, "french");
        const prefixRightFrench = getCleanName(right, "french");
        const nameFrench = `${prefixLeftFrench}-${prefixRightFrench}`;

        // Basic meaning combination
        const meaningFr = `Combinaison de ${left.nameFrench} (gauche) et ${right.nameFrench} (droite). Indique une transition, un équilibre ou une dualité entre les influences de ${left.vodoun.name} et ${right.vodoun.name}.`;
        const meaningFon = `${left.nameFon} (amyɔ) kpo ${right.nameFon} (ɖisye) kpo sín gbevɔ̃. E nɔ ɖɔ xo ɖo dɛn-kpe sín lilɛ́ kpodo Mawou sín nyɔna kpo wu.`;

        allSigns.push({
          id: `${prefixLeftFon.toLowerCase().replace(/[^a-z0-9]/g, "")}-${prefixRightFon.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
          isMother: false,
          nameFon,
          nameYoruba,
          nameFrench,
          leftMother: left,
          rightMother: right,
          patternLeft: left.pattern,
          patternRight: right.pattern,
          vodounName: `${left.vodoun.name} + ${right.vodoun.name}`,
          vodounDescFr: `Alliance d'énergies entre ${left.vodoun.name} (${left.vodoun.descriptionFr}) et ${right.vodoun.name} (${right.vodoun.descriptionFr}).`,
          vodounDescFon: `${left.vodoun.name} kpo ${right.vodoun.name} kpo sín bǔnɔzɔ̃.`,
          meaningFr,
          meaningFon,
          proverbsFr: [
            `Quand ${left.nameFrench.toLowerCase()} rencontre ${right.nameFrench.toLowerCase()}, le chemin se dessine.`,
            ...left.proverbsFr.slice(0, 1),
            ...right.proverbsFr.slice(0, 1),
          ],
          proverbsFon: [
            `${prefixLeftFon} kpo ${prefixRightFon} kpo sɔ́ alɔ ɖɔpo.`,
            ...left.proverbsFon.slice(0, 1),
            ...right.proverbsFon.slice(0, 1),
          ],
        });
      }
    }
  }

  return allSigns;
}

// Find a sign by its pattern (left column and right column)
export function findSignByPattern(
  patternLeft: [number, number, number, number],
  patternRight: [number, number, number, number],
  allSigns: FaSign[]
): FaSign | undefined {
  return allSigns.find(
    (s) =>
      s.patternLeft.every((val, index) => val === patternLeft[index]) &&
      s.patternRight.every((val, index) => val === patternRight[index])
  );
}
