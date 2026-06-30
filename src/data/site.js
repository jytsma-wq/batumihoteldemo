export const SITE_URL = "https://jytsma-wq.github.io/batumihoteldemo";

export const locales = [
  { code: "en", label: "English", nativeName: "English", htmlLang: "en", dir: "ltr" },
  { code: "ru", label: "Russian", nativeName: "Русский", htmlLang: "ru", dir: "ltr" },
  { code: "ka", label: "Georgian", nativeName: "ქართული", htmlLang: "ka", dir: "ltr" },
  { code: "tr", label: "Turkish", nativeName: "Türkçe", htmlLang: "tr", dir: "ltr" },
  { code: "he", label: "Hebrew", nativeName: "עברית", htmlLang: "he", dir: "rtl" },
  { code: "ar", label: "Arabic", nativeName: "العربية", htmlLang: "ar", dir: "rtl" }
];

export const defaultLocale = "en";

export const photo = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const areaMap = {
  "old-batumi": "Old Batumi",
  boulevard: "Boulevard",
  "new-boulevard": "New Boulevard",
  "airport-area": "Airport Area",
  makhinjauri: "Makhinjauri",
  "green-cape": "Green Cape",
  gonio: "Gonio",
  kvariati: "Kvariati"
};

export const areaNames = Object.fromEntries(Object.entries(areaMap).map(([slug, name]) => [name, slug]));

export const areas = [
  {
    slug: "old-batumi",
    name: "Old Batumi",
    title: "Where to stay in Old Batumi",
    image: photo("photo-1566073771259-6a8506099945"),
    coordinates: { lat: 41.6506, lng: 41.6361 },
    description:
      "Historic streets, restored facades, small cafes and evening walks toward the boulevard. Best for first-time visitors who want atmosphere and walkability.",
    bestFor: ["First-time visitors", "Cafe streets", "Walkable stays", "Couples"],
    goodToKnow: [
      "Parking is harder in high season.",
      "Ask for a back-facing room if street noise matters.",
      "Most beach walks are easy, but crossings can add a few minutes."
    ],
    beachAccess: "10-18 minutes on foot depending on the street.",
    transport: "Easy taxis and buses; most central sights are walkable.",
    noiseLevel: "Medium. Quiet side streets exist, but cafe streets can be lively.",
    parking: "Limited street parking; ask the property before arrival.",
    hotelCount: 18,
    faqs: [
      {
        question: "Is Old Batumi good for a first stay?",
        answer: "Yes. It is the easiest area for cafes, old streets, the boulevard and short sightseeing walks."
      },
      {
        question: "Is Old Batumi quiet at night?",
        answer: "Some streets are quiet, but central cafe streets can be lively in summer. Ask for a back-facing room."
      }
    ]
  },
  {
    slug: "boulevard",
    name: "Boulevard",
    title: "Small hotels near Batumi Boulevard",
    image: photo("photo-1520250497591-112f2f40a3f4"),
    coordinates: { lat: 41.6431, lng: 41.6235 },
    description:
      "The classic seaside strip with parks, beach cafes and quick access to the promenade. Good for travellers who want the sea close without leaving the city.",
    bestFor: ["Beach walks", "Families", "Short stays", "Central access"],
    goodToKnow: [
      "The boulevard is lively in summer evenings.",
      "Rooms one or two streets back can feel calmer.",
      "Beach access is simple, but traffic crossings vary by block."
    ],
    beachAccess: "Usually 3-10 minutes on foot.",
    transport: "Very easy taxi access and practical bus connections.",
    noiseLevel: "Medium to lively near cafes and summer attractions.",
    parking: "Possible but inconsistent; confirm parking if arriving by car.",
    hotelCount: 24,
    faqs: [
      {
        question: "Is Boulevard best for beach access?",
        answer: "It is one of the easiest choices for beach walks, promenade access and central Batumi."
      },
      {
        question: "Is it good for families?",
        answer: "Yes. Parks, the dolphinarium area and beach walks make it practical for families."
      }
    ]
  },
  {
    slug: "new-boulevard",
    name: "New Boulevard",
    title: "Where to stay near New Boulevard, Batumi",
    image: photo("photo-1564501049412-61c2a3083791"),
    coordinates: { lat: 41.6166, lng: 41.6086 },
    description:
      "Modern apartment-style stays, sea-view rooms and longer-stay options south of the old center. Better for space, elevators and newer buildings.",
    bestFor: ["Sea-view rooms", "Longer stays", "Modern apartments", "Families needing space"],
    goodToKnow: [
      "It is less historic than Old Batumi.",
      "Taxis are useful for Old Batumi evenings.",
      "Check whether the view is a direct sea view or side sea view."
    ],
    beachAccess: "5-12 minutes on foot for many buildings.",
    transport: "Good taxi access; bus routes run along main roads.",
    noiseLevel: "Low to medium, depending on road-facing rooms.",
    parking: "Generally easier than Old Batumi, but still confirm in summer.",
    hotelCount: 31,
    faqs: [
      {
        question: "Is New Boulevard good for long stays?",
        answer: "Yes. Apartment-style rooms and newer buildings make it practical for longer Batumi trips."
      },
      {
        question: "Is New Boulevard close to Old Batumi?",
        answer: "It is a short taxi ride rather than a quick walk for most guests."
      }
    ]
  },
  {
    slug: "airport-area",
    name: "Airport Area",
    title: "Where to stay near Batumi Airport",
    image: photo("photo-1600210492486-724fe5c67fb0"),
    coordinates: { lat: 41.6109, lng: 41.5993 },
    description:
      "Practical short-stay area for early flights, late arrivals and guests who need parking or quick road access more than nightlife.",
    bestFor: ["Early flights", "Late arrivals", "Parking", "Short stopovers"],
    goodToKnow: [
      "It is not the most atmospheric part of Batumi.",
      "Choose it for convenience rather than old-town character.",
      "Check transfer timing if arriving late."
    ],
    beachAccess: "Often 10-20 minutes, depending on exact address.",
    transport: "Fast airport access; taxis are the easiest option.",
    noiseLevel: "Medium near roads; ask about room orientation.",
    parking: "Usually easier than central Batumi.",
    hotelCount: 12,
    faqs: [
      {
        question: "Is the airport area good for one night?",
        answer: "Yes. It is practical for late arrivals, early departures and car-based trips."
      },
      {
        question: "Should I stay here for sightseeing?",
        answer: "Most travellers prefer Old Batumi, Boulevard or New Boulevard for sightseeing."
      }
    ]
  },
  {
    slug: "makhinjauri",
    name: "Makhinjauri",
    title: "Small guesthouses in Makhinjauri",
    image: photo("photo-1600585154340-be6161a56a0c"),
    coordinates: { lat: 41.6816, lng: 41.698 },
    description:
      "A greener, quieter edge of Batumi with practical guesthouses and access toward the botanical garden and northern beaches.",
    bestFor: ["Green surroundings", "Simple guesthouses", "Botanical garden visits", "Car trips"],
    goodToKnow: [
      "Central Batumi needs a taxi, bus or train connection.",
      "Some houses sit on slopes.",
      "Ask about exact access if travelling with heavy bags."
    ],
    beachAccess: "Usually 8-18 minutes on foot.",
    transport: "Bus, taxi and train links are useful; car access is convenient.",
    noiseLevel: "Low to medium.",
    parking: "Often easier than the center.",
    hotelCount: 9,
    faqs: [
      {
        question: "Is Makhinjauri quiet?",
        answer: "It is generally calmer than central Batumi, especially away from the main road."
      },
      {
        question: "Is it good without a car?",
        answer: "Possible, but taxis or local transport will be part of most city trips."
      }
    ]
  },
  {
    slug: "green-cape",
    name: "Green Cape",
    title: "Garden stays near Green Cape",
    image: photo("photo-1500530855697-b586d89ba3ee"),
    coordinates: { lat: 41.695, lng: 41.7063 },
    description:
      "A nature-focused area near the botanical garden, better for slow stays, greenery and guests who do not need the city at the door.",
    bestFor: ["Nature", "Garden stays", "Quiet mornings", "Botanical garden"],
    goodToKnow: [
      "Restaurants and nightlife are limited compared with Batumi.",
      "The terrain can be hilly.",
      "Confirm taxi access and exact beach route."
    ],
    beachAccess: "Often 10-20 minutes with slopes in some places.",
    transport: "Best with taxi or car for flexible movement.",
    noiseLevel: "Low.",
    parking: "Usually possible at or near properties.",
    hotelCount: 7,
    faqs: [
      {
        question: "Is Green Cape good for nature?",
        answer: "Yes. It is one of the best choices near Batumi for greenery and the botanical garden."
      },
      {
        question: "Is it central?",
        answer: "No. Choose it for calm and nature rather than central nightlife."
      }
    ]
  },
  {
    slug: "gonio",
    name: "Gonio",
    title: "Small hotels and guesthouses in Gonio",
    image: photo("photo-1542314831-068cd1dbfeeb"),
    coordinates: { lat: 41.5667, lng: 41.5684 },
    description:
      "A quieter beach area south of Batumi, practical for families, car trips and guests who want less city noise.",
    bestFor: ["Quiet beach stays", "Families", "Parking", "Summer trips"],
    goodToKnow: [
      "Central Batumi requires a taxi or bus.",
      "Nightlife is limited compared with the city.",
      "Check the walking route to the beach, not only the distance."
    ],
    beachAccess: "Often 5-15 minutes on foot.",
    transport: "Taxis and buses connect to Batumi; car access is straightforward.",
    noiseLevel: "Low to medium in summer.",
    parking: "Usually easier than Batumi center.",
    hotelCount: 14,
    faqs: [
      {
        question: "Is Gonio good for families?",
        answer: "Yes. It is calmer than central Batumi and many guesthouses suit family beach stays."
      },
      {
        question: "Is Gonio close to Batumi?",
        answer: "It is south of the city and usually needs a taxi, bus or car for central Batumi."
      }
    ]
  },
  {
    slug: "kvariati",
    name: "Kvariati",
    title: "Sea-view stays in Kvariati",
    image: photo("photo-1519046904884-53103b34b206"),
    coordinates: { lat: 41.5464, lng: 41.5619 },
    description:
      "A quieter coastal village known for hillside views, clear water and small places that suit couples or slow beach trips.",
    bestFor: ["Sea views", "Couples", "Quiet coastal stays", "Hillside rooms"],
    goodToKnow: [
      "Hillside stays may involve stairs or steep access.",
      "Confirm exact room view before committing.",
      "It is better for calm than nightlife."
    ],
    beachAccess: "Often 5-15 minutes, sometimes with slopes.",
    transport: "Taxi or car is easiest; buses connect along the coast.",
    noiseLevel: "Low to medium in peak summer.",
    parking: "Often possible, but hillside access varies.",
    hotelCount: 11,
    faqs: [
      {
        question: "Is Kvariati quieter than Batumi?",
        answer: "Usually yes. It is a calmer coastal choice, especially outside peak beach hours."
      },
      {
        question: "Should I ask about stairs?",
        answer: "Yes. Many view properties sit on slopes, so ask if stairs or steep access matter."
      }
    ]
  }
];

