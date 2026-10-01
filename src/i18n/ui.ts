import type { Lang } from "./config";

/**
 * Every user-visible string outside the project data.
 * Typed as Record<Lang, UiCopy>, so a missing key in any language fails the build.
 * Prose fields accept **bold** markers and are rendered through <RichText />.
 */
export type UiCopy = {
  // Hero
  heroTitle: string;
  heroIntro: string;
  heroClosing: string;
  statProjects: string;
  statRanking: string;
  statRankingDenominator: string;
  statStiffness: string;
  statWing: string;
  statLinkTitle: string;
  location: string;

  // Showcase
  showcaseCounter: (current: number, total: number) => string;
  previousProject: string;
  nextProject: string;
  viewProject: (title: string) => string;

  // Project index
  engineeringProjects: string;
  entries: (count: number) => string;
  projectCounter: (current: string, total: string) => string;
  endOfIndex: (count: number) => string;
  backToTop: string;
  moreDetails: string;
  expandImageFor: (title: string) => string;
  viewDetailsFor: (title: string) => string;
  goTo: (title: string) => string;
  emailAria: string;
  linkedinAria: string;
  footerRole: string;

  // Project detail
  backToIndex: string;
  viewPdf: string;
  sectionWhat: string;
  sectionHow: string;
  sectionResult: string;
  technicalSpecification: string;
  skills: string;
  moreEngineeringProjects: string;
  scroll: string;
  previewImage: (index: number) => string;
  thumbnailAlt: (title: string, index: number) => string;
  expandMainImage: string;

  // Scroll pill
  explorePortfolio: string;
  scrollToProjects: string;

  // Language switcher
  language: string;

  // Skill filter
  filterBySkill: string;
  clearFilters: string;
  sortedByRelevance: string;
  introLens: (names: string, body: string) => string;
  introLensMulti: (names: string, clauses: string) => string;
  filterNote: string;
  listAnd: string;

  // Feedback widget
  feedbackTrigger: string;
  feedbackTitle: string;
  feedbackSubtitle: string;
  feedbackDismissAria: string;
  feedbackQuickReason: string;
  feedbackReasons: { chat: string; portfolio: string; hi: string; other: string };
  feedbackOtherPlaceholder: string;
  feedbackOtherAria: string;
  feedbackWhoAreYou: string;
  feedbackRoles: { recruiter: string; peer: string; industry: string; other: string };
  feedbackIdentityLabel: string;
  feedbackIdentityPlaceholder: string;
  feedbackIdentityHint: string;
  feedbackMessageLabel: string;
  feedbackMessagePlaceholder: string;
  feedbackError: string;
  feedbackDismiss: string;
  feedbackSubmit: string;
  feedbackSending: string;
  feedbackThanksTitle: string;
  feedbackThanksBody: string;
  feedbackReturn: string;
};

