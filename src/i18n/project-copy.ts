import type { Lang } from "./config";

/**
 * Translated project copy, keyed by slug. English lives in src/data/projects.ts and is the
 * single source of truth; these are overlays. Anything missing falls back to the English
 * field, so a gap degrades to English rather than rendering blank.
 *
 * Deliberately NOT translated: tool names (Siemens NX, Altair HyperMesh, Fibersim,
 * SolidWorks), team and competition names (Écurie Aix, University Racing Eindhoven, FSG,
 * Warman Challenge Australia), part designations (EXO4, REV A-E) and units.
 */
export type ProjectCopy = {
  category: string;
  title: string;
  team: string;
  tags: string[];
  what: string;
  how: string[];
  result: string[];
  spec: { label: string; value: string }[];
  skills: string[];
};

type Translated = Record<string, ProjectCopy>;

const fr: Translated = {
  "cad-monocoque-design-packaging": {
    category: "CAO & intégration",
    title: "Conception CAO du monocoque et intégration",
    team: "University Racing Eindhoven · Pays-Bas",
    tags: ["Siemens NX", "Intégration", "RPC"],
    what:
      "Lors d'un stage de six mois chez University Racing Eindhoven, j'ai conçu la géométrie du monocoque sous Siemens NX et intégré chaque sous-système dans une seule surface de châssis cohérente.",
    how: [
      "Modélisé la géométrie du monocoque et réparti les volumes alloués à chaque sous-système.",
      "Négocié les exigences, contraintes et préférences (RPC) entre sous-systèmes pour garantir une intégration correcte.",
      "Résolu les interférences dans l'assemblage véhicule complet et livré la surface extérieure pour l'outillage.",
    ],
    result: [
      "Une surface de châssis intégrée reprenant tous les chemins d'effort et interfaces de fixation.",
      "Intégration validée sur le véhicule complet avant fabrication.",
      "Conception transmise aux équipes outillage et composites.",
      "Note de 100 % sur la documentation d'ingénierie.",
    ],
    spec: [
      { label: "Durée", value: "Stage de 6 mois" },
      { label: "Périmètre", value: "Intégration de tous les sous-systèmes" },
      { label: "RPC négociés", value: "Des centaines, tous sous-systèmes confondus" },
      { label: "Livrable", value: "Surface livrée pour l'outillage" },
    ],
    skills: [
      "Siemens NX",
      "Intégration CAO",
      "Gestion des exigences",
      "Intégration système",
      "Collaboration transverse",
    ],
  },
  "ergonomics-driver-fitment": {
    category: "Ergonomie",
    title: "Ergonomie et poste de pilotage",
    team: "University Racing Eindhoven · Pays-Bas",
    tags: ["Ergonomie", "Poste de pilotage", "Validation"],
    what:
      "Définition du poste de pilotage — visibilité, allonge et réglage du pédalier — afin que chaque pilote de l'équipe soit correctement installé.",
    how: [
      "Construit le point de vue du pilote, la ligne de visée et les allonges sous Siemens NX pour dimensionner le cockpit.",
      "Réglé l'ajustabilité du pédalier et de l'assise pour couvrir toute la morphologie des pilotes de l'équipe.",
      "Validé le poste de pilotage sur un banc d'essai physique.",
    ],
    result: [
      "Ligne de visée et allonge confirmées pour tous les pilotes.",
      "Toute la plage de pilotes accueillie, avec pédalier réglable.",
      "Poste validé sur le banc avant fabrication.",
    ],
    spec: [
      { label: "Ligne de visée", value: "Validée pour tous les pilotes" },
      { label: "Réglages", value: "Pédalier + assise" },
      { label: "Méthode de validation", value: "Banc d'essai physique" },
      { label: "Résultat", value: "Tous les pilotes cibles installés" },
    ],
    skills: [
      "Siemens NX",
      "Ergonomie",
      "Poste de pilotage",
      "Facteurs humains",
      "Validation sur banc",
    ],
  },
  "cad-tooling-design": {
    category: "Conception d'outillage",
    title: "Conception CAO de l'outillage",
    team: "University Racing Eindhoven · Pays-Bas",
    tags: ["Siemens NX", "Outillage", "DFM"],
    what:
      "Conception des moules du monocoque selon leur propre cahier des charges, pour que la pièce cuite démoule proprement et que le châssis soit construit à la bonne géométrie. Une conception guidée par la réalité de la **fabrication**, en travaillant directement avec l'équipe qui usinait les modèles et en restant **ouvert aux retours** à chaque revue.",
    how: [
      "Conçu l'outillage sous Siemens NX avec un angle de dépouille minimal de 3° sur chaque face pour un démoulage propre.",
      "Aligné les plans de joint et les éléments de centrage pour que les demi-moules — et donc le châssis — se positionnent correctement.",
      "Exporté les fichiers pour l'usinage CNC des modèles en balsa servant à réaliser les moules négatifs.",
    ],
    result: [
      "Des moules démoulables qui garantissent l'alignement du châssis.",
      "Dépouille de 3° et alignement obtenus sur toutes les faces.",
      "Modèles usinés en CNC et utilisés directement pour le drapage du monocoque.",
    ],
    spec: [
      { label: "Angle de dépouille", value: "Min. 3° sur toutes les faces" },
      { label: "Alignement", value: "Plans de joint appariés, demi-moules bien positionnés" },
      { label: "Fabrication", value: "Modèles en balsa usinés CNC" },
      { label: "Résultat", value: "Démoulage propre et répétable" },
    ],
    skills: [
      "Siemens NX",
      "Conception d'outillage",
      "DFM",
      "Conception de moules",
      "Coordination fabrication",
    ],
  },
  "chassis-torsional-stiffness": {
    category: "Simulation structurelle",
    title: "Simulation de rigidité en torsion du châssis",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEA", "Premiers principes"],
    what:
      "Le châssis de l'année précédente (EXO4) manquait de rigidité : le monocoque se comportait comme un troisième ressort non souhaité entre les trains avant et arrière. J'ai **pris la responsabilité** de l'objectif de rigidité à partir des premiers principes, en **apprenant en faisant** : j'ai appris le calcul éléments finis sous Altair HyperMesh et livré un résultat validé en quelques mois, **ouvert aux retours** du département suspension et des pilotes tout au long du projet.",
    how: [
      "Déduit l'objectif de rigidité en mettant en balance le gain au tour et la masse supplémentaire d'une structure plus rigide, en intégrant les retours du département suspension et des pilotes.",
      "Une tolérance de 0,8 % sur l'équilibre mécanique a fixé l'objectif minimal de rigidité en torsion.",
      "Construit le modèle éléments finis du monocoque sous Altair HyperMesh, appliqué le cas de charge en torsion et exploité la déformée pour calculer la rigidité.",
    ],
    result: [
      "Rigidité en torsion augmentée de 75 %, pour une masse accrue de seulement 35 %.",
      "Prédiction par éléments finis corrélée aux mesures du banc d'essai de l'année précédente, à ~2 % près.",
      "Livré dans le respect de toutes les contraintes, dont un objectif de masse de structure inférieur à 23 kg.",
    ],
    spec: [
      { label: "Objectif", value: "Atteint (tolérance d'équilibre 0,8 %)" },
      { label: "Gain de rigidité", value: "+75 %" },
      { label: "Validation", value: "~2 % d'écart vs essai" },
      { label: "Masse de structure", value: "< 23 kg (+35 %)" },
    ],
    skills: [
      "Calcul éléments finis",
      "Altair HyperMesh",
      "Analyse de rigidité en torsion",
      "Calculs analytiques",
      "Dérivation des exigences",
      "Simulation structurelle",
    ],
  },
  "aero-devices-fea": {
    category: "Simulation structurelle",
    title: "Simulation FEA des éléments aérodynamiques",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEA", "Drapage composite", "Conformité règlement"],
    what:
      "Chaque élément aérodynamique devait être léger, rigide et conforme au règlement structurel de Formula Student Germany (FSG). J'ai aligné la conception aérodynamique et la conception structurelle pour que chaque élément soit validé en calcul éléments finis sous les charges du règlement avant fabrication.",
    how: [
      "Appliqué les cas de charge FSG pour éléments aérodynamiques en calcul éléments finis : 200 N répartis sur ≥ 225 cm², et une charge ponctuelle de 50 N en tout point.",
      "Optimisé le drapage composite pour respecter les limites de déformation tout en retirant la matière ne reprenant aucun effort.",
      "Itéré la géométrie de l'aileron et de ses fixations jusqu'à ce que contraintes et déformations passent le règlement avec marge.",
    ],
    result: [
      "Masse de l'aileron arrière réduite de 11 % par rapport à l'année précédente.",
      "Tous les éléments aérodynamiques ont satisfait aux exigences FSG de stabilité et de résistance.",
      "Exigences structurelles et aérodynamiques satisfaites dans une seule conception validée.",
    ],
    spec: [
      { label: "Masse", value: "−11 % vs année précédente" },
      { label: "Cas de charge A", value: "200 N / ≥ 225 cm²" },
      { label: "Cas de charge B", value: "50 N, en tout point" },
      { label: "Résultat", value: "Toutes les règles FSG satisfaites" },
    ],
    skills: [
      "Calcul éléments finis",
      "Altair HyperMesh",
      "Optimisation du drapage composite",
      "Conformité règlement",
      "Analyse des cas de charge",
    ],
  },
  "composite-manufacturing": {
    category: "Fabrication / DFM",
    title: "Fabrication composite et simulation de drapabilité",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Drapabilité", "Livre de plis"],
    what:
      "Transformer la surface CAO du monocoque en une pièce carbone répétable et peu génératrice de chutes impliquait de simuler la drapabilité et de planifier chaque pli avant de toucher au moule. Un travail de **fabrication** concret en atelier, en **apprenant en faisant** aux côtés des camarades qui réalisaient le drapage.",
    how: [
      "Défini les zones de plis et les dégressions sur la surface du monocoque sous Siemens NX / Fibersim.",
      "Lancé la simulation de drapabilité pour vérifier l'orientation des fibres, puis imbriqué les plis afin de réduire les chutes et exporté les développés pour la découpe.",
      "Rédigé un livre de plis pour standardiser la fabrication et la qualité du drapage.",
    ],
    result: [
      "Un procédé de fabrication constant et maîtrisé en qualité.",
      "Chutes de matière et erreurs de drapage réduites.",
      "Monocoque cuit propre, avec un écart minimal d'orientation des fibres.",
    ],
    spec: [
      { label: "Méthode", value: "Simulation de drapabilité → imbrication des plis → export des développés" },
      { label: "Livrable", value: "Livre de plis" },
      { label: "Résultat", value: "Écart minimal d'orientation des fibres" },
      { label: "Chutes", value: "Réduites par imbrication des plis" },
    ],
    skills: [
      "Siemens Fibersim",
      "Simulation de drapabilité",
      "Imbrication des plis",
      "Fabrication composite",
      "DFM",
    ],
  },
  "warman-challenge-robot": {
    category: "Mécatronique / Impression 3D",
    title: "Robot Warman Challenge",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mécatronique", "Impression 3D"],
    what:
      "Conception, prototypage et documentation complète d'un robot mobile chargé de récupérer et transporter des charges sur un parcours défini pour le Warman Challenge Australia. J'ai **pris la responsabilité** du mécanisme de bout en bout, en le faisant **évoluer** par le **prototypage** et les **essais** plutôt que sur le papier.",
    how: [
      "Conçu un mécanisme d'actionnement linéaire entraîné par moteur pas à pas sur une base à roues mecanum, avec bras-tourelle rotatif et pince.",
      "Réalisé un **prototype** physique de la transmission et de la pince en PLA imprimé en 3D, puis fait évoluer la conception au fil des révisions selon ce que montraient les **essais**.",
      "Itéré la CAO sur cinq révisions (REV A–E), en détaillant les pièces imprimées en PLA avec des tolérances d'ajustement glissant ou serré.",
      "Produit un dossier de plans complet, au niveau assemblage et composants.",
    ],
    result: [
      "Transmission, actionnement et effecteur pleinement intégrés dans une seule machine.",
      "Jeu de plans complet et fabricable.",
    ],
    spec: [
      { label: "Itérations CAO", value: "REV A–E" },
      { label: "Tolérancement", value: "Ajustement glissant / serré" },
      { label: "Livrable", value: "Dossier de plans assemblage + composants" },
    ],
    skills: [
      "SolidWorks",
      "Mécatronique",
      "Impression 3D",
      "GD&T",
      "Plans d'ingénierie",
      "Systèmes à moteur pas à pas",
    ],
  },
};