const gallery = (hotelName, areaName, ids) =>
  ids.map(([id, type, caption], index) => ({
    src: photo(id),
    alt:
      index === 0
        ? `${hotelName} room view in ${areaName}, Batumi`
        : `${caption} at ${hotelName} in ${areaName}`,
    caption,
    type
  }));

export const hotels = [
  {
    id: 1,
    slug: "old-town-family-hotel",
    name: "Old Town Family Hotel",
    areaSlug: "old-batumi",
    areaName: "Old Batumi",
    type: "Family Hotel",
    budget: "Mid",
    priceFromGel: 140,
    priceNote: "from 140 GEL in shoulder season",
    shortDescription:
      "Small family-run stay on a quieter side street, close to cafes, Europe Square and the boulevard.",
    intro:
      "Old Town Family Hotel suits travellers who want Old Batumi atmosphere without staying directly above the busiest cafe streets. It is simple, warm and walkable.",
    whatsapp: "995555110001",
    phone: "+995 555 110 001",
    email: "hello@oldtownfamily.example",
    addressApprox: "Old Batumi side street, near Europe Square",
    coordinates: { lat: 41.6503, lng: 41.6361 },
    lastVerified: "June 2026",
    image: photo("photo-1566073771259-6a8506099945"),
    gallery: gallery("Old Town Family Hotel", "Old Batumi", [
      ["photo-1566073771259-6a8506099945", "room", "Double room with warm natural light"],
      ["photo-1582719478250-c89cae4dc85b", "exterior", "Small hotel exterior near the old town"],
      ["photo-1611892440504-42a792e24d32", "room", "Family room setup for three guests"],
      ["photo-1578683010236-d716f9a3f461", "bathroom", "Private bathroom with walk-in shower"]
    ]),
    badges: ["Family-run", "Quiet street", "Walkable area", "Breakfast"],
    flags: {
      nearBeach: true,
      quietStay: true,
      familyFriendly: true,
      seaView: false,
      parking: false,
      balconyRooms: true,
      longStay: false,
      lateCheckIn: true,
      goodWifi: true,
      nearAirport: false,
      oldTownCafes: true
    },
    distanceToBeach: "12-15 min walk",
    distanceToBoulevard: "8-10 min walk",
    distanceToAirport: "15-20 min by taxi",
    noiseLevel: "Mostly quiet if you ask for a back-facing room",
    transportNote: "Good for walking; taxis are easy from the old town.",
    parkingNote: "Street parking can be limited in high season.",
    checkInNote: "Owner-assisted check-in; message ahead for late arrival.",
    languagesSpoken: ["Georgian", "Russian", "English basics"],
    breakfast: "Simple breakfast can be arranged",
    paymentNote: "Ask whether card payment is available before arrival.",
    whyStay: [
      "You can walk to cafes, old streets and the boulevard without needing a taxi.",
      "The family-run style is better for guests who prefer direct host contact.",
      "Back-facing rooms are a practical choice if nightlife noise matters."
    ],
    bestFor: ["First-time visitors", "Couples", "Families who like walking", "Cafe and boulevard stays"],
    goodToKnow: [
      "Parking can be limited around Old Batumi in summer.",
      "Ask for an upper-floor or back-facing room if street noise matters.",
      "This is a simple family hotel, not a resort-style property."
    ],
    rooms: [
      {
        name: "Double room",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "Some rooms",
        goodFor: "Couples or solo travellers",
        description: "Compact room for guests who plan to spend most of the day exploring Old Batumi."
      },
      {
        name: "Triple family room",
        sleeps: 3,
        beds: "1 double bed and 1 single bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Small families",
        description: "Practical room with simple storage and enough space for a short family stay."
      }
    ],
    facilities: ["Wi-Fi", "Air conditioning", "Breakfast", "Laundry help", "Airport pickup"],
    localAreaNotes:
      "Old Batumi is best for travellers who want cafes, restored streets and the boulevard within walking distance. The trade-off is parking: it is often the hardest part of staying in the old center.",
    nearby: [
      { name: "Europe Square", time: "5 min walk" },
      { name: "Piazza Square", time: "7 min walk" },
      { name: "Batumi Boulevard", time: "8-10 min walk" },
      { name: "Nearest beach entrance", time: "12-15 min walk" }
    ],
    faqs: [
      {
        question: "Is Old Town Family Hotel near the beach?",
        answer: "The beach is walkable, usually around 12-15 minutes depending on the exact route."
      },
      {
        question: "Is parking available?",
        answer: "There is no guaranteed private parking. Ask the host before arrival if you come by car."
      },
      {
        question: "Is it good for families?",
        answer: "Yes, especially for families who want a walkable central area and simple direct communication."
      },
      {
        question: "Can I contact the hotel on WhatsApp?",
        answer: "Yes. Use the WhatsApp request button to ask about dates, rooms and arrival details."
      }
    ]
  },
  {
    id: 2,
    slug: "sea-breeze-guesthouse",
    name: "Sea Breeze Guesthouse",
    areaSlug: "boulevard",
    areaName: "Boulevard",
    type: "Guesthouse",
    budget: "Budget",
    priceFromGel: 95,
    priceNote: "from 95 GEL outside peak dates",
    shortDescription:
      "Relaxed guesthouse near the boulevard with shaded outdoor seating and good value for beach-focused trips.",
    intro:
      "Sea Breeze Guesthouse is a practical choice if you want the beach and boulevard nearby without paying for a large seafront hotel.",
    whatsapp: "995555110002",
    phone: "+995 555 110 002",
    email: "stay@seabreeze.example",
    addressApprox: "Near 6 May Park and Batumi Boulevard",
    coordinates: { lat: 41.6434, lng: 41.6232 },
    lastVerified: "June 2026",
    image: photo("photo-1520250497591-112f2f40a3f4"),
    gallery: gallery("Sea Breeze Guesthouse", "Boulevard", [
      ["photo-1520250497591-112f2f40a3f4", "exterior", "Guesthouse exterior near the boulevard"],
      ["photo-1505693416388-ac5ce068fe85", "room", "Standard double room with simple decor"],
      ["photo-1600566753086-00f18fb6b3ea", "area", "Garden seating for guests"],
      ["photo-1500530855697-b586d89ba3ee", "area", "Green outdoor corner near the property"]
    ]),
    badges: ["Near beach", "Garden", "Good value", "Parking nearby"],
    flags: {
      nearBeach: true,
      quietStay: false,
      familyFriendly: true,
      seaView: false,
      parking: true,
      balconyRooms: false,
      longStay: true,
      lateCheckIn: true,
      goodWifi: true,
      nearAirport: false,
      oldTownCafes: false
    },
    distanceToBeach: "5-8 min walk",
    distanceToBoulevard: "4-6 min walk",
    distanceToAirport: "12-18 min by taxi",
    noiseLevel: "Medium in summer evenings",
    transportNote: "Good taxi access and easy boulevard walks.",
    parkingNote: "Parking is usually easier than Old Batumi, but confirm exact availability.",
    checkInNote: "Message ahead if arriving late.",
    languagesSpoken: ["Georgian", "Russian", "Turkish basics"],
    breakfast: "No fixed breakfast; cafes are nearby",
    paymentNote: "Cash is safest unless the host confirms card payment.",
    whyStay: [
      "Short walk to the beach and boulevard without a large-hotel price.",
      "Garden seating makes longer stays feel more relaxed.",
      "Works well for families who want simple rooms and direct contact."
    ],
    bestFor: ["Budget beach trips", "Families", "Longer stays", "Guests arriving by car"],
    goodToKnow: [
      "Summer evenings near the boulevard can be lively.",
      "Ask about parking before arrival if you need a guaranteed space.",
      "Rooms are practical rather than luxury."
    ],
    rooms: [
      {
        name: "Standard double",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Budget couples",
        description: "Simple room close to the boulevard and beach cafes."
      },
      {
        name: "Family room with sofa",
        sleeps: 3,
        beds: "1 double bed and sofa bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Parents with one child",
        description: "Practical family option with access to outdoor seating."
      }
    ],
    facilities: ["Wi-Fi", "Garden", "Parking nearby", "Shared kitchen", "Air conditioning"],
    localAreaNotes:
      "The Boulevard area is useful when beach access matters more than old-town atmosphere. It is easy for walks, but the most central blocks can feel busy in July and August.",
    nearby: [
      { name: "6 May Park", time: "4 min walk" },
      { name: "Dolphinarium", time: "6 min walk" },
      { name: "Beach cafes", time: "7 min walk" },
      { name: "Central Boulevard", time: "5 min walk" }
    ],
    faqs: [
      {
        question: "Is Sea Breeze Guesthouse near Batumi beach?",
        answer: "Yes. The beach is usually a short walk away, depending on the exact entrance used."
      },
      {
        question: "Is it a quiet stay?",
        answer: "It is calmer than large hotels, but the boulevard area can be lively in summer evenings."
      },
      {
        question: "Is there parking?",
        answer: "Parking is usually nearby, but ask the guesthouse before arrival for the current situation."
      },
      {
        question: "Is it good for longer stays?",
        answer: "Yes, especially because of the shared kitchen and practical rooms."
      }
    ]
  },
  {
    id: 3,
    slug: "new-boulevard-apart-stay",
    name: "New Boulevard Apart Stay",
    areaSlug: "new-boulevard",
    areaName: "New Boulevard",
    type: "Aparthotel",
    budget: "Premium",
    priceFromGel: 190,
    priceNote: "from 190 GEL for apartment-style rooms",
    shortDescription:
      "Bright apartment-style rooms near New Boulevard, useful for longer stays, sea views and extra space.",
    intro:
      "New Boulevard Apart Stay works best for guests who want a modern base, more room than a classic hotel and practical access to the newer seaside district.",
    whatsapp: "995555110003",
    phone: "+995 555 110 003",
    email: "booking@apartstay.example",
    addressApprox: "New Boulevard area, near Metro City",
    coordinates: { lat: 41.6166, lng: 41.6079 },
    lastVerified: "June 2026",
    image: photo("photo-1564501049412-61c2a3083791"),
    gallery: gallery("New Boulevard Apart Stay", "New Boulevard", [
      ["photo-1564501049412-61c2a3083791", "view", "Sea-view apartment room"],
      ["photo-1618220179428-22790b461013", "room", "Modern apartment interior"],
      ["photo-1560448204-e02f11c3d0e2", "room", "Kitchenette and seating area"],
      ["photo-1590490360182-c33d57733427", "bathroom", "Bright bathroom in the apartment"]
    ]),
    badges: ["Sea view", "Kitchenette", "Long stay", "Balcony rooms"],
    flags: {
      nearBeach: true,
      quietStay: true,
      familyFriendly: true,
      seaView: true,
      parking: true,
      balconyRooms: true,
      longStay: true,
      lateCheckIn: true,
      goodWifi: true,
      nearAirport: false,
      oldTownCafes: false
    },
    distanceToBeach: "6-10 min walk",
    distanceToBoulevard: "5-8 min walk",
    distanceToAirport: "8-14 min by taxi",
    noiseLevel: "Low to medium depending on road-facing rooms",
    transportNote: "Taxis are useful for Old Batumi evenings.",
    parkingNote: "Parking is often easier here than in Old Batumi.",
    checkInNote: "Apartment-style check-in; confirm exact entrance and floor.",
    languagesSpoken: ["Georgian", "Russian", "English"],
    breakfast: "No fixed breakfast; kitchenette in many rooms",
    paymentNote: "Confirm payment method before arrival.",
    whyStay: [
      "Apartment layouts make longer stays easier.",
      "Sea-view and balcony options are stronger here than in the old center.",
      "Newer buildings can be more practical for elevators, luggage and family space."
    ],
    bestFor: ["Long stays", "Families needing space", "Sea-view requests", "Modern apartment comfort"],
    goodToKnow: [
      "Old Batumi is usually a taxi ride away.",
      "Ask whether the room has a direct sea view or side sea view.",
      "Confirm the building entrance, floor and check-in process before arrival."
    ],
    rooms: [
      {
        name: "Studio apartment",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "Some units",
        goodFor: "Couples and solo long stays",
        description: "Compact apartment with kitchenette for guests who want more independence."
      },
      {
        name: "Sea-view family apartment",
        sleeps: 4,
        beds: "1 bedroom and sofa bed",
        bathroom: "Private bathroom",
        balcony: "Yes",
        goodFor: "Families and longer stays",
        description: "Larger unit with balcony and better space for luggage, meals and beach days."
      }
    ],
    facilities: ["Wi-Fi", "Kitchenette", "Lift", "Parking", "Balcony", "Sea view"],
    localAreaNotes:
      "New Boulevard feels more modern and spread out than Old Batumi. It is practical for space and sea views, but less useful if your main plan is cafe-hopping in the historic center.",
    nearby: [
      { name: "New Boulevard", time: "5 min walk" },
      { name: "Metro City", time: "8 min walk" },
      { name: "Aqua park", time: "10 min walk" },
      { name: "Beach promenade", time: "6-10 min walk" }
    ],
    faqs: [
      {
        question: "Is New Boulevard Apart Stay good for long stays?",
        answer: "Yes. Apartment layouts, kitchenettes and newer buildings make it practical for longer visits."
      },
      {
        question: "Does every room have a sea view?",
        answer: "No. Ask for the exact room view before confirming."
      },
      {
        question: "Is parking available?",
        answer: "Parking is usually easier in this area, but exact availability should be confirmed."
      },
      {
        question: "Is it close to Old Batumi?",
        answer: "It is better treated as a short taxi ride rather than a walking base for Old Batumi."
      }
    ]
  },
  {
    id: 4,
    slug: "green-garden-mini-hotel",
    name: "Green Garden Mini Hotel",
    areaSlug: "green-cape",
    areaName: "Green Cape",
    type: "Mini Hotel",
    budget: "Mid",
    priceFromGel: 130,
    priceNote: "from 130 GEL for garden rooms",
    shortDescription:
      "Peaceful mini hotel surrounded by greenery, suited to slower stays near the botanical garden.",
    intro:
      "Green Garden Mini Hotel is for travellers who would rather wake up near greenery than city traffic. It is a calm base outside central Batumi.",
    whatsapp: "995555110004",
    phone: "+995 555 110 004",
    email: "green@gardenmini.example",
    addressApprox: "Green Cape, near the botanical garden road",
    coordinates: { lat: 41.6955, lng: 41.7068 },
    lastVerified: "June 2026",
    image: photo("photo-1600585154340-be6161a56a0c"),
    gallery: gallery("Green Garden Mini Hotel", "Green Cape", [
      ["photo-1600585154340-be6161a56a0c", "exterior", "Green exterior and garden setting"],
      ["photo-1595526114035-0d45ed16cfbf", "room", "Garden double room"],
      ["photo-1616594039964-ae9021a400a0", "room", "Quiet room for a slower stay"],
      ["photo-1600210492486-724fe5c67fb0", "area", "Outdoor seating and surrounding greenery"]
    ]),
    badges: ["Garden", "Quiet", "Parking", "Nature"],
    flags: {
      nearBeach: false,
      quietStay: true,
      familyFriendly: true,
      seaView: false,
      parking: true,
      balconyRooms: false,
      longStay: true,
      lateCheckIn: false,
      goodWifi: true,
      nearAirport: false,
      oldTownCafes: false
    },
    distanceToBeach: "12-20 min walk with slopes possible",
    distanceToBoulevard: "25-35 min by taxi to central boulevard",
    distanceToAirport: "30-40 min by taxi",
    noiseLevel: "Low",
    transportNote: "Best with taxi or car for flexible movement.",
    parkingNote: "Parking is usually available near the property.",
    checkInNote: "Daytime arrival is easiest; message ahead.",
    languagesSpoken: ["Georgian", "Russian"],
    breakfast: "Breakfast can be arranged",
    paymentNote: "Cash is safest unless confirmed otherwise.",
    whyStay: [
      "Green surroundings make the stay feel slower than central Batumi.",
      "It is useful for botanical garden visits and car-based trips.",
      "Parking and outdoor seating are stronger practical advantages than nightlife access."
    ],
    bestFor: ["Nature-focused stays", "Families with a car", "Quiet mornings", "Botanical garden visits"],
    goodToKnow: [
      "This is not a central nightlife location.",
      "Some routes involve slopes, so ask about access if stairs matter.",
      "Taxis are useful for dinners in central Batumi."
    ],
    rooms: [
      {
        name: "Garden double room",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Couples wanting quiet",
        description: "Simple room facing the greener side of the property."
      },
      {
        name: "Ground-floor family room",
        sleeps: 3,
        beds: "1 double bed and 1 single bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Families who prefer easy garden access",
        description: "Ground-floor room with straightforward access to outdoor seating."
      }
    ],
    facilities: ["Wi-Fi", "Garden terrace", "Parking", "Breakfast", "Outdoor seating"],
    localAreaNotes:
      "Green Cape is a good choice if nature matters more than being central. It suits slow stays, but guests should plan transport for restaurants and Old Batumi evenings.",
    nearby: [
      { name: "Batumi Botanical Garden", time: "8-12 min by taxi" },
      { name: "Green Cape beach", time: "12-20 min walk" },
      { name: "Mtsvane Kontskhi station", time: "8-12 min by taxi" },
      { name: "Local viewpoint roads", time: "5-10 min by car" }
    ],
    faqs: [
      {
        question: "Is Green Garden Mini Hotel quiet?",
        answer: "Yes. It is one of the calmer small stays, especially compared with central Batumi."
      },
      {
        question: "Is it near the beach?",
        answer: "The beach can be reachable, but routes may involve slopes. Ask about the exact walking path."
      },
      {
        question: "Do I need a car?",
        answer: "A car or taxi budget is useful because the area is outside central Batumi."
      },
      {
        question: "Is breakfast available?",
        answer: "Breakfast can usually be arranged, but confirm before arrival."
      }
    ]
  },
  {
    id: 5,
    slug: "gonio-quiet-house",
    name: "Gonio Quiet House",
    areaSlug: "gonio",
    areaName: "Gonio",
    type: "Guesthouse",
    budget: "Budget",
    priceFromGel: 85,
    priceNote: "from 85 GEL for simple rooms",
    shortDescription:
      "Simple guesthouse in Gonio for quieter beach days, family stays and guests arriving by car.",
    intro:
      "Gonio Quiet House is a straightforward guesthouse for travellers who want less city noise, easier parking and beach access south of Batumi.",
    whatsapp: "995555110005",
    phone: "+995 555 110 005",
    email: "hello@gonioquiet.example",
    addressApprox: "Gonio residential street, near beach road",
    coordinates: { lat: 41.5663, lng: 41.5678 },
    lastVerified: "June 2026",
    image: photo("photo-1542314831-068cd1dbfeeb"),
    gallery: gallery("Gonio Quiet House", "Gonio", [
      ["photo-1542314831-068cd1dbfeeb", "exterior", "Guesthouse exterior in Gonio"],
      ["photo-1618773928121-c32242e63f39", "room", "Simple double room"],
      ["photo-1600607687939-ce8a6c25118c", "room", "Family room with practical storage"],
      ["photo-1598928506311-c55ded91a20c", "area", "Terrace and outdoor seating"]
    ]),
    badges: ["Quiet beach area", "Parking", "Family friendly", "Local host"],
    flags: {
      nearBeach: true,
      quietStay: true,
      familyFriendly: true,
      seaView: false,
      parking: true,
      balconyRooms: false,
      longStay: true,
      lateCheckIn: true,
      goodWifi: true,
      nearAirport: true,
      oldTownCafes: false
    },
    distanceToBeach: "7-12 min walk",
    distanceToBoulevard: "20-30 min by taxi to central Batumi",
    distanceToAirport: "10-15 min by taxi",
    noiseLevel: "Low to medium in summer",
    transportNote: "Bus or taxi needed for central Batumi.",
    parkingNote: "Parking is usually easier than in the city center.",
    checkInNote: "Direct host check-in; WhatsApp works best.",
    languagesSpoken: ["Georgian", "Russian", "Turkish basics"],
    breakfast: "No fixed breakfast; shared kitchen available",
    paymentNote: "Cash is safest unless the host confirms otherwise.",
    whyStay: [
      "A calmer base for beach days than central Batumi.",
      "Good value for families who do not need nightlife at the door.",
      "Parking and direct host contact make arrivals simpler."
    ],
    bestFor: ["Families", "Quiet beach stays", "Guests arriving by car", "Budget summer trips"],
    goodToKnow: [
      "Central Batumi requires a taxi, bus or car.",
      "This is better if you want calm over nightlife.",
      "Beach access is simpler than the city center, but ask for the exact route."
    ],
    rooms: [
      {
        name: "Double room",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Couples on a budget",
        description: "Simple room for beach-focused stays in Gonio."
      },
      {
        name: "Family room",
        sleeps: 4,
        beds: "1 double bed and 2 single beds",
        bathroom: "Private bathroom",
        balcony: "Some rooms",
        goodFor: "Families",
        description: "Practical room for families who want a quieter base outside Batumi."
      }
    ],
    facilities: ["Wi-Fi", "Parking", "Shared kitchen", "Air conditioning", "Terrace"],
    localAreaNotes:
      "Gonio is best for travellers who want the beach and calmer evenings more than central restaurants. It works well by car, but taxis or buses are part of any Old Batumi plan.",
    nearby: [
      { name: "Gonio beach", time: "7-12 min walk" },
      { name: "Gonio Fortress", time: "6-10 min by taxi" },
      { name: "Local restaurants", time: "5-10 min walk" },
      { name: "Batumi Airport", time: "10-15 min by taxi" }
    ],
    faqs: [
      {
        question: "Is Gonio Quiet House near the beach?",
        answer: "Yes. The beach is usually around 7-12 minutes on foot, depending on the route."
      },
      {
        question: "Is it good for families?",
        answer: "Yes. It is a quiet, practical option for families who want beach access and parking."
      },
      {
        question: "Is central Batumi close?",
        answer: "Central Batumi usually requires a taxi, bus or car."
      },
      {
        question: "Can I ask availability on WhatsApp?",
        answer: "Yes. WhatsApp is the simplest way to ask about dates and room fit."
      }
    ]
  },
  {
    id: 6,
    slug: "kvariati-view-rooms",
    name: "Kvariati View Rooms",
    areaSlug: "kvariati",
    areaName: "Kvariati",
    type: "Mini Hotel",
    budget: "Premium",
    priceFromGel: 170,
    priceNote: "from 170 GEL for sea-view rooms",
    shortDescription:
      "Small hillside stay with Black Sea views, suited to couples and quieter coastal trips.",
    intro:
      "Kvariati View Rooms is for travellers who want calm, sea views and a slower coastal feeling rather than a central Batumi base.",
    whatsapp: "995555110006",
    phone: "+995 555 110 006",
    email: "view@kvariatirooms.example",
    addressApprox: "Kvariati hillside road",
    coordinates: { lat: 41.5462, lng: 41.5627 },
    lastVerified: "June 2026",
    image: photo("photo-1519046904884-53103b34b206"),
    gallery: gallery("Kvariati View Rooms", "Kvariati", [
      ["photo-1519046904884-53103b34b206", "view", "Black Sea view from Kvariati"],
      ["photo-1551882547-ff40c63fe5fa", "room", "Sea-view double room"],
      ["photo-1566665797739-1674de7a421a", "room", "Balcony room with coastal light"],
      ["photo-1615873968403-89e068629265", "bathroom", "Compact private bathroom"]
    ]),
    badges: ["Sea view", "Quiet coast", "Couples", "Balcony rooms"],
    flags: {
      nearBeach: true,
      quietStay: true,
      familyFriendly: false,
      seaView: true,
      parking: true,
      balconyRooms: true,
      longStay: false,
      lateCheckIn: false,
      goodWifi: true,
      nearAirport: false,
      oldTownCafes: false
    },
    distanceToBeach: "6-15 min walk, depending on slope",
    distanceToBoulevard: "25-35 min by taxi to central Batumi",
    distanceToAirport: "18-25 min by taxi",
    noiseLevel: "Low, except peak beach season",
    transportNote: "Taxi or car is easiest for flexible movement.",
    parkingNote: "Confirm access because hillside parking varies.",
    checkInNote: "Arrive in daylight if hillside access concerns you.",
    languagesSpoken: ["Georgian", "Russian", "English basics"],
    breakfast: "Breakfast terrace may be available",
    paymentNote: "Confirm cash/card before arrival.",
    whyStay: [
      "Sea-view rooms create a stronger sense of place than many city rooms.",
      "The area suits couples and guests who prefer quiet evenings.",
      "It is a good choice when coastal calm matters more than central nightlife."
    ],
    bestFor: ["Couples", "Sea-view stays", "Quiet coastal trips", "Travellers with a car"],
    goodToKnow: [
      "Hillside location may mean stairs or steep access.",
      "Check the exact room view before confirming.",
      "Choose this area for calm, not for nightlife."
    ],
    rooms: [
      {
        name: "Sea-view double room",
        sleeps: 2,
        beds: "1 double bed",
        bathroom: "Private bathroom",
        balcony: "Yes",
        goodFor: "Couples",
        description: "Compact room with balcony access and a coastal view."
      },
      {
        name: "Compact twin room",
        sleeps: 2,
        beds: "2 single beds",
        bathroom: "Private bathroom",
        balcony: "No",
        goodFor: "Friends or simple beach stays",
        description: "Smaller room for guests who value the area more than room size."
      }
    ],
    facilities: ["Wi-Fi", "Sea view", "Parking", "Breakfast terrace", "Air conditioning"],
    localAreaNotes:
      "Kvariati is quieter and more scenic than central Batumi. The practical trade-off is access: hillside rooms may involve stairs, steep roads or taxi planning.",
    nearby: [
      { name: "Kvariati beach", time: "6-15 min walk" },
      { name: "Sarpi road", time: "5 min by car" },
      { name: "Gonio Fortress", time: "10-15 min by taxi" },
      { name: "Mountain viewpoints", time: "10-15 min by car" }
    ],
    faqs: [
      {
        question: "Does Kvariati View Rooms have sea views?",
        answer: "Some rooms do. Ask for the exact room and view before confirming."
      },
      {
        question: "Is the area quiet?",
        answer: "Yes, Kvariati is generally calmer than central Batumi."
      },
      {
        question: "Is it easy to reach the beach?",
        answer: "Beach access can be close, but hillside routes may involve slopes or stairs."
      },
      {
        question: "Is it good for families?",
        answer: "It is better for couples or quieter stays. Families should ask about room size and access."
      }
    ]
  }
];

