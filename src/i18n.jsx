import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { areas as baseAreas, hotels as baseHotels, locales } from "./data/site.js";

export const languages = locales;
export const defaultLocale = "en";
export const localeCodes = languages.map((locale) => locale.code);

const ui = {
  en: {
    common: {
      language: "Language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      all: "All",
      clear: "Clear",
      viewHotel: "View hotel",
      whatsapp: "WhatsApp",
      requestAvailability: "Request availability",
      findRoom: "Find a room",
      exploreHotels: "Explore hotels",
      exploreAreas: "Explore areas",
      readGuide: "Read guide",
      from: "from",
      gel: "GEL",
      lastVerified: "Last verified",
      approximateMap: "Approximate area map",
      relatedHotels: "Related small hotels"
    },
    nav: {
      hotels: "Hotels",
      areas: "Areas",
      collections: "Collections",
      map: "Map",
      guide: "Travel Guide",
      about: "About"
    },
    footer: {
      text:
        "Independent hotels, guesthouses and local rooms in Batumi — with real photos, local area notes and direct WhatsApp requests.",
      propertyOwners: "For property owners",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms"
    },
    home: {
      title: "Find a small hotel in Batumi that actually fits your trip.",
      subtitle:
        "Independent hotels, guesthouses and local rooms in Batumi — with real photos, local area notes and direct WhatsApp requests.",
      intentTitle: "What kind of stay are you looking for?",
      featuredTitle: "Featured small hotels",
      featuredBody: "Compare small hotels and guesthouses by area, atmosphere and practical details before sending a direct request.",
      areasTitle: "Where to stay in Batumi",
      collectionsTitle: "Find the right stay faster",
      trustTitle: "Why use Small Hotels Batumi?",
      trustBody:
        "We help travellers understand the hotel, the area and the practical details before they contact the property.",
      guideTitle: "Local Batumi accommodation guide",
      trustItems: [
        "Real photos",
        "Local area notes",
        "Direct contact with hotels",
        "Independent small properties",
        "Good-to-know details before you ask",
        "Simple WhatsApp room requests"
      ]
    },
    hotelsPage: {
      title: "Small hotels and guesthouses in Batumi",
      intro:
        "Browse independent hotels, guesthouses, mini hotels and local rooms across Batumi. Use the filters to find places near the beach, in quieter areas, with parking, sea views or family-friendly rooms.",
      filters: "Filters",
      area: "Area",
      type: "Type",
      budget: "Budget",
      results: "{{count}} stays found",
      noResults: "No matching hotels yet.",
      noResultsBody: "Try removing one filter or contact us for local advice.",
      helpfulLinks: "Helpful searches"
    },
    detail: {
      back: "Back to hotels",
      quickFacts: "Quick facts",
      photos: "Photos",
      whyStay: "Why stay here",
      bestFor: "Best for",
      goodToKnow: "Good to know",
      rooms: "Rooms",
      facilities: "Facilities",
      localAreaNotes: "Local area notes",
      nearby: "Near this hotel",
      faq: "FAQ",
      related: "Related hotels",
      area: "Area",
      beach: "Beach",
      boulevard: "Boulevard",
      airport: "Airport",
      breakfast: "Breakfast",
      parking: "Parking",
      noise: "Noise level",
      transport: "Transport",
      checkIn: "Check-in",
      languages: "Languages",
      payment: "Payment note"
    },
    areas: {
      indexTitle: "Where to stay in Batumi",
      indexIntro:
        "Choose the right area before choosing a room. Batumi feels different in Old Batumi, New Boulevard, Gonio, Kvariati and the greener edges of the city.",
      bestFor: "Best for",
      goodToKnow: "Good to know",
      beachAccess: "Beach access",
      transport: "Transport",
      noiseLevel: "Noise level",
      parking: "Parking",
      hotelsHere: "Small stays in this area",
      relatedCollections: "Related collections",
      faq: "Area FAQ"
    },
    collections: {
      indexTitle: "Collections by travel intent",
      indexIntro:
        "Start with how you want the trip to feel: beach, quiet, family-friendly, budget, sea view, parking or a specific Batumi area.",
      bestAreas: "Best areas for this type of stay",
      hotels: "Matching stays",
      related: "Related collections",
      faq: "Questions to ask"
    },
    guide: {
      indexTitle: "Batumi accommodation guide",
      indexIntro:
        "Practical local advice for choosing where to stay in Batumi, from old-town streets to quieter beach villages.",
      tableOfContents: "In this guide",
      relatedHotels: "Related hotels",
      relatedAreas: "Related areas",
      relatedCollections: "Related collections",
      updated: "Updated"
    },
    map: {
      title: "Small hotels by Batumi area",
      intro:
        "This map-style guide groups stays by approximate area. Exact GPS is not shown yet, so use it as a local orientation tool before sending a request.",
      disclaimer: "Approximate locations only. Confirm the exact address with the hotel before arrival."
    },
    about: {
      title: "About Small Hotels Batumi",
      intro:
        "Small Hotels Batumi is a local accommodation guide for travellers who prefer independent stays, practical details and direct contact over anonymous booking pages.",
      body:
        "The guide focuses on small hotels, guesthouses, aparthotels and local rooms. Each listing is written to help you understand the area, room fit and good-to-know details before you contact the property."
    },
    contact: {
      title: "Ask for local accommodation advice",
      intro:
        "Tell us what kind of stay you need in Batumi and we will point you toward the most relevant areas or small hotels.",
      bestFor: "Useful for",
      bestForValue: "Area advice, shortlists, direct hotel requests",
      channels: "Contact channels",
      channelsValue: "WhatsApp, phone, email and availability request forms"
    },
    owners: {
      title: "For property owners",
      h1: "Get your small hotel professionally presented online",
      intro:
        "A secondary page for local property owners who want better photography, a clearer hotel page and direct WhatsApp requests.",
      pricing: "Pricing",
      featuresTitle: "What the service includes"
    },
    forms: {
      name: "Name",
      hotelName: "Hotel name",
      phone: "Phone or WhatsApp",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      message: "Message",
      send: "Send request",
      bookingTitle: "Request availability",
      bookingBody: "Send a simple availability request. No payment is taken here.",
      bookingMessage: "Hello, I found {{hotelName}} on Small Hotels Batumi. Please tell me if you have availability.",
      bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.",
      contactButton: "Send request",
      contactSuccess: "Request captured locally for this guide."
    }
  },
  ru: {
    common: {
      language: "Язык",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      all: "Все",
      clear: "Очистить",
      viewHotel: "Смотреть отель",
      whatsapp: "WhatsApp",
      requestAvailability: "Запросить наличие",
      findRoom: "Найти номер",
      exploreHotels: "Смотреть отели",
      exploreAreas: "Районы",
      readGuide: "Читать гид",
      from: "от",
      gel: "GEL",
      lastVerified: "Проверено",
      approximateMap: "Примерная карта района",
      relatedHotels: "Похожие небольшие отели"
    },
    nav: { hotels: "Отели", areas: "Районы", collections: "Подборки", map: "Карта", guide: "Гид", about: "О нас" },
    footer: { propertyOwners: "Для владельцев", contact: "Контакты", privacy: "Privacy", terms: "Terms" },
    home: {
      title: "Найдите небольшой отель в Батуми под вашу поездку.",
      subtitle: "Независимые отели, гостевые дома и местные комнаты в Батуми — с реальными фото, заметками о районах и прямыми запросами WhatsApp.",
      intentTitle: "Какой формат проживания вам нужен?",
      featuredTitle: "Рекомендуемые небольшие отели",
      featuredBody: "Сравните район, атмосферу и практические детали перед прямым запросом.",
      areasTitle: "Где остановиться в Батуми",
      collectionsTitle: "Быстрее найдите подходящий вариант",
      trustTitle: "Почему Small Hotels Batumi?",
      trustBody: "Мы помогаем понять отель, район и важные детали до контакта с объектом.",
      guideTitle: "Локальный гид по проживанию",
      trustItems: ["Реальные фото", "Заметки о районах", "Прямой контакт", "Независимые объекты", "Практичные детали", "Простые запросы WhatsApp"]
    },
    hotelsPage: {
      title: "Небольшие отели и гостевые дома в Батуми",
      intro: "Смотрите независимые отели, гостевые дома, мини-отели и местные комнаты по районам Батуми.",
      filters: "Фильтры",
      area: "Район",
      type: "Тип",
      budget: "Бюджет",
      results: "Найдено: {{count}}",
      noResults: "Пока нет подходящих отелей.",
      noResultsBody: "Уберите один фильтр или напишите нам за местным советом.",
      helpfulLinks: "Полезные поиски"
    },
    detail: {
      back: "Назад к отелям",
      quickFacts: "Краткие факты",
      photos: "Фото",
      whyStay: "Почему остановиться здесь",
      bestFor: "Лучше всего для",
      goodToKnow: "Важно знать",
      rooms: "Номера",
      facilities: "Удобства",
      localAreaNotes: "Заметки о районе",
      nearby: "Рядом с отелем",
      faq: "FAQ",
      related: "Похожие отели",
      area: "Район",
      beach: "Пляж",
      boulevard: "Бульвар",
      airport: "Аэропорт",
      breakfast: "Завтрак",
      parking: "Парковка",
      noise: "Шум",
      transport: "Транспорт",
      checkIn: "Заезд",
      languages: "Языки",
      payment: "Оплата"
    },
    areas: { indexTitle: "Где остановиться в Батуми", bestFor: "Лучше всего", goodToKnow: "Важно знать", beachAccess: "Пляж", transport: "Транспорт", noiseLevel: "Шум", parking: "Парковка", hotelsHere: "Варианты в районе", relatedCollections: "Связанные подборки", faq: "FAQ района" },
    collections: { indexTitle: "Подборки по типу поездки", bestAreas: "Лучшие районы", hotels: "Подходящие варианты", related: "Связанные подборки", faq: "Вопросы" },
    guide: { indexTitle: "Гид по проживанию в Батуми", tableOfContents: "В статье", relatedHotels: "Отели", relatedAreas: "Районы", relatedCollections: "Подборки", updated: "Обновлено" },
    map: { title: "Небольшие отели по районам Батуми", disclaimer: "Локации примерные. Точный адрес уточняйте у отеля." },
    about: { title: "О Small Hotels Batumi", intro: "Локальный гид по небольшим независимым вариантам проживания в Батуми." },
    contact: { title: "Спросить совет по проживанию", intro: "Расскажите, какой район или формат проживания вам нужен." },
    owners: { title: "Для владельцев", h1: "Профессионально представьте свой небольшой отель онлайн", pricing: "Цены", featuresTitle: "Что входит" },
    forms: {
      name: "Имя",
      hotelName: "Название отеля",
      phone: "Телефон или WhatsApp",
      checkIn: "Заезд",
      checkOut: "Выезд",
      guests: "Гости",
      message: "Сообщение",
      send: "Отправить",
      bookingTitle: "Запросить наличие",
      bookingBody: "Отправьте простой запрос. Здесь нет оплаты.",
      bookingMessage: "Здравствуйте, я нашел {{hotelName}} на Small Hotels Batumi. Подскажите, есть ли свободные номера.",
      bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.",
      contactButton: "Отправить",
      contactSuccess: "Запрос сохранен локально."
    }
  },
  ka: {
    common: { language: "ენა", openMenu: "მენიუ", closeMenu: "დახურვა", all: "ყველა", clear: "გასუფთავება", viewHotel: "სასტუმროს ნახვა", whatsapp: "WhatsApp", requestAvailability: "ხელმისაწვდომობის მოთხოვნა", findRoom: "ოთახის პოვნა", exploreHotels: "სასტუმროები", exploreAreas: "უბნები", readGuide: "გიდის წაკითხვა", from: "დან", gel: "GEL", lastVerified: "ბოლო შემოწმება", approximateMap: "დაახლოებითი რუკა", relatedHotels: "მსგავსი პატარა სასტუმროები" },
    nav: { hotels: "სასტუმროები", areas: "უბნები", collections: "კოლექციები", map: "რუკა", guide: "გიდი", about: "შესახებ" },
    footer: { propertyOwners: "მესაკუთრეებისთვის", contact: "კონტაქტი", privacy: "Privacy", terms: "Terms" },
    home: { title: "იპოვეთ პატარა სასტუმრო ბათუმში, რომელიც თქვენს მოგზაურობას ერგება.", subtitle: "დამოუკიდებელი სასტუმროები, გესთჰაუსები და ადგილობრივი ოთახები ბათუმში — რეალური ფოტოებით, უბნის შენიშვნებით და პირდაპირი WhatsApp მოთხოვნებით.", intentTitle: "როგორი დარჩენა გჭირდებათ?", featuredTitle: "გამორჩეული პატარა სასტუმროები", featuredBody: "შეადარეთ უბანი, ატმოსფერო და პრაქტიკული დეტალები პირდაპირ მოთხოვნამდე.", areasTitle: "სად დარჩეთ ბათუმში", collectionsTitle: "უფრო სწრაფად იპოვეთ შესაფერისი ადგილი", trustTitle: "რატომ Small Hotels Batumi?", trustBody: "ვხმარობთ მოგზაურებს სასტუმროს, უბნისა და პრაქტიკული დეტალების გაგებაში კონტაქტამდე.", guideTitle: "ადგილობრივი განთავსების გიდი", trustItems: ["რეალური ფოტოები", "უბნის შენიშვნები", "პირდაპირი კონტაქტი", "დამოუკიდებელი ობიექტები", "პრაქტიკული დეტალები", "მარტივი WhatsApp მოთხოვნები"] },
    hotelsPage: { title: "პატარა სასტუმროები და გესთჰაუსები ბათუმში", intro: "დაათვალიერეთ დამოუკიდებელი სასტუმროები, გესთჰაუსები, მინი სასტუმროები და ადგილობრივი ოთახები ბათუმის უბნების მიხედვით.", filters: "ფილტრები", area: "უბანი", type: "ტიპი", budget: "ბიუჯეტი", results: "{{count}} ადგილი ნაპოვნია", noResults: "შესაბამისი სასტუმრო ჯერ არ არის.", noResultsBody: "მოხსენით ერთი ფილტრი ან მოგვწერეთ ადგილობრივი რჩევისთვის.", helpfulLinks: "სასარგებლო ძიებები" },
    detail: { back: "სასტუმროებზე დაბრუნება", quickFacts: "მოკლე ფაქტები", photos: "ფოტოები", whyStay: "რატომ დარჩეთ აქ", bestFor: "საუკეთესოა", goodToKnow: "სასარგებლოა იცოდეთ", rooms: "ოთახები", facilities: "სერვისები", localAreaNotes: "უბნის შენიშვნები", nearby: "ახლოს", faq: "FAQ", related: "მსგავსი სასტუმროები", area: "უბანი", beach: "პლაჟი", boulevard: "ბულვარი", airport: "აეროპორტი", breakfast: "საუზმე", parking: "პარკინგი", noise: "ხმაური", transport: "ტრანსპორტი", checkIn: "შესვლა", languages: "ენები", payment: "გადახდა" },
    areas: { indexTitle: "სად დარჩეთ ბათუმში", bestFor: "საუკეთესოა", goodToKnow: "იცოდეთ", beachAccess: "პლაჟი", transport: "ტრანსპორტი", noiseLevel: "ხმაური", parking: "პარკინგი", hotelsHere: "ადგილები ამ უბანში", relatedCollections: "დაკავშირებული კოლექციები", faq: "უბნის FAQ" },
    collections: { indexTitle: "კოლექციები მოგზაურობის მიზნის მიხედვით", bestAreas: "საუკეთესო უბნები", hotels: "შესაბამისი ადგილები", related: "დაკავშირებული კოლექციები", faq: "კითხვები" },
    guide: { indexTitle: "ბათუმის განთავსების გიდი", tableOfContents: "სტატიაში", relatedHotels: "სასტუმროები", relatedAreas: "უბნები", relatedCollections: "კოლექციები", updated: "განახლებულია" },
    map: { title: "პატარა სასტუმროები ბათუმის უბნების მიხედვით", disclaimer: "ლოკაციები დაახლოებულია. ზუსტი მისამართი გადაამოწმეთ სასტუმროსთან." },
    about: { title: "Small Hotels Batumi-ის შესახებ", intro: "ადგილობრივი გიდი ბათუმის პატარა დამოუკიდებელი განთავსებებისთვის." },
    contact: { title: "იკითხეთ განთავსების რჩევა", intro: "გვითხარით, როგორი უბანი ან ადგილი გჭირდებათ." },
    owners: { title: "მესაკუთრეებისთვის", h1: "წარადგინეთ თქვენი პატარა სასტუმრო პროფესიონალურად ონლაინ", pricing: "ფასები", featuresTitle: "რას მოიცავს" },
    forms: { name: "სახელი", hotelName: "სასტუმროს სახელი", phone: "ტელეფონი ან WhatsApp", checkIn: "ჩამოსვლა", checkOut: "გასვლა", guests: "სტუმრები", message: "შეტყობინება", send: "გაგზავნა", bookingTitle: "ხელმისაწვდომობის მოთხოვნა", bookingBody: "გაგზავნეთ მარტივი მოთხოვნა. აქ გადახდა არ ხდება.", bookingMessage: "გამარჯობა, {{hotelName}} ვნახე Small Hotels Batumi-ზე. გთხოვთ მითხრათ, არის თუ არა თავისუფალი ოთახი.", bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.", contactButton: "გაგზავნა", contactSuccess: "მოთხოვნა ლოკალურად ჩაიწერა." }
  },
  tr: {
    common: { language: "Dil", openMenu: "Menüyü aç", closeMenu: "Menüyü kapat", all: "Tümü", clear: "Temizle", viewHotel: "Oteli gör", whatsapp: "WhatsApp", requestAvailability: "Uygunluk iste", findRoom: "Oda bul", exploreHotels: "Oteller", exploreAreas: "Bölgeler", readGuide: "Rehberi oku", from: "başlayan", gel: "GEL", lastVerified: "Son kontrol", approximateMap: "Yaklaşık bölge haritası", relatedHotels: "Benzer küçük oteller" },
    nav: { hotels: "Oteller", areas: "Bölgeler", collections: "Koleksiyonlar", map: "Harita", guide: "Gezi Rehberi", about: "Hakkında" },
    footer: { propertyOwners: "Tesis sahipleri", contact: "İletişim", privacy: "Privacy", terms: "Terms" },
    home: { title: "Batum’da yolculuğunuza gerçekten uyan küçük oteli bulun.", subtitle: "Batum’da bağımsız oteller, misafirhaneler ve yerel odalar — gerçek fotoğraflar, bölge notları ve doğrudan WhatsApp istekleriyle.", intentTitle: "Nasıl bir konaklama arıyorsunuz?", featuredTitle: "Öne çıkan küçük oteller", featuredBody: "Doğrudan istek göndermeden önce bölge, atmosfer ve pratik detayları karşılaştırın.", areasTitle: "Batum’da nerede kalmalı", collectionsTitle: "Doğru konaklamayı daha hızlı bulun", trustTitle: "Neden Small Hotels Batumi?", trustBody: "Gezginlerin tesis, bölge ve pratik detayları iletişime geçmeden önce anlamasına yardım ederiz.", guideTitle: "Yerel konaklama rehberi", trustItems: ["Gerçek fotoğraflar", "Bölge notları", "Doğrudan iletişim", "Bağımsız küçük tesisler", "Pratik bilgiler", "Basit WhatsApp istekleri"] },
    hotelsPage: { title: "Batum’da küçük oteller ve misafirhaneler", intro: "Batum genelinde bağımsız oteller, misafirhaneler, mini oteller ve yerel odaları inceleyin.", filters: "Filtreler", area: "Bölge", type: "Tip", budget: "Bütçe", results: "{{count}} konaklama bulundu", noResults: "Henüz eşleşen otel yok.", noResultsBody: "Bir filtreyi kaldırın veya yerel tavsiye için bize yazın.", helpfulLinks: "Faydalı aramalar" },
    detail: { back: "Otellere dön", quickFacts: "Kısa bilgiler", photos: "Fotoğraflar", whyStay: "Neden burada kalmalı", bestFor: "En uygun", goodToKnow: "Bilmek iyi olur", rooms: "Odalar", facilities: "Olanaklar", localAreaNotes: "Bölge notları", nearby: "Yakında", faq: "SSS", related: "Benzer oteller", area: "Bölge", beach: "Plaj", boulevard: "Bulvar", airport: "Havalimanı", breakfast: "Kahvaltı", parking: "Otopark", noise: "Gürültü", transport: "Ulaşım", checkIn: "Giriş", languages: "Diller", payment: "Ödeme" },
    areas: { indexTitle: "Batum’da nerede kalmalı", bestFor: "En uygun", goodToKnow: "Bilmek iyi olur", beachAccess: "Plaj", transport: "Ulaşım", noiseLevel: "Gürültü", parking: "Otopark", hotelsHere: "Bu bölgedeki konaklamalar", relatedCollections: "İlgili koleksiyonlar", faq: "Bölge SSS" },
    collections: { indexTitle: "Seyahat amacına göre koleksiyonlar", bestAreas: "En iyi bölgeler", hotels: "Eşleşen konaklamalar", related: "İlgili koleksiyonlar", faq: "Sorular" },
    guide: { indexTitle: "Batum konaklama rehberi", tableOfContents: "Bu rehberde", relatedHotels: "Oteller", relatedAreas: "Bölgeler", relatedCollections: "Koleksiyonlar", updated: "Güncellendi" },
    map: { title: "Batum bölgelerine göre küçük oteller", disclaimer: "Konumlar yaklaşık gösterilir. Kesin adresi tesisten doğrulayın." },
    about: { title: "Small Hotels Batumi hakkında", intro: "Batum’daki küçük bağımsız konaklamalar için yerel rehber." },
    contact: { title: "Konaklama tavsiyesi isteyin", intro: "Hangi bölge veya konaklama tipini aradığınızı söyleyin." },
    owners: { title: "Tesis sahipleri", h1: "Küçük otelinizi online profesyonel şekilde sunun", pricing: "Fiyatlandırma", featuresTitle: "Hizmete dahil" },
    forms: { name: "Ad", hotelName: "Otel adı", phone: "Telefon veya WhatsApp", checkIn: "Giriş", checkOut: "Çıkış", guests: "Misafir", message: "Mesaj", send: "Gönder", bookingTitle: "Uygunluk iste", bookingBody: "Basit bir uygunluk isteği gönderin. Burada ödeme alınmaz.", bookingMessage: "Merhaba, {{hotelName}} tesisini Small Hotels Batumi’de buldum. Uygunluk bilgisi verir misiniz?", bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.", contactButton: "Gönder", contactSuccess: "İstek yerel olarak kaydedildi." }
  },
  he: {
    common: { language: "שפה", openMenu: "פתח תפריט", closeMenu: "סגור תפריט", all: "הכול", clear: "ניקוי", viewHotel: "צפייה במלון", whatsapp: "WhatsApp", requestAvailability: "בקשת זמינות", findRoom: "מצאו חדר", exploreHotels: "מלונות", exploreAreas: "אזורים", readGuide: "קראו מדריך", from: "מ-", gel: "GEL", lastVerified: "אומת לאחרונה", approximateMap: "מפת אזור משוערת", relatedHotels: "מלונות קטנים דומים" },
    nav: { hotels: "מלונות", areas: "אזורים", collections: "אוספים", map: "מפה", guide: "מדריך", about: "אודות" },
    footer: { propertyOwners: "לבעלי נכסים", contact: "יצירת קשר", privacy: "Privacy", terms: "Terms" },
    home: { title: "מצאו מלון קטן בבאטומי שבאמת מתאים לטיול שלכם.", subtitle: "מלונות עצמאיים, בתי הארחה וחדרים מקומיים בבאטומי — עם תמונות אמיתיות, הערות אזור ובקשות WhatsApp ישירות.", intentTitle: "איזו שהייה אתם מחפשים?", featuredTitle: "מלונות קטנים נבחרים", featuredBody: "השוו אזור, אווירה ופרטים מעשיים לפני שליחת בקשה ישירה.", areasTitle: "איפה כדאי לשהות בבאטומי", collectionsTitle: "מצאו את השהייה הנכונה מהר יותר", trustTitle: "למה Small Hotels Batumi?", trustBody: "אנחנו עוזרים למטיילים להבין את המלון, האזור והפרטים המעשיים לפני יצירת קשר.", guideTitle: "מדריך לינה מקומי", trustItems: ["תמונות אמיתיות", "הערות אזור", "קשר ישיר", "נכסים קטנים עצמאיים", "פרטים חשובים", "בקשות WhatsApp פשוטות"] },
    hotelsPage: { title: "מלונות קטנים ובתי הארחה בבאטומי", intro: "עיינו במלונות עצמאיים, בתי הארחה, מיני מלונות וחדרים מקומיים ברחבי באטומי.", filters: "מסננים", area: "אזור", type: "סוג", budget: "תקציב", results: "{{count}} מקומות נמצאו", noResults: "עדיין אין מלונות מתאימים.", noResultsBody: "הסירו מסנן או פנו אלינו לעצה מקומית.", helpfulLinks: "חיפושים שימושיים" },
    detail: { back: "חזרה למלונות", quickFacts: "עובדות מהירות", photos: "תמונות", whyStay: "למה להישאר כאן", bestFor: "מתאים ל", goodToKnow: "טוב לדעת", rooms: "חדרים", facilities: "מתקנים", localAreaNotes: "הערות אזור", nearby: "קרוב למלון", faq: "שאלות", related: "מלונות דומים", area: "אזור", beach: "חוף", boulevard: "שדרה", airport: "שדה תעופה", breakfast: "ארוחת בוקר", parking: "חניה", noise: "רעש", transport: "תחבורה", checkIn: "צ'ק-אין", languages: "שפות", payment: "תשלום" },
    areas: { indexTitle: "איפה כדאי לשהות בבאטומי", bestFor: "מתאים ל", goodToKnow: "טוב לדעת", beachAccess: "גישה לחוף", transport: "תחבורה", noiseLevel: "רעש", parking: "חניה", hotelsHere: "מקומות באזור", relatedCollections: "אוספים קשורים", faq: "שאלות אזור" },
    collections: { indexTitle: "אוספים לפי סגנון טיול", bestAreas: "האזורים הטובים ביותר", hotels: "שהיות מתאימות", related: "אוספים קשורים", faq: "שאלות" },
    guide: { indexTitle: "מדריך לינה בבאטומי", tableOfContents: "במדריך", relatedHotels: "מלונות", relatedAreas: "אזורים", relatedCollections: "אוספים", updated: "עודכן" },
    map: { title: "מלונות קטנים לפי אזור בבאטומי", disclaimer: "המיקומים משוערים. אשרו כתובת מדויקת מול המלון." },
    about: { title: "אודות Small Hotels Batumi", intro: "מדריך מקומי למקומות לינה קטנים ועצמאיים בבאטומי." },
    contact: { title: "בקשו עצה לגבי לינה", intro: "ספרו איזה אזור או סוג שהייה אתם מחפשים." },
    owners: { title: "לבעלי נכסים", h1: "הציגו את המלון הקטן שלכם אונליין בצורה מקצועית", pricing: "מחירים", featuresTitle: "מה כלול" },
    forms: { name: "שם", hotelName: "שם המלון", phone: "טלפון או WhatsApp", checkIn: "צ'ק-אין", checkOut: "צ'ק-אאוט", guests: "אורחים", message: "הודעה", send: "שליחה", bookingTitle: "בקשת זמינות", bookingBody: "שלחו בקשת זמינות פשוטה. לא נלקח כאן תשלום.", bookingMessage: "שלום, מצאתי את {{hotelName}} ב-Small Hotels Batumi. אשמח לדעת אם יש זמינות.", bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.", contactButton: "שליחה", contactSuccess: "הבקשה נשמרה מקומית." }
  },
  ar: {
    common: { language: "اللغة", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", all: "الكل", clear: "مسح", viewHotel: "عرض الفندق", whatsapp: "WhatsApp", requestAvailability: "طلب التوفر", findRoom: "ابحث عن غرفة", exploreHotels: "الفنادق", exploreAreas: "المناطق", readGuide: "اقرأ الدليل", from: "من", gel: "GEL", lastVerified: "آخر تحقق", approximateMap: "خريطة تقريبية للمنطقة", relatedHotels: "فنادق صغيرة مشابهة" },
    nav: { hotels: "الفنادق", areas: "المناطق", collections: "المجموعات", map: "الخريطة", guide: "دليل السفر", about: "حول" },
    footer: { propertyOwners: "لأصحاب العقارات", contact: "تواصل", privacy: "Privacy", terms: "Terms" },
    home: { title: "اعثر على فندق صغير في باتومي يناسب رحلتك فعلا.", subtitle: "فنادق مستقلة وبيوت ضيافة وغرف محلية في باتومي — مع صور حقيقية وملاحظات عن المناطق وطلبات WhatsApp مباشرة.", intentTitle: "ما نوع الإقامة التي تبحث عنها؟", featuredTitle: "فنادق صغيرة مختارة", featuredBody: "قارن المنطقة والأجواء والتفاصيل العملية قبل إرسال طلب مباشر.", areasTitle: "أين تقيم في باتومي", collectionsTitle: "اعثر على الإقامة المناسبة أسرع", trustTitle: "لماذا Small Hotels Batumi؟", trustBody: "نساعد المسافرين على فهم الفندق والمنطقة والتفاصيل العملية قبل التواصل مع العقار.", guideTitle: "دليل محلي للإقامة", trustItems: ["صور حقيقية", "ملاحظات محلية", "تواصل مباشر", "عقارات صغيرة مستقلة", "تفاصيل مفيدة", "طلبات WhatsApp بسيطة"] },
    hotelsPage: { title: "فنادق صغيرة وبيوت ضيافة في باتومي", intro: "تصفح فنادق مستقلة وبيوت ضيافة وفنادق مصغرة وغرفا محلية في باتومي.", filters: "المرشحات", area: "المنطقة", type: "النوع", budget: "الميزانية", results: "تم العثور على {{count}} إقامة", noResults: "لا توجد فنادق مطابقة بعد.", noResultsBody: "جرّب إزالة مرشح أو تواصل معنا لنصيحة محلية.", helpfulLinks: "عمليات بحث مفيدة" },
    detail: { back: "العودة إلى الفنادق", quickFacts: "حقائق سريعة", photos: "الصور", whyStay: "لماذا تقيم هنا", bestFor: "مناسب لـ", goodToKnow: "من الجيد معرفة", rooms: "الغرف", facilities: "المرافق", localAreaNotes: "ملاحظات المنطقة", nearby: "قريب من الفندق", faq: "الأسئلة", related: "فنادق مشابهة", area: "المنطقة", beach: "الشاطئ", boulevard: "البوليفارد", airport: "المطار", breakfast: "الإفطار", parking: "موقف سيارات", noise: "الضوضاء", transport: "النقل", checkIn: "تسجيل الوصول", languages: "اللغات", payment: "الدفع" },
    areas: { indexTitle: "أين تقيم في باتومي", bestFor: "مناسب لـ", goodToKnow: "من الجيد معرفة", beachAccess: "الوصول للشاطئ", transport: "النقل", noiseLevel: "الضوضاء", parking: "موقف سيارات", hotelsHere: "إقامات في هذه المنطقة", relatedCollections: "مجموعات مرتبطة", faq: "أسئلة المنطقة" },
    collections: { indexTitle: "مجموعات حسب نية السفر", bestAreas: "أفضل المناطق", hotels: "إقامات مطابقة", related: "مجموعات مرتبطة", faq: "أسئلة" },
    guide: { indexTitle: "دليل الإقامة في باتومي", tableOfContents: "في هذا الدليل", relatedHotels: "فنادق", relatedAreas: "مناطق", relatedCollections: "مجموعات", updated: "تم التحديث" },
    map: { title: "فنادق صغيرة حسب مناطق باتومي", disclaimer: "المواقع تقريبية. أكد العنوان الدقيق مع الفندق." },
    about: { title: "حول Small Hotels Batumi", intro: "دليل محلي للإقامات الصغيرة والمستقلة في باتومي." },
    contact: { title: "اطلب نصيحة حول الإقامة", intro: "أخبرنا أي منطقة أو نوع إقامة تبحث عنه." },
    owners: { title: "لأصحاب العقارات", h1: "اعرض فندقك الصغير إلكترونيا بشكل احترافي", pricing: "الأسعار", featuresTitle: "ماذا تشمل الخدمة" },
    forms: { name: "الاسم", hotelName: "اسم الفندق", phone: "الهاتف أو WhatsApp", checkIn: "تسجيل الوصول", checkOut: "تسجيل المغادرة", guests: "الضيوف", message: "الرسالة", send: "إرسال", bookingTitle: "طلب التوفر", bookingBody: "أرسل طلب توفر بسيطا. لا يتم الدفع هنا.", bookingMessage: "مرحبا، وجدت {{hotelName}} على Small Hotels Batumi. هل يمكن إعلامي بالتوفر؟", bookingSuccess: "Request captured locally. In production this request would be sent directly to the hotel by email or WhatsApp.", contactButton: "إرسال", contactSuccess: "تم حفظ الطلب محليا." }
  }
};

const labelMaps = {
  areas: {
    ru: { "Old Batumi": "Старый Батуми", Boulevard: "Бульвар", "New Boulevard": "Новый бульвар", "Airport Area": "Район аэропорта", Makhinjauri: "Махинджаури", "Green Cape": "Зеленый мыс", Gonio: "Гонио", Kvariati: "Квариати" },
    ka: { "Old Batumi": "ძველი ბათუმი", Boulevard: "ბულვარი", "New Boulevard": "ახალი ბულვარი", "Airport Area": "აეროპორტის ზონა", Makhinjauri: "მახინჯაური", "Green Cape": "მწვანე კონცხი", Gonio: "გონიო", Kvariati: "კვარიათი" },
    tr: { "Old Batumi": "Eski Batum", Boulevard: "Bulvar", "New Boulevard": "Yeni Bulvar", "Airport Area": "Havalimanı Bölgesi", Makhinjauri: "Makhinjauri", "Green Cape": "Yeşil Burun", Gonio: "Gonio", Kvariati: "Kvariati" },
    he: { "Old Batumi": "באטומי העתיקה", Boulevard: "השדרה", "New Boulevard": "השדרה החדשה", "Airport Area": "אזור שדה התעופה", Makhinjauri: "מחינג׳אורי", "Green Cape": "הכף הירוק", Gonio: "גוניו", Kvariati: "קוואריאטי" },
    ar: { "Old Batumi": "باتومي القديمة", Boulevard: "البوليفارد", "New Boulevard": "البوليفارد الجديد", "Airport Area": "منطقة المطار", Makhinjauri: "ماخينجاوري", "Green Cape": "الرأس الأخضر", Gonio: "غونيو", Kvariati: "كفارياتي" }
  },
  filters: {
    ru: { "Near beach": "Рядом с пляжем", "Quiet stay": "Тихо", "Family friendly": "Для семьи", "Sea view": "Вид на море", Parking: "Парковка", "Balcony rooms": "Балкон", "Long stay": "Долгая stay", "Late check-in": "Поздний заезд", "Good Wi-Fi": "Хороший Wi-Fi", "Near airport": "У аэропорта" },
    ka: { "Near beach": "პლაჟთან ახლოს", "Quiet stay": "მშვიდი", "Family friendly": "ოჯახებისთვის", "Sea view": "ზღვის ხედი", Parking: "პარკინგი", "Balcony rooms": "აივანი", "Long stay": "გრძელი დარჩენა", "Late check-in": "გვიანი შესვლა", "Good Wi-Fi": "კარგი Wi-Fi", "Near airport": "აეროპორტთან" },
    tr: { "Near beach": "Plaja yakın", "Quiet stay": "Sakin", "Family friendly": "Aile dostu", "Sea view": "Deniz manzarası", Parking: "Otopark", "Balcony rooms": "Balkonlu", "Long stay": "Uzun konaklama", "Late check-in": "Geç giriş", "Good Wi-Fi": "İyi Wi-Fi", "Near airport": "Havalimanına yakın" },
    he: { "Near beach": "קרוב לחוף", "Quiet stay": "שקט", "Family friendly": "למשפחות", "Sea view": "נוף לים", Parking: "חניה", "Balcony rooms": "מרפסת", "Long stay": "שהייה ארוכה", "Late check-in": "צ'ק-אין מאוחר", "Good Wi-Fi": "Wi-Fi טוב", "Near airport": "קרוב לשדה" },
    ar: { "Near beach": "قريب من الشاطئ", "Quiet stay": "هادئ", "Family friendly": "مناسب للعائلات", "Sea view": "إطلالة بحرية", Parking: "موقف سيارات", "Balcony rooms": "شرفة", "Long stay": "إقامة طويلة", "Late check-in": "وصول متأخر", "Good Wi-Fi": "Wi-Fi جيد", "Near airport": "قريب من المطار" }
  }
};

const I18nContext = createContext(null);

export function isLocale(value) {
  return localeCodes.includes(value);
}

export function localeFromPathname(pathname = "/") {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}

export function stripLocale(pathname = "/") {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return `/${parts.join("/")}`.replace(/\/$/, "") || "/";
}

export function withLocale(locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}/`;
  return `/${locale}${clean}`;
}

export function switchLocalePath(pathname, locale) {
  return withLocale(locale, stripLocale(pathname));
}

function getNestedValue(source, path) {
  return path.split(".").reduce((current, key) => current?.[key], source);
}

function interpolate(value, params = {}) {
  if (typeof value !== "string") return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ""));
}

function languageConfig(code) {
  return languages.find((language) => language.code === code) || languages[0];
}

export function I18nProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(() => {
    if (initialLanguage && isLocale(initialLanguage)) return initialLanguage;
    if (typeof window !== "undefined") return localeFromPathname(window.location.pathname);
    return defaultLocale;
  });
  const config = languageConfig(language);

  useEffect(() => {
    document.documentElement.lang = config.htmlLang;
    document.documentElement.dir = config.dir;
  }, [config.dir, config.htmlLang]);

  const t = useCallback(
    (path, params) => {
      const value = getNestedValue(ui[language], path) ?? getNestedValue(ui.en, path);
      return interpolate(value ?? path, params);
    },
    [language]
  );

  const list = useCallback(
    (path) => {
      const value = getNestedValue(ui[language], path) ?? getNestedValue(ui.en, path);
      return Array.isArray(value) ? value : [];
    },
    [language]
  );

  const dataLabel = useCallback(
    (section, key) => labelMaps[section]?.[language]?.[key] ?? key,
    [language]
  );

  const value = useMemo(
    () => ({ language, languageConfig: config, languages, setLanguage, t, list, dataLabel }),
    [config, dataLabel, language, list, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function useLocalePath() {
  const { language } = useI18n();
  return useCallback((path = "/") => withLocale(language, path), [language]);
}

export function useLocalizedHotelData() {
  const { dataLabel, language } = useI18n();

  return useMemo(
    () => ({
      hotels: baseHotels.map((hotel) => ({
        ...hotel,
        areaLabel: dataLabel("areas", hotel.areaName),
        badges: hotel.badges.map((badge) => dataLabel("filters", badge))
      })),
      areas: baseAreas.map((area) => ({
        ...area,
        label: dataLabel("areas", area.name)
      }))
    }),
    [dataLabel, language]
  );
}

export function useLocaleSync(pathname) {
  const { setLanguage } = useI18n();

  useEffect(() => {
    setLanguage(localeFromPathname(pathname));
  }, [pathname, setLanguage]);
}
