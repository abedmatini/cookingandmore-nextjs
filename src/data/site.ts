export type PageRecord = {
  path: string;
  title: string;
  eyebrow?: string;
  description?: string;
  body?: string[];
  image?: string;
  kind?: "company" | "post" | "archive" | "demo";
};

export const companyPages: PageRecord[] = [
  {
    path: "/business/",
    title: "Business",
    eyebrow: "Catering für Unternehmen",
    description: "Willkommen bei Cooking and More – Ihr Partner für erstklassige kulinarische Erlebnisse",
    body: [
      "Bei Cooking and More wissen wir, dass erfolgreiche Geschäftsbeziehungen oft bei einem gemeinsamen Essen entstehen. Ob Meetings, Konferenzen, Firmenfeiern oder andere Anlässe – wir bieten Ihnen maßgeschneiderte kulinarische Lösungen, die genau auf Ihre Anforderungen und die Ihrer Gäste abgestimmt sind.",
      "Unser erfahrenes Team aus talentierten Köchen und professionellen Eventplanern sorgt dafür, dass jedes Detail perfekt ist. Wir verwenden nur die frischesten Zutaten und kreieren Menüs, die sowohl geschmacklich als auch visuell beeindrucken. Von exquisiten Fingerfoods bis hin zu mehrgängigen Menüs – wir bieten eine Vielfalt an Optionen, die Ihre Veranstaltung unvergesslich machen.",
      "Lassen Sie sich von unserer Leidenschaft für exzellentes Essen und herausragenden Service begeistern. Mit Cooking and More wird Ihr Event zu einem kulinarischen Highlight, das Ihre Gäste noch lange in Erinnerung behalten werden.",
    ],
    image: "/media/interior-hero.jpg",
    kind: "company",
  },
  {
    path: "/privat/",
    title: "Privat",
    eyebrow: "Catering für besondere Momente",
    description: "Ihr Event. Ihre Wünsche. Unser Anspruch.",
    body: [
      "Willkommen bei Cooking and More, Ihrem erstklassigen Catering Anbieter. Wir machen jedes Event zu einem unvergesslichen Erlebnis. Egal, ob Sie ein intimes Dinner, eine Jubiläum oder eine Hochzeit planen – unsere erfahrenen Köche und unser engagiertes Team stehen bereit, um Ihnen erstklassigen Service und exquisite Küche nach Ihren Wünschen zu bieten.",
      "Individuelle Menüs: Bei Cooking and More verstehen wir, dass jede Veranstaltung einzigartig ist. Unsere Köche arbeiten eng mit Ihnen zusammen, um personalisierte Menüs zu erstellen, die Ihre Geschmäcker und Vorlieben widerspiegeln.",
      "Hochwertige Zutaten: Wir verwenden nur die besten und frischesten Zutaten. Unser Engagement für Qualität stellt sicher, dass Ihr Event zu einem kulinarischen Erfolg wird.",
      "Professioneller Service: Unser Team kümmert sich um jedes Detail mit Präzision und Sorgfalt, sodass Sie sich entspannen und Ihr Event in vollen Zügen genießen können.",
    ],
    image: "/media/interior-hero.jpg",
    kind: "company",
  },
  {
    path: "/locations/",
    title: "Unsere Locations",
    eyebrow: "Raum für große Ideen",
    description: "Außergewöhnliche Orte für unvergessliche Events",
    body: [
      "Erleben Sie erstklassiges Catering und unvergessliche Events mit Cooking and More. Wir bieten Ihnen nicht nur kulinarische Meisterwerke, sondern auch die perfekte Location für Ihre Veranstaltungen.",
      "Egal, ob Hochzeit, Firmenfeier oder privater Anlass – wir haben die passende Umgebung für jeden Anlass. Unsere exklusiven Locations bieten Ihnen vielseitige Möglichkeiten, Ihre Feier ganz nach Ihren Wünschen zu gestalten.",
    ],
    image: "/media/interior-hero.jpg",
    kind: "company",
  },
  {
    path: "/about-us-2/",
    title: "Nachhaltigkeitskonzept",
    eyebrow: "Genuss mit Verantwortung",
    description: "Unser Weg zu mehr Nachhaltigkeit",
    body: [
      "Als modernes Cateringunternehmen mit Herz für gutes Essen und unsere Umwelt ist Nachhaltigkeit für Cooking and More kein Trend, sondern ein fester Bestandteil unserer Unternehmensphilosophie.",
      "Wir beziehen unsere Lebensmittel bevorzugt von regionalen Erzeugern und langjährigen Partnern aus der Umgebung Kölns. Saisonale Produkte stehen bei uns im Fokus – weil sie nicht nur besser schmecken, sondern auch nachhaltiger sind.",
      "Bei unserer Küchenausstattung setzen wir auf energieeffiziente Geräte und einen verantwortungsvollen Umgang mit Wasser und Energie. Unsere Verpackungen sind überwiegend kompostierbar oder aus recyceltem Material.",
      "Nachhaltigkeit bedeutet für uns auch faire Arbeitsbedingungen, Aus- und Weiterbildung sowie eine offene, wertschätzende Unternehmenskultur. Für uns ist Nachhaltigkeit ein Prozess. Wir arbeiten stetig daran, besser zu werden.",
    ],
    image: "/media/dock2.jpg",
    kind: "company",
  },
  {
    path: "/about-us/",
    title: "Über uns",
    eyebrow: "Cooking and More",
    description: "Catering mit Leidenschaft, Qualität und kreativen Ideen",
    body: [
      "Bei Cooking and More stehen Qualität, Kreativität und die persönliche Betreuung unserer Kunden im Mittelpunkt. Wir entwickeln individuelle kulinarische Konzepte, die zu Ihrem Anlass, Ihren Gästen und Ihrer Location passen.",
      "Unsere Mission ist es, aus jeder Veranstaltung ein besonderes Erlebnis zu machen. Unser Team verbindet professionelles Eventhandwerk mit Freude an gutem Essen und aufmerksamem Service.",
      "Qualität und Frische prägen unsere Küche. Sorgfältig ausgewählte Zutaten, verlässliche Partner und eine präzise Planung bilden die Grundlage jedes Caterings.",
      "Mit unseren außergewöhnlichen Locations und unserem erfahrenen Team begleiten wir Hochzeiten, private Feiern, Firmenveranstaltungen, Galas und Produktionen in Köln und Umgebung.",
    ],
    image: "/media/about-original.png",
    kind: "company",
  },
];