export const filterOptions = [
  { key: "nearBeach", label: "Near beach" },
  { key: "quietStay", label: "Quiet stay" },
  { key: "familyFriendly", label: "Family friendly" },
  { key: "seaView", label: "Sea view" },
  { key: "parking", label: "Parking" },
  { key: "balconyRooms", label: "Balcony rooms" },
  { key: "longStay", label: "Long stay" },
  { key: "lateCheckIn", label: "Late check-in" },
  { key: "goodWifi", label: "Good Wi-Fi" },
  { key: "nearAirport", label: "Near airport" }
];

export const hotelTypes = ["Family Hotel", "Guesthouse", "Aparthotel", "Mini Hotel"];
export const budgetRanges = ["Budget", "Mid", "Premium"];

export const collections = [
  {
    slug: "small-hotels-batumi",
    title: "Small hotels in Batumi",
    h1: "Small hotels in Batumi",
    description: "Curated independent stays for travellers who want character, local contact and practical details.",
    searchIntent: "small hotels Batumi",
    intro:
      "Use this collection when you want a small, independent-feeling place instead of a large resort or anonymous apartment block.",
    filters: {},
    bestAreas: ["old-batumi", "boulevard", "new-boulevard"],
    relatedCollections: ["guesthouses-batumi", "family-hotels-batumi", "quiet-hotels-batumi"]
  },
  {
    slug: "guesthouses-batumi",
    title: "Guesthouses in Batumi",
    h1: "Guesthouses in Batumi",
    description: "Simple local guesthouses with direct WhatsApp contact and practical area notes.",
    searchIntent: "guesthouses Batumi",
    intro:
      "Guesthouses are best when you want direct host contact, simple rooms and better value than a larger hotel.",
    filters: { type: "Guesthouse" },
    bestAreas: ["boulevard", "gonio", "makhinjauri"],
    relatedCollections: ["budget-hotels-batumi", "quiet-hotels-batumi", "hotels-in-gonio"]
  },
  {
    slug: "family-hotels-batumi",
    title: "Family hotels in Batumi",
    h1: "Family hotels in Batumi",
    description: "Small hotels and guesthouses that work for families, walkable areas and beach days.",
    searchIntent: "family hotels Batumi",
    intro:
      "For families, the right area matters as much as the room. Look for parking, beach access and simple communication before arrival.",
    filters: { familyFriendly: true },
    bestAreas: ["boulevard", "new-boulevard", "gonio"],
    relatedCollections: ["hotels-near-batumi-beach", "hotels-with-parking-batumi", "budget-hotels-batumi"]
  },
  {
    slug: "budget-hotels-batumi",
    title: "Budget rooms in Batumi",
    h1: "Budget rooms and small hotels in Batumi",
    description: "Good-value rooms and guesthouses for travellers who care about location and direct contact.",
    searchIntent: "budget hotels Batumi",
    intro:
      "Budget stays can work well in Batumi if you check the area, room type and transport before sending a request.",
    filters: { budget: "Budget" },
    bestAreas: ["boulevard", "gonio", "makhinjauri"],
    relatedCollections: ["guesthouses-batumi", "quiet-hotels-batumi", "hotels-near-batumi-airport"]
  },
  {
    slug: "hotels-near-batumi-beach",
    title: "Small hotels near Batumi beach",
    h1: "Small hotels near Batumi beach",
    description: "Beach-friendly small hotels and guesthouses in Batumi, Gonio and Kvariati.",
    searchIntent: "hotels near Batumi beach",
    intro:
      "Near-beach can mean very different things in Batumi. Check the walking route, road crossings and whether you want city or village beach atmosphere.",
    filters: { nearBeach: true },
    bestAreas: ["boulevard", "new-boulevard", "gonio", "kvariati"],
    relatedCollections: ["sea-view-rooms-batumi", "family-hotels-batumi", "quiet-hotels-batumi"]
  },
  {
    slug: "quiet-hotels-batumi",
    title: "Quiet guesthouses in Batumi",
    h1: "Quiet small hotels and guesthouses in Batumi",
    description: "Calmer stays for travellers who want less street noise and a more relaxed local base.",
    searchIntent: "quiet hotels Batumi",
    intro:
      "Quiet in Batumi usually means choosing the right street or a calmer coastal area. Ask about room orientation as well as the neighbourhood.",
    filters: { quietStay: true },
    bestAreas: ["green-cape", "gonio", "kvariati", "makhinjauri"],
    relatedCollections: ["hotels-in-gonio", "hotels-in-kvariati", "guesthouses-batumi"]
  },
  {
    slug: "sea-view-rooms-batumi",
    title: "Sea-view rooms in Batumi",
    h1: "Sea-view rooms in Batumi and nearby beach areas",
    description: "Small stays with sea-view room options in New Boulevard, Kvariati and the coast south of Batumi.",
    searchIntent: "sea view rooms Batumi",
    intro:
      "Always ask whether the room has a direct sea view, side sea view or only a view from shared space.",
    filters: { seaView: true },
    bestAreas: ["new-boulevard", "kvariati"],
    relatedCollections: ["hotels-near-batumi-beach", "hotels-in-kvariati", "long-stay-apartments-batumi"]
  },
  {
    slug: "long-stay-apartments-batumi",
    title: "Long-stay aparthotels in Batumi",
    h1: "Long-stay rooms and aparthotels in Batumi",
    description: "Apartment-style stays with kitchenettes, balconies or practical room layouts for longer visits.",
    searchIntent: "long stay apartments Batumi",
    intro:
      "For longer stays, look for kitchenette access, laundry help, Wi-Fi and a neighbourhood that still feels practical after the first week.",
    filters: { longStay: true },
    bestAreas: ["new-boulevard", "boulevard", "gonio"],
    relatedCollections: ["sea-view-rooms-batumi", "hotels-in-new-boulevard", "budget-hotels-batumi"]
  },
  {
    slug: "hotels-with-parking-batumi",
    title: "Hotels with parking in Batumi",
    h1: "Small hotels and guesthouses with parking in Batumi",
    description: "Practical stays for guests arriving by car, with parking notes and calmer area options.",
    searchIntent: "hotels with parking Batumi",
    intro:
      "Parking is one of the most important details to confirm before staying in Batumi, especially in Old Batumi and high season.",
    filters: { parking: true },
    bestAreas: ["new-boulevard", "gonio", "green-cape", "airport-area"],
    relatedCollections: ["family-hotels-batumi", "hotels-near-batumi-airport", "quiet-hotels-batumi"]
  },
  {
    slug: "hotels-near-batumi-airport",
    title: "Hotels near Batumi Airport",
    h1: "Small hotels near Batumi Airport",
    description: "Useful short-stay areas and guesthouses for early flights, late arrivals and road access.",
    searchIntent: "hotels near Batumi airport",
    intro:
      "Stay near the airport when convenience matters more than old-town atmosphere, especially for one-night stopovers.",
    filters: { nearAirport: true },
    bestAreas: ["airport-area", "gonio", "new-boulevard"],
    relatedCollections: ["hotels-with-parking-batumi", "budget-hotels-batumi", "hotels-in-gonio"]
  },
  {
    slug: "hotels-in-old-batumi",
    title: "Hotels in Old Batumi",
    h1: "Small hotels in Old Batumi",
    description: "Walkable small hotels near cafes, restored streets, Europe Square and the boulevard.",
    searchIntent: "hotels in Old Batumi",
    intro:
      "Old Batumi is the right choice if atmosphere, cafes and walking matter more than easy parking.",
    filters: { areaSlug: "old-batumi" },
    bestAreas: ["old-batumi"],
    relatedCollections: ["small-hotels-batumi", "family-hotels-batumi", "quiet-hotels-batumi"]
  },
  {
    slug: "hotels-in-new-boulevard",
    title: "Hotels in New Boulevard",
    h1: "Hotels and aparthotels in New Boulevard, Batumi",
    description: "Modern apartment-style stays, sea-view rooms and longer-stay options near the newer promenade.",
    searchIntent: "hotels in New Boulevard Batumi",
    intro:
      "New Boulevard is better for newer buildings and space than old-town atmosphere.",
    filters: { areaSlug: "new-boulevard" },
    bestAreas: ["new-boulevard"],
    relatedCollections: ["sea-view-rooms-batumi", "long-stay-apartments-batumi", "hotels-near-batumi-beach"]
  },
  {
    slug: "hotels-in-gonio",
    title: "Hotels in Gonio",
    h1: "Small hotels and guesthouses in Gonio",
    description: "Quieter beach stays south of Batumi for families, car trips and simple guesthouses.",
    searchIntent: "hotels in Gonio",
    intro:
      "Gonio is a strong choice when you want beach access and calm more than central Batumi nightlife.",
    filters: { areaSlug: "gonio" },
    bestAreas: ["gonio"],
    relatedCollections: ["quiet-hotels-batumi", "hotels-near-batumi-beach", "family-hotels-batumi"]
  },
  {
    slug: "hotels-in-kvariati",
    title: "Hotels in Kvariati",
    h1: "Sea-view rooms and small hotels in Kvariati",
    description: "Hillside coastal stays with sea views and a calmer beach feeling near Batumi.",
    searchIntent: "hotels in Kvariati",
    intro:
      "Kvariati works best for travellers who prefer sea views and quiet evenings over central convenience.",
    filters: { areaSlug: "kvariati" },
    bestAreas: ["kvariati"],
    relatedCollections: ["sea-view-rooms-batumi", "quiet-hotels-batumi", "hotels-near-batumi-beach"]
  },
  {
    slug: "hotels-in-makhinjauri",
    title: "Hotels in Makhinjauri",
    h1: "Guesthouses and small stays in Makhinjauri",
    description: "Green surroundings, local guesthouses and access toward northern beaches and the botanical garden.",
    searchIntent: "hotels in Makhinjauri",
    intro:
      "Makhinjauri is useful when you want a greener edge of Batumi and do not need to be in the old center.",
    filters: { areaSlug: "makhinjauri" },
    bestAreas: ["makhinjauri"],
    relatedCollections: ["guesthouses-batumi", "quiet-hotels-batumi", "budget-hotels-batumi"]
  }
];