const de: Translated = {
  "cad-monocoque-design-packaging": {
    category: "CAD & Package",
    title: "CAD-Monocoque-Konstruktion & Package",
    team: "University Racing Eindhoven · Niederlande",
    tags: ["Siemens NX", "Package", "RPCs"],
    what:
      "Während eines sechsmonatigen Praktikums bei University Racing Eindhoven habe ich die Monocoque-Geometrie in Siemens NX konstruiert und sämtliche Subsysteme zu einer integrierten Chassis-Fläche zusammengeführt.",
    how: [
      "Die Monocoque-Geometrie modelliert und die Bauräume der Subsysteme festgelegt.",
      "Anforderungen, Randbedingungen und Wünsche (RPCs) zwischen den Subsystemen abgestimmt, um die korrekte Integration sicherzustellen.",
      "Freigänge in der Gesamtfahrzeug-Baugruppe geklärt und die Außenfläche für den Formenbau freigegeben.",
    ],
    result: [
      "Eine integrierte Chassis-Fläche, die alle Lastpfade und Anbindungspunkte aufnimmt.",
      "Package vor der Fertigung am Gesamtfahrzeug abgesichert.",
      "Konstruktion an die Formenbau- und Composite-Teams übergeben.",
      "100 % Bewertung für die Engineering-Dokumentation.",
    ],
    spec: [
      { label: "Dauer", value: "6-monatiges Praktikum" },
      { label: "Umfang", value: "Package aller Subsysteme" },
      { label: "Abgestimmte RPCs", value: "Hunderte, über alle Subsysteme" },
      { label: "Ergebnis", value: "Fläche für den Formenbau freigegeben" },
    ],
    skills: [
      "Siemens NX",
      "CAD-Package",
      "Anforderungsmanagement",
      "Systemintegration",
      "Bereichsübergreifende Zusammenarbeit",
    ],
  },
  "ergonomics-driver-fitment": {
    category: "Ergonomie",
    title: "Ergonomie & Fahrerintegration",
    team: "University Racing Eindhoven · Niederlande",
    tags: ["Ergonomie", "Fahrerintegration", "Validierung"],
    what:
      "Festlegung des Fahrerpakets – Sichtlinie, Reichweite und Verstellbarkeit der Pedalerie –, damit jeder Fahrer der Zielgruppe korrekt im Fahrzeug sitzt.",
    how: [
      "Augenpunkt, Sichtlinie und Reichweiten des Fahrers in Siemens NX aufgebaut, um das Cockpit auszulegen.",
      "Verstellbereich von Pedalerie und Sitzposition auf die gesamte Fahrerbandbreite des Teams ausgelegt.",
      "Das Fahrerpaket auf einem physischen Sitzprüfstand validiert.",
    ],
    result: [
      "Sichtlinie und Reichweite für alle Fahrer bestätigt.",
      "Gesamte Fahrerbandbreite abgedeckt, mit verstellbarer Pedalerie.",
      "Paket vor dem Aufbau auf dem Prüfstand validiert.",
    ],
    spec: [
      { label: "Sichtlinie", value: "Für alle Fahrer validiert" },
      { label: "Verstellbarkeit", value: "Pedalerie + Sitz" },
      { label: "Validierungsmethode", value: "Physischer Sitzprüfstand" },
      { label: "Ergebnis", value: "Alle Zielfahrer passen" },
    ],
    skills: [
      "Siemens NX",
      "Ergonomie",
      "Fahrerintegration",
      "Human Factors",
      "Prüfstandsvalidierung",
    ],
  },
  "cad-tooling-design": {
    category: "Werkzeugkonstruktion",
    title: "CAD-Werkzeugkonstruktion",
    team: "University Racing Eindhoven · Niederlande",
    tags: ["Siemens NX", "Werkzeugbau", "DFM"],
    what:
      "Die Monocoque-Formen nach eigenen Anforderungen konstruiert, damit sich das ausgehärtete Bauteil sauber entformen lässt und das Chassis in der richtigen Geometrie entsteht. Die Konstruktion war an der **Fertigungsrealität** ausgerichtet – in direkter Abstimmung mit dem Team, das die Modelle gefräst hat, und **offen für Feedback** in jedem Review.",
    how: [
      "Werkzeuge in Siemens NX mit mindestens 3° Entformungsschräge an jeder Fläche konstruiert.",
      "Trennebenen und Zentrierungen so abgestimmt, dass Formhälften – und damit das Chassis – korrekt zueinander liegen.",
      "Bauteildaten für CNC-gefräste Balsamodelle exportiert, aus denen die Negativformen entstanden.",
    ],
    result: [
      "Entformbare Werkzeuge, die die Chassis-Ausrichtung halten.",
      "3° Entformungsschräge und Ausrichtung auf allen Flächen erreicht.",
      "Modelle CNC-gefräst und direkt zum Laminieren des Monocoques genutzt.",
    ],
    spec: [
      { label: "Entformungsschräge", value: "Min. 3° auf allen Flächen" },
      { label: "Ausrichtung", value: "Trennebenen abgestimmt, Formhälften liegen korrekt" },
      { label: "Fertigung", value: "CNC-gefräste Balsamodelle" },
      { label: "Ergebnis", value: "Sauberes, wiederholbares Entformen" },
    ],
    skills: [
      "Siemens NX",
      "Werkzeugkonstruktion",
      "DFM",
      "Formenkonstruktion",
      "Fertigungskoordination",
    ],
  },
  "chassis-torsional-stiffness": {
    category: "Strukturberechnung",
    title: "Simulation der Chassis-Torsionssteifigkeit",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEM", "First Principles"],
    what:
      "Das Chassis des Vorjahres (EXO4) war nicht steif genug – das Monocoque wirkte als ungewollte dritte Feder zwischen Vorder- und Hinterachse. Ich habe **Verantwortung** für das Steifigkeitsziel von Grund auf übernommen und **durch Machen gelernt**: Ich habe mir die FEM-Berechnung in Altair HyperMesh angeeignet und innerhalb weniger Monate ein validiertes Ergebnis geliefert – durchgehend **offen für Feedback** aus der Fahrwerksabteilung und von den Fahrern.",
    how: [
      "Das Steifigkeitsziel hergeleitet, indem Rundenzeitgewinn gegen die Mehrmasse einer steiferen Struktur abgewogen wurde – mit Input aus der Fahrwerksabteilung und von den Fahrern.",
      "Eine Toleranz von 0,8 % auf die mechanische Balance legte die Mindest-Torsionssteifigkeit fest.",
      "Das FE-Modell des Monocoques in Altair HyperMesh aufgebaut, den Torsionslastfall aufgebracht und aus der Verformung die Steifigkeit bestimmt.",
    ],
    result: [
      "Torsionssteifigkeit um 75 % gesteigert, bei nur 35 % Mehrmasse.",
      "FEM-Vorhersage mit den Prüfstandsdaten des Vorjahres auf ~2 % genau korreliert.",
      "Innerhalb aller Randbedingungen geliefert, inklusive Zielmasse der Struktur unter 23 kg.",
    ],
    spec: [
      { label: "Ziel", value: "Erreicht (0,8 % Balance-Toleranz)" },
      { label: "Steifigkeitsgewinn", value: "+75 %" },
      { label: "Validierung", value: "~2 % Abweichung zum Versuch" },
      { label: "Strukturmasse", value: "< 23 kg (+35 %)" },
    ],
    skills: [
      "FEM",
      "Altair HyperMesh",
      "Torsionssteifigkeitsanalyse",
      "Handrechnungen",
      "Anforderungsableitung",
      "Strukturberechnung",
    ],
  },
  "aero-devices-fea": {
    category: "Strukturberechnung",
    title: "FEM-Simulation der Aerodynamikbauteile",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEM", "Composite-Laminat", "Reglementkonformität"],
    what:
      "Jedes Aerodynamikbauteil musste leicht, steif und konform zum Strukturreglement von Formula Student Germany (FSG) sein. Ich habe die aerodynamische und die strukturelle Auslegung so verzahnt, dass jedes Bauteil vor der Fertigung unter den Reglementlasten per FEM validiert war.",
    how: [
      "Die FSG-Lastfälle für Aerodynamikbauteile in der FEM aufgebracht: 200 N verteilt über ≥ 225 cm² sowie eine Punktlast von 50 N an beliebiger Stelle.",
      "Den Lagenaufbau optimiert, um die Verformungsgrenzen einzuhalten und zugleich Material ohne Lastanteil zu entfernen.",
      "Flügel- und Anbindungsgeometrie iteriert, bis Spannungen und Verformungen das Reglement mit Reserve erfüllten.",
    ],
    result: [
      "Gewicht des Heckflügels gegenüber dem Vorjahr um 11 % reduziert.",
      "Alle Aerodynamikbauteile erfüllten die FSG-Anforderungen an Stabilität und Festigkeit.",
      "Strukturelle und aerodynamische Anforderungen in einer validierten Auslegung vereint.",
    ],
    spec: [
      { label: "Gewicht", value: "−11 % ggü. Vorjahr" },
      { label: "Lastfall A", value: "200 N / ≥ 225 cm²" },
      { label: "Lastfall B", value: "50 N, beliebige Stelle" },
      { label: "Ergebnis", value: "Alle FSG-Regeln erfüllt" },
    ],
    skills: [
      "FEM",
      "Altair HyperMesh",
      "Optimierung des Lagenaufbaus",
      "Reglementkonformität",
      "Lastfallanalyse",
    ],
  },
  "composite-manufacturing": {
    category: "Fertigung / DFM",
    title: "Composite-Fertigung & Drapiersimulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Drapierbarkeit", "Lagenbuch"],
    what:
      "Um die CAD-Fläche des Monocoques in ein wiederholbares, verschnittarmes Carbonbauteil zu überführen, musste die Drapierbarkeit simuliert und jede Lage geplant werden, bevor die Form angefasst wurde. Praktische **Fertigungsarbeit** in der Werkstatt – **learning by doing** gemeinsam mit den Kommilitonen, die die Bauteile laminiert haben.",
    how: [
      "Lagenbereiche und Lagenabstufungen auf der Monocoque-Fläche in Siemens NX / Fibersim definiert.",
      "Drapiersimulation durchgeführt, um die Faserorientierung zu prüfen, anschließend die Lagen verschachtelt, um Verschnitt zu reduzieren, und die Abwicklungen für den Zuschnitt exportiert.",
      "Ein Lagenbuch erstellt, um Fertigung und Laminatqualität zu standardisieren.",
    ],
    result: [
      "Gleichbleibender, qualitätsgesicherter Fertigungsprozess.",
      "Weniger Materialverschnitt und Laminierfehler.",
      "Sauber ausgehärtetes Monocoque mit minimaler Abweichung der Faserorientierung.",
    ],
    spec: [
      { label: "Methode", value: "Drapiersimulation → Lagenverschachtelung → Abwicklungsexport" },
      { label: "Ergebnis", value: "Lagenbuch" },
      { label: "Qualität", value: "Minimale Abweichung der Faserorientierung" },
      { label: "Verschnitt", value: "Durch verschachtelte Lagen reduziert" },
    ],
    skills: [
      "Siemens Fibersim",
      "Drapiersimulation",
      "Lagenverschachtelung",
      "Composite-Fertigung",
      "DFM",
    ],
  },
  "warman-challenge-robot": {
    category: "Mechatronik / 3D-Druck",
    title: "Warman-Challenge-Roboter",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mechatronik", "3D-Druck"],
    what:
      "Konstruktion, Prototypenbau und vollständige Dokumentation eines mobilen Roboters, der Lasten über einen definierten Parcours der Warman Challenge Australia aufnimmt und transportiert. Ich habe **Verantwortung** für den Mechanismus von Anfang bis Ende übernommen und die Konstruktion durch **Prototyping** und **Testen** weiterentwickelt – nicht nur auf dem Papier.",
    how: [
      "Einen schrittmotorgetriebenen Linearantrieb auf einer Mecanum-Radbasis konstruiert, mit drehbarem Turmarm und Greifer.",
      "Einen physischen **Prototyp** von Antrieb und Greifer aus 3D-gedrucktem PLA gebaut und die Konstruktion über mehrere Revisionen anhand der **Testergebnisse** weiterentwickelt.",
      "Das CAD über fünf Revisionen (REV A–E) iteriert und die 3D-gedruckten PLA-Teile mit Spiel- bzw. Presspassungen detailliert.",
      "Einen vollständigen Zeichnungssatz auf Baugruppen- und Bauteilebene erstellt.",
    ],
    result: [
      "Antrieb, Aktuatorik und Endeffektor vollständig in einer Maschine integriert.",
      "Vollständiger, fertigungsgerechter Zeichnungssatz.",
    ],
    spec: [
      { label: "CAD-Iterationen", value: "REV A–E" },
      { label: "Tolerierung", value: "Spielpassung / Presspassung" },
      { label: "Ergebnis", value: "Zeichnungssatz Baugruppe + Bauteile" },
    ],
    skills: [
      "SolidWorks",
      "Mechatronik",
      "3D-Druck",
      "GD&T",
      "Technische Zeichnungen",
      "Schrittmotorsysteme",
    ],
  },
};