export const UI: Record<Lang, UiCopy> = {
  en: {
    heroTitle: "Aurélien Pons' ePortfolio",
    heroIntro:
      "Final-year Mechanical Engineering student who worked across the full design-analysis-validation cycle in Formula Student. I designed and packaged a chassis geometry in Siemens NX, validated structures through FEA in Altair HyperMesh, and took parts from first-principles requirements to **manufactured** carbon-fibre assemblies. I **took ownership** of subsystems end to end, ensuring transparency and proper engineering process throughout, from **prototyping** and **testing** to in-house or outsourced manufacturing. **Learning by doing** is something I'm comfortable with, and as a student I value learning from others and adapting to feedback.",
    heroClosing:
      "Motivated engineer eager to tackle real-world technical challenges within established companies. Focused on continuous **learning**, **growing** by staying **open to feedback**, and delivering impactful results.",
    statProjects: "Self-Driven Engineering & Technical Projects",
    statRanking: "Formula Student World Rankings 2026",
    statRankingDenominator: "/400+ teams",
    statStiffness: "Chassis torsional rigidity increase",
    statWing: "Rear-wing weight decrease",
    statLinkTitle: "View the project behind this result",
    location: "Aachen, Germany",

    showcaseCounter: (c, t) => `${c} / ${t} Projects`,
    previousProject: "Previous project",
    nextProject: "Next project",
    viewProject: (title) => `View project ${title}`,

    engineeringProjects: "Engineering Projects",
    entries: (n) => `${n} Entries`,
    projectCounter: (c, t) => `Project ${c} / ${t}`,
    endOfIndex: (n) => `End of index. ${n} projects shown`,
    backToTop: "Back to top",
    moreDetails: "More details",
    expandImageFor: (title) => `Expand image for ${title}`,
    viewDetailsFor: (title) => `View ${title} details`,
    goTo: (title) => `Go to ${title}`,
    emailAria: "Email Aurélien Pons",
    linkedinAria: "LinkedIn profile",
    footerRole: "Mechanical Engineering",

    backToIndex: "Back to index",
    viewPdf: "View full engineering process (PDF)",
    sectionWhat: "What",
    sectionHow: "How",
    sectionResult: "Result",
    technicalSpecification: "Technical Specification",
    skills: "Skills",
    moreEngineeringProjects: "More Engineering Projects",
    scroll: "Scroll",
    previewImage: (i) => `Preview image ${i}`,
    thumbnailAlt: (title, i) => `${title} thumbnail ${i}`,
    expandMainImage: "Expand main image",

    explorePortfolio: "Explore Portfolio",
    scrollToProjects: "Scroll down to the engineering projects",

    language: "Language",

    filterBySkill: "Filter by skill",
    clearFilters: "Clear filters",
    sortedByRelevance: "Sorted by relevance",
    introLens: (names, body) => `You're looking at Aurélien's portfolio filtered by ${names}. ${body}`,
    introLensMulti: (names, clauses) => `You're looking at Aurélien's portfolio filtered by ${names}: ${clauses}.`,
    filterNote: "Nothing is hidden — projects reorder by relevance.",
    listAnd: "and",

    feedbackTrigger: "Feedback would be very much appreciated",
    feedbackTitle: "Leave your thoughts & connect",
    feedbackSubtitle:
      "Any feedback is welcome, whether it's thoughts on the portfolio, project suggestions, or opportunities to connect.",
    feedbackDismissAria: "Dismiss feedback",
    feedbackQuickReason: "Quick reason",
    feedbackReasons: {
      chat: "💼 Open to Chat / Roles",
      portfolio: "💡 Portfolio Feedback",
      hi: "👋 Just Saying Hi",
      other: "⚙️ Other",
    },
    feedbackOtherPlaceholder: "Tell me your reason",
    feedbackOtherAria: "Your reason",
    feedbackWhoAreYou: "Who are you?",
    feedbackRoles: {
      recruiter: "Recruiter / Hiring Manager",
      peer: "Engineering Peer",
      industry: "Industry Professional",
      other: "Other",
    },
    feedbackIdentityLabel: "Your name, email, or LinkedIn",
    feedbackIdentityPlaceholder: "e.g. Aurelien Pons · aurelien.pons@example.com or LinkedIn URL",
    feedbackIdentityHint: "Leave your info so I can thank you directly or follow up.",
    feedbackMessageLabel: "Your feedback",
    feedbackMessagePlaceholder: "What worked, what didn't, what you'd change...",
    feedbackError: "That didn't go through. Your feedback is still here, so you can try again.",
    feedbackDismiss: "Dismiss",
    feedbackSubmit: "Submit Feedback 🏁",
    feedbackSending: "Sending...",
    feedbackThanksTitle: "I APPRECIATE YOUR FEEDBACK.",
    feedbackThanksBody: "Your input helps me continuously improve.",
    feedbackReturn: "Return to Site",
  },

  fr: {
    heroTitle: "ePortfolio d'Aurélien Pons",
    heroIntro:
      "Étudiant en dernière année de génie mécanique, j'ai couvert l'ensemble du cycle conception–analyse–validation en Formula Student. J'ai conçu et intégré la géométrie d'un châssis sous Siemens NX, validé des structures par calcul éléments finis dans Altair HyperMesh, et mené des pièces des exigences fondamentales jusqu'à des assemblages en fibre de carbone **fabriqués**. J'ai **pris la responsabilité** de sous-systèmes de bout en bout, en assurant la transparence et une démarche d'ingénierie rigoureuse, du **prototypage** et des **essais** jusqu'à la fabrication interne ou sous-traitée. **Apprendre en faisant** est une approche dans laquelle je suis à l'aise et, en tant qu'étudiant, je tiens à apprendre des autres et à tenir compte des retours.",
    heroClosing:
      "Ingénieur motivé, désireux de relever de vrais défis techniques au sein d'entreprises établies. Orienté vers l'**apprentissage** continu, la **progression** en restant **ouvert aux retours**, et des résultats concrets.",
    statProjects: "Projets d'ingénierie et techniques menés en autonomie",
    statRanking: "Classement mondial Formula Student 2026",
    statRankingDenominator: "/400+ équipes",
    statStiffness: "Gain de rigidité en torsion du châssis",
    statWing: "Réduction de masse de l'aileron arrière",
    statLinkTitle: "Voir le projet à l'origine de ce résultat",
    location: "Aix-la-Chapelle, Allemagne",

    showcaseCounter: (c, t) => `${c} / ${t} projets`,
    previousProject: "Projet précédent",
    nextProject: "Projet suivant",
    viewProject: (title) => `Voir le projet ${title}`,

    engineeringProjects: "Projets d'ingénierie",
    entries: (n) => `${n} projets`,
    projectCounter: (c, t) => `Projet ${c} / ${t}`,
    endOfIndex: (n) => `Fin de l'index. ${n} projets présentés`,
    backToTop: "Retour en haut",
    moreDetails: "Plus de détails",
    expandImageFor: (title) => `Agrandir l'image de ${title}`,
    viewDetailsFor: (title) => `Voir les détails de ${title}`,
    goTo: (title) => `Aller à ${title}`,
    emailAria: "Envoyer un e-mail à Aurélien Pons",
    linkedinAria: "Profil LinkedIn",
    footerRole: "Génie mécanique",

    backToIndex: "Retour à l'index",
    viewPdf: "Voir le dossier d'ingénierie complet (PDF)",
    sectionWhat: "Quoi",
    sectionHow: "Comment",
    sectionResult: "Résultat",
    technicalSpecification: "Spécifications techniques",
    skills: "Compétences",
    moreEngineeringProjects: "Plus de projets d'ingénierie",
    scroll: "Faire défiler",
    previewImage: (i) => `Aperçu de l'image ${i}`,
    thumbnailAlt: (title, i) => `${title} — miniature ${i}`,
    expandMainImage: "Agrandir l'image principale",

    explorePortfolio: "Explorer le portfolio",
    scrollToProjects: "Défiler jusqu'aux projets d'ingénierie",

    language: "Langue",

    filterBySkill: "Filtrer par compétence",
    clearFilters: "Effacer les filtres",
    sortedByRelevance: "Trié par pertinence",
    introLens: (names, body) => `Vous consultez le portfolio d'Aurélien filtré par ${names}. ${body}`,
    introLensMulti: (names, clauses) => `Vous consultez le portfolio d'Aurélien filtré par ${names} : ${clauses}.`,
    filterNote: "Rien n'est masqué — les projets sont simplement réordonnés.",
    listAnd: "et",

    feedbackTrigger: "Vos retours seraient très appréciés",
    feedbackTitle: "Laissez votre avis et restons en contact",
    feedbackSubtitle:
      "Tout retour est le bienvenu : impressions sur le portfolio, suggestions de projets ou simples occasions d'échanger.",
    feedbackDismissAria: "Fermer le formulaire",
    feedbackQuickReason: "Motif rapide",
    feedbackReasons: {
      chat: "💼 Échange / Opportunités",
      portfolio: "💡 Avis sur le portfolio",
      hi: "👋 Juste un bonjour",
      other: "⚙️ Autre",
    },
    feedbackOtherPlaceholder: "Précisez votre motif",
    feedbackOtherAria: "Votre motif",
    feedbackWhoAreYou: "Qui êtes-vous ?",
    feedbackRoles: {
      recruiter: "Recruteur / Responsable du recrutement",
      peer: "Collègue ingénieur",
      industry: "Professionnel du secteur",
      other: "Autre",
    },
    feedbackIdentityLabel: "Votre nom, e-mail ou LinkedIn",
    feedbackIdentityPlaceholder: "ex. Aurelien Pons · aurelien.pons@example.com ou URL LinkedIn",
    feedbackIdentityHint: "Laissez vos coordonnées pour que je puisse vous remercier ou vous recontacter.",
    feedbackMessageLabel: "Votre retour",
    feedbackMessagePlaceholder: "Ce qui fonctionne, ce qui ne va pas, ce que vous changeriez...",
    feedbackError: "L'envoi a échoué. Votre message est conservé, vous pouvez réessayer.",
    feedbackDismiss: "Fermer",
    feedbackSubmit: "Envoyer 🏁",
    feedbackSending: "Envoi...",
    feedbackThanksTitle: "MERCI POUR VOTRE RETOUR.",
    feedbackThanksBody: "Vos remarques m'aident à progresser en continu.",
    feedbackReturn: "Retour au site",
  },

  de: {
    heroTitle: "Aurélien Pons' ePortfolio",
    heroIntro:
      "Maschinenbaustudent im letzten Studienjahr, der bei Formula Student den gesamten Zyklus aus Konstruktion, Berechnung und Validierung durchlaufen hat. Ich habe eine Chassis-Geometrie in Siemens NX konstruiert und das Package aufgebaut, Strukturen mittels FEM in Altair HyperMesh validiert und Bauteile von den Grundanforderungen bis zu **gefertigten** Baugruppen aus Kohlefaser gebracht. Ich habe **Verantwortung** für Subsysteme von Anfang bis Ende übernommen und dabei Transparenz und einen sauberen Entwicklungsprozess sichergestellt – vom **Prototyping** und **Testen** bis zur Fertigung im Haus oder beim Zulieferer. **Learning by doing** liegt mir, und als Student lege ich Wert darauf, von anderen zu lernen und Feedback aufzunehmen.",
    heroClosing:
      "Motivierter Ingenieur, der reale technische Herausforderungen in etablierten Unternehmen angehen möchte. Fokus auf kontinuierliches **Lernen**, **Weiterentwicklung** durch **Offenheit für Feedback** und wirkungsvolle Ergebnisse.",
    statProjects: "Eigenständig vorangetriebene Engineering- und Technikprojekte",
    statRanking: "Formula Student Weltrangliste 2026",
    statRankingDenominator: "/400+ Teams",
    statStiffness: "Steigerung der Torsionssteifigkeit des Chassis",
    statWing: "Gewichtsreduktion des Heckflügels",
    statLinkTitle: "Das Projekt hinter diesem Ergebnis ansehen",
    location: "Aachen, Deutschland",

    showcaseCounter: (c, t) => `${c} / ${t} Projekte`,
    previousProject: "Vorheriges Projekt",
    nextProject: "Nächstes Projekt",
    viewProject: (title) => `Projekt ${title} ansehen`,

    engineeringProjects: "Engineering-Projekte",
    entries: (n) => `${n} Einträge`,
    projectCounter: (c, t) => `Projekt ${c} / ${t}`,
    endOfIndex: (n) => `Ende der Übersicht. ${n} Projekte gezeigt`,
    backToTop: "Nach oben",
    moreDetails: "Mehr Details",
    expandImageFor: (title) => `Bild zu ${title} vergrößern`,
    viewDetailsFor: (title) => `Details zu ${title} ansehen`,
    goTo: (title) => `Zu ${title} springen`,
    emailAria: "Aurélien Pons eine E-Mail schreiben",
    linkedinAria: "LinkedIn-Profil",
    footerRole: "Maschinenbau",

    backToIndex: "Zurück zur Übersicht",
    viewPdf: "Vollständige Engineering-Dokumentation ansehen (PDF)",
    sectionWhat: "Was",
    sectionHow: "Wie",
    sectionResult: "Ergebnis",
    technicalSpecification: "Technische Daten",
    skills: "Kompetenzen",
    moreEngineeringProjects: "Weitere Engineering-Projekte",
    scroll: "Scrollen",
    previewImage: (i) => `Bild ${i} ansehen`,
    thumbnailAlt: (title, i) => `${title} – Vorschaubild ${i}`,
    expandMainImage: "Hauptbild vergrößern",

    explorePortfolio: "Portfolio entdecken",
    scrollToProjects: "Zu den Engineering-Projekten scrollen",

    language: "Sprache",

    filterBySkill: "Nach Kompetenz filtern",
    clearFilters: "Filter zurücksetzen",
    sortedByRelevance: "Nach Relevanz sortiert",
    introLens: (names, body) => `Sie sehen Auréliens Portfolio gefiltert nach ${names}. ${body}`,
    introLensMulti: (names, clauses) => `Sie sehen Auréliens Portfolio gefiltert nach ${names}: ${clauses}.`,
    filterNote: "Nichts wird ausgeblendet – die Projekte werden nur neu sortiert.",
    listAnd: "und",

    feedbackTrigger: "Über Feedback würde ich mich sehr freuen",
    feedbackTitle: "Feedback hinterlassen & vernetzen",
    feedbackSubtitle:
      "Jedes Feedback ist willkommen – Eindrücke zum Portfolio, Projektvorschläge oder einfach der Wunsch, sich auszutauschen.",
    feedbackDismissAria: "Feedback schließen",
    feedbackQuickReason: "Kurzer Anlass",
    feedbackReasons: {
      chat: "💼 Austausch / Stellen",
      portfolio: "💡 Portfolio-Feedback",
      hi: "👋 Einfach Hallo",
      other: "⚙️ Sonstiges",
    },
    feedbackOtherPlaceholder: "Nennen Sie mir Ihren Anlass",
    feedbackOtherAria: "Ihr Anlass",
    feedbackWhoAreYou: "Wer sind Sie?",
    feedbackRoles: {
      recruiter: "Recruiter / Personalverantwortliche:r",
      peer: "Kolleg:in aus dem Engineering",
      industry: "Fachkraft aus der Industrie",
      other: "Sonstiges",
    },
    feedbackIdentityLabel: "Ihr Name, E-Mail oder LinkedIn",
    feedbackIdentityPlaceholder: "z. B. Aurelien Pons · aurelien.pons@example.com oder LinkedIn-URL",
    feedbackIdentityHint: "Hinterlassen Sie Ihre Kontaktdaten, damit ich mich bedanken oder melden kann.",
    feedbackMessageLabel: "Ihr Feedback",
    feedbackMessagePlaceholder: "Was gut funktioniert hat, was nicht, was Sie ändern würden...",
    feedbackError: "Das hat nicht geklappt. Ihr Feedback ist noch da, Sie können es erneut versuchen.",
    feedbackDismiss: "Schließen",
    feedbackSubmit: "Feedback senden 🏁",
    feedbackSending: "Wird gesendet...",
    feedbackThanksTitle: "DANKE FÜR IHR FEEDBACK.",
    feedbackThanksBody: "Ihre Rückmeldung hilft mir, mich stetig zu verbessern.",
    feedbackReturn: "Zurück zur Seite",
  },

  nl: {
    heroTitle: "ePortfolio van Aurélien Pons",
    heroIntro:
      "Laatstejaarsstudent werktuigbouwkunde die bij Formula Student de volledige cyclus van ontwerp, analyse en validatie heeft doorlopen. Ik ontwierp een chassisgeometrie in Siemens NX en bracht alle subsystemen samen in één package, valideerde constructies met FEA in Altair HyperMesh en bracht onderdelen van de basiseisen tot **gefabriceerde** koolstofvezelassemblages. Ik nam **verantwoordelijkheid** voor subsystemen van begin tot eind, met transparantie en een degelijk engineeringproces, van **prototypen** en **testen** tot productie in eigen huis of uitbesteed. **Learning by doing** ligt mij, en als student vind ik het belangrijk om van anderen te leren en feedback mee te nemen.",
    heroClosing:
      "Gemotiveerde ingenieur die graag echte technische uitdagingen aangaat bij gevestigde bedrijven. Gericht op continu **leren**, **groeien** door **open te staan voor feedback** en resultaten die ertoe doen.",
    statProjects: "Zelfstandig opgezette engineering- en techniekprojecten",
    statRanking: "Formula Student wereldranglijst 2026",
    statRankingDenominator: "/400+ teams",
    statStiffness: "Toename torsiestijfheid chassis",
    statWing: "Gewichtsreductie achtervleugel",
    statLinkTitle: "Bekijk het project achter dit resultaat",
    location: "Aken, Duitsland",

    showcaseCounter: (c, t) => `${c} / ${t} projecten`,
    previousProject: "Vorig project",
    nextProject: "Volgend project",
    viewProject: (title) => `Project ${title} bekijken`,

    engineeringProjects: "Engineeringprojecten",
    entries: (n) => `${n} projecten`,
    projectCounter: (c, t) => `Project ${c} / ${t}`,
    endOfIndex: (n) => `Einde van het overzicht. ${n} projecten getoond`,
    backToTop: "Terug naar boven",
    moreDetails: "Meer details",
    expandImageFor: (title) => `Afbeelding van ${title} vergroten`,
    viewDetailsFor: (title) => `Details van ${title} bekijken`,
    goTo: (title) => `Ga naar ${title}`,
    emailAria: "E-mail Aurélien Pons",
    linkedinAria: "LinkedIn-profiel",
    footerRole: "Werktuigbouwkunde",

    backToIndex: "Terug naar overzicht",
    viewPdf: "Volledig engineeringproces bekijken (pdf)",
    sectionWhat: "Wat",
    sectionHow: "Hoe",
    sectionResult: "Resultaat",
    technicalSpecification: "Technische specificaties",
    skills: "Vaardigheden",
    moreEngineeringProjects: "Meer engineeringprojecten",
    scroll: "Scrollen",
    previewImage: (i) => `Afbeelding ${i} bekijken`,
    thumbnailAlt: (title, i) => `${title} – miniatuur ${i}`,
    expandMainImage: "Hoofdafbeelding vergroten",

    explorePortfolio: "Portfolio verkennen",
    scrollToProjects: "Scroll naar de engineeringprojecten",

    language: "Taal",

    filterBySkill: "Filteren op vaardigheid",
    clearFilters: "Filters wissen",
    sortedByRelevance: "Gesorteerd op relevantie",
    introLens: (names, body) => `Je bekijkt Auréliens portfolio gefilterd op ${names}. ${body}`,
    introLensMulti: (names, clauses) => `Je bekijkt Auréliens portfolio gefilterd op ${names}: ${clauses}.`,
    filterNote: "Niets wordt verborgen — projecten worden alleen opnieuw gesorteerd.",
    listAnd: "en",

    feedbackTrigger: "Feedback wordt zeer gewaardeerd",
    feedbackTitle: "Deel je gedachten & maak contact",
    feedbackSubtitle:
      "Alle feedback is welkom: gedachten over het portfolio, projectsuggesties of gewoon even contact leggen.",
    feedbackDismissAria: "Feedback sluiten",
    feedbackQuickReason: "Korte reden",
    feedbackReasons: {
      chat: "💼 Gesprek / Vacatures",
      portfolio: "💡 Portfolio-feedback",
      hi: "👋 Even hallo",
      other: "⚙️ Anders",
    },
    feedbackOtherPlaceholder: "Vertel me je reden",
    feedbackOtherAria: "Je reden",
    feedbackWhoAreYou: "Wie ben je?",
    feedbackRoles: {
      recruiter: "Recruiter / Hiring manager",
      peer: "Collega-ingenieur",
      industry: "Professional uit de industrie",
      other: "Anders",
    },
    feedbackIdentityLabel: "Je naam, e-mail of LinkedIn",
    feedbackIdentityPlaceholder: "bijv. Aurelien Pons · aurelien.pons@example.com of LinkedIn-URL",
    feedbackIdentityHint: "Laat je gegevens achter zodat ik je kan bedanken of contact kan opnemen.",
    feedbackMessageLabel: "Je feedback",
    feedbackMessagePlaceholder: "Wat werkte, wat niet, wat je zou veranderen...",
    feedbackError: "Dat is niet gelukt. Je feedback staat er nog, dus je kunt het opnieuw proberen.",
    feedbackDismiss: "Sluiten",
    feedbackSubmit: "Feedback versturen 🏁",
    feedbackSending: "Versturen...",
    feedbackThanksTitle: "BEDANKT VOOR JE FEEDBACK.",
    feedbackThanksBody: "Jouw input helpt me om continu beter te worden.",
    feedbackReturn: "Terug naar de site",
  },
};