export const posts: PageRecord[] = [
  {
    path: "/doc2/", title: "DOCK2", description: "Moderne Architektur. Vielseitige Möglichkeiten.",
    body: ["Das DOCK2 besticht durch seine moderne Architektur und vielseitigen Nutzungsmöglichkeiten. Mit großzügigen Räumlichkeiten und erstklassiger Ausstattung ist es die ideale Wahl für größere Events und Firmenfeiern.", "Die flexible Raumgestaltung ermöglicht es, die Location perfekt an Ihre Bedürfnisse anzupassen."],
    image: "/media/dock2.jpg", kind: "post",
  },
  {
    path: "/lokschuppen/", title: "Lokschuppen", description: "Ein Veranstaltungsraum mit Charakter für bis zu 150 Personen",
    body: ["Der Lokschuppen Köln verbindet industriellen Charme mit moderner Eventkultur. Hohe Decken, offene Strukturen und eine besondere Atmosphäre machen diese Location zu einem Ort, der Eindruck hinterlässt.", "Mit Platz für bis zu 150 Gäste bietet der Lokschuppen den perfekten Rahmen für Hochzeiten, Businessevents, Tagungen, Workshops oder exklusive Abendveranstaltungen.", "Als erfahrener Caterer sorgt Cooking and More für kulinarische Erlebnisse auf höchstem Niveau. Regional. Nachhaltig. Hochwertig. Professionell umgesetzt."],
    image: "/media/lokschuppen.jpeg", kind: "post",
  },
  {
    path: "/goldenerpflug/", title: "Goldener Pflug", description: "Traditionsreiche Location mitten in Köln",
    body: ["Goldener Pflug – eine traditionsreiche Location mitten in Köln, die den Charme des Rheinlandes mit modernem Komfort verbindet.", "Ob Firmenveranstaltungen, Hochzeiten oder private Feiern, der Goldene Pflug bietet den perfekten Rahmen für unvergessliche Events in gemütlicher und stilvoller Atmosphäre."],
    image: "/media/goldener-pflug.webp", kind: "post",
  },
  {
    path: "/alte-giesserei/", title: "Alte Giesserei", description: "Ein Ort mit Geschichte, Charakter und kulinarischem Anspruch",
    body: ["In der Alten Giesserei Köln trifft industrieller Charme auf moderne Eventkultur. Die beeindruckende Backsteinarchitektur, hohe Decken und das authentische Industrieambiente schaffen den perfekten Rahmen für besondere Anlässe.", "Cooking and More ist Hauscaterer der Alten Giesserei und sorgt für das kulinarische Konzept, das zum Anlass und zur Atmosphäre passt."],
    image: "/media/alte-giesserei.jpg", kind: "post",
  },
  {
    path: "/hochzeitscaterig/", title: "Hochzeitscatering", description: "Ihr Hochzeitstag – perfekt bis ins kleinste Detail",
    body: ["Ihr Hochzeitstag ist ein einmaliges Ereignis, das perfekt sein sollte – bis ins kleinste Detail. Bei Cooking and More verstehen wir die Bedeutung dieses besonderen Tages und bieten Ihnen erstklassiges Hochzeitscatering.", "Unsere Köche arbeiten eng mit Ihnen zusammen, um maßgeschneiderte Menüs zu erstellen, die Ihre persönlichen Vorlieben und die besonderen Wünsche Ihrer Gäste berücksichtigen."],
    image: "/media/hochzeit.jpeg", kind: "post",
  },
  {
    path: "/hafen12/", title: "Hafen 12", description: "Exklusive Eventlocation direkt am Puls des Kölner Hafens",
    body: ["Willkommen in unserer exklusiven Eventlocation Hafen 12 – direkt am Puls des Kölner Hafens! Diese einzigartige Location bietet nicht nur einen beeindruckenden Blick auf das Wasser, sondern auch eine stilvolle Atmosphäre für verschiedenste Anlässe.", "Mit großzügigen Räumlichkeiten, flexibler Bestuhlung und modernster Veranstaltungstechnik ist Hafen 12 die perfekte Wahl für Events mit bis zu 300 Gästen."],
    image: "/media/hafen12.jpg", kind: "post",
  },
  {
    path: "/feiern-sie-ihre-weihnachtsfeier-mit-dem-business-catering-von-cooking-and-more/", title: "Weihnachtsfeier", description: "Festliche Erlebnisse für Mitarbeiter und Geschäftspartner",
    body: ["Mit unserem spezialisierten Business Catering für Weihnachtsfeiern bieten wir Ihnen maßgeschneiderte kulinarische Erlebnisse, die Ihre Mitarbeiter und Geschäftspartner begeistern werden.", "Von traditionellen Weihnachtsgerichten bis hin zu innovativen, modernen Kreationen – wir verwenden nur die besten Zutaten."],
    image: "/media/weihnachten.jpg", kind: "post",
  },
  {
    path: "/zur-gemutlichen-ekce-2/", title: "Zur gemütlichen Ecke", description: "Intime und behagliche Atmosphäre",
    body: ["Für eine intime und behagliche Atmosphäre sorgt unsere Location Zur Gemütlichen Ecke. Diese charmante Kneipe im bergischen Land eignet sich perfekt für kleinere Feiern und private Anlässe.", "Genießen Sie die warme und einladende Atmosphäre, während wir Ihnen kulinarische Köstlichkeiten servieren."],
    image: "/media/ecke.jpg", kind: "post",
  },
  {
    path: "/zur-gemutlichen-ekce/", title: "Zur gemütlichen Ecke", description: "Intime und behagliche Atmosphäre",
    body: ["Für eine intime und behagliche Atmosphäre sorgt unsere Location Zur Gemütlichen Ecke. Diese charmante Kneipe im bergischen Land eignet sich perfekt für kleinere Feiern und private Anlässe.", "Genießen Sie die warme und einladende Atmosphäre, während wir Ihnen kulinarische Köstlichkeiten servieren."],
    image: "/media/ecke.jpg", kind: "post",
  },
  {
    path: "/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/", title: "Crew Catering", description: "Messe- und Crewcatering für produktive Veranstaltungstage",
    body: ["Willkommen bei Cooking and More, Ihrem Experten für erstklassiges Business Catering! Bei der Planung einer Messe oder eines großen Crew Events ist es entscheidend, für das leibliche Wohl Ihrer Gäste und Mitarbeiter zu sorgen.", "Wir kreieren flexible und vielseitige Menüs, die sowohl in puncto Geschmack als auch in Bezug auf Präsentation überzeugen. Ob abwechslungsreiches Buffet, handliche Fingerfoods oder gesunde Snacks – wir stellen sicher, dass Ihre Gäste und Mitarbeiter rundum zufrieden sind.", "Unser reibungsloser Service fügt sich nahtlos in den Ablauf Ihrer Veranstaltung ein."],
    image: "/media/crew.jpg", kind: "post",
  },
  {
    path: "/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/", title: "Gala Event", description: "Exklusives Business Catering für elegante Abende",
    body: ["Wenn es darum geht, ein Gala Event zu planen, wissen wir, wie wichtig es ist, jedes Detail perfekt zu gestalten. Unsere maßgeschneiderten Catering-Lösungen sorgen dafür, dass Ihre Veranstaltung zu einem eleganten und unvergesslichen Erlebnis wird.", "Von exquisiten Vorspeisen über raffinierte Hauptgerichte bis hin zu verführerischen Desserts – jedes Gericht wird mit höchster Präzision und den besten Zutaten zubereitet.", "Unsere professionellen Servicekräfte sorgen für einen reibungslosen Ablauf, während Sie und Ihre Gäste den Abend in vollen Zügen genießen können."],
    image: "/media/gala.jpg", kind: "post",
  },
  {
    path: "/entdecken-sie-business-catering-streetfood/", title: "Foodtrucks", description: "Mobile Küchen für kulinarische Geschäftsevents",
    body: ["Unsere Foodtrucks bringen frischen Wind in Ihre Geschäftsevents und verwandeln Meetings, Firmenfeiern und Konferenzen in kulinarische Erlebnisse der Extraklasse.", "Von saftigen Gourmet-Burgern und knackigen Salaten bis hin zu raffinierten Desserts – unsere Menüs sind so vielseitig wie Ihre Anforderungen.", "Unsere mobilen Küchen sind flexibel und können an nahezu jedem Ort eingesetzt werden."],
    image: "/media/foodtruck.jpg", kind: "post",
  },
  {
    path: "/e-palladium/", title: "Palladium", description: "Elegante Location für exklusive Veranstaltungen",
    body: ["Das Palladium ist eine elegante und stilvolle Location, die sich hervorragend für exklusive Veranstaltungen eignet. Die edle Ausstattung und das luxuriöse Ambiente schaffen eine unvergessliche Atmosphäre für Hochzeiten, Jubiläen und andere festliche Anlässe."],
    image: "/media/palladium.jpg", kind: "post",
  },
  {
    path: "/e-werk/", title: "E-Werk", description: "Historischer Industriecharme trifft modernen Komfort",
    body: ["Das historische E-Werk verbindet industriellen Charme mit modernem Komfort. Diese einzigartige Location bietet eine beeindruckende Kulisse für Hochzeiten, Galas und andere besondere Anlässe.", "Mit seiner großzügigen Fläche und vielseitigen Gestaltungsmöglichkeiten lässt das E-Werk keine Wünsche offen."],
    image: "/media/ewerk.jpg", kind: "post",
  },
  {
    path: "/junilaumscatering/", title: "Jubiläumscatering", description: "Ein besonderer Tag – perfekt bis ins kleinste Detail",
    body: ["Ganz gleich welches Jubiläum Sie feiern wollen, es sollte perfekt sein – bis ins kleinste Detail. Bei Cooking and More verstehen wir die Bedeutung dieses besonderen Tages und bieten Ihnen erstklassiges Catering.", "Unsere Köche arbeiten eng mit Ihnen zusammen, um maßgeschneiderte Menüs zu erstellen, die Ihre persönlichen Vorlieben und die besonderen Wünsche Ihrer Gäste berücksichtigen.", "Unser professionelles Team kümmert sich um jeden Aspekt, von der Planung bis zur Durchführung."],
    image: "/media/jubilaeum.jpg", kind: "post",
  },
  {
    path: "/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/", title: "Sommerfest", description: "Unvergessliches Business Catering für die warme Jahreszeit",
    body: ["Wenn die Sonne scheint und die Tage länger werden, ist es die perfekte Zeit, Ihr Sommerfest zu planen. Mit unserem maßgeschneiderten Business Catering sorgen wir dafür, dass Ihre Veranstaltung kulinarisch und atmosphärisch ein voller Erfolg wird.", "Von saftigen Grillgerichten und leichten Salaten bis hin zu erfrischenden Desserts und exotischen Cocktails – unsere Menüs sind so vielfältig und bunt wie der Sommer selbst.", "Unsere flexiblen Catering-Lösungen passen sich Ihren Wünschen und dem Veranstaltungsort an."],
    image: "/media/sommerfest.jpg", kind: "post",
  },
];