const nl: Translated = {
  "cad-monocoque-design-packaging": {
    category: "CAD & package",
    title: "CAD-monocoqueontwerp & package",
    team: "University Racing Eindhoven · Nederland",
    tags: ["Siemens NX", "Package", "RPC's"],
    what:
      "Tijdens een stage van zes maanden bij University Racing Eindhoven ontwierp ik de monocoquegeometrie in Siemens NX en bracht ik elk subsysteem samen in één geïntegreerd chassisoppervlak.",
    how: [
      "De monocoquegeometrie gemodelleerd en de bouwruimte per subsysteem toegewezen.",
      "Eisen, randvoorwaarden en voorkeuren (RPC's) tussen subsystemen afgestemd voor een correcte integratie.",
      "Vrijslagen opgelost in de volledige voertuigassemblage en het buitenoppervlak vrijgegeven voor de matrijzen.",
    ],
    result: [
      "Eén geïntegreerd chassisoppervlak dat alle krachtpaden en bevestigingsinterfaces draagt.",
      "Package gevalideerd op het volledige voertuig vóór productie.",
      "Ontwerp overgedragen aan de matrijzen- en composietteams.",
      "100% beoordeling voor de engineeringdocumentatie.",
    ],
    spec: [
      { label: "Duur", value: "Stage van 6 maanden" },
      { label: "Scope", value: "Package van alle subsystemen" },
      { label: "Afgestemde RPC's", value: "Honderden, over alle subsystemen" },
      { label: "Resultaat", value: "Oppervlak vrijgegeven voor matrijzen" },
    ],
    skills: [
      "Siemens NX",
      "CAD-package",
      "Requirementsmanagement",
      "Systeemintegratie",
      "Multidisciplinaire samenwerking",
    ],
  },
  "ergonomics-driver-fitment": {
    category: "Ergonomie",
    title: "Ergonomie & coureurpassing",
    team: "University Racing Eindhoven · Nederland",
    tags: ["Ergonomie", "Coureurpassing", "Validatie"],
    what:
      "Het coureurpakket vastgelegd — zichtlijn, reikwijdte en verstelbaarheid van het pedaalstel — zodat elke beoogde coureur goed in de auto past.",
    how: [
      "Oogpunt, zichtlijn en reikwijdte van de coureur in Siemens NX opgebouwd om de cockpit te dimensioneren.",
      "Verstelbaarheid van pedaalstel en stoel afgestemd op de volledige range aan teamcoureurs.",
      "Het coureurpakket gevalideerd op een fysieke pasopstelling.",
    ],
    result: [
      "Juiste zichtlijn en reikwijdte bevestigd voor alle coureurs.",
      "Volledige range aan coureurs past, met verstelbare pedalen.",
      "Pakket gevalideerd op de pasopstelling vóór de bouw.",
    ],
    spec: [
      { label: "Zichtlijn", value: "Gevalideerd voor alle coureurs" },
      { label: "Verstelbaarheid", value: "Pedaalstel + stoel" },
      { label: "Validatiemethode", value: "Fysieke pasopstelling" },
      { label: "Resultaat", value: "Alle beoogde coureurs passen" },
    ],
    skills: [
      "Siemens NX",
      "Ergonomie",
      "Coureurpassing",
      "Human factors",
      "Validatie op opstelling",
    ],
  },
  "cad-tooling-design": {
    category: "Matrijsontwerp",
    title: "CAD-matrijsontwerp",
    team: "University Racing Eindhoven · Nederland",
    tags: ["Siemens NX", "Matrijzen", "DFM"],
    what:
      "De monocoquematrijzen ontworpen volgens hun eigen eisen, zodat het uitgeharde deel schoon lost en het chassis in de juiste geometrie wordt gebouwd. Het ontwerp werd gestuurd door de **productiepraktijk**, in direct overleg met het team dat de modellen freesde en **open voor feedback** bij elke review.",
    how: [
      "Matrijzen ontworpen in Siemens NX met minimaal 3° lossingshoek op elk vlak voor schoon lossen.",
      "Deelvlakken en centreringen op elkaar afgestemd zodat matrijshelften — en dus het chassis — correct passen.",
      "Onderdeelbestanden geëxporteerd voor CNC-gefreesde balsamodellen waarmee de negatieve matrijzen zijn gemaakt.",
    ],
    result: [
      "Losbare matrijzen die de uitlijning van het chassis vasthouden.",
      "3° lossingshoek en uitlijning gehaald op alle vlakken.",
      "Modellen CNC-gefreesd en direct gebruikt om het monocoque te lamineren.",
    ],
    spec: [
      { label: "Lossingshoek", value: "Min. 3° op alle vlakken" },
      { label: "Uitlijning", value: "Deelvlakken afgestemd, matrijshelften passen correct" },
      { label: "Productie", value: "CNC-gefreesde balsamodellen" },
      { label: "Resultaat", value: "Schoon, herhaalbaar lossen" },
    ],
    skills: [
      "Siemens NX",
      "Matrijsontwerp",
      "DFM",
      "Matrijzenbouw",
      "Productiecoördinatie",
    ],
  },
  "chassis-torsional-stiffness": {
    category: "Constructieve simulatie",
    title: "Simulatie torsiestijfheid chassis",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEA", "First principles"],
    what:
      "Het chassis van het voorgaande jaar (EXO4) was niet stijf genoeg, waardoor het monocoque als een ongewenste derde veer tussen voor- en achterwielophanging werkte. Ik nam **verantwoordelijkheid** voor de stijfheidsdoelstelling vanaf de basis en leerde **door te doen**: ik maakte me FEA in Altair HyperMesh eigen en leverde binnen enkele maanden een gevalideerd resultaat, doorlopend **open voor feedback** van de ophangingsafdeling en de coureurs.",
    how: [
      "De stijfheidsdoelstelling afgeleid door rondetijdwinst af te wegen tegen de massatoename van een stijvere constructie, met input van de ophangingsafdeling en de coureurs.",
      "Een tolerantie van 0,8% op de mechanische balans bepaalde de minimale torsiestijfheid.",
      "Het EEM-model van het monocoque opgebouwd in Altair HyperMesh, het torsiebelastinggeval aangebracht en uit de vervorming de stijfheid berekend.",
    ],
    result: [
      "Torsiestijfheid met 75% verhoogd, terwijl de massa met slechts 35% toenam.",
      "De FEA-voorspelling gecorreleerd aan de testbankdata van het voorgaande jaar tot op ~2% nauwkeurig.",
      "Geleverd binnen alle randvoorwaarden, inclusief een framemassa onder 23 kg.",
    ],
    spec: [
      { label: "Doel", value: "Gehaald (0,8% balanstolerantie)" },
      { label: "Stijfheidswinst", value: "+75%" },
      { label: "Validatie", value: "~2% afwijking t.o.v. test" },
      { label: "Framemassa", value: "< 23 kg (+35%)" },
    ],
    skills: [
      "FEA",
      "Altair HyperMesh",
      "Torsiestijfheidsanalyse",
      "Handberekeningen",
      "Afleiden van eisen",
      "Constructieve simulatie",
    ],
  },
  "aero-devices-fea": {
    category: "Constructieve simulatie",
    title: "FEA-simulatie aerodynamische delen",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEA", "Composietlaminaat", "Reglementconformiteit"],
    what:
      "Elk aerodynamisch onderdeel moest licht, stijf en conform het constructiereglement van Formula Student Germany (FSG) zijn. Ik stemde het aerodynamische en het constructieve ontwerpproces op elkaar af, zodat elk onderdeel vóór productie met FEA tegen de reglementbelastingen was gevalideerd.",
    how: [
      "De FSG-belastinggevallen voor aerodynamische delen toegepast in FEA: 200 N verdeeld over ≥ 225 cm², en een puntlast van 50 N op elke positie.",
      "Het composietlaminaat geoptimaliseerd om binnen de vervormingsgrenzen te blijven en materiaal zonder belasting te verwijderen.",
      "Vleugel- en bevestigingsgeometrie geïtereerd tot spanning en vervorming het reglement met marge haalden.",
    ],
    result: [
      "Gewicht van de achtervleugel met 11% verlaagd ten opzichte van het voorgaande jaar.",
      "Alle aerodynamische delen voldeden aan de FSG-eisen voor stabiliteit en sterkte.",
      "Constructieve en aerodynamische eisen in één gevalideerd ontwerp gehaald.",
    ],
    spec: [
      { label: "Gewicht", value: "−11% t.o.v. vorig jaar" },
      { label: "Belastinggeval A", value: "200 N / ≥ 225 cm²" },
      { label: "Belastinggeval B", value: "50 N, willekeurig punt" },
      { label: "Resultaat", value: "Alle FSG-regels gehaald" },
    ],
    skills: [
      "FEA",
      "Altair HyperMesh",
      "Optimalisatie composietlaminaat",
      "Reglementconformiteit",
      "Belastinggevalanalyse",
    ],
  },
  "composite-manufacturing": {
    category: "Productie / DFM",
    title: "Composietproductie & drapeersimulatie",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Drapeerbaarheid", "Laminaatboek"],
    what:
      "Het CAD-oppervlak van het monocoque omzetten in een herhaalbaar koolstofvezeldeel met weinig afval betekende drapeerbaarheid simuleren en elke laag plannen vóór de matrijs werd aangeraakt. Praktisch **productiewerk** op de werkvloer, **learning by doing** samen met de medestudenten die de delen lamineerden.",
    how: [
      "Laagzones en laagafbouw op het monocoqueoppervlak gedefinieerd in Siemens NX / Fibersim.",
      "Drapeersimulatie uitgevoerd om de vezelrichting te controleren, lagen genest om afval te beperken en uitslagen geëxporteerd voor het snijden.",
      "Een laminaatboek opgesteld om productie en laminaatkwaliteit te standaardiseren.",
    ],
    result: [
      "Een constant en kwaliteitsgestuurd productieproces.",
      "Minder materiaalafval en laminaatfouten.",
      "Schoon uitgehard monocoque met minimale afwijking in vezelrichting.",
    ],
    spec: [
      { label: "Methode", value: "Drapeersimulatie → lagen nesten → uitslagen exporteren" },
      { label: "Resultaat", value: "Laminaatboek" },
      { label: "Kwaliteit", value: "Minimale afwijking vezelrichting" },
      { label: "Afval", value: "Beperkt door geneste lagen" },
    ],
    skills: [
      "Siemens Fibersim",
      "Drapeersimulatie",
      "Lagen nesten",
      "Composietproductie",
      "DFM",
    ],
  },
  "warman-challenge-robot": {
    category: "Mechatronica / 3D-print",
    title: "Warman Challenge-robot",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mechatronica", "3D-printen"],
    what:
      "Een mobiele robot ontworpen, geprototypet en volledig gedocumenteerd om ladingen op te pakken en te vervoeren over een vastgelegd parcours voor de Warman Challenge Australia. Ik nam **verantwoordelijkheid** voor het mechanisme van begin tot eind en liet het ontwerp **groeien** via **prototypen** en **testen** in plaats van alleen op papier.",
    how: [
      "Een lineair aandrijfmechanisme met stappenmotor ontworpen op een mecanumwielbasis, met roterende torenarm en grijper.",
      "Een fysiek **prototype** van de aandrijving en grijper gebouwd in 3D-geprint PLA en het ontwerp via opeenvolgende revisies doorontwikkeld op basis van wat de **tests** lieten zien.",
      "Het CAD-model door vijf revisies geïtereerd (REV A–E), met 3D-geprinte PLA-delen gedetailleerd met glijpassing versus perspassing.",
      "Een volledig tekeningenpakket opgeleverd, op assemblage- en componentniveau.",
    ],
    result: [
      "Aandrijving, actuatie en eindeffector volledig geïntegreerd in één machine.",
      "Compleet, maakbaar tekeningenpakket.",
    ],
    spec: [
      { label: "CAD-iteraties", value: "REV A–E" },
      { label: "Tolerantie", value: "Glijpassing / perspassing" },
      { label: "Resultaat", value: "Tekeningenpakket assemblage + componenten" },
    ],
    skills: [
      "SolidWorks",
      "Mechatronica",
      "3D-printen",
      "GD&T",
      "Technische tekeningen",
      "Stappenmotorsystemen",
    ],
  },
};

export const PROJECT_COPY: Record<Exclude<Lang, "en">, Translated> = { fr, de, nl };
