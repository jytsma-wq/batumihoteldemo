const photo = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const hotels = [
  {
    id: 1,
    slug: "old-town-family-hotel",
    name: "Old Town Family Hotel",
    area: "Old Batumi",
    type: "Family Hotel",
    budget: "Mid",
    tags: ["Family run", "Old town", "Breakfast"],
    familyFriendly: true,
    seaView: false,
    nearBeach: true,
    parking: false,
    whatsapp: "995555110001",
    phone: "+995 555 110 001",
    email: "hello@oldtownfamily.example",
    image: photo("photo-1566073771259-6a8506099945"),
    gallery: [
      photo("photo-1566073771259-6a8506099945"),
      photo("photo-1582719478250-c89cae4dc85b"),
      photo("photo-1611892440504-42a792e24d32"),
      photo("photo-1578683010236-d716f9a3f461")
    ],
    intro:
      "A calm family hotel in the historic center, close to cafes, the boulevard, and evening walks by the sea.",
    whyStay: [
      "Friendly owners who live nearby and help with local advice.",
      "Quiet rooms behind the busiest streets of Old Batumi.",
      "Simple breakfast service and easy direct communication."
    ],
    rooms: ["Double rooms", "Triple family rooms", "Small balcony rooms"],
    facilities: ["Wi-Fi", "Breakfast", "Air conditioning", "Laundry help", "Airport pickup"],
    nearby: ["Piazza Square", "Europe Square", "Batumi Boulevard", "Alphabet Tower"]
  },
  {
    id: 2,
    slug: "sea-breeze-guesthouse",
    name: "Sea Breeze Guesthouse",
    area: "Boulevard",
    type: "Guesthouse",
    budget: "Budget",
    tags: ["Near beach", "Garden", "Great value"],
    familyFriendly: true,
    seaView: false,
    nearBeach: true,
    parking: true,
    whatsapp: "995555110002",
    phone: "+995 555 110 002",
    email: "stay@seabreeze.example",
    image: photo("photo-1520250497591-112f2f40a3f4"),
    gallery: [
      photo("photo-1520250497591-112f2f40a3f4"),
      photo("photo-1505693416388-ac5ce068fe85"),
      photo("photo-1600566753086-00f18fb6b3ea"),
      photo("photo-1500530855697-b586d89ba3ee")
    ],
    intro:
      "A relaxed guesthouse near the boulevard with shaded outdoor seating and practical rooms for longer stays.",
    whyStay: [
      "A short walk to the beach without the price of a large hotel.",
      "Helpful hosts who can arrange taxis and local recommendations.",
      "Good choice for families and guests arriving by car."
    ],
    rooms: ["Standard doubles", "Twin rooms", "Family room with sofa"],
    facilities: ["Wi-Fi", "Garden", "Parking", "Shared kitchen", "Air conditioning"],
    nearby: ["6 May Park", "Dolphinarium", "Central Boulevard", "Beach cafes"]
  },
  {
    id: 3,
    slug: "new-boulevard-apart-stay",
    name: "New Boulevard Apart Stay",
    area: "New Boulevard",
    type: "Aparthotel",
    budget: "Premium",
    tags: ["Sea view", "Apart rooms", "Modern"],
    familyFriendly: true,
    seaView: true,
    nearBeach: true,
    parking: true,
    whatsapp: "995555110003",
    phone: "+995 555 110 003",
    email: "booking@apartstay.example",
    image: photo("photo-1564501049412-61c2a3083791"),
    gallery: [
      photo("photo-1564501049412-61c2a3083791"),
      photo("photo-1618220179428-22790b461013"),
      photo("photo-1560448204-e02f11c3d0e2"),
      photo("photo-1590490360182-c33d57733427")
    ],
    intro:
      "Bright apartment-style stays in the New Boulevard area, ideal for guests who want more space and a sea view.",
    whyStay: [
      "Kitchenette rooms make longer Batumi trips easier.",
      "Modern interiors photograph beautifully for online enquiries.",
      "Direct owner contact keeps the booking conversation simple."
    ],
    rooms: ["Studio apartments", "One-bedroom apartments", "Sea-view family apartment"],
    facilities: ["Wi-Fi", "Kitchenette", "Lift", "Parking", "Balcony", "Sea view"],
    nearby: ["New Boulevard", "Metro City", "Aqua park", "Beach promenade"]
  },
  {
    id: 4,
    slug: "green-garden-mini-hotel",
    name: "Green Garden Mini Hotel",
    area: "Green Cape",
    type: "Mini Hotel",
    budget: "Mid",
    tags: ["Garden", "Quiet", "Nature"],
    familyFriendly: true,
    seaView: false,
    nearBeach: false,
    parking: true,
    whatsapp: "995555110004",
    phone: "+995 555 110 004",
    email: "green@gardenmini.example",
    image: photo("photo-1600585154340-be6161a56a0c"),
    gallery: [
      photo("photo-1600585154340-be6161a56a0c"),
      photo("photo-1595526114035-0d45ed16cfbf"),
      photo("photo-1616594039964-ae9021a400a0"),
      photo("photo-1600210492486-724fe5c67fb0")
    ],
    intro:
      "A peaceful mini hotel surrounded by greenery, suited to guests who want a slower stay outside the center.",
    whyStay: [
      "Garden space gives the property a warm family-hotel feeling.",
      "Close to nature without losing access to Batumi.",
      "Strong option for guests arriving by car."
    ],
    rooms: ["Garden double rooms", "Triple rooms", "Ground-floor family room"],
    facilities: ["Wi-Fi", "Garden terrace", "Parking", "Breakfast", "Outdoor seating"],
    nearby: ["Batumi Botanical Garden", "Green Cape beach", "Mtsvane Kontskhi station"]
  },
  {
    id: 5,
    slug: "gonio-quiet-house",
    name: "Gonio Quiet House",
    area: "Gonio",
    type: "Guesthouse",
    budget: "Budget",
    tags: ["Quiet", "Parking", "Local host"],
    familyFriendly: true,
    seaView: false,
    nearBeach: true,
    parking: true,
    whatsapp: "995555110005",
    phone: "+995 555 110 005",
    email: "hello@gonioquiet.example",
    image: photo("photo-1542314831-068cd1dbfeeb"),
    gallery: [
      photo("photo-1542314831-068cd1dbfeeb"),
      photo("photo-1618773928121-c32242e63f39"),
      photo("photo-1600607687939-ce8a6c25118c"),
      photo("photo-1598928506311-c55ded91a20c")
    ],
    intro:
      "A simple, quiet guesthouse in Gonio for beach days, family stays, and guests who prefer less noise.",
    whyStay: [
      "Relaxed local neighborhood with quick access to the beach.",
      "Good value for summer stays outside central Batumi.",
      "Owners respond quickly through WhatsApp."
    ],
    rooms: ["Double rooms", "Twin rooms", "Family room"],
    facilities: ["Wi-Fi", "Parking", "Shared kitchen", "Air conditioning", "Terrace"],
    nearby: ["Gonio Fortress", "Gonio beach", "Local restaurants", "Airport road"]
  },
  {
    id: 6,
    slug: "kvariati-view-rooms",
    name: "Kvariati View Rooms",
    area: "Kvariati",
    type: "Mini Hotel",
    budget: "Premium",
    tags: ["Sea view", "Hillside", "Couples"],
    familyFriendly: false,
    seaView: true,
    nearBeach: true,
    parking: true,
    whatsapp: "995555110006",
    phone: "+995 555 110 006",
    email: "view@kvariatirooms.example",
    image: photo("photo-1519046904884-53103b34b206"),
    gallery: [
      photo("photo-1519046904884-53103b34b206"),
      photo("photo-1551882547-ff40c63fe5fa"),
      photo("photo-1566665797739-1674de7a421a"),
      photo("photo-1615873968403-89e068629265")
    ],
    intro:
      "A small hillside stay with open views toward the Black Sea and a quieter feeling than central Batumi.",
    whyStay: [
      "Sea-view rooms create a memorable first impression online.",
      "Good fit for couples and slow coastal trips.",
      "Direct booking requests help owners protect margin."
    ],
    rooms: ["Sea-view double rooms", "Balcony rooms", "Compact twin rooms"],
    facilities: ["Wi-Fi", "Sea view", "Parking", "Breakfast terrace", "Air conditioning"],
    nearby: ["Kvariati beach", "Sarpi road", "Gonio Fortress", "Mountain viewpoints"]
  }
];

