export interface Trek {
  id: string;
  slug: string;
  name: string;
  region: string;
  duration: string;
  maxAltitude: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  bestSeasons: string[];
  price: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    altitude?: string;
    distance?: string;
  }[];
  images: string[];
  featured: boolean;
  rating: number;
  reviews: number;
}

export const treks: Trek[] = [
  {
    id: "1",
    slug: "everest-base-camp",
    name: "Everest Base Camp Trek",
    region: "Everest",
    duration: "14 Days",
    maxAltitude: "5,364m",
    difficulty: "Challenging",
    bestSeasons: ["March-May", "September-November"],
    price: 1450,
    shortDescription: "Journey to the foot of the world's highest peak through legendary Sherpa villages.",
    description: "The Everest Base Camp trek is the adventure of a lifetime, taking you through the heart of the Khumbu region to the base of Mount Everest. Walk in the footsteps of legendary mountaineers, experience authentic Sherpa culture, and witness some of the most spectacular mountain scenery on Earth.",
    highlights: [
      "Stand at Everest Base Camp (5,364m)",
      "Summit Kala Patthar for sunrise views",
      "Visit Tengboche Monastery",
      "Experience Sherpa hospitality",
      "Fly into Lukla - the world's most exciting airport"
    ],
    includes: [
      "Airport transfers",
      "Domestic flights (Kathmandu-Lukla-Kathmandu)",
      "All meals during trek (breakfast, lunch, dinner)",
      "Experienced English-speaking guide",
      "Porter service (1 porter for 2 trekkers)",
      "All permits and fees",
      "Teahouse accommodation",
      "First aid kit"
    ],
    excludes: [
      "International flights",
      "Nepal visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips for guide and porters",
      "Emergency evacuation"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Welcome to Nepal! Transfer to hotel and trip briefing.", altitude: "1,400m" },
      { day: 2, title: "Fly to Lukla, Trek to Phakding", description: "Scenic flight to Lukla, then easy trek along Dudh Koshi river.", altitude: "2,610m", distance: "8km" },
      { day: 3, title: "Phakding to Namche Bazaar", description: "Cross suspension bridges and climb to the Sherpa capital.", altitude: "3,440m", distance: "11km" },
      { day: 4, title: "Acclimatization Day in Namche", description: "Explore Namche, visit Everest View Hotel, acclimatize.", altitude: "3,440m" },
      { day: 5, title: "Namche to Tengboche", description: "Trek through rhododendron forests to famous monastery.", altitude: "3,870m", distance: "10km" },
      { day: 6, title: "Tengboche to Dingboche", description: "Continue up the valley with stunning Ama Dablam views.", altitude: "4,410m", distance: "9km" },
      { day: 7, title: "Acclimatization Day in Dingboche", description: "Rest day with optional hike to Nangkartshang Peak.", altitude: "4,410m" },
      { day: 8, title: "Dingboche to Lobuche", description: "Trek past memorials to fallen climbers.", altitude: "4,940m", distance: "8km" },
      { day: 9, title: "Lobuche to Gorak Shep to EBC", description: "Reach Everest Base Camp! An emotional achievement.", altitude: "5,364m", distance: "13km" },
      { day: 10, title: "Gorak Shep to Kala Patthar to Pheriche", description: "Sunrise hike to Kala Patthar for best Everest views.", altitude: "4,280m", distance: "16km" },
      { day: 11, title: "Pheriche to Namche Bazaar", description: "Descend through familiar terrain back to Namche.", altitude: "3,440m", distance: "20km" },
      { day: 12, title: "Namche to Lukla", description: "Final day of trekking, celebration dinner.", altitude: "2,840m", distance: "19km" },
      { day: 13, title: "Fly to Kathmandu", description: "Morning flight to Kathmandu, free time for shopping.", altitude: "1,400m" },
      { day: 14, title: "Departure", description: "Transfer to airport for international departure." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
    ],
    featured: true,
    rating: 4.9,
    reviews: 342
  },
  {
    id: "2",
    slug: "annapurna-circuit",
    name: "Annapurna Circuit Trek",
    region: "Annapurna",
    duration: "12-18 Days",
    maxAltitude: "5,416m",
    difficulty: "Challenging",
    bestSeasons: ["March-May", "October-November"],
    price: 1250,
    shortDescription: "The classic Himalayan trek crossing the mighty Thorong La Pass.",
    description: "The Annapurna Circuit is one of the world's most diverse and spectacular treks. Circle the Annapurna massif, crossing the challenging Thorong La Pass at 5,416m. Experience dramatic landscape changes from subtropical forests to high-altitude desert, and immerse yourself in Hindu and Buddhist cultures.",
    highlights: [
      "Cross Thorong La Pass (5,416m)",
      "Visit sacred Muktinath Temple",
      "Experience diverse ecosystems",
      "Explore Manang village",
      "Relax in natural hot springs at Tatopani"
    ],
    includes: [
      "Airport transfers",
      "All ground transportation",
      "All meals during trek",
      "Experienced guide and porters",
      "ACAP and TIMS permits",
      "Teahouse accommodation"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar", description: "Drive to the trailhead through scenic valleys.", altitude: "760m" },
      { day: 2, title: "Besisahar to Bahundanda", description: "Begin trekking through rice terraces and villages.", altitude: "1,310m" },
      { day: 3, title: "Bahundanda to Chamje", description: "Cross suspension bridges and waterfalls.", altitude: "1,410m" },
      { day: 4, title: "Chamje to Bagarchhap", description: "Enter the Manang district, Tibetan influence begins.", altitude: "2,160m" },
      { day: 5, title: "Bagarchhap to Chame", description: "Trek through apple orchards to district headquarters.", altitude: "2,710m" },
      { day: 6, title: "Chame to Pisang", description: "Stunning views of Annapurna II and Lamjung Himal.", altitude: "3,200m" },
      { day: 7, title: "Pisang to Manang", description: "Visit Braga monastery, explore Manang.", altitude: "3,540m" },
      { day: 8, title: "Acclimatization in Manang", description: "Rest day with optional hikes.", altitude: "3,540m" },
      { day: 9, title: "Manang to Yak Kharka", description: "Continue ascending toward Thorong La.", altitude: "4,110m" },
      { day: 10, title: "Yak Kharka to Thorong Phedi", description: "Prepare for tomorrow's big pass crossing.", altitude: "4,600m" },
      { day: 11, title: "Cross Thorong La to Muktinath", description: "Summit day! Cross the pass, descend to sacred temple.", altitude: "5,416m → 3,800m" },
      { day: 12, title: "Muktinath to Jomsom", description: "Descend through Mustang region.", altitude: "2,720m" }
    ],
    images: [
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200"
    ],
    featured: true,
    rating: 4.8,
    reviews: 287
  },
  {
    id: "3",
    slug: "langtang-valley",
    name: "Langtang Valley Trek",
    region: "Langtang",
    duration: "7-10 Days",
    maxAltitude: "4,984m",
    difficulty: "Moderate",
    bestSeasons: ["March-May", "September-December"],
    price: 850,
    shortDescription: "Discover the beautiful valley of glaciers closest to Kathmandu.",
    description: "The Langtang Valley Trek offers a perfect introduction to Himalayan trekking. Located just north of Kathmandu, this trek takes you through beautiful rhododendron and bamboo forests, traditional Tamang villages, and stunning glacial valleys with views of Langtang Lirung (7,227m).",
    highlights: [
      "Visit Kyanjin Gompa monastery",
      "Climb Tserko Ri for panoramic views",
      "Experience Tamang culture",
      "See the Langtang Glacier",
      "Taste local yak cheese"
    ],
    includes: [
      "All ground transportation",
      "All meals during trek",
      "Guide and porter",
      "Langtang National Park permit",
      "TIMS permit",
      "Accommodation"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Travel insurance",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Syabrubesi", description: "Scenic drive through hills to trailhead.", altitude: "1,550m" },
      { day: 2, title: "Syabrubesi to Lama Hotel", description: "Trek through oak and rhododendron forests.", altitude: "2,380m" },
      { day: 3, title: "Lama Hotel to Langtang Village", description: "Enter the Langtang Valley, meet local Tamangs.", altitude: "3,430m" },
      { day: 4, title: "Langtang to Kyanjin Gompa", description: "Reach the monastery, explore surroundings.", altitude: "3,870m" },
      { day: 5, title: "Kyanjin Gompa Exploration", description: "Climb Tserko Ri (4,984m) or Kyanjin Ri.", altitude: "4,984m" },
      { day: 6, title: "Kyanjin to Lama Hotel", description: "Descend back through the valley.", altitude: "2,380m" },
      { day: 7, title: "Lama Hotel to Syabrubesi", description: "Complete the trek.", altitude: "1,550m" },
      { day: 8, title: "Syabrubesi to Kathmandu", description: "Drive back to the capital." }
    ],
    images: [
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200"
    ],
    featured: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: "4",
    slug: "mardi-himal",
    name: "Mardi Himal Trek",
    region: "Annapurna",
    duration: "5-7 Days",
    maxAltitude: "4,500m",
    difficulty: "Moderate",
    bestSeasons: ["March-May", "October-December"],
    price: 650,
    shortDescription: "A hidden gem offering pristine trails and stunning Annapurna views.",
    description: "The Mardi Himal Trek is a relatively new and less crowded trail in the Annapurna region. This short but rewarding trek offers incredible views of Machapuchare (Fishtail), Annapurna South, and Hiunchuli. Perfect for those with limited time seeking authentic Himalayan experiences.",
    highlights: [
      "Uncrowded trails",
      "Close-up Machapuchare views",
      "Beautiful forest camps",
      "Sunrise at High Camp",
      "Authentic village experiences"
    ],
    includes: [
      "Transportation",
      "All meals",
      "Guide and porter",
      "Permits",
      "Accommodation"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Insurance",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Drive to Kande, Trek to Deurali", description: "Short drive from Pokhara, begin trekking.", altitude: "2,100m" },
      { day: 2, title: "Deurali to Forest Camp", description: "Trek through rhododendron forest.", altitude: "2,600m" },
      { day: 3, title: "Forest Camp to Low Camp", description: "Ascend to open ridgeline.", altitude: "3,200m" },
      { day: 4, title: "Low Camp to High Camp", description: "Climb to the high viewpoint.", altitude: "3,900m" },
      { day: 5, title: "High Camp to Mardi Base Camp", description: "Optional push to base camp, return.", altitude: "4,500m" },
      { day: 6, title: "Descend to Siding", description: "Long descent through different terrain.", altitude: "1,700m" },
      { day: 7, title: "Siding to Pokhara", description: "Complete trek, drive to Pokhara." }
    ],
    images: [
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
    ],
    featured: false,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "5",
    slug: "manaslu-circuit",
    name: "Manaslu Circuit Trek",
    region: "Manaslu",
    duration: "14-16 Days",
    maxAltitude: "5,106m",
    difficulty: "Strenuous",
    bestSeasons: ["March-May", "September-November"],
    price: 1550,
    shortDescription: "Circle the world's 8th highest peak on this remote adventure.",
    description: "The Manaslu Circuit is one of Nepal's most spectacular and remote treks. Encircle Manaslu (8,163m), the world's eighth-highest mountain, crossing the challenging Larkya La Pass. This restricted area trek offers authentic cultural experiences and dramatic landscapes far from the tourist crowds.",
    highlights: [
      "Cross Larkya La Pass (5,106m)",
      "Remote and pristine trails",
      "Rich Tibetan Buddhist culture",
      "Views of Manaslu (8,163m)",
      "Traditional villages"
    ],
    includes: [
      "All transportation",
      "Meals on trek",
      "Licensed guide and porters",
      "Restricted area permit",
      "MCAP and TIMS permits",
      "Camping/lodge accommodation"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Travel insurance (mandatory)",
      "Personal gear",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Soti Khola", description: "Long scenic drive to trailhead.", altitude: "700m" },
      { day: 2, title: "Soti Khola to Machha Khola", description: "Begin trekking along Budhi Gandaki.", altitude: "930m" },
      { day: 3, title: "Machha Khola to Jagat", description: "Enter the Manaslu Conservation Area.", altitude: "1,410m" },
      { day: 4, title: "Jagat to Deng", description: "Cross to west bank, Tibetan culture emerges.", altitude: "1,860m" },
      { day: 5, title: "Deng to Namrung", description: "Pass through narrow gorges and waterfalls.", altitude: "2,660m" },
      { day: 6, title: "Namrung to Samagaon", description: "Reach base of Manaslu, visit monastery.", altitude: "3,530m" },
      { day: 7, title: "Acclimatization in Samagaon", description: "Explore, optional hike to Birendra Lake.", altitude: "3,530m" },
      { day: 8, title: "Samagaon to Samdo", description: "Trek through yak pastures.", altitude: "3,875m" },
      { day: 9, title: "Rest Day in Samdo", description: "Acclimatize, explore border area.", altitude: "3,875m" },
      { day: 10, title: "Samdo to Dharamsala", description: "Reach base camp for pass crossing.", altitude: "4,460m" },
      { day: 11, title: "Cross Larkya La to Bimthang", description: "The big day! Cross the pass.", altitude: "5,106m → 3,720m" },
      { day: 12, title: "Bimthang to Tilije", description: "Descend through forests and fields.", altitude: "2,300m" },
      { day: 13, title: "Tilije to Jagat (Dharapani)", description: "Meet the Annapurna Circuit trail.", altitude: "1,700m" },
      { day: 14, title: "Drive to Kathmandu", description: "Long drive back to the capital." }
    ],
    images: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200"
    ],
    featured: true,
    rating: 4.9,
    reviews: 124
  },
  {
    id: "6",
    slug: "upper-dolpo",
    name: "Upper Dolpo Trek",
    region: "Dolpo",
    duration: "21-25 Days",
    maxAltitude: "5,360m",
    difficulty: "Strenuous",
    bestSeasons: ["May-October"],
    price: 3200,
    shortDescription: "Explore Nepal's last forbidden kingdom, unchanged for centuries.",
    description: "Upper Dolpo is one of the most remote and culturally preserved regions on Earth. Made famous by Peter Matthiessen's 'The Snow Leopard,' this trek offers a rare glimpse into ancient Tibetan Buddhist culture, stunning high-altitude landscapes, and the mystical Shey Phoksundo Lake.",
    highlights: [
      "Visit Shey Phoksundo Lake",
      "Explore Shey Gompa",
      "Cross multiple high passes",
      "Authentic Tibetan culture",
      "Possible snow leopard sighting"
    ],
    includes: [
      "All transportation",
      "Full camping equipment",
      "All meals and snacks",
      "Experienced guide and crew",
      "Special restricted area permits",
      "National park fees"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Insurance",
      "Personal gear",
      "Satellite phone rental",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Fly to Nepalgunj", description: "Domestic flight to western Nepal.", altitude: "150m" },
      { day: 2, title: "Fly to Juphal, Trek to Dunai", description: "Enter the Dolpo region.", altitude: "2,475m" },
      { day: 3, title: "Dunai to Phoksundo Lake", description: "Trek to the magnificent turquoise lake.", altitude: "3,630m" }
    ],
    images: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200"
    ],
    featured: false,
    rating: 5.0,
    reviews: 28
  },
  {
    id: "7",
    slug: "pikey-peak",
    name: "Pikey Peak Trek",
    region: "Solu Khumbu",
    duration: "7-9 Days",
    maxAltitude: "4,065m",
    difficulty: "Easy",
    bestSeasons: ["Year-round"],
    price: 550,
    shortDescription: "Edmund Hillary's favorite viewpoint - see 8 of the world's highest peaks.",
    description: "Pikey Peak was Sir Edmund Hillary's favorite viewpoint. From this modest summit, you can see eight of the world's fourteen 8,000m peaks on a clear day, including Everest, Lhotse, Makalu, and Kanchenjunga. This tea house trek is perfect for beginners.",
    highlights: [
      "Views of 8 eight-thousanders",
      "Sir Edmund Hillary's favorite view",
      "Less crowded trails",
      "Traditional Sherpa villages",
      "Year-round accessibility"
    ],
    includes: [
      "Transportation",
      "All meals",
      "Guide and porter",
      "Permits",
      "Teahouse accommodation"
    ],
    excludes: [
      "Flights",
      "Visa",
      "Insurance",
      "Personal items",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Phaplu", description: "Drive or fly to Solu Khumbu.", altitude: "2,413m" },
      { day: 2, title: "Phaplu to Taksindu", description: "Trek through forest and villages.", altitude: "3,050m" },
      { day: 3, title: "Taksindu to Pikey Base Camp", description: "Ascend toward the peak.", altitude: "3,640m" },
      { day: 4, title: "Pikey Peak Sunrise, to Junbesi", description: "Early morning summit for sunrise.", altitude: "4,065m → 2,675m" },
      { day: 5, title: "Junbesi to Phaplu", description: "Trek back through Sherpa heartland.", altitude: "2,413m" },
      { day: 6, title: "Phaplu to Kathmandu", description: "Return to the capital." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
    ],
    featured: false,
    rating: 4.7,
    reviews: 67
  },
  {
    id: "8",
    slug: "tsum-valley",
    name: "Tsum Valley Trek",
    region: "Manaslu",
    duration: "14-16 Days",
    maxAltitude: "3,700m",
    difficulty: "Moderate",
    bestSeasons: ["March-May", "September-November"],
    price: 1350,
    shortDescription: "Discover the hidden 'Valley of Happiness' with ancient Buddhist heritage.",
    description: "Tsum Valley, known as the 'Valley of Happiness,' is a hidden gem in the Manaslu region. This sacred valley has been isolated for centuries, preserving its ancient Buddhist culture and traditions. Trek through peaceful villages, visit ancient monasteries, and experience genuine Himalayan hospitality.",
    highlights: [
      "Visit Mu Gompa monastery",
      "Ancient Buddhist heritage",
      "Authentic village life",
      "Panoramic mountain views",
      "Less touristed region"
    ],
    includes: [
      "Transportation",
      "Meals on trek",
      "Guide and porters",
      "Special permits",
      "Lodge accommodation"
    ],
    excludes: [
      "International flights",
      "Nepal visa",
      "Insurance",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Soti Khola", description: "Drive to the trailhead.", altitude: "700m" },
      { day: 2, title: "Soti Khola to Machha Khola", description: "Begin trekking.", altitude: "930m" },
      { day: 3, title: "Machha Khola to Jagat", description: "Continue along the river.", altitude: "1,340m" }
    ],
    images: [
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1200"
    ],
    featured: false,
    rating: 4.8,
    reviews: 42
  }
];

export const getTrekBySlug = (slug: string): Trek | undefined => {
  return treks.find(trek => trek.slug === slug);
};

export const getFeaturedTreks = (): Trek[] => {
  return treks.filter(trek => trek.featured);
};

export const getTreksByRegion = (region: string): Trek[] => {
  return treks.filter(trek => trek.region.toLowerCase() === region.toLowerCase());
};

export const regions = ["Everest", "Annapurna", "Langtang", "Manaslu", "Dolpo", "Solu Khumbu"];
export const difficulties = ["Easy", "Moderate", "Challenging", "Strenuous"];