const guideSections = {
  "where-to-stay-in-batumi": [
    {
      heading: "Choose the area before the room",
      body:
        "Batumi changes quickly by neighbourhood. Old Batumi is walkable and atmospheric, New Boulevard is more modern, and Gonio or Kvariati feel calmer and more beach-focused."
    },
    {
      heading: "Best first-time choice",
      body:
        "For a first short stay, Old Batumi or Boulevard usually make the most sense because you can walk to cafes, the sea and main sights."
    },
    {
      heading: "Best quiet choice",
      body:
        "For quieter stays, compare Gonio, Kvariati, Green Cape and Makhinjauri. Ask about transport and exact beach access before confirming."
    }
  ],
  "best-areas-for-families": [
    {
      heading: "Families usually need practical details",
      body:
        "Look beyond room size. Beach crossings, parking, elevators, nearby supermarkets and noise level can matter more than a pretty room photo."
    },
    {
      heading: "Good family areas",
      body:
        "Boulevard and New Boulevard are convenient for city beach days. Gonio can be easier for a quieter beach stay if you do not need central Batumi every evening."
    }
  ],
  "old-batumi-vs-new-boulevard": [
    {
      heading: "Old Batumi is more atmospheric",
      body:
        "Choose Old Batumi for cafes, older streets and short walks to central sights. The trade-off is parking and possible evening noise."
    },
    {
      heading: "New Boulevard is more practical",
      body:
        "Choose New Boulevard for newer buildings, apartment layouts, elevators and sea-view options. The trade-off is less historic character."
    }
  ],
  "gonio-vs-kvariati": [
    {
      heading: "Gonio is practical and family-friendly",
      body:
        "Gonio usually works well for guests arriving by car, families and travellers who want quieter beach days south of Batumi."
    },
    {
      heading: "Kvariati is more scenic",
      body:
        "Kvariati often has stronger sea views and a calmer coastal mood, but hillside access can mean stairs or steep roads."
    }
  ],
  "hotels-near-batumi-airport": [
    {
      heading: "Stay near the airport for convenience, not atmosphere",
      body:
        "Airport-area stays are useful for early flights, late arrivals and car-based trips. For sightseeing, most travellers prefer the center."
    },
    {
      heading: "Ask about check-in",
      body:
        "If your flight arrives late, confirm that the host can meet you or send clear self-check-in instructions."
    }
  ],
  "small-hotel-booking-guide": [
    {
      heading: "Ask practical questions before price",
      body:
        "Before agreeing on a room, ask about the exact room type, balcony, bathroom, parking, payment method and whether the room in photos is the room offered."
    },
    {
      heading: "Use WhatsApp clearly",
      body:
        "Send dates, guest count, arrival time and any must-have details. This avoids long back-and-forth and helps local hosts answer quickly."
    }
  ]
};