export const areas = [
  {
    name: "Old Batumi",
    image: photo("photo-1566073771259-6a8506099945"),
    description: "Historic streets, cafes, restored facades, and easy walks to the boulevard.",
    count: 18
  },
  {
    name: "Boulevard",
    image: photo("photo-1520250497591-112f2f40a3f4"),
    description: "Central seaside energy with parks, beach cafes, and classic Batumi promenades.",
    count: 24
  },
  {
    name: "New Boulevard",
    image: photo("photo-1564501049412-61c2a3083791"),
    description: "Modern apartments, sea-view rooms, and longer-stay options near the coast.",
    count: 31
  },
  {
    name: "Gonio",
    image: photo("photo-1542314831-068cd1dbfeeb"),
    description: "A quieter beach area for families, summer trips, and simple local stays.",
    count: 14
  },
  {
    name: "Kvariati",
    image: photo("photo-1519046904884-53103b34b206"),
    description: "Hillside sea views, calm guesthouses, and a slower coastal rhythm.",
    count: 11
  },
  {
    name: "Makhinjauri",
    image: photo("photo-1600585154340-be6161a56a0c"),
    description: "Green surroundings, practical guesthouses, and fast access to Batumi.",
    count: 9
  },
  {
    name: "Green Cape",
    image: photo("photo-1500530855697-b586d89ba3ee"),
    description: "Garden stays and nature-focused visits near the botanical garden.",
    count: 7
  },
  {
    name: "Airport Area",
    image: photo("photo-1600210492486-724fe5c67fb0"),
    description: "Convenient stopovers, parking, and easy arrivals for short trips.",
    count: 12
  }
];

export const hotelTypes = ["Family Hotel", "Guesthouse", "Aparthotel", "Mini Hotel"];
export const budgetRanges = ["Budget", "Mid", "Premium"];