const inventoryPaths = [
  "/kontakt/","/datenschutzerklarung/","/impressum/","/about-us/","/te/","/our-services/","/menu-parallax/","/menu-grid/","/shop/","/sample-page/","/our-chefs/","/menu-grid-image/","/menu-classic/","/menu-mixed/","/shop-2/",
  "/zur-gemutlichen-ekce-2/","/perfektes-business-catering-fur-messen-und-crew-events-mit-cooking-and-more/","/verleihen-sie-ihrem-gala-event-glanz-mit-dem-business-catering-von-cooking-and-more/","/entdecken-sie-business-catering-streetfood/","/e-palladium/","/e-werk/","/junilaumscatering/","/streetfooentdecken-sie-business-catering-streetfood/","/feiern-sie-ihre-sommerfest-mit-dem-business-catering-von-cooking-and-more/","/secret-of-making-smoked-pork/","/recipe-is-important-part-of-cooking/",
  ...["uncategorized","cooking","modern-fusion","streetfood","foodtrucks","weihnachtsfeier","sommerfest","gala","messe-crewcatering","hochzeit","jubilaum","doc2","e-werk","e-palladium","zur-gemutlichen-ekce","goldener-pflug","alte-giesserei"].map(x=>`/category/${x}/`),
  ...["cooking","cuisine","dinning","recipe","restaurant"].map(x=>`/tag/${x}/`),
  "/galleries/home-4-gallery/",
  ...["baked-potato-pizza","imported-salmon-steak","crab-with-curry-sources","salted-fried-chicken","roast-pork-4-sticks","tuna-roast-potatoes-source","fried-potatoes-with-garlic","italian-source-mushroom","fried-chicken-salad","grilled-salmon-sushi","fresh-crab-with-lemon-source","spicy-crab-ramen","pork-with-italian-salsa-verde","lamb-beef-kofka-skewers-with-tzatziki","bacon-wrapped-shrimp-with-smoked-paprika-garlic","lemon-and-garlic-green-beans","roasted-red-potatoes-with-rosemary-shallots-butter","black-bean-sweet-potato-quinoa-meatlessloaf","wild-mushroom-bucatini-with-kale","prawn-sausage-cassoulet","meatloaf-with-black-pepper-honey-bbq-sauce","grilled-hanger-steak-with-harissa-and-pickled-red-onions","braised-chicken-breast-with-white-wine-and-shallots","apple-smoked-chicken-with-white-bbq-sauce","lemon-rosemary-chicken","grilled-pork-shoulder-with-preserved-lemons","pork-tenderloin-marinated-in-yogurt","oysters-grill-5-pieces"].map(x=>`/menus/${x}/`),
  ...["extra-corporate","corporate","business","standard"].map(x=>`/pricing/${x}/`),
  ...["mark-bennett","oliver-doe","christina-hardy"].map(x=>`/team/${x}/`),
  ...["jessica-lee","jane-bennett","christina-hardy","mark-anthony"].map(x=>`/testimonials/${x}/`),
];