export const guides = [
  {
    slug: "where-to-stay-in-batumi",
    title: "Where to stay in Batumi: Old Batumi, New Boulevard, Gonio or Kvariati?",
    description:
      "A local guide to choosing the right Batumi area for your trip, from central cafes to quieter beach villages.",
    category: "Areas",
    readingTime: "6 min read",
    updated: "2026-06-30",
    sections: guideSections["where-to-stay-in-batumi"],
    relatedAreas: ["old-batumi", "new-boulevard", "gonio", "kvariati"],
    relatedCollections: ["small-hotels-batumi", "hotels-near-batumi-beach", "quiet-hotels-batumi"]
  },
  {
    slug: "best-areas-for-families",
    title: "Best areas to stay in Batumi with family",
    description:
      "Compare family-friendly Batumi areas by beach access, parking, noise level and practical room needs.",
    category: "Families",
    readingTime: "5 min read",
    updated: "2026-06-30",
    sections: guideSections["best-areas-for-families"],
    relatedAreas: ["boulevard", "new-boulevard", "gonio"],
    relatedCollections: ["family-hotels-batumi", "hotels-with-parking-batumi", "hotels-near-batumi-beach"]
  },
  {
    slug: "old-batumi-vs-new-boulevard",
    title: "Old Batumi vs New Boulevard: which area is better for your stay?",
    description:
      "A practical comparison of Old Batumi and New Boulevard for walkability, sea views, family space and transport.",
    category: "Areas",
    readingTime: "5 min read",
    updated: "2026-06-30",
    sections: guideSections["old-batumi-vs-new-boulevard"],
    relatedAreas: ["old-batumi", "new-boulevard"],
    relatedCollections: ["hotels-in-old-batumi", "hotels-in-new-boulevard", "long-stay-apartments-batumi"]
  },
  {
    slug: "gonio-vs-kvariati",
    title: "Gonio vs Kvariati: choosing a quieter beach stay near Batumi",
    description:
      "How to choose between Gonio and Kvariati for beach access, views, quiet evenings and transport to Batumi.",
    category: "Beach areas",
    readingTime: "4 min read",
    updated: "2026-06-30",
    sections: guideSections["gonio-vs-kvariati"],
    relatedAreas: ["gonio", "kvariati"],
    relatedCollections: ["hotels-in-gonio", "hotels-in-kvariati", "quiet-hotels-batumi"]
  },
  {
    slug: "hotels-near-batumi-airport",
    title: "Where to stay near Batumi Airport",
    description:
      "When airport-area accommodation makes sense and what to ask before booking a late-arrival stay.",
    category: "Practical planning",
    readingTime: "4 min read",
    updated: "2026-06-30",
    sections: guideSections["hotels-near-batumi-airport"],
    relatedAreas: ["airport-area", "new-boulevard", "gonio"],
    relatedCollections: ["hotels-near-batumi-airport", "hotels-with-parking-batumi", "budget-hotels-batumi"]
  },
  {
    slug: "small-hotel-booking-guide",
    title: "What to know before booking a small hotel or guesthouse in Batumi",
    description:
      "Practical questions to ask before sending a WhatsApp request to a small hotel or guesthouse in Batumi.",
    category: "Booking advice",
    readingTime: "6 min read",
    updated: "2026-06-30",
    sections: guideSections["small-hotel-booking-guide"],
    relatedAreas: ["old-batumi", "boulevard", "gonio"],
    relatedCollections: ["small-hotels-batumi", "guesthouses-batumi", "budget-hotels-batumi"]
  }
];

