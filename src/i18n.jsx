import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  areas as baseAreas,
  budgetRanges as baseBudgetRanges,
  hotels as baseHotels,
  hotelTypes as baseHotelTypes
} from "./data/hotels.js";

export const languages = [
  { code: "en", label: "English", nativeName: "English", htmlLang: "en", dir: "ltr" },
  { code: "ka", label: "Georgian", nativeName: "ქართული", htmlLang: "ka", dir: "ltr" },
  { code: "ru", label: "Russian", nativeName: "Русский", htmlLang: "ru", dir: "ltr" },
  { code: "tr", label: "Turkish", nativeName: "Türkçe", htmlLang: "tr", dir: "ltr" },
  { code: "he", label: "Hebrew", nativeName: "עברית", htmlLang: "he", dir: "rtl" },
  { code: "ar", label: "Arabic", nativeName: "العربية", htmlLang: "ar", dir: "rtl" }
];

const dictionaries = {
  en: {
    common: {
      language: "Language",
      all: "All",
      hotelCount: "{{count}} hotels",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      brandHome: "Small Hotels Batumi home",
      photoGallery: "{{hotelName}} photo gallery",
      tagsLabel: "{{hotelName}} tags",
      hotelImageAlt: "{{hotelName}} in {{area}}",
      areaImageAlt: "{{area}} in Batumi",
      mapLabel: "Map placeholder for {{hotelName}}"
    },
    nav: {
      hotels: "Hotels",
      owners: "For Hotel Owners",
      contact: "Contact",
      listYourHotel: "List Your Hotel",
      viewHotels: "View Hotels",
      requestDemo: "Request Demo"
    },
    footer: {
      text: "A premium demo platform for local hotels, guesthouses, aparthotels, and family stays in Batumi.",
      viewHotels: "View Hotels",
      owners: "For Hotel Owners",
      requestDemo: "Request Demo"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | Independent Hotels and Guesthouses",
      homeDescription:
        "Discover small independent hotels in Batumi, presented with professional photography and direct contact options.",
      hotelsTitle: "Hotels in Batumi | Small Hotels Batumi",
      hotelsDescription:
        "Browse demo small hotels, family hotels, guesthouses, aparthotels, and mini hotels in Batumi.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription:
        "{{hotelName}} in {{area}}. View photos, facilities, nearby attractions, and direct contact options.",
      ownersTitle: "For Hotel Owners | Small Hotels Batumi",
      ownersDescription:
        "Get your small Batumi hotel professionally presented online with photography, a dedicated page, direct WhatsApp enquiries, and simple pricing.",
      contactTitle: "Request a Demo | Small Hotels Batumi",
      contactDescription:
        "Request a demo for your small hotel, guesthouse, aparthotel, or mini hotel in Batumi."
    },
    cta: {
      title: "Show Your Hotel to More Guests",
      body:
        "Turn a simple local hotel into a polished online presentation with professional photos, direct enquiries, and a page guests can trust.",
      button: "Request Demo"
    },
    whatsapp: {
      ask: "Ask on WhatsApp",
      short: "WhatsApp",
      hotelMessage: "Hello, I am interested in {{hotelName}} on Small Hotels Batumi.",
      demoMessage: "Hello, I would like to request a demo for Small Hotels Batumi."
    },
    home: {
      heroTitle: "Discover Small Independent Hotels in Batumi",
      heroBody:
        "Family hotels, guesthouses and local stays presented with professional photography and direct contact options.",
      showcaseLabel: "Large hotel photography showcase",
      showcaseSeaAlt: "Sea view hotel room in Batumi",
      showcaseExteriorAlt: "Small hotel exterior in Batumi",
      showcaseCoastalAlt: "Coastal guesthouse view",
      introTitle: "Presented like a boutique travel guide, not a booking directory.",
      introBody:
        "Every page is designed to make a real local hotel feel trustworthy, polished, and easy to contact.",
      proofPhotography: "Photography first",
      proofEnquiries: "Direct enquiries",
      proofCommission: "No booking commission",
      featuredTitle: "Featured Hotels",
      featuredBody:
        "Six demo hotels show how different local properties can be presented with a consistent premium style.",
      viewAllHotels: "View all hotels",
      areasTitle: "Explore Areas",
      areasBody:
        "Owners can see how location becomes part of the sales story, from Old Batumi to quieter coastal villages.",
      whyTitle: "Why Small Hotels?",
      whyBody:
        "Batumi's smaller hotels often have the warmth guests want, but not the presentation they need. This demo shows how a better visual story can make local ownership feel like an advantage.",
      features: [
        {
          title: "Personal service",
          body: "Guests know they are speaking to real owners and hosts, not a distant call center."
        },
        {
          title: "Local ownership",
          body: "Each listing highlights the neighborhood, host style, and story behind the property."
        },
        {
          title: "Authentic experience",
          body: "Small places can compete with character, warmth, and real photography."
        },
        {
          title: "Better value",
          body: "Direct contact supports simple requests without complex booking systems or commissions."
        }
      ],
      howTitle: "How It Works",
      howBody: "Two simple journeys: one for guests, one for hotel owners.",
      guestsTitle: "For guests",
      ownersTitle: "For hotel owners",
      guestSteps: ["Discover hotel", "View photos", "Contact directly", "Book stay"],
      ownerSteps: ["Photography", "Hotel page", "Direct enquiries", "Increased visibility"]
    },
    hotelsPage: {
      title: "Hotels in Batumi",
      body:
        "A mobile-first grid view for family hotels, guesthouses, aparthotels, and mini hotels. Filters are local for this demo.",
      filtersLabel: "Hotel filters",
      filtersTitle: "Filters",
      clear: "Clear",
      area: "Area",
      type: "Hotel Type",
      budget: "Budget Range",
      options: {
        familyFriendly: "Family Friendly",
        seaView: "Sea View",
        nearBeach: "Near Beach",
        parking: "Parking"
      },
      resultsTitle: "{{count}} hotels available",
      resultsBody:
        "Each card keeps photos, area, tags, WhatsApp, and detail-page access close together.",
      emptyTitle: "No hotels match these filters.",
      emptyBody: "Clear a filter to see more demo properties."
    },
    hotelCard: {
      viewHotel: "View Hotel"
    },
    detail: {
      backToHotels: "Hotels",
      call: "Call",
      email: "Email",
      whyStay: "Why stay here",
      rooms: "Room overview",
      facilities: "Facilities",
      location: "Location",
      locationBody:
        "This demo map area shows where a lightweight local page can explain access, nearby attractions, and neighborhood context without becoming a complex booking tool.",
      nearby: "Nearby attractions",
      ctaTitle: "Want Your Hotel Presented Like This?",
      ctaBody:
        "This detail page is the sales argument: professional photos, simple contact, and a premium story for a local property.",
      ctaButton: "Request Demo"
    },
    owners: {
      heroTitle: "Get Your Hotel Professionally Presented Online",
      heroBody:
        "A focused sales page, professional photography, and direct contact options for small hotels that need a better online presence without building a full website.",
      requestDemo: "Request Demo",
      seeExample: "See Example Page",
      includesTitle: "What the service includes",
      includesBody:
        "The platform is intentionally simple. It helps an owner look professional, collect direct enquiries, and show guests the property clearly.",
      features: [
        {
          title: "Professional photography",
          body:
            "Rooms, bathrooms, exterior, breakfast areas, facilities, and surroundings are presented with care."
        },
        {
          title: "Dedicated hotel page",
          body:
            "Each property gets a polished page with photos, location, facilities, and practical guest details."
        },
        {
          title: "Direct WhatsApp enquiries",
          body: "Guests can contact the owner directly without learning a complicated system."
        },
        {
          title: "Direct booking requests",
          body: "Simple request forms create clear leads without accounts, payments, or PMS integrations."
        }
      ],
      services: [
        ["WhatsApp ready", "Fast contact in the channel owners already use."],
        ["No booking commission", "Keep the direct enquiry instead of losing margin."],
        ["Simple lead collection", "Requests are structured so follow-up is easier."],
        ["Premium first impression", "A better page makes a small hotel feel more valuable."]
      ],
      pricingTitle: "Pricing",
      pricingBody: "Clear packages for a sales conversation with hotel owners.",
      pricing: [
        {
          title: "Starter Listing",
          price: "100 GEL/month",
          note: "During high season",
          items: ["Hotel profile", "Gallery", "Contact buttons", "Booking request form", "Area listing"]
        },
        {
          title: "Photography Package",
          price: "One-time fee",
          note: "Professional image set for the hotel page",
          items: ["Rooms", "Bathrooms", "Exterior", "Breakfast area", "Facilities", "Surroundings"]
        },
        {
          title: "Booking Request Setup",
          price: "One-time fee",
          note: "Direct enquiry setup for simple guest leads",
          items: ["Contact form", "WhatsApp integration", "Lead collection", "Simple booking flow"]
        }
      ],
      processTitle: "From ordinary listing to premium presentation",
      processBody: "The sales demo is designed to make the difference visible on a phone in under a minute.",
      processSteps: ["Photos", "Page", "Enquiries", "Leads"]
    },
    contact: {
      title: "Request a Demo",
      body:
        "Share a few details about your hotel. The demo shows how your property could look with professional photography, a dedicated page, WhatsApp, and direct booking requests.",
      builtTitle: "Built for small hotels in Batumi",
      builtBody:
        "The goal is simple: help owners look professional online without an expensive custom website or complicated booking system.",
      bestForLabel: "Best for",
      bestFor: "Family hotels, guesthouses, aparthotels, mini hotels",
      channelsLabel: "Main channels",
      channels: "WhatsApp, phone, email, booking request form",
      focusLabel: "Demo focus",
      focus: "Photography, trust, simplicity, direct contact"
    },
    forms: {
      name: "Name",
      hotelName: "Hotel Name",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      message: "Message",
      bookingTitle: "Booking request",
      bookingBody: "Send a simple enquiry directly to the hotel owner. No payment is taken here.",
      phoneWhatsapp: "Phone or WhatsApp",
      arrival: "Arrival",
      nights: "Nights",
      bookingMessage: "Hello, I would like to check availability at {{hotelName}}.",
      sendRequest: "Send Request",
      bookingSuccess: "Demo request captured. In production this would go to the hotel owner.",
      contactMessage: "I would like to see how my hotel can be presented on Small Hotels Batumi.",
      contactButton: "Request a Demo",
      contactSuccess: "Demo enquiry received locally for this sales demo."
    },
    data: {
      areas: {
        "Old Batumi": "Old Batumi",
        Boulevard: "Boulevard",
        "New Boulevard": "New Boulevard",
        Gonio: "Gonio",
        Kvariati: "Kvariati",
        Makhinjauri: "Makhinjauri",
        "Green Cape": "Green Cape",
        "Airport Area": "Airport Area"
      },
      areaDescriptions: {
        "Old Batumi": "Historic streets, cafes, restored facades, and easy walks to the boulevard.",
        Boulevard: "Central seaside energy with parks, beach cafes, and classic Batumi promenades.",
        "New Boulevard": "Modern apartments, sea-view rooms, and longer-stay options near the coast.",
        Gonio: "A quieter beach area for families, summer trips, and simple local stays.",
        Kvariati: "Hillside sea views, calm guesthouses, and a slower coastal rhythm.",
        Makhinjauri: "Green surroundings, practical guesthouses, and fast access to Batumi.",
        "Green Cape": "Garden stays and nature-focused visits near the botanical garden.",
        "Airport Area": "Convenient stopovers, parking, and easy arrivals for short trips."
      },
      hotelTypes: {
        "Family Hotel": "Family Hotel",
        Guesthouse: "Guesthouse",
        Aparthotel: "Aparthotel",
        "Mini Hotel": "Mini Hotel"
      },
      budgets: {
        Budget: "Budget",
        Mid: "Mid",
        Premium: "Premium"
      },
      tags: {
        "Family run": "Family run",
        "Old town": "Old town",
        Breakfast: "Breakfast",
        "Near beach": "Near beach",
        Garden: "Garden",
        "Great value": "Great value",
        "Sea view": "Sea view",
        "Apart rooms": "Apart rooms",
        Modern: "Modern",
        Quiet: "Quiet",
        Nature: "Nature",
        Parking: "Parking",
        "Local host": "Local host",
        Hillside: "Hillside",
        Couples: "Couples"
      }
    }
  },
  ka: {
    common: {
      language: "ენა",
      all: "ყველა",
      hotelCount: "{{count}} სასტუმრო",
      openMenu: "მენიუს გახსნა",
      closeMenu: "მენიუს დახურვა",
      brandHome: "Small Hotels Batumi მთავარი",
      photoGallery: "{{hotelName}} ფოტოგალერეა",
      tagsLabel: "{{hotelName}} თეგები",
      hotelImageAlt: "{{hotelName}} ბათუმში",
      areaImageAlt: "{{area}} ბათუმში",
      mapLabel: "{{hotelName}} რუკის ადგილი"
    },
    nav: {
      hotels: "სასტუმროები",
      owners: "მესაკუთრეებისთვის",
      contact: "კონტაქტი",
      listYourHotel: "დაამატე სასტუმრო",
      viewHotels: "სასტუმროების ნახვა",
      requestDemo: "დემოს მოთხოვნა"
    },
    footer: {
      text: "პრემიუმ დემო პლატფორმა ბათუმის ადგილობრივი სასტუმროებისთვის, გესთჰაუსებისთვის, აპარტოტელებისთვის და ოჯახური დასვენებისთვის.",
      viewHotels: "სასტუმროების ნახვა",
      owners: "მესაკუთრეებისთვის",
      requestDemo: "დემოს მოთხოვნა"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | დამოუკიდებელი სასტუმროები და გესთჰაუსები",
      homeDescription:
        "აღმოაჩინეთ პატარა დამოუკიდებელი სასტუმროები ბათუმში პროფესიონალური ფოტოებით და პირდაპირი საკონტაქტო გზებით.",
      hotelsTitle: "სასტუმროები ბათუმში | Small Hotels Batumi",
      hotelsDescription: "დაათვალიერეთ ოჯახური სასტუმროები, გესთჰაუსები, აპარტოტელები და მინი სასტუმროები ბათუმში.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription:
        "{{hotelName}} {{area}}-ში. ნახეთ ფოტოები, სერვისები, ახლომდებარე ადგილები და პირდაპირი კონტაქტი.",
      ownersTitle: "მესაკუთრეებისთვის | Small Hotels Batumi",
      ownersDescription:
        "წარადგინეთ თქვენი პატარა სასტუმრო ბათუმში პროფესიონალური ფოტოებით, ცალკე გვერდით, WhatsApp მოთხოვნებით და მარტივი ფასებით.",
      contactTitle: "დემოს მოთხოვნა | Small Hotels Batumi",
      contactDescription: "მოითხოვეთ დემო თქვენი პატარა სასტუმროსთვის, გესთჰაუსისთვის, აპარტოტელისთვის ან მინი სასტუმროსთვის."
    },
    cta: {
      title: "აჩვენეთ თქვენი სასტუმრო მეტ სტუმარს",
      body:
        "მარტივი ადგილობრივი სასტუმრო გადააქციეთ სანდო ონლაინ პრეზენტაციად პროფესიონალური ფოტოებით, პირდაპირი მოთხოვნებით და სტუმრებისთვის გასაგები გვერდით.",
      button: "დემოს მოთხოვნა"
    },
    whatsapp: {
      ask: "იკითხეთ WhatsApp-ზე",
      short: "WhatsApp",
      hotelMessage: "გამარჯობა, მაინტერესებს {{hotelName}} Small Hotels Batumi-ზე.",
      demoMessage: "გამარჯობა, მსურს Small Hotels Batumi-ის დემოს მოთხოვნა."
    },
    home: {
      heroTitle: "აღმოაჩინეთ პატარა დამოუკიდებელი სასტუმროები ბათუმში",
      heroBody: "ოჯახური სასტუმროები, გესთჰაუსები და ადგილობრივი დასვენებები პროფესიონალური ფოტოებით და პირდაპირი კონტაქტით.",
      showcaseLabel: "დიდი სასტუმრო ფოტოების ჩვენება",
      showcaseSeaAlt: "ზღვის ხედიანი სასტუმროს ოთახი ბათუმში",
      showcaseExteriorAlt: "პატარა სასტუმროს ექსტერიერი ბათუმში",
      showcaseCoastalAlt: "სანაპირო გესთჰაუსის ხედი",
      introTitle: "ბუტიკური სამოგზაურო გზამკვლევივით, არა ჩვეულებრივი დაჯავშნის კატალოგივით.",
      introBody: "ყოველი გვერდი ეხმარება რეალურ ადგილობრივ სასტუმროს გამოიყურებოდეს სანდოდ, დახვეწილად და ადვილად საკონტაქტოდ.",
      proofPhotography: "ფოტოები პირველ რიგში",
      proofEnquiries: "პირდაპირი მოთხოვნები",
      proofCommission: "დაჯავშნის კომისიის გარეშე",
      featuredTitle: "გამორჩეული სასტუმროები",
      featuredBody: "ექვსი დემო სასტუმრო აჩვენებს, როგორ შეიძლება სხვადასხვა ადგილობრივი ობიექტის ერთიან პრემიუმ სტილში წარმოდგენა.",
      viewAllHotels: "ყველა სასტუმრო",
      areasTitle: "უბნების დათვალიერება",
      areasBody: "მესაკუთრეები ხედავენ, როგორ ხდება მდებარეობა გაყიდვის ისტორიის ნაწილი ძველი ბათუმიდან მშვიდ სანაპირო სოფლებამდე.",
      whyTitle: "რატომ Small Hotels?",
      whyBody:
        "ბათუმის პატარა სასტუმროებს ხშირად აქვთ სტუმრებისთვის სასურველი სითბო, მაგრამ არა საჭირო პრეზენტაცია. ეს დემო აჩვენებს, როგორ აქცევს უკეთესი ვიზუალური ამბავი ადგილობრივ მფლობელობას უპირატესობად.",
      features: [
        ["პერსონალური სერვისი", "სტუმრები ხედავენ, რომ საუბრობენ რეალურ მესაკუთრეებთან და მასპინძლებთან, არა შორეულ ქოლ-ცენტრთან."],
        ["ადგილობრივი მფლობელობა", "ყოველი განცხადება უსვამს ხაზს უბანს, მასპინძლის სტილს და ობიექტის ისტორიას."],
        ["ნამდვილი გამოცდილება", "პატარა ადგილებს შეუძლიათ კონკურენცია ხასიათით, სითბოთი და რეალური ფოტოებით."],
        ["უკეთესი ღირებულება", "პირდაპირი კონტაქტი ამარტივებს მოთხოვნებს რთული სისტემებისა და კომისიების გარეშე."]
      ],
      howTitle: "როგორ მუშაობს",
      howBody: "ორი მარტივი გზა: სტუმრებისთვის და სასტუმროს მესაკუთრეებისთვის.",
      guestsTitle: "სტუმრებისთვის",
      ownersTitle: "სასტუმროს მესაკუთრეებისთვის",
      guestSteps: ["სასტუმროს პოვნა", "ფოტოების ნახვა", "პირდაპირი კონტაქტი", "დასვენების დაჯავშნა"],
      ownerSteps: ["ფოტოგადაღება", "სასტუმროს გვერდი", "პირდაპირი მოთხოვნები", "მეტი ხილვადობა"]
    },
    hotelsPage: {
      title: "სასტუმროები ბათუმში",
      body: "მობილურზე მორგებული ბადე ოჯახური სასტუმროებისთვის, გესთჰაუსებისთვის, აპარტოტელებისთვის და მინი სასტუმროებისთვის. ფილტრები ადგილობრივად მუშაობს ამ დემოში.",
      filtersLabel: "სასტუმროს ფილტრები",
      filtersTitle: "ფილტრები",
      clear: "გასუფთავება",
      area: "უბანი",
      type: "სასტუმროს ტიპი",
      budget: "ბიუჯეტი",
      options: {
        familyFriendly: "ოჯახებისთვის",
        seaView: "ზღვის ხედი",
        nearBeach: "პლაჟთან ახლოს",
        parking: "პარკინგი"
      },
      resultsTitle: "{{count}} სასტუმრო ხელმისაწვდომია",
      resultsBody: "თითოეულ ბარათში ფოტოები, უბანი, თეგები, WhatsApp და დეტალური გვერდი ერთად ჩანს.",
      emptyTitle: "ამ ფილტრებს არცერთი სასტუმრო არ ემთხვევა.",
      emptyBody: "მეტი დემო ობიექტის სანახავად გაასუფთავეთ ფილტრი."
    },
    hotelCard: {
      viewHotel: "სასტუმროს ნახვა"
    },
    detail: {
      backToHotels: "სასტუმროები",
      call: "დარეკვა",
      email: "ელფოსტა",
      whyStay: "რატომ დარჩეთ აქ",
      rooms: "ოთახების მიმოხილვა",
      facilities: "სერვისები",
      location: "მდებარეობა",
      locationBody:
        "ეს დემო რუკის ზონა აჩვენებს, როგორ შეუძლია მსუბუქ ადგილობრივ გვერდს ახსნას მისვლა, ახლომდებარე ადგილები და უბნის კონტექსტი რთულ დაჯავშნის სისტემად ქცევის გარეშე.",
      nearby: "ახლომდებარე ადგილები",
      ctaTitle: "გინდათ თქვენი სასტუმრო ასე იყოს წარმოდგენილი?",
      ctaBody: "ეს დეტალური გვერდი არის გაყიდვის არგუმენტი: პროფესიონალური ფოტოები, მარტივი კონტაქტი და პრემიუმ ისტორია ადგილობრივი ობიექტისთვის.",
      ctaButton: "დემოს მოთხოვნა"
    },
    owners: {
      heroTitle: "წარადგინეთ თქვენი სასტუმრო პროფესიონალურად ონლაინ",
      heroBody:
        "ფოკუსირებული გაყიდვების გვერდი, პროფესიონალური ფოტოები და პირდაპირი საკონტაქტო გზები პატარა სასტუმროებისთვის, რომლებსაც უკეთესი ონლაინ სახე სჭირდებათ სრული ვებსაიტის გარეშე.",
      requestDemo: "დემოს მოთხოვნა",
      seeExample: "მაგალითი გვერდი",
      includesTitle: "რას მოიცავს სერვისი",
      includesBody: "პლატფორმა განზრახ მარტივია. ის ეხმარება მესაკუთრეს გამოიყურებოდეს პროფესიონალურად, მიიღოს პირდაპირი მოთხოვნები და ნათლად აჩვენოს ობიექტი.",
      features: [
        ["პროფესიონალური ფოტოგადაღება", "ოთახები, სველი წერტილები, ექსტერიერი, საუზმის ზონები, სერვისები და გარემო ყურადღებით არის წარმოდგენილი."],
        ["ცალკე სასტუმროს გვერდი", "ყოველ ობიექტს აქვს დახვეწილი გვერდი ფოტოებით, მდებარეობით, სერვისებით და პრაქტიკული დეტალებით."],
        ["პირდაპირი WhatsApp მოთხოვნები", "სტუმრებს შეუძლიათ მესაკუთრეს პირდაპირ დაუკავშირდნენ რთული სისტემის სწავლების გარეშე."],
        ["პირდაპირი დაჯავშნის მოთხოვნები", "მარტივი ფორმები ქმნის მკაფიო ლიდებს ანგარიშების, გადახდების ან PMS ინტეგრაციების გარეშე."]
      ],
      services: [
        ["WhatsApp მზადაა", "სწრაფი კონტაქტი იმ არხში, რომელსაც მესაკუთრეები უკვე იყენებენ."],
        ["დაჯავშნის კომისიის გარეშე", "შეინარჩუნეთ პირდაპირი მოთხოვნა და არ დაკარგოთ მარჟა."],
        ["მარტივი ლიდების შეგროვება", "მოთხოვნები სტრუქტურირებულია, რომ შემდგომი კომუნიკაცია გაადვილდეს."],
        ["პრემიუმ პირველი შთაბეჭდილება", "უკეთესი გვერდი პატარა სასტუმროს უფრო ღირებულად წარმოაჩენს."]
      ],
      pricingTitle: "ფასები",
      pricingBody: "მკაფიო პაკეტები სასტუმროს მესაკუთრეებთან სასაუბრო გაყიდვებისთვის.",
      pricing: [
        { title: "საწყისი განცხადება", price: "100 GEL/თვე", note: "მაღალ სეზონზე", items: ["სასტუმროს პროფილი", "გალერეა", "საკონტაქტო ღილაკები", "დაჯავშნის მოთხოვნის ფორმა", "უბნის სიაში გამოჩენა"] },
        { title: "ფოტოგადაღების პაკეტი", price: "ერთჯერადი საფასური", note: "პროფესიონალური ფოტო ნაკრები სასტუმროს გვერდისთვის", items: ["ოთახები", "სველი წერტილები", "ექსტერიერი", "საუზმის ზონა", "სერვისები", "გარემო"] },
        { title: "დაჯავშნის მოთხოვნის დაყენება", price: "ერთჯერადი საფასური", note: "პირდაპირი მოთხოვნების დაყენება მარტივი სტუმრის ლიდებისთვის", items: ["საკონტაქტო ფორმა", "WhatsApp ინტეგრაცია", "ლიდების შეგროვება", "მარტივი დაჯავშნის გზა"] }
      ],
      processTitle: "ჩვეულებრივი განცხადებიდან პრემიუმ პრეზენტაციამდე",
      processBody: "გაყიდვების დემო ისეა შექმნილი, რომ განსხვავება ტელეფონზე ერთ წუთზე ნაკლებში გამოჩნდეს.",
      processSteps: ["ფოტოები", "გვერდი", "მოთხოვნები", "ლიდები"]
    },
    contact: {
      title: "დემოს მოთხოვნა",
      body: "გაგვიზიარეთ რამდენიმე დეტალი თქვენი სასტუმროს შესახებ. დემო აჩვენებს, როგორ შეიძლება გამოიყურებოდეს თქვენი ობიექტი პროფესიონალური ფოტოებით, ცალკე გვერდით, WhatsApp-ით და პირდაპირი დაჯავშნის მოთხოვნებით.",
      builtTitle: "შექმნილია ბათუმის პატარა სასტუმროებისთვის",
      builtBody: "მიზანი მარტივია: დაეხმაროს მესაკუთრეებს პროფესიონალურად გამოჩნდნენ ონლაინ ძვირი ვებსაიტის ან რთული დაჯავშნის სისტემის გარეშე.",
      bestForLabel: "საუკეთესოა",
      bestFor: "ოჯახური სასტუმროები, გესთჰაუსები, აპარტოტელები, მინი სასტუმროები",
      channelsLabel: "მთავარი არხები",
      channels: "WhatsApp, ტელეფონი, ელფოსტა, დაჯავშნის მოთხოვნის ფორმა",
      focusLabel: "დემოს ფოკუსი",
      focus: "ფოტოგრაფია, ნდობა, სიმარტივე, პირდაპირი კონტაქტი"
    },
    forms: {
      name: "სახელი",
      hotelName: "სასტუმროს სახელი",
      phone: "ტელეფონი",
      whatsapp: "WhatsApp",
      email: "ელფოსტა",
      message: "შეტყობინება",
      bookingTitle: "დაჯავშნის მოთხოვნა",
      bookingBody: "გაგზავნეთ მარტივი მოთხოვნა პირდაპირ სასტუმროს მესაკუთრესთან. აქ გადახდა არ ხდება.",
      phoneWhatsapp: "ტელეფონი ან WhatsApp",
      arrival: "ჩამოსვლა",
      nights: "ღამეები",
      bookingMessage: "გამარჯობა, მსურს შევამოწმო ხელმისაწვდომობა {{hotelName}}-ში.",
      sendRequest: "მოთხოვნის გაგზავნა",
      bookingSuccess: "დემო მოთხოვნა დაფიქსირდა. წარმოებაში ეს სასტუმროს მესაკუთრეს გაეგზავნება.",
      contactMessage: "მსურს ვნახო, როგორ შეიძლება ჩემი სასტუმრო Small Hotels Batumi-ზე იყოს წარმოდგენილი.",
      contactButton: "დემოს მოთხოვნა",
      contactSuccess: "დემო მოთხოვნა ადგილობრივად მიღებულია ამ გაყიდვების დემოსთვის."
    },
    data: {
      areas: {
        "Old Batumi": "ძველი ბათუმი",
        Boulevard: "ბულვარი",
        "New Boulevard": "ახალი ბულვარი",
        Gonio: "გონიო",
        Kvariati: "კვარიათი",
        Makhinjauri: "მახინჯაური",
        "Green Cape": "მწვანე კონცხი",
        "Airport Area": "აეროპორტის ზონა"
      },
      areaDescriptions: {
        "Old Batumi": "ისტორიული ქუჩები, კაფეები, აღდგენილი ფასადები და მარტივი სეირნობა ბულვარამდე.",
        Boulevard: "ცენტრალური ზღვისპირა ენერგია პარკებით, პლაჟის კაფეებით და კლასიკური ბათუმური პრომენადებით.",
        "New Boulevard": "თანამედროვე აპარტამენტები, ზღვის ხედიანი ოთახები და გრძელი დასვენებისთვის შესაფერისი არჩევანი სანაპიროსთან.",
        Gonio: "უფრო მშვიდი პლაჟის ზონა ოჯახებისთვის, ზაფხულის მოგზაურობებისთვის და მარტივი ადგილობრივი დასვენებისთვის.",
        Kvariati: "ზღვის ხედები ფერდობიდან, მშვიდი გესთჰაუსები და ნელი სანაპირო რიტმი.",
        Makhinjauri: "მწვანე გარემო, პრაქტიკული გესთჰაუსები და სწრაფი წვდომა ბათუმთან.",
        "Green Cape": "ბაღიანი დასვენებები და ბუნებაზე ორიენტირებული ვიზიტები ბოტანიკურ ბაღთან.",
        "Airport Area": "მოსახერხებელი გაჩერებები, პარკინგი და მარტივი ჩამოსვლა მოკლე მოგზაურობებისთვის."
      },
      hotelTypes: {
        "Family Hotel": "ოჯახური სასტუმრო",
        Guesthouse: "გესთჰაუსი",
        Aparthotel: "აპარტოტელი",
        "Mini Hotel": "მინი სასტუმრო"
      },
      budgets: {
        Budget: "ბიუჯეტური",
        Mid: "საშუალო",
        Premium: "პრემიუმ"
      },
      tags: {
        "Family run": "ოჯახური მართვა",
        "Old town": "ძველი ქალაქი",
        Breakfast: "საუზმე",
        "Near beach": "პლაჟთან ახლოს",
        Garden: "ბაღი",
        "Great value": "კარგი ფასი",
        "Sea view": "ზღვის ხედი",
        "Apart rooms": "აპარტამენტის ოთახები",
        Modern: "თანამედროვე",
        Quiet: "მშვიდი",
        Nature: "ბუნება",
        Parking: "პარკინგი",
        "Local host": "ადგილობრივი მასპინძელი",
        Hillside: "ფერდობი",
        Couples: "წყვილები"
      },
      rooms: {
        "Double rooms": "ორადგილიანი ოთახები",
        "Triple family rooms": "სამადგილიანი ოჯახური ოთახები",
        "Small balcony rooms": "პატარა აივნიანი ოთახები",
        "Standard doubles": "სტანდარტული ორადგილიანი",
        "Twin rooms": "ტვინ ოთახები",
        "Family room with sofa": "ოჯახური ოთახი დივნით",
        "Studio apartments": "სტუდიო აპარტამენტები",
        "One-bedroom apartments": "ერთსაძინებლიანი აპარტამენტები",
        "Sea-view family apartment": "ზღვის ხედიანი ოჯახური აპარტამენტი",
        "Garden double rooms": "ბაღის ორადგილიანი ოთახები",
        "Triple rooms": "სამადგილიანი ოთახები",
        "Ground-floor family room": "პირველ სართულზე ოჯახური ოთახი",
        "Family room": "ოჯახური ოთახი",
        "Sea-view double rooms": "ზღვის ხედიანი ორადგილიანი ოთახები",
        "Balcony rooms": "აივნიანი ოთახები",
        "Compact twin rooms": "კომპაქტური ტვინ ოთახები"
      },
      facilities: {
        "Wi-Fi": "Wi-Fi",
        Breakfast: "საუზმე",
        "Air conditioning": "კონდიციონერი",
        "Laundry help": "სარეცხის დახმარება",
        "Airport pickup": "აეროპორტიდან დახვედრა",
        Garden: "ბაღი",
        Parking: "პარკინგი",
        "Shared kitchen": "საერთო სამზარეულო",
        Kitchenette: "სამზარეულო კუთხე",
        Lift: "ლიფტი",
        Balcony: "აივანი",
        "Sea view": "ზღვის ხედი",
        "Garden terrace": "ბაღის ტერასა",
        "Outdoor seating": "გარე დასაჯდომი",
        Terrace: "ტერასა",
        "Breakfast terrace": "საუზმის ტერასა"
      },
      nearby: {
        "Piazza Square": "პიაცას მოედანი",
        "Europe Square": "ევროპის მოედანი",
        "Batumi Boulevard": "ბათუმის ბულვარი",
        "Alphabet Tower": "ანბანის კოშკი",
        "6 May Park": "6 მაისის პარკი",
        Dolphinarium: "დელფინარიუმი",
        "Central Boulevard": "ცენტრალური ბულვარი",
        "Beach cafes": "პლაჟის კაფეები",
        "New Boulevard": "ახალი ბულვარი",
        "Metro City": "მეტრო სითი",
        "Aqua park": "აკვაპარკი",
        "Beach promenade": "პლაჟის პრომენადი",
        "Batumi Botanical Garden": "ბათუმის ბოტანიკური ბაღი",
        "Green Cape beach": "მწვანე კონცხის პლაჟი",
        "Mtsvane Kontskhi station": "მწვანე კონცხის სადგური",
        "Gonio Fortress": "გონიოს ციხე",
        "Gonio beach": "გონიოს პლაჟი",
        "Local restaurants": "ადგილობრივი რესტორნები",
        "Airport road": "აეროპორტის გზა",
        "Kvariati beach": "კვარიათის პლაჟი",
        "Sarpi road": "სარფის გზა",
        "Mountain viewpoints": "მთის ხედები"
      }
    },
    hotels: {
      "old-town-family-hotel": {
        intro: "მშვიდი ოჯახური სასტუმრო ისტორიულ ცენტრში, კაფეებთან, ბულვართან და ზღვისპირა საღამოს სეირნობებთან ახლოს.",
        whyStay: ["მეგობრული მესაკუთრეები ახლოს ცხოვრობენ და ადგილობრივ რჩევებს გაძლევენ.", "მშვიდი ოთახები ძველი ბათუმის ყველაზე ხმაურიანი ქუჩების მიღმა.", "მარტივი საუზმე და პირდაპირი კომუნიკაცია."]
      },
      "sea-breeze-guesthouse": {
        intro: "მოდუნებული გესთჰაუსი ბულვართან, ჩრდილიანი ეზოთი და პრაქტიკული ოთახებით გრძელი დასვენებისთვის.",
        whyStay: ["პლაჟამდე მოკლე გზაა დიდი სასტუმროს ფასის გარეშე.", "მასპინძლები გეხმარებიან ტაქსსა და ადგილობრივ რეკომენდაციებში.", "კარგი არჩევანია ოჯახებისთვის და მანქანით ჩამოსული სტუმრებისთვის."]
      },
      "new-boulevard-apart-stay": {
        intro: "ნათელი აპარტამენტის ტიპის დასვენება ახალ ბულვარში სტუმრებისთვის, ვისაც მეტი სივრცე და ზღვის ხედი სურს.",
        whyStay: ["სამზარეულო კუთხიანი ოთახები გრძელ ბათუმურ მოგზაურობას ამარტივებს.", "თანამედროვე ინტერიერი ონლაინ მოთხოვნებისთვის ლამაზად გამოიყურება.", "პირდაპირი კონტაქტი დაჯავშნის საუბარს მარტივს ხდის."]
      },
      "green-garden-mini-hotel": {
        intro: "მშვიდი მინი სასტუმრო მწვანე გარემოში სტუმრებისთვის, ვისაც ცენტრის გარეთ ნელი დასვენება სურს.",
        whyStay: ["ბაღი ობიექტს თბილ ოჯახურ ხასიათს აძლევს.", "ბუნებასთან ახლოს ხართ ბათუმთან კავშირის დაკარგვის გარეშე.", "ძლიერი არჩევანია მანქანით ჩამოსული სტუმრებისთვის."]
      },
      "gonio-quiet-house": {
        intro: "მარტივი და მშვიდი გესთჰაუსი გონიოში პლაჟის დღეებისთვის, ოჯახური დასვენებისთვის და ნაკლები ხმაურის მოყვარულებისთვის.",
        whyStay: ["მშვიდი ადგილობრივი უბანი პლაჟთან სწრაფი მისვლით.", "კარგი ღირებულება ზაფხულის დასვენებისთვის ბათუმის ცენტრს გარეთ.", "მესაკუთრეები WhatsApp-ზე სწრაფად პასუხობენ."]
      },
      "kvariati-view-rooms": {
        intro: "პატარა ფერდობის სასტუმრო ღია ხედებით შავი ზღვისკენ და უფრო მშვიდი შეგრძნებით, ვიდრე ბათუმის ცენტრი.",
        whyStay: ["ზღვის ხედიანი ოთახები ონლაინ პირველ შთაბეჭდილებას ამახსოვრებს.", "კარგია წყვილებისთვის და ნელი სანაპირო მოგზაურობებისთვის.", "პირდაპირი დაჯავშნის მოთხოვნები მესაკუთრეებს მარჟის დაცვაში ეხმარება."]
      }
    }
  },
  ru: {
    common: {
      language: "Язык",
      all: "Все",
      hotelCount: "{{count}} отелей",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      brandHome: "Главная Small Hotels Batumi",
      photoGallery: "Фотогалерея {{hotelName}}",
      tagsLabel: "Теги {{hotelName}}",
      hotelImageAlt: "{{hotelName}} в Батуми",
      areaImageAlt: "{{area}} в Батуми",
      mapLabel: "Место для карты {{hotelName}}"
    },
    nav: {
      hotels: "Отели",
      owners: "Для владельцев",
      contact: "Контакты",
      listYourHotel: "Добавить отель",
      viewHotels: "Смотреть отели",
      requestDemo: "Запросить демо"
    },
    footer: {
      text: "Премиальная демо-платформа для местных отелей, гостевых домов, апарт-отелей и семейного отдыха в Батуми.",
      viewHotels: "Смотреть отели",
      owners: "Для владельцев",
      requestDemo: "Запросить демо"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | Независимые отели и гостевые дома",
      homeDescription: "Откройте небольшие независимые отели в Батуми с профессиональными фото и прямыми контактами.",
      hotelsTitle: "Отели в Батуми | Small Hotels Batumi",
      hotelsDescription: "Смотрите демо-отели, семейные отели, гостевые дома, апарт-отели и мини-отели в Батуми.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription: "{{hotelName}} в районе {{area}}. Фото, удобства, места рядом и прямые контакты.",
      ownersTitle: "Для владельцев | Small Hotels Batumi",
      ownersDescription: "Профессиональная онлайн-презентация небольшого отеля в Батуми: фото, отдельная страница, заявки WhatsApp и простые цены.",
      contactTitle: "Запросить демо | Small Hotels Batumi",
      contactDescription: "Запросите демо для небольшого отеля, гостевого дома, апарт-отеля или мини-отеля в Батуми."
    },
    cta: {
      title: "Покажите свой отель большему числу гостей",
      body: "Превратите местный отель в аккуратную онлайн-презентацию с профессиональными фото, прямыми заявками и страницей, которой гости доверяют.",
      button: "Запросить демо"
    },
    whatsapp: {
      ask: "Спросить в WhatsApp",
      short: "WhatsApp",
      hotelMessage: "Здравствуйте, меня интересует {{hotelName}} на Small Hotels Batumi.",
      demoMessage: "Здравствуйте, я хочу запросить демо Small Hotels Batumi."
    },
    home: {
      heroTitle: "Небольшие независимые отели в Батуми",
      heroBody: "Семейные отели, гостевые дома и местные варианты проживания с профессиональными фото и прямыми контактами.",
      showcaseLabel: "Большая витрина гостиничных фотографий",
      showcaseSeaAlt: "Номер отеля с видом на море в Батуми",
      showcaseExteriorAlt: "Фасад небольшого отеля в Батуми",
      showcaseCoastalAlt: "Вид из гостевого дома у побережья",
      introTitle: "Как бутик-гид по путешествиям, а не обычный каталог бронирования.",
      introBody: "Каждая страница помогает реальному местному отелю выглядеть надежно, аккуратно и удобно для связи.",
      proofPhotography: "Сначала фотографии",
      proofEnquiries: "Прямые заявки",
      proofCommission: "Без комиссии за бронь",
      featuredTitle: "Рекомендуемые отели",
      featuredBody: "Шесть демо-отелей показывают, как разные местные объекты можно представить в едином премиальном стиле.",
      viewAllHotels: "Все отели",
      areasTitle: "Районы",
      areasBody: "Владельцы видят, как локация становится частью истории продаж: от Старого Батуми до тихих прибрежных поселков.",
      whyTitle: "Почему Small Hotels?",
      whyBody: "Небольшие отели Батуми часто имеют нужное гостям тепло, но не имеют нужной презентации. Это демо показывает, как сильная визуальная история превращает местное владение в преимущество.",
      features: [
        ["Личный сервис", "Гости понимают, что общаются с реальными владельцами и хозяевами, а не с удаленным кол-центром."],
        ["Местное владение", "Каждая карточка подчеркивает район, стиль хозяев и историю объекта."],
        ["Настоящий опыт", "Небольшие места могут конкурировать характером, теплом и реальными фотографиями."],
        ["Лучшая ценность", "Прямой контакт упрощает запросы без сложных систем и комиссий."]
      ],
      howTitle: "Как это работает",
      howBody: "Два простых пути: для гостей и для владельцев отелей.",
      guestsTitle: "Для гостей",
      ownersTitle: "Для владельцев",
      guestSteps: ["Найти отель", "Посмотреть фото", "Связаться напрямую", "Забронировать проживание"],
      ownerSteps: ["Фотосъемка", "Страница отеля", "Прямые заявки", "Больше видимости"]
    },
    hotelsPage: {
      title: "Отели в Батуми",
      body: "Мобильная сетка для семейных отелей, гостевых домов, апарт-отелей и мини-отелей. Фильтры работают локально в этом демо.",
      filtersLabel: "Фильтры отелей",
      filtersTitle: "Фильтры",
      clear: "Очистить",
      area: "Район",
      type: "Тип отеля",
      budget: "Бюджет",
      options: {
        familyFriendly: "Для семей",
        seaView: "Вид на море",
        nearBeach: "Рядом с пляжем",
        parking: "Парковка"
      },
      resultsTitle: "Доступно отелей: {{count}}",
      resultsBody: "В каждой карточке рядом находятся фото, район, теги, WhatsApp и переход на детальную страницу.",
      emptyTitle: "Нет отелей по выбранным фильтрам.",
      emptyBody: "Очистите фильтр, чтобы увидеть больше демо-объектов."
    },
    hotelCard: {
      viewHotel: "Смотреть отель"
    },
    detail: {
      backToHotels: "Отели",
      call: "Позвонить",
      email: "Email",
      whyStay: "Почему стоит остановиться",
      rooms: "Обзор номеров",
      facilities: "Удобства",
      location: "Локация",
      locationBody: "Эта демо-зона карты показывает, как легкая локальная страница может объяснить доступ, места рядом и контекст района без сложного инструмента бронирования.",
      nearby: "Достопримечательности рядом",
      ctaTitle: "Хотите представить свой отель так же?",
      ctaBody: "Эта детальная страница является аргументом продаж: профессиональные фото, простой контакт и премиальная история местного объекта.",
      ctaButton: "Запросить демо"
    },
    owners: {
      heroTitle: "Профессионально представьте свой отель онлайн",
      heroBody: "Фокусная продающая страница, профессиональная фотосъемка и прямые контакты для небольших отелей, которым нужна лучшая онлайн-презентация без полноценного сайта.",
      requestDemo: "Запросить демо",
      seeExample: "Смотреть пример",
      includesTitle: "Что входит в сервис",
      includesBody: "Платформа намеренно простая. Она помогает владельцу выглядеть профессионально, собирать прямые заявки и ясно показывать объект гостям.",
      features: [
        ["Профессиональная фотосъемка", "Номера, ванные, фасад, зоны завтрака, удобства и окружение подаются аккуратно."],
        ["Отдельная страница отеля", "Каждый объект получает полированную страницу с фото, локацией, удобствами и практическими деталями."],
        ["Прямые заявки WhatsApp", "Гости могут напрямую связаться с владельцем без изучения сложной системы."],
        ["Прямые запросы на бронирование", "Простые формы создают понятные лиды без аккаунтов, платежей и PMS-интеграций."]
      ],
      services: [
        ["Готово для WhatsApp", "Быстрый контакт в канале, которым владельцы уже пользуются."],
        ["Без комиссии за бронь", "Сохраняйте прямую заявку вместо потери маржи."],
        ["Простой сбор лидов", "Запросы структурированы, чтобы проще было отвечать."],
        ["Премиальное первое впечатление", "Лучшая страница делает небольшой отель более ценным."]
      ],
      pricingTitle: "Цены",
      pricingBody: "Понятные пакеты для разговора с владельцами отелей.",
      pricing: [
        { title: "Стартовое размещение", price: "100 GEL/месяц", note: "В высокий сезон", items: ["Профиль отеля", "Галерея", "Кнопки контакта", "Форма запроса брони", "Показ в районе"] },
        { title: "Пакет фотосъемки", price: "Разовый платеж", note: "Профессиональный набор изображений для страницы отеля", items: ["Номера", "Ванные", "Экстерьер", "Зона завтрака", "Удобства", "Окружение"] },
        { title: "Настройка запроса брони", price: "Разовый платеж", note: "Настройка прямых заявок для простых лидов гостей", items: ["Контактная форма", "Интеграция WhatsApp", "Сбор лидов", "Простой поток брони"] }
      ],
      processTitle: "От обычного объявления к премиальной презентации",
      processBody: "Демо продаж сделано так, чтобы разница была видна на телефоне меньше чем за минуту.",
      processSteps: ["Фото", "Страница", "Заявки", "Лиды"]
    },
    contact: {
      title: "Запросить демо",
      body: "Расскажите несколько деталей о вашем отеле. Демо показывает, как объект может выглядеть с профессиональными фото, отдельной страницей, WhatsApp и прямыми запросами бронирования.",
      builtTitle: "Создано для небольших отелей Батуми",
      builtBody: "Цель простая: помочь владельцам выглядеть профессионально онлайн без дорогого индивидуального сайта или сложной системы бронирования.",
      bestForLabel: "Лучше всего для",
      bestFor: "Семейных отелей, гостевых домов, апарт-отелей, мини-отелей",
      channelsLabel: "Основные каналы",
      channels: "WhatsApp, телефон, email, форма запроса брони",
      focusLabel: "Фокус демо",
      focus: "Фотография, доверие, простота, прямой контакт"
    },
    forms: {
      name: "Имя",
      hotelName: "Название отеля",
      phone: "Телефон",
      whatsapp: "WhatsApp",
      email: "Email",
      message: "Сообщение",
      bookingTitle: "Запрос бронирования",
      bookingBody: "Отправьте простой запрос напрямую владельцу отеля. Оплата здесь не принимается.",
      phoneWhatsapp: "Телефон или WhatsApp",
      arrival: "Заезд",
      nights: "Ночи",
      bookingMessage: "Здравствуйте, я хотел бы проверить доступность в {{hotelName}}.",
      sendRequest: "Отправить запрос",
      bookingSuccess: "Демо-запрос сохранен. В продакшене он ушел бы владельцу отеля.",
      contactMessage: "Я хотел бы увидеть, как мой отель может быть представлен на Small Hotels Batumi.",
      contactButton: "Запросить демо",
      contactSuccess: "Демо-заявка локально получена для этой презентации продаж."
    },
    data: {
      areas: {
        "Old Batumi": "Старый Батуми",
        Boulevard: "Бульвар",
        "New Boulevard": "Новый бульвар",
        Gonio: "Гонио",
        Kvariati: "Квариати",
        Makhinjauri: "Махинджаури",
        "Green Cape": "Зеленый мыс",
        "Airport Area": "Район аэропорта"
      },
      areaDescriptions: {
        "Old Batumi": "Исторические улицы, кафе, восстановленные фасады и прогулки до бульвара.",
        Boulevard: "Центральная приморская энергия с парками, пляжными кафе и классическими прогулками Батуми.",
        "New Boulevard": "Современные апартаменты, номера с видом на море и варианты для долгого отдыха у побережья.",
        Gonio: "Более тихая пляжная зона для семей, летних поездок и простого местного отдыха.",
        Kvariati: "Виды на море со склона, спокойные гостевые дома и медленный прибрежный ритм.",
        Makhinjauri: "Зеленое окружение, практичные гостевые дома и быстрый доступ к Батуми.",
        "Green Cape": "Садовые варианты проживания и визиты на природу рядом с ботаническим садом.",
        "Airport Area": "Удобные остановки, парковка и простой приезд для коротких поездок."
      },
      hotelTypes: {
        "Family Hotel": "Семейный отель",
        Guesthouse: "Гостевой дом",
        Aparthotel: "Апарт-отель",
        "Mini Hotel": "Мини-отель"
      },
      budgets: {
        Budget: "Бюджет",
        Mid: "Средний",
        Premium: "Премиум"
      },
      tags: {
        "Family run": "Семейное управление",
        "Old town": "Старый город",
        Breakfast: "Завтрак",
        "Near beach": "Рядом с пляжем",
        Garden: "Сад",
        "Great value": "Отличная цена",
        "Sea view": "Вид на море",
        "Apart rooms": "Апарт-номера",
        Modern: "Современно",
        Quiet: "Тихо",
        Nature: "Природа",
        Parking: "Парковка",
        "Local host": "Местный хозяин",
        Hillside: "Склон",
        Couples: "Пары"
      },
      rooms: {
        "Double rooms": "Двухместные номера",
        "Triple family rooms": "Трехместные семейные номера",
        "Small balcony rooms": "Небольшие номера с балконом",
        "Standard doubles": "Стандартные двухместные",
        "Twin rooms": "Номера twin",
        "Family room with sofa": "Семейный номер с диваном",
        "Studio apartments": "Студии",
        "One-bedroom apartments": "Апартаменты с одной спальней",
        "Sea-view family apartment": "Семейные апартаменты с видом на море",
        "Garden double rooms": "Двухместные номера у сада",
        "Triple rooms": "Трехместные номера",
        "Ground-floor family room": "Семейный номер на первом этаже",
        "Family room": "Семейный номер",
        "Sea-view double rooms": "Двухместные номера с видом на море",
        "Balcony rooms": "Номера с балконом",
        "Compact twin rooms": "Компактные twin-номера"
      },
      facilities: {
        "Wi-Fi": "Wi-Fi",
        Breakfast: "Завтрак",
        "Air conditioning": "Кондиционер",
        "Laundry help": "Помощь со стиркой",
        "Airport pickup": "Трансфер из аэропорта",
        Garden: "Сад",
        Parking: "Парковка",
        "Shared kitchen": "Общая кухня",
        Kitchenette: "Мини-кухня",
        Lift: "Лифт",
        Balcony: "Балкон",
        "Sea view": "Вид на море",
        "Garden terrace": "Садовая терраса",
        "Outdoor seating": "Места на улице",
        Terrace: "Терраса",
        "Breakfast terrace": "Терраса для завтрака"
      },
      nearby: {
        "Piazza Square": "Площадь Пьяцца",
        "Europe Square": "Площадь Европы",
        "Batumi Boulevard": "Батумский бульвар",
        "Alphabet Tower": "Башня Алфавита",
        "6 May Park": "Парк 6 Мая",
        Dolphinarium: "Дельфинарий",
        "Central Boulevard": "Центральный бульвар",
        "Beach cafes": "Пляжные кафе",
        "New Boulevard": "Новый бульвар",
        "Metro City": "Metro City",
        "Aqua park": "Аквапарк",
        "Beach promenade": "Пляжный променад",
        "Batumi Botanical Garden": "Батумский ботанический сад",
        "Green Cape beach": "Пляж Зеленого мыса",
        "Mtsvane Kontskhi station": "Станция Мцване Концхи",
        "Gonio Fortress": "Гонийская крепость",
        "Gonio beach": "Пляж Гонио",
        "Local restaurants": "Местные рестораны",
        "Airport road": "Дорога к аэропорту",
        "Kvariati beach": "Пляж Квариати",
        "Sarpi road": "Дорога на Сарпи",
        "Mountain viewpoints": "Горные смотровые точки"
      }
    },
    hotels: {
      "old-town-family-hotel": {
        intro: "Спокойный семейный отель в историческом центре, рядом с кафе, бульваром и вечерними прогулками у моря.",
        whyStay: ["Дружелюбные владельцы живут рядом и помогают местными советами.", "Тихие номера за пределами самых шумных улиц Старого Батуми.", "Простой завтрак и легкое прямое общение."]
      },
      "sea-breeze-guesthouse": {
        intro: "Расслабленный гостевой дом рядом с бульваром, тенистой зоной на улице и практичными номерами для долгого проживания.",
        whyStay: ["Короткая прогулка до пляжа без цены большого отеля.", "Хозяева помогают с такси и местными рекомендациями.", "Хороший выбор для семей и гостей на машине."]
      },
      "new-boulevard-apart-stay": {
        intro: "Светлые апартаментные варианты в районе Нового бульвара для гостей, которым нужно больше пространства и вид на море.",
        whyStay: ["Номера с мини-кухней упрощают долгую поездку в Батуми.", "Современные интерьеры хорошо выглядят для онлайн-заявок.", "Прямой контакт с владельцем делает разговор о брони простым."]
      },
      "green-garden-mini-hotel": {
        intro: "Мирный мини-отель среди зелени для гостей, которым нужен более медленный отдых вне центра.",
        whyStay: ["Садовое пространство дает объекту теплое семейное ощущение.", "Близость к природе без потери доступа к Батуми.", "Сильный вариант для гостей, приезжающих на машине."]
      },
      "gonio-quiet-house": {
        intro: "Простой тихий гостевой дом в Гонио для пляжных дней, семейного отдыха и гостей, которые предпочитают меньше шума.",
        whyStay: ["Спокойный местный район с быстрым доступом к пляжу.", "Хорошая цена для летнего проживания вне центра Батуми.", "Владельцы быстро отвечают через WhatsApp."]
      },
      "kvariati-view-rooms": {
        intro: "Небольшой вариант на склоне с открытым видом на Черное море и более спокойной атмосферой, чем в центре Батуми.",
        whyStay: ["Номера с видом на море создают запоминающееся первое впечатление онлайн.", "Хорошо подходит для пар и медленных поездок вдоль побережья.", "Прямые запросы бронирования помогают владельцам защищать маржу."]
      }
    }
  },
  tr: {
    common: {
      language: "Dil",
      all: "Tümü",
      hotelCount: "{{count}} otel",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      brandHome: "Small Hotels Batumi ana sayfa",
      photoGallery: "{{hotelName}} fotoğraf galerisi",
      tagsLabel: "{{hotelName}} etiketleri",
      hotelImageAlt: "Batum'da {{hotelName}}",
      areaImageAlt: "Batum'da {{area}}",
      mapLabel: "{{hotelName}} için harita alanı"
    },
    nav: {
      hotels: "Oteller",
      owners: "Otel Sahipleri",
      contact: "İletişim",
      listYourHotel: "Otelinizi Ekleyin",
      viewHotels: "Otelleri Gör",
      requestDemo: "Demo İste"
    },
    footer: {
      text: "Batum'daki yerel oteller, misafirhaneler, apart oteller ve aile konaklamaları için premium demo platformu.",
      viewHotels: "Otelleri Gör",
      owners: "Otel Sahipleri",
      requestDemo: "Demo İste"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | Bağımsız Oteller ve Misafirhaneler",
      homeDescription: "Batum'daki küçük bağımsız otelleri profesyonel fotoğraflar ve doğrudan iletişim seçenekleriyle keşfedin.",
      hotelsTitle: "Batum Otelleri | Small Hotels Batumi",
      hotelsDescription: "Batum'daki küçük otel, aile oteli, misafirhane, apart otel ve mini otel demolarına göz atın.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription: "{{area}} bölgesindeki {{hotelName}}. Fotoğrafları, olanakları, yakın yerleri ve doğrudan iletişimi görün.",
      ownersTitle: "Otel Sahipleri | Small Hotels Batumi",
      ownersDescription: "Küçük Batum otelinizi fotoğraf, özel sayfa, WhatsApp talepleri ve basit fiyatlarla profesyonel şekilde online sunun.",
      contactTitle: "Demo İste | Small Hotels Batumi",
      contactDescription: "Batum'daki küçük oteliniz, misafirhaneniz, apart oteliniz veya mini oteliniz için demo isteyin."
    },
    cta: {
      title: "Otelinizi Daha Fazla Misafire Gösterin",
      body: "Basit bir yerel oteli profesyonel fotoğraflar, doğrudan talepler ve güven veren bir sayfayla özenli bir online sunuma dönüştürün.",
      button: "Demo İste"
    },
    whatsapp: {
      ask: "WhatsApp'tan Sor",
      short: "WhatsApp",
      hotelMessage: "Merhaba, Small Hotels Batumi'deki {{hotelName}} ile ilgileniyorum.",
      demoMessage: "Merhaba, Small Hotels Batumi için demo istemek istiyorum."
    },
    home: {
      heroTitle: "Batum'daki Küçük Bağımsız Otelleri Keşfedin",
      heroBody: "Aile otelleri, misafirhaneler ve yerel konaklamalar profesyonel fotoğraflar ve doğrudan iletişim seçenekleriyle sunulur.",
      showcaseLabel: "Büyük otel fotoğraf vitrini",
      showcaseSeaAlt: "Batum'da deniz manzaralı otel odası",
      showcaseExteriorAlt: "Batum'da küçük otel dış görünümü",
      showcaseCoastalAlt: "Sahil misafirhanesi manzarası",
      introTitle: "Bir rezervasyon dizini değil, butik seyahat rehberi gibi sunulur.",
      introBody: "Her sayfa gerçek bir yerel otelin güvenilir, özenli ve kolay iletişim kurulabilir görünmesi için tasarlanır.",
      proofPhotography: "Önce fotoğraf",
      proofEnquiries: "Doğrudan talepler",
      proofCommission: "Rezervasyon komisyonu yok",
      featuredTitle: "Öne Çıkan Oteller",
      featuredBody: "Altı demo otel, farklı yerel tesislerin tutarlı premium bir stille nasıl sunulabileceğini gösterir.",
      viewAllHotels: "Tüm oteller",
      areasTitle: "Bölgeleri Keşfet",
      areasBody: "Sahipler, Eski Batum'dan sakin sahil köylerine kadar konumun satış hikayesinin parçası olduğunu görebilir.",
      whyTitle: "Neden Small Hotels?",
      whyBody: "Batum'un küçük otellerinde misafirlerin istediği sıcaklık sıkça vardır, ama gerekli sunum olmayabilir. Bu demo, daha iyi bir görsel hikayenin yerel sahipliği nasıl avantaja çevirdiğini gösterir.",
      features: [
        ["Kişisel hizmet", "Misafirler uzaktaki bir çağrı merkeziyle değil, gerçek sahipler ve ev sahipleriyle konuştuklarını bilir."],
        ["Yerel sahiplik", "Her ilan mahallenin, ev sahibinin tarzının ve tesis hikayesinin altını çizer."],
        ["Gerçek deneyim", "Küçük yerler karakter, sıcaklık ve gerçek fotoğraflarla rekabet edebilir."],
        ["Daha iyi değer", "Doğrudan iletişim, karmaşık sistemler veya komisyonlar olmadan basit talepleri destekler."]
      ],
      howTitle: "Nasıl Çalışır",
      howBody: "İki basit yol: biri misafirler, biri otel sahipleri için.",
      guestsTitle: "Misafirler için",
      ownersTitle: "Otel sahipleri için",
      guestSteps: ["Oteli keşfet", "Fotoğrafları gör", "Doğrudan iletişime geç", "Konaklamayı ayırt"],
      ownerSteps: ["Fotoğraf çekimi", "Otel sayfası", "Doğrudan talepler", "Daha fazla görünürlük"]
    },
    hotelsPage: {
      title: "Batum Otelleri",
      body: "Aile otelleri, misafirhaneler, apart oteller ve mini oteller için mobil öncelikli liste görünümü. Filtreler bu demoda yerel çalışır.",
      filtersLabel: "Otel filtreleri",
      filtersTitle: "Filtreler",
      clear: "Temizle",
      area: "Bölge",
      type: "Otel Tipi",
      budget: "Bütçe Aralığı",
      options: {
        familyFriendly: "Aile Dostu",
        seaView: "Deniz Manzarası",
        nearBeach: "Plaja Yakın",
        parking: "Otopark"
      },
      resultsTitle: "{{count}} otel mevcut",
      resultsBody: "Her kart fotoğrafları, bölgeyi, etiketleri, WhatsApp'ı ve detay sayfası erişimini bir arada tutar.",
      emptyTitle: "Bu filtrelere uyan otel yok.",
      emptyBody: "Daha fazla demo tesis görmek için bir filtreyi temizleyin."
    },
    hotelCard: {
      viewHotel: "Oteli Gör"
    },
    detail: {
      backToHotels: "Oteller",
      call: "Ara",
      email: "E-posta",
      whyStay: "Neden burada kalmalı",
      rooms: "Oda özeti",
      facilities: "Olanaklar",
      location: "Konum",
      locationBody: "Bu demo harita alanı, hafif bir yerel sayfanın erişimi, yakın yerleri ve mahalle bağlamını karmaşık bir rezervasyon aracına dönüşmeden nasıl açıklayabileceğini gösterir.",
      nearby: "Yakındaki yerler",
      ctaTitle: "Oteliniz Böyle Sunulsun mu?",
      ctaBody: "Bu detay sayfası satış argümanıdır: profesyonel fotoğraflar, basit iletişim ve yerel tesis için premium bir hikaye.",
      ctaButton: "Demo İste"
    },
    owners: {
      heroTitle: "Otelinizi Online Profesyonel Şekilde Sunun",
      heroBody: "Tam bir web sitesi kurmadan daha iyi online varlık isteyen küçük oteller için odaklı satış sayfası, profesyonel fotoğraf ve doğrudan iletişim seçenekleri.",
      requestDemo: "Demo İste",
      seeExample: "Örnek Sayfayı Gör",
      includesTitle: "Hizmete neler dahil",
      includesBody: "Platform bilinçli olarak basittir. Sahibin profesyonel görünmesine, doğrudan talep toplamasına ve tesisi misafirlere açık göstermesine yardım eder.",
      features: [
        ["Profesyonel fotoğrafçılık", "Odalar, banyolar, dış cephe, kahvaltı alanları, olanaklar ve çevre özenle sunulur."],
        ["Özel otel sayfası", "Her tesis fotoğraflar, konum, olanaklar ve pratik misafir detaylarıyla özenli bir sayfa alır."],
        ["Doğrudan WhatsApp talepleri", "Misafirler karmaşık bir sistem öğrenmeden doğrudan sahibine ulaşabilir."],
        ["Doğrudan rezervasyon istekleri", "Basit formlar hesap, ödeme veya PMS entegrasyonu olmadan net potansiyel müşteriler oluşturur."]
      ],
      services: [
        ["WhatsApp hazır", "Sahiplerin zaten kullandığı kanalda hızlı iletişim."],
        ["Rezervasyon komisyonu yok", "Marj kaybetmek yerine doğrudan talebi koruyun."],
        ["Basit lead toplama", "Talepler yapılandırılmıştır, takip kolaylaşır."],
        ["Premium ilk izlenim", "Daha iyi bir sayfa küçük oteli daha değerli gösterir."]
      ],
      pricingTitle: "Fiyatlandırma",
      pricingBody: "Otel sahipleriyle satış görüşmesi için net paketler.",
      pricing: [
        { title: "Başlangıç İlanı", price: "100 GEL/ay", note: "Yüksek sezonda", items: ["Otel profili", "Galeri", "İletişim düğmeleri", "Rezervasyon isteği formu", "Bölge listesi"] },
        { title: "Fotoğraf Paketi", price: "Tek seferlik ücret", note: "Otel sayfası için profesyonel görsel seti", items: ["Odalar", "Banyolar", "Dış cephe", "Kahvaltı alanı", "Olanaklar", "Çevre"] },
        { title: "Rezervasyon İsteği Kurulumu", price: "Tek seferlik ücret", note: "Basit misafir leadleri için doğrudan talep kurulumu", items: ["İletişim formu", "WhatsApp entegrasyonu", "Lead toplama", "Basit rezervasyon akışı"] }
      ],
      processTitle: "Sıradan ilandan premium sunuma",
      processBody: "Satış demosu, farkı telefonda bir dakikadan kısa sürede görünür kılmak için tasarlandı.",
      processSteps: ["Fotoğraflar", "Sayfa", "Talepler", "Leadler"]
    },
    contact: {
      title: "Demo İste",
      body: "Oteliniz hakkında birkaç detay paylaşın. Demo, tesisinizin profesyonel fotoğraflar, özel sayfa, WhatsApp ve doğrudan rezervasyon istekleriyle nasıl görünebileceğini gösterir.",
      builtTitle: "Batum'daki küçük oteller için yapıldı",
      builtBody: "Amaç basit: sahiplerin pahalı özel web sitesi veya karmaşık rezervasyon sistemi olmadan online profesyonel görünmesine yardım etmek.",
      bestForLabel: "En uygun",
      bestFor: "Aile otelleri, misafirhaneler, apart oteller, mini oteller",
      channelsLabel: "Ana kanallar",
      channels: "WhatsApp, telefon, e-posta, rezervasyon isteği formu",
      focusLabel: "Demo odağı",
      focus: "Fotoğraf, güven, sadelik, doğrudan iletişim"
    },
    forms: {
      name: "Ad",
      hotelName: "Otel Adı",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      email: "E-posta",
      message: "Mesaj",
      bookingTitle: "Rezervasyon isteği",
      bookingBody: "Otel sahibine doğrudan basit bir talep gönderin. Burada ödeme alınmaz.",
      phoneWhatsapp: "Telefon veya WhatsApp",
      arrival: "Varış",
      nights: "Gece",
      bookingMessage: "Merhaba, {{hotelName}} için uygunluk kontrolü yapmak istiyorum.",
      sendRequest: "İsteği Gönder",
      bookingSuccess: "Demo talep kaydedildi. Üretimde bu otel sahibine gider.",
      contactMessage: "Otelimin Small Hotels Batumi'de nasıl sunulabileceğini görmek istiyorum.",
      contactButton: "Demo İste",
      contactSuccess: "Demo talebi bu satış demosu için yerel olarak alındı."
    },
    data: {
      areas: {
        "Old Batumi": "Eski Batum",
        Boulevard: "Bulvar",
        "New Boulevard": "Yeni Bulvar",
        Gonio: "Gonio",
        Kvariati: "Kvariati",
        Makhinjauri: "Makhinjauri",
        "Green Cape": "Yeşil Burun",
        "Airport Area": "Havalimanı Bölgesi"
      },
      areaDescriptions: {
        "Old Batumi": "Tarihi sokaklar, kafeler, restore edilmiş cepheler ve bulvara kolay yürüyüşler.",
        Boulevard: "Parklar, plaj kafeleri ve klasik Batum gezinti yollarıyla merkezi deniz enerjisi.",
        "New Boulevard": "Sahile yakın modern apartmanlar, deniz manzaralı odalar ve uzun konaklama seçenekleri.",
        Gonio: "Aileler, yaz gezileri ve basit yerel konaklamalar için daha sakin bir plaj bölgesi.",
        Kvariati: "Yamaçtan deniz manzaraları, sakin misafirhaneler ve daha yavaş bir sahil ritmi.",
        Makhinjauri: "Yeşil çevre, pratik misafirhaneler ve Batum'a hızlı erişim.",
        "Green Cape": "Botanik bahçeye yakın bahçeli konaklamalar ve doğa odaklı ziyaretler.",
        "Airport Area": "Kısa geziler için uygun duraklar, otopark ve kolay varış."
      },
      hotelTypes: {
        "Family Hotel": "Aile Oteli",
        Guesthouse: "Misafirhane",
        Aparthotel: "Apart Otel",
        "Mini Hotel": "Mini Otel"
      },
      budgets: {
        Budget: "Ekonomik",
        Mid: "Orta",
        Premium: "Premium"
      },
      tags: {
        "Family run": "Aile işletmesi",
        "Old town": "Eski şehir",
        Breakfast: "Kahvaltı",
        "Near beach": "Plaja yakın",
        Garden: "Bahçe",
        "Great value": "İyi değer",
        "Sea view": "Deniz manzarası",
        "Apart rooms": "Apart odalar",
        Modern: "Modern",
        Quiet: "Sakin",
        Nature: "Doğa",
        Parking: "Otopark",
        "Local host": "Yerel ev sahibi",
        Hillside: "Yamaç",
        Couples: "Çiftler"
      },
      rooms: {
        "Double rooms": "Çift kişilik odalar",
        "Triple family rooms": "Üç kişilik aile odaları",
        "Small balcony rooms": "Küçük balkonlu odalar",
        "Standard doubles": "Standart çift kişilik odalar",
        "Twin rooms": "Twin odalar",
        "Family room with sofa": "Kanepeli aile odası",
        "Studio apartments": "Stüdyo daireler",
        "One-bedroom apartments": "Tek yatak odalı daireler",
        "Sea-view family apartment": "Deniz manzaralı aile dairesi",
        "Garden double rooms": "Bahçe çift kişilik odaları",
        "Triple rooms": "Üç kişilik odalar",
        "Ground-floor family room": "Zemin katta aile odası",
        "Family room": "Aile odası",
        "Sea-view double rooms": "Deniz manzaralı çift kişilik odalar",
        "Balcony rooms": "Balkonlu odalar",
        "Compact twin rooms": "Kompakt twin odalar"
      },
      facilities: {
        "Wi-Fi": "Wi-Fi",
        Breakfast: "Kahvaltı",
        "Air conditioning": "Klima",
        "Laundry help": "Çamaşır yardımı",
        "Airport pickup": "Havalimanı karşılama",
        Garden: "Bahçe",
        Parking: "Otopark",
        "Shared kitchen": "Ortak mutfak",
        Kitchenette: "Mini mutfak",
        Lift: "Asansör",
        Balcony: "Balkon",
        "Sea view": "Deniz manzarası",
        "Garden terrace": "Bahçe terası",
        "Outdoor seating": "Açık oturma alanı",
        Terrace: "Teras",
        "Breakfast terrace": "Kahvaltı terası"
      },
      nearby: {
        "Piazza Square": "Piazza Meydanı",
        "Europe Square": "Avrupa Meydanı",
        "Batumi Boulevard": "Batum Bulvarı",
        "Alphabet Tower": "Alfabe Kulesi",
        "6 May Park": "6 Mayıs Parkı",
        Dolphinarium: "Yunus Parkı",
        "Central Boulevard": "Merkez Bulvar",
        "Beach cafes": "Plaj kafeleri",
        "New Boulevard": "Yeni Bulvar",
        "Metro City": "Metro City",
        "Aqua park": "Su parkı",
        "Beach promenade": "Plaj yürüyüş yolu",
        "Batumi Botanical Garden": "Batum Botanik Bahçesi",
        "Green Cape beach": "Yeşil Burun plajı",
        "Mtsvane Kontskhi station": "Mtsvane Kontskhi istasyonu",
        "Gonio Fortress": "Gonio Kalesi",
        "Gonio beach": "Gonio plajı",
        "Local restaurants": "Yerel restoranlar",
        "Airport road": "Havalimanı yolu",
        "Kvariati beach": "Kvariati plajı",
        "Sarpi road": "Sarpi yolu",
        "Mountain viewpoints": "Dağ seyir noktaları"
      }
    },
    hotels: {
      "old-town-family-hotel": {
        intro: "Tarihi merkezde, kafelere, bulvara ve deniz kenarında akşam yürüyüşlerine yakın sakin bir aile oteli.",
        whyStay: ["Yakında yaşayan dost sahipler yerel tavsiyelerle yardımcı olur.", "Eski Batum'un en yoğun sokaklarının arkasında sakin odalar.", "Basit kahvaltı hizmeti ve kolay doğrudan iletişim."]
      },
      "sea-breeze-guesthouse": {
        intro: "Bulvara yakın, gölgeli dış oturma alanı ve uzun konaklamalar için pratik odaları olan rahat bir misafirhane.",
        whyStay: ["Büyük otel fiyatı olmadan plaja kısa yürüyüş.", "Ev sahipleri taksi ve yerel öneriler konusunda yardımcı olur.", "Aileler ve arabayla gelen misafirler için iyi seçim."]
      },
      "new-boulevard-apart-stay": {
        intro: "Daha fazla alan ve deniz manzarası isteyen misafirler için Yeni Bulvar bölgesinde aydınlık apart tarzı konaklamalar.",
        whyStay: ["Mini mutfaklı odalar uzun Batum gezilerini kolaylaştırır.", "Modern iç mekanlar online talepler için güzel görünür.", "Doğrudan sahip teması rezervasyon konuşmasını basit tutar."]
      },
      "green-garden-mini-hotel": {
        intro: "Merkezin dışında daha yavaş bir konaklama isteyen misafirler için yeşillikler içinde huzurlu bir mini otel.",
        whyStay: ["Bahçe alanı tesise sıcak aile oteli hissi verir.", "Batum erişimini kaybetmeden doğaya yakın kalın.", "Arabayla gelen misafirler için güçlü seçenek."]
      },
      "gonio-quiet-house": {
        intro: "Plaj günleri, aile konaklamaları ve daha az gürültü isteyen misafirler için Gonio'da basit ve sakin bir misafirhane.",
        whyStay: ["Plaja hızlı erişimli rahat yerel mahalle.", "Merkezi Batum dışında yaz konaklamaları için iyi değer.", "Sahipler WhatsApp üzerinden hızlı yanıt verir."]
      },
      "kvariati-view-rooms": {
        intro: "Karadeniz'e açık manzaraları ve Batum merkezinden daha sakin hissi olan küçük bir yamaç konaklaması.",
        whyStay: ["Deniz manzaralı odalar online unutulmaz ilk izlenim yaratır.", "Çiftler ve yavaş sahil gezileri için uygundur.", "Doğrudan rezervasyon istekleri sahiplerin marjını korumasına yardım eder."]
      }
    }
  },
  he: {
    common: {
      language: "שפה",
      all: "הכול",
      hotelCount: "{{count}} מלונות",
      openMenu: "פתח תפריט",
      closeMenu: "סגור תפריט",
      brandHome: "עמוד הבית של Small Hotels Batumi",
      photoGallery: "גלריית תמונות של {{hotelName}}",
      tagsLabel: "תגיות של {{hotelName}}",
      hotelImageAlt: "{{hotelName}} בבאטומי",
      areaImageAlt: "{{area}} בבאטומי",
      mapLabel: "אזור מפה עבור {{hotelName}}"
    },
    nav: {
      hotels: "מלונות",
      owners: "לבעלי מלונות",
      contact: "יצירת קשר",
      listYourHotel: "הוספת המלון",
      viewHotels: "צפייה במלונות",
      requestDemo: "בקשת דמו"
    },
    footer: {
      text: "פלטפורמת דמו פרימיום למלונות מקומיים, בתי הארחה, מלונות דירות ואירוח משפחתי בבאטומי.",
      viewHotels: "צפייה במלונות",
      owners: "לבעלי מלונות",
      requestDemo: "בקשת דמו"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | מלונות ובתי הארחה עצמאיים",
      homeDescription: "גלו מלונות עצמאיים קטנים בבאטומי עם צילום מקצועי ואפשרויות קשר ישיר.",
      hotelsTitle: "מלונות בבאטומי | Small Hotels Batumi",
      hotelsDescription: "עיינו במלונות קטנים, מלונות משפחתיים, בתי הארחה, מלונות דירות ומיני מלונות בבאטומי.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription: "{{hotelName}} באזור {{area}}. צפו בתמונות, מתקנים, אתרים קרובים ואפשרויות קשר ישיר.",
      ownersTitle: "לבעלי מלונות | Small Hotels Batumi",
      ownersDescription: "הציגו את המלון הקטן שלכם בבאטומי בצורה מקצועית עם צילום, עמוד ייעודי, פניות WhatsApp ומחירים פשוטים.",
      contactTitle: "בקשת דמו | Small Hotels Batumi",
      contactDescription: "בקשו דמו למלון קטן, בית הארחה, מלון דירות או מיני מלון בבאטומי."
    },
    cta: {
      title: "הציגו את המלון ליותר אורחים",
      body: "הפכו מלון מקומי פשוט להצגה אונליין מלוטשת עם תמונות מקצועיות, פניות ישירות ועמוד שאורחים יכולים לסמוך עליו.",
      button: "בקשת דמו"
    },
    whatsapp: {
      ask: "שאלה ב-WhatsApp",
      short: "WhatsApp",
      hotelMessage: "שלום, אני מתעניין/ת ב-{{hotelName}} ב-Small Hotels Batumi.",
      demoMessage: "שלום, אני רוצה לבקש דמו עבור Small Hotels Batumi."
    },
    home: {
      heroTitle: "גלו מלונות עצמאיים קטנים בבאטומי",
      heroBody: "מלונות משפחתיים, בתי הארחה ואירוח מקומי עם צילום מקצועי ואפשרויות קשר ישיר.",
      showcaseLabel: "תצוגת צילום גדולה של מלונות",
      showcaseSeaAlt: "חדר מלון עם נוף לים בבאטומי",
      showcaseExteriorAlt: "חזית מלון קטן בבאטומי",
      showcaseCoastalAlt: "נוף מבית הארחה ליד החוף",
      introTitle: "מוצג כמו מדריך נסיעות בוטיק, לא כמו אינדקס הזמנות.",
      introBody: "כל עמוד נועד לגרום למלון מקומי אמיתי להיראות אמין, מלוטש וקל ליצירת קשר.",
      proofPhotography: "צילום קודם",
      proofEnquiries: "פניות ישירות",
      proofCommission: "ללא עמלת הזמנה",
      featuredTitle: "מלונות נבחרים",
      featuredBody: "שישה מלונות דמו מראים איך נכסים מקומיים שונים יכולים להופיע בסגנון פרימיום עקבי.",
      viewAllHotels: "כל המלונות",
      areasTitle: "גלו אזורים",
      areasBody: "בעלים יכולים לראות איך המיקום הופך לחלק מסיפור המכירה, מבאטומי העתיקה ועד כפרי חוף שקטים.",
      whyTitle: "למה Small Hotels?",
      whyBody: "למלונות הקטנים בבאטומי יש לעיתים קרובות את החום שהאורחים רוצים, אבל לא את ההצגה שהם צריכים. הדמו הזה מראה איך סיפור חזותי טוב יותר הופך בעלות מקומית ליתרון.",
      features: [
        ["שירות אישי", "האורחים יודעים שהם מדברים עם בעלים ומארחים אמיתיים, לא עם מוקד רחוק."],
        ["בעלות מקומית", "כל רשומה מדגישה את השכונה, סגנון המארח והסיפור שמאחורי הנכס."],
        ["חוויה אמיתית", "מקומות קטנים יכולים להתחרות באופי, חום ותמונות אמיתיות."],
        ["ערך טוב יותר", "קשר ישיר תומך בבקשות פשוטות בלי מערכות מורכבות או עמלות."]
      ],
      howTitle: "איך זה עובד",
      howBody: "שני מסלולים פשוטים: אחד לאורחים ואחד לבעלי מלונות.",
      guestsTitle: "לאורחים",
      ownersTitle: "לבעלי מלונות",
      guestSteps: ["מגלים מלון", "צופים בתמונות", "יוצרים קשר ישיר", "מזמינים שהייה"],
      ownerSteps: ["צילום", "עמוד מלון", "פניות ישירות", "יותר חשיפה"]
    },
    hotelsPage: {
      title: "מלונות בבאטומי",
      body: "תצוגת רשת מותאמת למובייל למלונות משפחתיים, בתי הארחה, מלונות דירות ומיני מלונות. המסננים פועלים מקומית בדמו הזה.",
      filtersLabel: "מסנני מלונות",
      filtersTitle: "מסננים",
      clear: "ניקוי",
      area: "אזור",
      type: "סוג מלון",
      budget: "טווח תקציב",
      options: {
        familyFriendly: "מתאים למשפחות",
        seaView: "נוף לים",
        nearBeach: "קרוב לחוף",
        parking: "חניה"
      },
      resultsTitle: "{{count}} מלונות זמינים",
      resultsBody: "כל כרטיס שומר את התמונות, האזור, התגיות, WhatsApp והגישה לעמוד הפרטים קרובים יחד.",
      emptyTitle: "אין מלונות שתואמים למסננים האלה.",
      emptyBody: "נקו מסנן כדי לראות עוד נכסי דמו."
    },
    hotelCard: {
      viewHotel: "צפייה במלון"
    },
    detail: {
      backToHotels: "מלונות",
      call: "שיחה",
      email: "אימייל",
      whyStay: "למה להישאר כאן",
      rooms: "סקירת חדרים",
      facilities: "מתקנים",
      location: "מיקום",
      locationBody: "אזור המפה בדמו מראה איך עמוד מקומי קל יכול להסביר גישה, אתרים קרובים והקשר שכונתי בלי להפוך לכלי הזמנות מורכב.",
      nearby: "אתרים קרובים",
      ctaTitle: "רוצים שהמלון שלכם יוצג כך?",
      ctaBody: "עמוד הפרטים הוא טיעון המכירה: תמונות מקצועיות, קשר פשוט וסיפור פרימיום לנכס מקומי.",
      ctaButton: "בקשת דמו"
    },
    owners: {
      heroTitle: "הציגו את המלון שלכם אונליין בצורה מקצועית",
      heroBody: "עמוד מכירה ממוקד, צילום מקצועי ואפשרויות קשר ישיר למלונות קטנים שצריכים נוכחות אונליין טובה יותר בלי לבנות אתר מלא.",
      requestDemo: "בקשת דמו",
      seeExample: "צפייה בדוגמה",
      includesTitle: "מה השירות כולל",
      includesBody: "הפלטפורמה פשוטה בכוונה. היא עוזרת לבעלים להיראות מקצועיים, לקבל פניות ישירות ולהציג את הנכס בבירור לאורחים.",
      features: [
        ["צילום מקצועי", "חדרים, חדרי רחצה, חזית, אזורי ארוחת בוקר, מתקנים והסביבה מוצגים בקפידה."],
        ["עמוד מלון ייעודי", "כל נכס מקבל עמוד מלוטש עם תמונות, מיקום, מתקנים ופרטים מעשיים לאורחים."],
        ["פניות WhatsApp ישירות", "אורחים יכולים ליצור קשר ישיר עם הבעלים בלי ללמוד מערכת מסובכת."],
        ["בקשות הזמנה ישירות", "טפסים פשוטים יוצרים לידים ברורים בלי חשבונות, תשלומים או אינטגרציות PMS."]
      ],
      services: [
        ["מוכן ל-WhatsApp", "קשר מהיר בערוץ שהבעלים כבר משתמשים בו."],
        ["ללא עמלת הזמנה", "שמרו את הפנייה הישירה במקום לאבד מרווח."],
        ["איסוף לידים פשוט", "הבקשות מובנות כך שקל יותר להמשיך טיפול."],
        ["רושם ראשוני פרימיום", "עמוד טוב יותר גורם למלון קטן להרגיש בעל ערך גבוה יותר."]
      ],
      pricingTitle: "מחירים",
      pricingBody: "חבילות ברורות לשיחת מכירה עם בעלי מלונות.",
      pricing: [
        { title: "רישום התחלתי", price: "100 GEL/חודש", note: "בעונה גבוהה", items: ["פרופיל מלון", "גלריה", "כפתורי קשר", "טופס בקשת הזמנה", "רישום באזור"] },
        { title: "חבילת צילום", price: "תשלום חד-פעמי", note: "סט תמונות מקצועי לעמוד המלון", items: ["חדרים", "חדרי רחצה", "חזית", "אזור ארוחת בוקר", "מתקנים", "סביבה"] },
        { title: "הקמת בקשת הזמנה", price: "תשלום חד-פעמי", note: "הקמת פניות ישירות ללידים פשוטים", items: ["טופס קשר", "אינטגרציית WhatsApp", "איסוף לידים", "זרימת הזמנה פשוטה"] }
      ],
      processTitle: "מרישום רגיל להצגת פרימיום",
      processBody: "דמו המכירה נועד להראות את ההבדל בטלפון בתוך פחות מדקה.",
      processSteps: ["תמונות", "עמוד", "פניות", "לידים"]
    },
    contact: {
      title: "בקשת דמו",
      body: "שתפו כמה פרטים על המלון שלכם. הדמו מראה איך הנכס יכול להיראות עם צילום מקצועי, עמוד ייעודי, WhatsApp ובקשות הזמנה ישירות.",
      builtTitle: "נבנה למלונות קטנים בבאטומי",
      builtBody: "המטרה פשוטה: לעזור לבעלים להיראות מקצועיים אונליין בלי אתר מותאם יקר או מערכת הזמנות מסובכת.",
      bestForLabel: "מתאים במיוחד",
      bestFor: "מלונות משפחתיים, בתי הארחה, מלונות דירות, מיני מלונות",
      channelsLabel: "ערוצים מרכזיים",
      channels: "WhatsApp, טלפון, אימייל, טופס בקשת הזמנה",
      focusLabel: "מוקד הדמו",
      focus: "צילום, אמון, פשטות, קשר ישיר"
    },
    forms: {
      name: "שם",
      hotelName: "שם המלון",
      phone: "טלפון",
      whatsapp: "WhatsApp",
      email: "אימייל",
      message: "הודעה",
      bookingTitle: "בקשת הזמנה",
      bookingBody: "שלחו פנייה פשוטה ישירות לבעל המלון. לא נלקח כאן תשלום.",
      phoneWhatsapp: "טלפון או WhatsApp",
      arrival: "הגעה",
      nights: "לילות",
      bookingMessage: "שלום, אני רוצה לבדוק זמינות ב-{{hotelName}}.",
      sendRequest: "שליחת בקשה",
      bookingSuccess: "בקשת הדמו נשמרה. בסביבת אמת היא תישלח לבעל המלון.",
      contactMessage: "אני רוצה לראות איך המלון שלי יכול להיות מוצג ב-Small Hotels Batumi.",
      contactButton: "בקשת דמו",
      contactSuccess: "פניית הדמו התקבלה מקומית עבור דמו המכירות הזה."
    },
    data: {
      areas: {
        "Old Batumi": "באטומי העתיקה",
        Boulevard: "השדרה",
        "New Boulevard": "השדרה החדשה",
        Gonio: "גוניו",
        Kvariati: "קוואריאטי",
        Makhinjauri: "מחינג׳אורי",
        "Green Cape": "הכף הירוק",
        "Airport Area": "אזור שדה התעופה"
      },
      areaDescriptions: {
        "Old Batumi": "רחובות היסטוריים, בתי קפה, חזיתות משוחזרות והליכות קלות אל השדרה.",
        Boulevard: "אנרגיית חוף מרכזית עם פארקים, בתי קפה על החוף וטיילות קלאסיות של באטומי.",
        "New Boulevard": "דירות מודרניות, חדרים עם נוף לים ואפשרויות לשהייה ארוכה ליד החוף.",
        Gonio: "אזור חוף שקט יותר למשפחות, נסיעות קיץ ואירוח מקומי פשוט.",
        Kvariati: "נופי ים מהגבעה, בתי הארחה רגועים וקצב חוף איטי יותר.",
        Makhinjauri: "סביבה ירוקה, בתי הארחה מעשיים וגישה מהירה לבאטומי.",
        "Green Cape": "אירוח עם גינות וביקורים ממוקדי טבע ליד הגן הבוטני.",
        "Airport Area": "עצירות נוחות, חניה והגעה קלה לנסיעות קצרות."
      },
      hotelTypes: {
        "Family Hotel": "מלון משפחתי",
        Guesthouse: "בית הארחה",
        Aparthotel: "מלון דירות",
        "Mini Hotel": "מיני מלון"
      },
      budgets: {
        Budget: "חסכוני",
        Mid: "בינוני",
        Premium: "פרימיום"
      },
      tags: {
        "Family run": "ניהול משפחתי",
        "Old town": "העיר העתיקה",
        Breakfast: "ארוחת בוקר",
        "Near beach": "קרוב לחוף",
        Garden: "גינה",
        "Great value": "תמורה טובה",
        "Sea view": "נוף לים",
        "Apart rooms": "חדרי דירות",
        Modern: "מודרני",
        Quiet: "שקט",
        Nature: "טבע",
        Parking: "חניה",
        "Local host": "מארח מקומי",
        Hillside: "מדרון",
        Couples: "זוגות"
      },
      rooms: {
        "Double rooms": "חדרים זוגיים",
        "Triple family rooms": "חדרי משפחה לשלושה",
        "Small balcony rooms": "חדרים קטנים עם מרפסת",
        "Standard doubles": "חדרים זוגיים סטנדרטיים",
        "Twin rooms": "חדרי טווין",
        "Family room with sofa": "חדר משפחה עם ספה",
        "Studio apartments": "דירות סטודיו",
        "One-bedroom apartments": "דירות עם חדר שינה אחד",
        "Sea-view family apartment": "דירת משפחה עם נוף לים",
        "Garden double rooms": "חדרים זוגיים מול הגינה",
        "Triple rooms": "חדרים לשלושה",
        "Ground-floor family room": "חדר משפחה בקומת הקרקע",
        "Family room": "חדר משפחה",
        "Sea-view double rooms": "חדרים זוגיים עם נוף לים",
        "Balcony rooms": "חדרים עם מרפסת",
        "Compact twin rooms": "חדרי טווין קומפקטיים"
      },
      facilities: {
        "Wi-Fi": "Wi-Fi",
        Breakfast: "ארוחת בוקר",
        "Air conditioning": "מיזוג אוויר",
        "Laundry help": "עזרה בכביסה",
        "Airport pickup": "איסוף משדה התעופה",
        Garden: "גינה",
        Parking: "חניה",
        "Shared kitchen": "מטבח משותף",
        Kitchenette: "מטבחון",
        Lift: "מעלית",
        Balcony: "מרפסת",
        "Sea view": "נוף לים",
        "Garden terrace": "מרפסת גינה",
        "Outdoor seating": "ישיבה בחוץ",
        Terrace: "מרפסת",
        "Breakfast terrace": "מרפסת ארוחת בוקר"
      },
      nearby: {
        "Piazza Square": "כיכר פיאצה",
        "Europe Square": "כיכר אירופה",
        "Batumi Boulevard": "שדרת באטומי",
        "Alphabet Tower": "מגדל האלפבית",
        "6 May Park": "פארק 6 במאי",
        Dolphinarium: "הדולפינריום",
        "Central Boulevard": "השדרה המרכזית",
        "Beach cafes": "בתי קפה על החוף",
        "New Boulevard": "השדרה החדשה",
        "Metro City": "Metro City",
        "Aqua park": "פארק מים",
        "Beach promenade": "טיילת החוף",
        "Batumi Botanical Garden": "הגן הבוטני של באטומי",
        "Green Cape beach": "חוף הכף הירוק",
        "Mtsvane Kontskhi station": "תחנת מצוואנה קונצחי",
        "Gonio Fortress": "מבצר גוניו",
        "Gonio beach": "חוף גוניו",
        "Local restaurants": "מסעדות מקומיות",
        "Airport road": "כביש שדה התעופה",
        "Kvariati beach": "חוף קוואריאטי",
        "Sarpi road": "כביש סארפי",
        "Mountain viewpoints": "נקודות תצפית הרריות"
      }
    },
    hotels: {
      "old-town-family-hotel": {
        intro: "מלון משפחתי רגוע במרכז ההיסטורי, קרוב לבתי קפה, לשדרה ולהליכות ערב ליד הים.",
        whyStay: ["בעלים ידידותיים גרים קרוב ועוזרים עם עצות מקומיות.", "חדרים שקטים מאחורי הרחובות העמוסים של באטומי העתיקה.", "ארוחת בוקר פשוטה ותקשורת ישירה קלה."]
      },
      "sea-breeze-guesthouse": {
        intro: "בית הארחה רגוע ליד השדרה עם ישיבה מוצלת בחוץ וחדרים מעשיים לשהיות ארוכות.",
        whyStay: ["הליכה קצרה לחוף בלי מחיר של מלון גדול.", "מארחים שעוזרים במוניות ובהמלצות מקומיות.", "בחירה טובה למשפחות ולאורחים שמגיעים ברכב."]
      },
      "new-boulevard-apart-stay": {
        intro: "אירוח בסגנון דירה באזור השדרה החדשה, מתאים לאורחים שרוצים יותר מקום ונוף לים.",
        whyStay: ["חדרים עם מטבחון מקלים על טיולים ארוכים בבאטומי.", "עיצוב מודרני נראה טוב בפניות אונליין.", "קשר ישיר עם הבעלים שומר על שיחת ההזמנה פשוטה."]
      },
      "green-garden-mini-hotel": {
        intro: "מיני מלון שקט מוקף ירק, מתאים לאורחים שרוצים שהייה איטית יותר מחוץ למרכז.",
        whyStay: ["שטח גינה מעניק לנכס תחושה חמימה של מלון משפחתי.", "קרוב לטבע בלי לאבד גישה לבאטומי.", "אפשרות חזקה לאורחים שמגיעים ברכב."]
      },
      "gonio-quiet-house": {
        intro: "בית הארחה פשוט ושקט בגוניו לימי חוף, אירוח משפחתי ואורחים שמעדיפים פחות רעש.",
        whyStay: ["שכונה מקומית רגועה עם גישה מהירה לחוף.", "תמורה טובה לשהיות קיץ מחוץ למרכז באטומי.", "הבעלים עונים במהירות ב-WhatsApp."]
      },
      "kvariati-view-rooms": {
        intro: "אירוח קטן על מדרון עם נוף פתוח לים השחור ותחושה שקטה יותר מהמרכז של באטומי.",
        whyStay: ["חדרים עם נוף לים יוצרים רושם ראשון זכור אונליין.", "מתאים לזוגות ולנסיעות חוף איטיות.", "בקשות הזמנה ישירות עוזרות לבעלים לשמור על הרווח."]
      }
    }
  },
  ar: {
    common: {
      language: "اللغة",
      all: "الكل",
      hotelCount: "{{count}} فنادق",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      brandHome: "الصفحة الرئيسية لـ Small Hotels Batumi",
      photoGallery: "معرض صور {{hotelName}}",
      tagsLabel: "وسوم {{hotelName}}",
      hotelImageAlt: "{{hotelName}} في باتومي",
      areaImageAlt: "{{area}} في باتومي",
      mapLabel: "مساحة خريطة لـ {{hotelName}}"
    },
    nav: {
      hotels: "الفنادق",
      owners: "لأصحاب الفنادق",
      contact: "تواصل",
      listYourHotel: "أضف فندقك",
      viewHotels: "عرض الفنادق",
      requestDemo: "طلب عرض تجريبي"
    },
    footer: {
      text: "منصة عرض تجريبي راقية للفنادق المحلية وبيوت الضيافة والشقق الفندقية وإقامات العائلات في باتومي.",
      viewHotels: "عرض الفنادق",
      owners: "لأصحاب الفنادق",
      requestDemo: "طلب عرض تجريبي"
    },
    meta: {
      homeTitle: "Small Hotels Batumi | فنادق وبيوت ضيافة مستقلة",
      homeDescription: "اكتشف الفنادق المستقلة الصغيرة في باتومي مع تصوير احترافي وخيارات تواصل مباشر.",
      hotelsTitle: "فنادق في باتومي | Small Hotels Batumi",
      hotelsDescription: "تصفح فنادق صغيرة وفنادق عائلية وبيوت ضيافة وشقق فندقية وفنادق مصغرة في باتومي.",
      detailTitle: "{{hotelName}} | Small Hotels Batumi",
      detailDescription: "{{hotelName}} في منطقة {{area}}. شاهد الصور والمرافق والمعالم القريبة وخيارات التواصل المباشر.",
      ownersTitle: "لأصحاب الفنادق | Small Hotels Batumi",
      ownersDescription: "اعرض فندقك الصغير في باتومي بشكل احترافي مع تصوير وصفحة مخصصة واستفسارات WhatsApp وأسعار بسيطة.",
      contactTitle: "طلب عرض تجريبي | Small Hotels Batumi",
      contactDescription: "اطلب عرضا تجريبيا لفندقك الصغير أو بيت الضيافة أو الشقق الفندقية أو الفندق المصغر في باتومي."
    },
    cta: {
      title: "اعرض فندقك لمزيد من الضيوف",
      body: "حوّل الفندق المحلي البسيط إلى عرض إلكتروني مصقول مع صور احترافية واستفسارات مباشرة وصفحة يثق بها الضيوف.",
      button: "طلب عرض تجريبي"
    },
    whatsapp: {
      ask: "اسأل عبر WhatsApp",
      short: "WhatsApp",
      hotelMessage: "مرحبا، أنا مهتم بـ {{hotelName}} على Small Hotels Batumi.",
      demoMessage: "مرحبا، أود طلب عرض تجريبي لـ Small Hotels Batumi."
    },
    home: {
      heroTitle: "اكتشف الفنادق المستقلة الصغيرة في باتومي",
      heroBody: "فنادق عائلية وبيوت ضيافة وإقامات محلية مع تصوير احترافي وخيارات تواصل مباشر.",
      showcaseLabel: "عرض كبير لصور الفنادق",
      showcaseSeaAlt: "غرفة فندق بإطلالة بحرية في باتومي",
      showcaseExteriorAlt: "واجهة فندق صغير في باتومي",
      showcaseCoastalAlt: "إطلالة بيت ضيافة ساحلي",
      introTitle: "يُعرض كدليل سفر بوتيكي، لا كدليل حجز تقليدي.",
      introBody: "تم تصميم كل صفحة لتجعل الفندق المحلي الحقيقي يبدو موثوقا ومصقولا وسهل التواصل.",
      proofPhotography: "الصور أولا",
      proofEnquiries: "استفسارات مباشرة",
      proofCommission: "بدون عمولة حجز",
      featuredTitle: "فنادق مميزة",
      featuredBody: "تعرض ستة فنادق تجريبية كيف يمكن تقديم عقارات محلية مختلفة بأسلوب راق ومتناسق.",
      viewAllHotels: "عرض كل الفنادق",
      areasTitle: "استكشف المناطق",
      areasBody: "يمكن للمالكين رؤية كيف يصبح الموقع جزءا من قصة البيع، من باتومي القديمة إلى القرى الساحلية الهادئة.",
      whyTitle: "لماذا Small Hotels؟",
      whyBody: "غالبا ما تمتلك فنادق باتومي الصغيرة الدفء الذي يريده الضيوف، لكنها لا تملك العرض الذي تحتاجه. يوضح هذا العرض كيف يمكن لقصة بصرية أفضل أن تجعل الملكية المحلية ميزة.",
      features: [
        ["خدمة شخصية", "يعرف الضيوف أنهم يتحدثون مع مالكين ومضيفين حقيقيين، وليس مع مركز اتصال بعيد."],
        ["ملكية محلية", "تسلط كل صفحة الضوء على الحي وأسلوب المضيف والقصة خلف العقار."],
        ["تجربة أصيلة", "يمكن للأماكن الصغيرة المنافسة بالشخصية والدفء والصور الحقيقية."],
        ["قيمة أفضل", "يدعم التواصل المباشر الطلبات البسيطة دون أنظمة معقدة أو عمولات."]
      ],
      howTitle: "كيف يعمل",
      howBody: "رحلتان بسيطتان: واحدة للضيوف وواحدة لأصحاب الفنادق.",
      guestsTitle: "للضيوف",
      ownersTitle: "لأصحاب الفنادق",
      guestSteps: ["اكتشاف الفندق", "مشاهدة الصور", "التواصل مباشرة", "حجز الإقامة"],
      ownerSteps: ["تصوير", "صفحة الفندق", "استفسارات مباشرة", "ظهور أكبر"]
    },
    hotelsPage: {
      title: "فنادق في باتومي",
      body: "عرض شبكي مناسب للموبايل للفنادق العائلية وبيوت الضيافة والشقق الفندقية والفنادق المصغرة. تعمل المرشحات محليا في هذا العرض.",
      filtersLabel: "مرشحات الفنادق",
      filtersTitle: "المرشحات",
      clear: "مسح",
      area: "المنطقة",
      type: "نوع الفندق",
      budget: "نطاق الميزانية",
      options: {
        familyFriendly: "مناسب للعائلات",
        seaView: "إطلالة بحرية",
        nearBeach: "قريب من الشاطئ",
        parking: "موقف سيارات"
      },
      resultsTitle: "{{count}} فنادق متاحة",
      resultsBody: "تجمع كل بطاقة الصور والمنطقة والوسوم وWhatsApp والوصول إلى صفحة التفاصيل في مكان قريب.",
      emptyTitle: "لا توجد فنادق تطابق هذه المرشحات.",
      emptyBody: "امسح مرشحا لرؤية المزيد من عقارات العرض."
    },
    hotelCard: {
      viewHotel: "عرض الفندق"
    },
    detail: {
      backToHotels: "الفنادق",
      call: "اتصال",
      email: "البريد الإلكتروني",
      whyStay: "لماذا تقيم هنا",
      rooms: "نظرة على الغرف",
      facilities: "المرافق",
      location: "الموقع",
      locationBody: "توضح مساحة الخريطة التجريبية كيف يمكن لصفحة محلية خفيفة أن تشرح الوصول والمعالم القريبة وسياق الحي دون أن تصبح أداة حجز معقدة.",
      nearby: "معالم قريبة",
      ctaTitle: "هل تريد عرض فندقك بهذه الطريقة؟",
      ctaBody: "صفحة التفاصيل هذه هي حجة البيع: صور احترافية، تواصل بسيط، وقصة راقية لعقار محلي.",
      ctaButton: "طلب عرض تجريبي"
    },
    owners: {
      heroTitle: "اعرض فندقك إلكترونيا بشكل احترافي",
      heroBody: "صفحة مبيعات مركزة وتصوير احترافي وخيارات تواصل مباشر للفنادق الصغيرة التي تحتاج إلى حضور إلكتروني أفضل دون بناء موقع كامل.",
      requestDemo: "طلب عرض تجريبي",
      seeExample: "شاهد صفحة مثال",
      includesTitle: "ماذا تشمل الخدمة",
      includesBody: "المنصة بسيطة عن قصد. تساعد المالك على الظهور باحترافية وجمع الاستفسارات المباشرة وعرض العقار بوضوح للضيوف.",
      features: [
        ["تصوير احترافي", "تُعرض الغرف والحمامات والواجهة ومناطق الإفطار والمرافق والمحيط بعناية."],
        ["صفحة فندق مخصصة", "يحصل كل عقار على صفحة مصقولة مع صور وموقع ومرافق وتفاصيل عملية للضيوف."],
        ["استفسارات WhatsApp مباشرة", "يمكن للضيوف التواصل مباشرة مع المالك دون تعلم نظام معقد."],
        ["طلبات حجز مباشرة", "تنتج النماذج البسيطة عملاء محتملين واضحين دون حسابات أو مدفوعات أو تكاملات PMS."]
      ],
      services: [
        ["جاهز لـ WhatsApp", "تواصل سريع في القناة التي يستخدمها المالكون بالفعل."],
        ["بدون عمولة حجز", "احتفظ بالاستفسار المباشر بدلا من خسارة الهامش."],
        ["جمع عملاء محتملين بسيط", "الطلبات منظمة بحيث تصبح المتابعة أسهل."],
        ["انطباع أول راق", "الصفحة الأفضل تجعل الفندق الصغير يبدو أكثر قيمة."]
      ],
      pricingTitle: "الأسعار",
      pricingBody: "باقات واضحة لمحادثة مبيعات مع أصحاب الفنادق.",
      pricing: [
        { title: "إدراج مبدئي", price: "100 GEL/شهريا", note: "خلال الموسم العالي", items: ["ملف الفندق", "معرض صور", "أزرار التواصل", "نموذج طلب الحجز", "إدراج المنطقة"] },
        { title: "باقة التصوير", price: "رسوم لمرة واحدة", note: "مجموعة صور احترافية لصفحة الفندق", items: ["الغرف", "الحمامات", "الواجهة", "منطقة الإفطار", "المرافق", "المحيط"] },
        { title: "إعداد طلب الحجز", price: "رسوم لمرة واحدة", note: "إعداد استفسار مباشر لعملاء الضيوف البسيطين", items: ["نموذج تواصل", "تكامل WhatsApp", "جمع العملاء المحتملين", "مسار حجز بسيط"] }
      ],
      processTitle: "من إدراج عادي إلى عرض راق",
      processBody: "صُمم عرض المبيعات ليجعل الفرق واضحا على الهاتف في أقل من دقيقة.",
      processSteps: ["صور", "صفحة", "استفسارات", "عملاء محتملون"]
    },
    contact: {
      title: "طلب عرض تجريبي",
      body: "شارك بعض التفاصيل عن فندقك. يوضح العرض كيف يمكن أن يبدو عقارك مع تصوير احترافي وصفحة مخصصة وWhatsApp وطلبات حجز مباشرة.",
      builtTitle: "مصمم للفنادق الصغيرة في باتومي",
      builtBody: "الهدف بسيط: مساعدة المالكين على الظهور باحترافية على الإنترنت دون موقع مخصص مكلف أو نظام حجز معقد.",
      bestForLabel: "مناسب لـ",
      bestFor: "الفنادق العائلية، بيوت الضيافة، الشقق الفندقية، الفنادق المصغرة",
      channelsLabel: "القنوات الرئيسية",
      channels: "WhatsApp، الهاتف، البريد الإلكتروني، نموذج طلب الحجز",
      focusLabel: "تركيز العرض",
      focus: "التصوير، الثقة، البساطة، التواصل المباشر"
    },
    forms: {
      name: "الاسم",
      hotelName: "اسم الفندق",
      phone: "الهاتف",
      whatsapp: "WhatsApp",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      bookingTitle: "طلب حجز",
      bookingBody: "أرسل استفسارا بسيطا مباشرة إلى مالك الفندق. لا يتم أخذ أي دفع هنا.",
      phoneWhatsapp: "الهاتف أو WhatsApp",
      arrival: "الوصول",
      nights: "الليالي",
      bookingMessage: "مرحبا، أود التحقق من التوفر في {{hotelName}}.",
      sendRequest: "إرسال الطلب",
      bookingSuccess: "تم تسجيل طلب العرض. في الإنتاج سيصل هذا إلى مالك الفندق.",
      contactMessage: "أود أن أرى كيف يمكن عرض فندقي على Small Hotels Batumi.",
      contactButton: "طلب عرض تجريبي",
      contactSuccess: "تم استلام استفسار العرض محليا لهذا العرض الترويجي."
    },
    data: {
      areas: {
        "Old Batumi": "باتومي القديمة",
        Boulevard: "البوليفارد",
        "New Boulevard": "البوليفارد الجديد",
        Gonio: "غونيو",
        Kvariati: "كفارياتي",
        Makhinjauri: "ماخينجاوري",
        "Green Cape": "الرأس الأخضر",
        "Airport Area": "منطقة المطار"
      },
      areaDescriptions: {
        "Old Batumi": "شوارع تاريخية ومقاه وواجهات مرممة ومشي سهل إلى البوليفارد.",
        Boulevard: "طاقة بحرية مركزية مع حدائق ومقاه شاطئية وممرات باتومي الكلاسيكية.",
        "New Boulevard": "شقق حديثة وغرف بإطلالة بحرية وخيارات إقامة أطول بالقرب من الساحل.",
        Gonio: "منطقة شاطئية أكثر هدوءا للعائلات ورحلات الصيف والإقامات المحلية البسيطة.",
        Kvariati: "إطلالات بحرية من التلال وبيوت ضيافة هادئة وإيقاع ساحلي أبطأ.",
        Makhinjauri: "محيط أخضر وبيوت ضيافة عملية ووصول سريع إلى باتومي.",
        "Green Cape": "إقامات بحدائق وزيارات تركز على الطبيعة قرب الحديقة النباتية.",
        "Airport Area": "توقفات مريحة ومواقف سيارات ووصول سهل للرحلات القصيرة."
      },
      hotelTypes: {
        "Family Hotel": "فندق عائلي",
        Guesthouse: "بيت ضيافة",
        Aparthotel: "شقق فندقية",
        "Mini Hotel": "فندق مصغر"
      },
      budgets: {
        Budget: "اقتصادي",
        Mid: "متوسط",
        Premium: "فاخر"
      },
      tags: {
        "Family run": "إدارة عائلية",
        "Old town": "المدينة القديمة",
        Breakfast: "إفطار",
        "Near beach": "قريب من الشاطئ",
        Garden: "حديقة",
        "Great value": "قيمة ممتازة",
        "Sea view": "إطلالة بحرية",
        "Apart rooms": "غرف شقق",
        Modern: "حديث",
        Quiet: "هادئ",
        Nature: "طبيعة",
        Parking: "موقف سيارات",
        "Local host": "مضيف محلي",
        Hillside: "على التل",
        Couples: "أزواج"
      },
      rooms: {
        "Double rooms": "غرف مزدوجة",
        "Triple family rooms": "غرف عائلية ثلاثية",
        "Small balcony rooms": "غرف صغيرة بشرفة",
        "Standard doubles": "غرف مزدوجة قياسية",
        "Twin rooms": "غرف بسريرين",
        "Family room with sofa": "غرفة عائلية مع أريكة",
        "Studio apartments": "شقق استوديو",
        "One-bedroom apartments": "شقق بغرفة نوم واحدة",
        "Sea-view family apartment": "شقة عائلية بإطلالة بحرية",
        "Garden double rooms": "غرف مزدوجة مطلة على الحديقة",
        "Triple rooms": "غرف ثلاثية",
        "Ground-floor family room": "غرفة عائلية في الطابق الأرضي",
        "Family room": "غرفة عائلية",
        "Sea-view double rooms": "غرف مزدوجة بإطلالة بحرية",
        "Balcony rooms": "غرف بشرفة",
        "Compact twin rooms": "غرف بسريرين مدمجة"
      },
      facilities: {
        "Wi-Fi": "Wi-Fi",
        Breakfast: "إفطار",
        "Air conditioning": "تكييف",
        "Laundry help": "مساعدة في الغسيل",
        "Airport pickup": "استقبال من المطار",
        Garden: "حديقة",
        Parking: "موقف سيارات",
        "Shared kitchen": "مطبخ مشترك",
        Kitchenette: "مطبخ صغير",
        Lift: "مصعد",
        Balcony: "شرفة",
        "Sea view": "إطلالة بحرية",
        "Garden terrace": "تراس الحديقة",
        "Outdoor seating": "جلسات خارجية",
        Terrace: "تراس",
        "Breakfast terrace": "تراس الإفطار"
      },
      nearby: {
        "Piazza Square": "ساحة بيازا",
        "Europe Square": "ساحة أوروبا",
        "Batumi Boulevard": "بوليفارد باتومي",
        "Alphabet Tower": "برج الأبجدية",
        "6 May Park": "حديقة 6 مايو",
        Dolphinarium: "الدولفيناريوم",
        "Central Boulevard": "البوليفارد المركزي",
        "Beach cafes": "مقاهي الشاطئ",
        "New Boulevard": "البوليفارد الجديد",
        "Metro City": "مترو سيتي",
        "Aqua park": "الحديقة المائية",
        "Beach promenade": "ممشى الشاطئ",
        "Batumi Botanical Garden": "حديقة باتومي النباتية",
        "Green Cape beach": "شاطئ الرأس الأخضر",
        "Mtsvane Kontskhi station": "محطة متسفانه كونتسخي",
        "Gonio Fortress": "قلعة غونيو",
        "Gonio beach": "شاطئ غونيو",
        "Local restaurants": "مطاعم محلية",
        "Airport road": "طريق المطار",
        "Kvariati beach": "شاطئ كفارياتي",
        "Sarpi road": "طريق ساربي",
        "Mountain viewpoints": "نقاط إطلالة جبلية"
      }
    },
    hotels: {
      "old-town-family-hotel": {
        intro: "فندق عائلي هادئ في المركز التاريخي، قريب من المقاهي والبوليفارد والمشي المسائي قرب البحر.",
        whyStay: ["مالكون ودودون يعيشون بالقرب ويساعدون بنصائح محلية.", "غرف هادئة خلف أكثر شوارع باتومي القديمة ازدحاما.", "خدمة إفطار بسيطة وتواصل مباشر سهل."]
      },
      "sea-breeze-guesthouse": {
        intro: "بيت ضيافة مريح قرب البوليفارد مع جلسات خارجية مظللة وغرف عملية للإقامات الأطول.",
        whyStay: ["مشي قصير إلى الشاطئ دون سعر الفندق الكبير.", "مضيفون يساعدون في ترتيب سيارات الأجرة والتوصيات المحلية.", "اختيار جيد للعائلات والضيوف القادمين بالسيارة."]
      },
      "new-boulevard-apart-stay": {
        intro: "إقامات مشرقة بنمط الشقق في منطقة البوليفارد الجديد، مثالية للضيوف الذين يريدون مساحة أكبر وإطلالة بحرية.",
        whyStay: ["الغرف ذات المطبخ الصغير تجعل رحلات باتومي الطويلة أسهل.", "الديكورات الحديثة تبدو جميلة في الاستفسارات الإلكترونية.", "التواصل المباشر مع المالك يبقي حوار الحجز بسيطا."]
      },
      "green-garden-mini-hotel": {
        intro: "فندق مصغر هادئ محاط بالخضرة، مناسب للضيوف الذين يريدون إقامة أبطأ خارج المركز.",
        whyStay: ["مساحة الحديقة تمنح العقار إحساس الفندق العائلي الدافئ.", "قريب من الطبيعة دون فقدان الوصول إلى باتومي.", "خيار قوي للضيوف القادمين بالسيارة."]
      },
      "gonio-quiet-house": {
        intro: "بيت ضيافة بسيط وهادئ في غونيو لأيام الشاطئ والإقامات العائلية والضيوف الذين يفضلون ضوضاء أقل.",
        whyStay: ["حي محلي مريح مع وصول سريع إلى الشاطئ.", "قيمة جيدة للإقامات الصيفية خارج وسط باتومي.", "يرد المالكون بسرعة عبر WhatsApp."]
      },
      "kvariati-view-rooms": {
        intro: "إقامة صغيرة على التل مع إطلالات مفتوحة نحو البحر الأسود وشعور أهدأ من وسط باتومي.",
        whyStay: ["الغرف ذات الإطلالة البحرية تخلق انطباعا أول لا ينسى على الإنترنت.", "مناسبة للأزواج والرحلات الساحلية الهادئة.", "طلبات الحجز المباشرة تساعد المالكين على حماية الهامش."]
      }
    }
  }
};

