export interface MotherSign {
  id: number;
  nameFon: string;
  nameYoruba: string;
  nameFrench: string;
  pattern: [number, number, number, number]; // 1 for single stroke (I), 2 for double stroke (II) from top to bottom
  vodoun: {
    name: string;
    descriptionFr: string;
    descriptionFon: string;
  };
  meaningFr: string;
  meaningFon: string;
  proverbsFr: string[];
  proverbsFon: string[];
}

export const motherSigns: MotherSign[] = [
  {
    id: 1,
    nameFon: "Gbè-Méjì",
    nameYoruba: "Eji-Ogbe",
    nameFrench: "Ji-Gbe",
    pattern: [1, 1, 1, 1],
    vodoun: {
      name: "Mawou-Lissa",
      descriptionFr: "Le couple créateur suprême représentant le jour, la lumière et la sagesse.",
      descriptionFon: "Mawou-Lissa e nyi gbɛɖotɔ, e na weziza kpo nuyɔnɛn kpo."
    },
    meaningFr: "Représente la lumière absolue, la vie, la clarté, le commencement de toutes choses, la santé et la paix spirituelle.",
    meaningFon: "Gbɛ, weziza, jijɔho, nukɔnyiyi, kpo afɔɖiɖe nukɔntɔn e ɖɔn nyɔna wá ɖe e kpo.",
    proverbsFr: [
      "La lumière du jour dissipe toutes les ténèbres.",
      "Le chemin droit mène à la paix."
    ],
    proverbsFon: [
      "Weziza zǎntɔn nɔ nya gbɛtɔn fítí-fítí.",
      "Ali jlɔjlɔ nɔ sɔ́ gbɛtɔ́ yí jǐ."
    ]
  },
  {
    id: 2,
    nameFon: "Yɛ̀kú-Méjì",
    nameYoruba: "Oyeku-Meji",
    nameFrench: "Yeku-Meji",
    pattern: [2, 2, 2, 2],
    vodoun: {
      name: "Koutito",
      descriptionFr: "Le culte des ancêtres et des défunts (les esprits protecteurs de l'au-delà).",
      descriptionFon: "Tɔgbo mǐtɔn lɛ e yi alɔwaji e, e nɔ nya nuvɔ̃ sɔyi."
    },
    meaningFr: "Représente l'obscurité, la nuit, la fin d'un cycle, le besoin de prudence, mais aussi la protection des ancêtres contre la mort prématurée.",
    meaningFon: "Zǎn, nuxwala, gudo mɛtɔn lɛ kpodo kplɔnyiji-alɔji nɔvi lɛ tɔn.",
    proverbsFr: [
      "La nuit porte conseil et abrite les esprits protecteurs.",
      "L'ombre de l'ancêtre protège du soleil brûlant."
    ],
    proverbsFon: [
      "Zǎn fán bǐ e, xwegbe wɛ è nɔ mɔ nuyɔnɛn ɖe.",
      "Kpɔ́tí tɔgbo tɔn wɛ nɔ sɔ́ vǐ tɔn ɖ'alɔ."
    ]
  },
  {
    id: 3,
    nameFon: "Wòlǐ-Méjì",
    nameYoruba: "Iwori-Meji",
    nameFrench: "Woli-Meji",
    pattern: [2, 1, 1, 2],
    vodoun: {
      name: "Loko",
      descriptionFr: "Esprit de la forêt, gardien de la nature et de la médecine traditionnelle par les plantes.",
      descriptionFon: "Loko atin tɔn e kpe atin e, e nyi azɔ̀ngbɔtɔ ɖaxo."
    },
    meaningFr: "Représente le feu spirituel, la clairvoyance, le changement rapide, l'inspiration divine et l'esprit d'investigation.",
    meaningFon: "Myɔ gbɔn ayi mɛ, nukúnnúmɔjɛnumɛ, afɔ sɔ́ alɔji, linlin yɔyɔ́ lɛ.",
    proverbsFr: [
      "Le feu qui couve sous la cendre finit par s'embraser.",
      "Celui qui regarde avec les yeux de l'esprit voit la vérité."
    ],
    proverbsFon: [
      "Myɔ e ɖɔ xo mɛ ɔ, e nɔ fɔn jlɔjlɔ.",
      "Nukún ɖopo a nɔ mɔ nu gudo tɔn gbeɖe gbeɖe."
    ]
  },
  {
    id: 4,
    nameFon: "Dí-Méjì",
    nameYoruba: "Odi-Meji",
    nameFrench: "Di-Meji",
    pattern: [1, 2, 2, 1],
    vodoun: {
      name: "Gbadou",
      descriptionFr: "La grande mère primordiale, détentrice des secrets et matrice du destin humain.",
      descriptionFon: "Gbadou nɔ ɖaxo, mɛ e ɖɔ gbɛ sín nuxwago kpo dɛn kpo."
    },
    meaningFr: "Représente la matrice, la maternité, la renaissance, les secrets bien gardés et le besoin d'enracinement matériel et spirituel.",
    meaningFon: "Adɔgo nɔ tɔn, vǐjiji, hwenuxe, mɛɖe-ɖopo kpo xomɛfá kpo.",
    proverbsFr: [
      "De la terre noire naît la plus belle récolte.",
      "Le secret partagé n'est plus un trésor."
    ],
    proverbsFon: [
      "Adɔgo jɔwɛ e, e wɛ nɔ ji gbɛtɔ.",
      "Hwemɛnu e è sɔ́ hwla ɔ, a nɔ sɔ́ na mɛɖe gbeɖe."
    ]
  },
  {
    id: 5,
    nameFon: "Lósò-Méjì",
    nameYoruba: "Irosun-Meji",
    nameFrench: "Loso-Meji",
    pattern: [1, 1, 2, 2],
    vodoun: {
      name: "Heviosso",
      descriptionFr: "La divinité de la foudre et de la justice divine, punissant le mensonge et récompensant la vérité.",
      descriptionFon: "Heviosso sín ji-kpo myɔ kpo e nɔ bló hwɛjlɔjlɔ."
    },
    meaningFr: "Symbolise l'action, l'énergie pure, les épreuves qui purifient, la vérité qui éclate et le respect des lois cosmiques.",
    meaningFon: "Ji-myɔ, dɛn-kpe, hwɛjijɔ tɔn, nugbó-ɖiɖɔ kpo nukɔnyiyi do dɛn mɛ.",
    proverbsFr: [
      "La foudre ne frappe jamais le juste.",
      "Le mensonge court vite, mais la vérité le rattrape toujours."
    ],
    proverbsFon: [
      "Heviosso sín myɔ a nɔ jɛ nujɔnu jí gbeɖe.",
      "Nugbó nɔ nɔ tɛn tɔn mɛ kaka sɔyi."
    ]
  },
  {
    id: 6,
    nameFon: "Wǐnlǐn-Méjì",
    nameYoruba: "Owonrin-Meji",
    nameFrench: "Winlin-Meji",
    pattern: [2, 2, 1, 1],
    vodoun: {
      name: "Toxosu",
      descriptionFr: "Les esprits des eaux douces et des profondeurs aquatiques, symboles d'abondance et de métamorphose.",
      descriptionFon: "Toxosu sin tɔgbo e ɖɔ sin mɛ sín nyɔna kpo dɛnyiyi kpo."
    },
    meaningFr: "Représente le flux et le reflux, les retournements de situation, la flexibilité, les voyages d'affaires et la prospérité financière.",
    meaningFon: "Sin sín nukɔnyiyi, tɔji-nukɔnyiyi, dɔkùn, ajɔ kpo lilɛ́-yǐ-lilɛ́-wá gbɛtɔn.",
    proverbsFr: [
      "L'eau qui coule trouve toujours son chemin.",
      "La fortune sourit aux esprits flexibles et persévérants."
    ],
    proverbsFon: [
      "Sin e kló ali ɔ, e na mɔ ali tɔn tɛgbɛ.",
      "Dɔkùn nɔ wá nú mɛ e tuùn bɔ è lilɛ́ alɔ e."
    ]
  },
  {
    id: 7,
    nameFon: "Ablá-Méjì",
    nameYoruba: "Obara-Meji",
    nameFrench: "Abla-Meji",
    pattern: [1, 2, 2, 2],
    vodoun: {
      name: "Dan",
      descriptionFr: "Le serpent sacré de la richesse, de l'abondance matérielle et de la continuité infinie.",
      descriptionFon: "Dan e nyi dɔkùn kpo aklunɔ-zɔ̃ kpo sín vodoun."
    },
    meaningFr: "Exprime la prospérité inattendue, le succès commercial, l'intelligence créative, mais avertit contre l'orgueil et l'ego.",
    meaningFon: "Dɔkùn tlolo, goyiyi ma bló, nuyɔnɛn bɔ è sɔ́ bló dɔkùn na.",
    proverbsFr: [
      "La richesse est comme le vent : elle va et vient.",
      "La tête haute ne doit pas mépriser le sol qui la porte."
    ],
    proverbsFon: [
      "Dɔkùn na wá yi, goyiyi a nɔ kɔn ɖe ɖ'aji.",
      "Mɛ e goyǐ ɔ, a nɔ sɔ́ jɛ axɔ́ mɛ."
    ]
  },
  {
    id: 8,
    nameFon: "Aklá-Méjì",
    nameYoruba: "Okanran-Meji",
    nameFrench: "Akla-Meji",
    pattern: [2, 2, 2, 1],
    vodoun: {
      name: "Sakpata",
      descriptionFr: "Le souverain de la terre, guérisseur des maladies épidémiques, maître de la régénération biologique.",
      descriptionFon: "Sakpata ayigba tɔn, e nɔ azɔ̀ngbɔ kpodo dɛn tɔn kpo."
    },
    meaningFr: "Symbole de force tranquille, d'ancrage matériel, de persévérance à travers les épreuves de santé, et de justice immanente.",
    meaningFon: "Ayigba sín hwenuxo, dɛnyiyi ɖo azɔ̀n mɛ, hlɔnhlɔn gbɔn afɔɖiɖe mɛ.",
    proverbsFr: [
      "La graine doit mourir en terre pour porter des fruits.",
      "La terre finit toujours par triompher de l'orage."
    ],
    proverbsFon: [
      "Nǔkún e ɖo ayi mɛ ɔ, e nɔ ku ɖ'ayi mɛ cobo nɔ na gbɛ yɔyɔ́.",
      "Sakpata nɔ kpé nukún do mɛ e ɖó dɛnyiyi e wu."
    ]
  },
  {
    id: 9,
    nameFon: "Gùdá-Méjì",
    nameYoruba: "Ogunda-Meji",
    nameFrench: "Guda-Meji",
    pattern: [1, 1, 1, 2],
    vodoun: {
      name: "Gu",
      descriptionFr: "La divinité du fer, de la forge, de la technologie, du travail acharné et des bâtisseurs de civilisation.",
      descriptionFon: "Gu gan kpo ayǐ sín hwesɔkpɛ kpo sín vodoun, nukɔntɔn e ɖó hlɔnhlɔn e."
    },
    meaningFr: "Représente le courage, le travail manuel, le progrès technique, le dépassement des obstacles et la force d'action brute.",
    meaningFon: "Gan-kpo, zɔgbɛn, hlɔnhlɔn kpodo azɔ̌ syɛnsyɛn e nɔ na nukɔnyiyi e.",
    proverbsFr: [
      "C'est en forgeant qu'on devient forgeron.",
      "Le fer aiguise le fer, le travail ennoblit l'homme."
    ],
    proverbsFon: [
      "Gu sín gan wɛ nɔ gblon ali nu gbɛtɔ.",
      "Azɔ̌ syɛnsyɛn wɛ nɔ sɔ́ mɛyiyi yí jǐ."
    ]
  },
  {
    id: 10,
    nameFon: "Sá-Méjì",
    nameYoruba: "Osa-Meji",
    nameFrench: "Sa-Meji",
    pattern: [2, 1, 1, 1],
    vodoun: {
      name: "Mami Wata",
      descriptionFr: "La reine mystique des mers et des océans, symbole de beauté irrésistible, de séduction et de richesse spirituelle.",
      descriptionFon: "Mami Wata xu tɔn, nyɔna syɛnsyɛn kpo ɖagbe kpo sin nɔ."
    },
    meaningFr: "Symbolise l'inconscient, les intuitions puissantes, le charme esthétique, le monde astral, les rêves et le voyage spirituel.",
    meaningFon: "Xu, jɔhɔn syɛnsyɛn, ɖagbe kpodo nuxwala kpodo nukúnnúmɔjɛnumɛ zǎn tɔn.",
    proverbsFr: [
      "Le vent souffle où il veut, la vérité se révèle à qui sait écouter.",
      "L'eau calme cache souvent de grands mystères."
    ],
    proverbsFon: [
      "Jɔhɔn a nɔ wli gbɛtɔn gbeɖe e tɔn wu.",
      "Xu nɔ zɔn gbɛ mɛ ɖagbe tɛgbɛ."
    ]
  },
  {
    id: 11,
    nameFon: "Ká-Méjì",
    nameYoruba: "Ika-Meji",
    nameFrench: "Ka-Meji",
    pattern: [2, 1, 2, 2],
    vodoun: {
      name: "Mami Wata Gbéji",
      descriptionFr: "Aspect des eaux vives apportant l'inspiration artistique, les bénédictions créatrices et l'harmonie sociale.",
      descriptionFon: "Aklunɔ-zɔ̃ tɔn, ajɔ kpo aklunɔ-dɔkùn kpo."
    },
    meaningFr: "Invite à la discipline, à l'organisation méticuleuse, à la droiture morale et au rejet des raccourcis douteux.",
    meaningFon: "Ali jlɔjlɔ sín nyɔna, aklunɔ-linlin, ɖagbe bɔ è na na gbɛtɔ nɔvi tɔn.",
    proverbsFr: [
      "Le filet du chasseur doit être tissé avec patience.",
      "Mieux vaut un chemin long et sûr qu'un raccourci dangereux."
    ],
    proverbsFon: [
      "Aka e è sɔ́ tuùn nu e, e wɛ nɔ wli asyɛnsyɛn.",
      "Nǔjlɔjlɔ bló wɛ nɔ sɔ́ gbɛtɔ́ ɖ'ali ɖagbe mɛ."
    ]
  },
  {
    id: 12,
    nameFon: "Trúpín-Méjì",
    nameYoruba: "Oturupon-Meji",
    nameFrench: "Trupin-Meji",
    pattern: [2, 2, 1, 2],
    vodoun: {
      name: "Toxwyo",
      descriptionFr: "Les ancêtres fondateurs de lignée, garants de l'ordre moral et des traditions de la collectivité.",
      descriptionFon: "Tɔgbo nukɔntɔn e ɖó hwenuxo kpo ali ɖagbe kpo nú kɔmɛ."
    },
    meaningFr: "Représente la structure familiale solide, la stabilité sociale, l'autorité bienveillante et le devoir civique.",
    meaningFon: "Xwé-nuxo, kɔmɛ sín ɖagbe, kpanyiji mɛɖoxo lɛ tɔn.",
    proverbsFr: [
      "Les racines profondes soutiennent l'arbre contre la tempête.",
      "Honore tes aînés, et ton chemin sera tracé."
    ],
    proverbsFon: [
      "Atin e ɖó ɖɔ syɛnsyɛn ɔ, jɔhɔn a nɔ hu gbeɖe.",
      "Mɛɖoxo sín nuwlanwlan a nɔ gble ɖ'ayi gbeɖe."
    ]
  },
  {
    id: 13,
    nameFon: "Túlá-Méjì",
    nameYoruba: "Otura-Meji",
    nameFrench: "Tula-Meji",
    pattern: [1, 2, 1, 1],
    vodoun: {
      name: "Legba",
      descriptionFr: "Le messager cosmique et gardien de la croisée des chemins, clé de toute communication entre les mondes.",
      descriptionFon: "Legba ali kpodo nuɖɔɖ'ayǐ kpo sín aklunɔ-ɖɛ̀."
    },
    meaningFr: "Représente l'ouverture, la négociation habile, le déblocage des situations complexes et les voyages d'exploration.",
    meaningFon: "Legba sín hwenuxo, hun ali, wlanwlan ɖagbe kpo yɛ̀yǐɖiɖe kpo.",
    proverbsFr: [
      "Le carrefour est le lieu où toutes les destinées se croisent.",
      "Celui qui salue le gardien de la porte entre en paix."
    ],
    proverbsFon: [
      "Ali-kpólí mɛ wɛ nyɔna kpodo nuvɔ̃ kpo nɔ jɛ ayi ɖe.",
      "Legba nɔ hun ali nú mɛ e ɖó xomɛfá e."
    ]
  },
  {
    id: 14,
    nameFon: "Lɛ́tɛ́-Méjì",
    nameYoruba: "Irete-Meji",
    nameFrench: "Lete-Meji",
    pattern: [1, 1, 2, 1],
    vodoun: {
      name: "Minona",
      descriptionFr: "La protectrice divine du foyer, de la cuisine, de la fertilité féminine et de l'alimentation familiale.",
      descriptionFon: "Minona xwégbe sín nɔ, e nɔ na nùɖuɖu kpo vǐjiji kpo."
    },
    meaningFr: "Symbolise la guérison holistique, la purification du corps et de l'esprit, la fertilité créative et la paix domestique.",
    meaningFon: "Azɔ̀ngbɔ, gbɛ-dudo, xwégbe sín jijɔho kpo vǐ sín nyɔna kpo.",
    proverbsFr: [
      "Le foyer chaleureux nourrit l'âme autant que le corps.",
      "La santé est la véritable richesse de l'homme."
    ],
    proverbsFon: [
      "Xwé e mɛ jijɔho ɖe ɔ, e wɛ nyi kpɔ́tí nyɔna tɔn.",
      "Lanmɛsɛ́n wɛ nyi dɔkùn nukɔntɔn gbɛtɔn."
    ]
  },
  {
    id: 15,
    nameFon: "Sɛ́-Méjì",
    nameYoruba: "Ose-Meji",
    nameFrench: "Se-Meji",
    pattern: [1, 2, 1, 2],
    vodoun: {
      name: "Aganju",
      descriptionFr: "La force géologique primordiale, représentant le volcanisme, les montagnes et le feu souterrain régénérateur.",
      descriptionFon: "Aganju myɔ ayigba glɔ tɔn e nɔ fɔn hlɔnhlɔn syɛnsyɛn ɖagbe tɔn ɖ'ayǐ."
    },
    meaningFr: "Exprime le dynamisme intérieur, la volonté invincible, la passion constructive et la victoire éclatante sur l'adversité.",
    meaningFon: "Hlɔnhlɔn mɛ-mɛ tɔn, ɖagbe bló, gbɛtɔn sín aklunɔ-zɔ̃ gudo tɔn.",
    proverbsFr: [
      "La montagne ne tremble pas devant le murmure du ruisseau.",
      "La volonté forte brise toutes les barrières."
    ],
    proverbsFon: [
      "Sɔ́ ɖaxo a nɔ jɛ nujɔnu sín lilɛ́ gbeɖe wu.",
      "Hlɔnhlɔn mɛtɔn wɛ nɔ sɔ́ ɛ yí nukɔn."
    ]
  },
  {
    id: 16,
    nameFon: "Fú-Méjì",
    nameYoruba: "Ofun-Meji",
    nameFrench: "Fu-Meji",
    pattern: [2, 1, 2, 1],
    vodoun: {
      name: "Orunmila / Fa",
      descriptionFr: "Le témoin suprême du destin, maître de la divination, de la connaissance infinie et de la sagesse éternelle.",
      descriptionFon: "Orunmila, Fa nuyɔnɛn syɛnsyɛn e tuùn nǔ e na jɔ lɛ bǐ e."
    },
    meaningFr: "Représente la sagesse mystique ultime, l'achèvement spirituel parfait, l'illumination divine et la protection absolue du Fa.",
    meaningFon: "Fa sín nuyɔnɛn gudo tɔn, nǔ e ɖagbe bǐ e, mɛɖesɔ-ɖ'alɔ Fa tɔn.",
    proverbsFr: [
      "La sagesse est un puits sans fond : plus on y puise, plus elle est fraîche.",
      "Celui qui marche sous la protection du Fa ne s'égarera jamais."
    ],
    proverbsFon: [
      "Fa sín nuyɔnɛn a nɔ vɔ́ gbeɖe gbeɖe e.",
      "Mɛ e zɔn kpo Fa kpo ɔ, a nɔ sɔ́ jɛ ɖo ali e gblé ɔ mɛ."
    ]
  }
];