const titleFromPath = (path: string) => {
  const slug = path.split("/").filter(Boolean).at(-1) ?? "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

export const inventoryPages: PageRecord[] = inventoryPaths.map(path => ({
  path,
  title: titleFromPath(path),
  description: path.startsWith("/category/") ? "Beiträge aus dieser Kategorie" : path.startsWith("/tag/") ? "Beiträge zu diesem Schlagwort" : "Aus dem Cooking and More Archiv",
  kind: path.startsWith("/category/") || path.startsWith("/tag/") ? "archive" : "demo",
}));

export const allPages = [...companyPages, ...posts, ...inventoryPages].filter(
  (page, index, pages) => pages.findIndex(candidate => candidate.path === page.path) === index,
);

export const getPage = (path: string) => allPages.find(page => page.path === path);

export const locations = posts.filter(post => ["/doc2/","/lokschuppen/","/goldenerpflug/","/alte-giesserei/","/hafen12/","/zur-gemutlichen-ekce-2/","/e-palladium/","/e-werk/"].includes(post.path));

export const navigation = [
  { label: "Business", href: "/business/" },
  { label: "Privat", href: "/privat/" },
  { label: "Locations", href: "/locations/" },
  { label: "Nachhaltigkeit", href: "/about-us-2/" },
  { label: "Kontakt", href: "/kontakt/" },
];