const I18nContext = createContext(null);

function getNestedValue(source, path) {
  return path.split(".").reduce((current, key) => current?.[key], source);
}

function interpolate(value, params = {}) {
  if (typeof value !== "string") return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ""));
}

function getLanguageConfig(code) {
  return languages.find((language) => language.code === code) || languages[0];
}

function normalizeFeatures(items) {
  return items.map((item) => (Array.isArray(item) ? { title: item[0], body: item[1] } : item));
}

function translateDataValue(language, section, key, fallback) {
  return (
    dictionaries[language]?.data?.[section]?.[key] ??
    dictionaries.en.data?.[section]?.[key] ??
    fallback
  );
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = window.localStorage.getItem("small-hotels-language");
    return languages.some((item) => item.code === saved) ? saved : "en";
  });

  const languageConfig = getLanguageConfig(language);

  useEffect(() => {
    document.documentElement.lang = languageConfig.htmlLang;
    document.documentElement.dir = languageConfig.dir;
    window.localStorage.setItem("small-hotels-language", language);
  }, [language, languageConfig.dir, languageConfig.htmlLang]);

  const setLanguage = useCallback((nextLanguage) => {
    if (languages.some((item) => item.code === nextLanguage)) {
      setLanguageState(nextLanguage);
    }
  }, []);

  const t = useCallback(
    (path, params) => {
      const value = getNestedValue(dictionaries[language], path) ?? getNestedValue(dictionaries.en, path);
      return interpolate(value ?? path, params);
    },
    [language]
  );

  const list = useCallback(
    (path) => {
      const value = getNestedValue(dictionaries[language], path) ?? getNestedValue(dictionaries.en, path) ?? [];
      return Array.isArray(value) ? value : [];
    },
    [language]
  );

  const features = useCallback((path) => normalizeFeatures(list(path)), [list]);

  const dataLabel = useCallback(
    (section, key, fallback = key) => translateDataValue(language, section, key, fallback),
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      languageConfig,
      languages,
      setLanguage,
      t,
      list,
      features,
      dataLabel
    }),
    [dataLabel, features, language, languageConfig, list, setLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}