export function getHotel(slug) {
  return hotels.find((hotel) => hotel.slug === slug);
}

export function getArea(slug) {
  return areas.find((area) => area.slug === slug);
}

export function getCollection(slug) {
  return collections.find((collection) => collection.slug === slug);
}

export function getGuide(slug) {
  return guides.find((guide) => guide.slug === slug);
}

export function filterHotels(filters = {}) {
  return hotels.filter((hotel) => {
    if (filters.areaSlug && hotel.areaSlug !== filters.areaSlug) return false;
    if (filters.type && hotel.type !== filters.type) return false;
    if (filters.budget && hotel.budget !== filters.budget) return false;
    for (const option of filterOptions) {
      if (filters[option.key] && !hotel.flags[option.key]) return false;
    }
    return true;
  });
}

export function relatedHotelsFor(hotel, limit = 3) {
  return hotels
    .filter((candidate) => candidate.slug !== hotel.slug)
    .map((candidate) => ({
      hotel: candidate,
      score:
        (candidate.areaSlug === hotel.areaSlug ? 3 : 0) +
        (candidate.type === hotel.type ? 2 : 0) +
        candidate.badges.filter((badge) => hotel.badges.includes(badge)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.hotel);
}

export function collectionHotels(collection) {
  return filterHotels(collection.filters).slice(0, 12);
}