export function useLocalizedHotelData() {
  const { dataLabel, language, t } = useI18n();

  return useMemo(() => {
    const localizedHotels = baseHotels.map((hotel) => {
      const hotelCopy = dictionaries[language]?.hotels?.[hotel.slug] ?? {};
      const areaLabel = dataLabel("areas", hotel.area, hotel.area);

      return {
        ...hotel,
        originalName: hotel.name,
        name: hotelCopy.name ?? hotel.name,
        areaLabel,
        typeLabel: dataLabel("hotelTypes", hotel.type, hotel.type),
        budgetLabel: dataLabel("budgets", hotel.budget, hotel.budget),
        tags: hotel.tags.map((tag) => dataLabel("tags", tag, tag)),
        intro: hotelCopy.intro ?? hotel.intro,
        whyStay: hotelCopy.whyStay ?? hotel.whyStay,
        rooms: hotel.rooms.map((room) => dataLabel("rooms", room, room)),
        facilities: hotel.facilities.map((facility) => dataLabel("facilities", facility, facility)),
        nearby: hotel.nearby.map((place) => dataLabel("nearby", place, place))
      };
    });

    return {
      hotels: localizedHotels,
      areas: baseAreas.map((area) => ({
        ...area,
        label: dataLabel("areas", area.name, area.name),
        description: dataLabel("areaDescriptions", area.name, area.description),
        countLabel: t("common.hotelCount", { count: area.count })
      })),
      hotelTypes: baseHotelTypes.map((type) => ({
        value: type,
        label: dataLabel("hotelTypes", type, type)
      })),
      budgetRanges: baseBudgetRanges.map((range) => ({
        value: range,
        label: dataLabel("budgets", range, range)
      }))
    };
  }, [dataLabel, language, t]);
}
