
import { categories } from './categories';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  categoryIds: string[];
  slug: string;
  featured?: boolean;
  readTime: number;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Top 10 Must-Visit Destinations in Southeast Asia',
    excerpt: 'Explore the most breathtaking locations that Southeast Asia has to offer, from ancient temples to pristine beaches.',
    content: `
      <p>Southeast Asia has long been a favorite destination for travelers seeking a blend of adventure, culture, and natural beauty. From the bustling streets of Bangkok to the serene beaches of Bali, this region offers an incredible diversity of experiences.</p>
      
      <h2>1. Angkor Wat, Cambodia</h2>
      <p>The largest religious monument in the world, Angkor Wat is a testament to the ingenuity of the Khmer Empire. The temple complex spans over 400 acres and features intricate stone carvings depicting various scenes from Hindu mythology.</p>
      
      <h2>2. Ha Long Bay, Vietnam</h2>
      <p>With its emerald waters and towering limestone islands topped by rainforests, Ha Long Bay provides one of the most breathtaking natural landscapes in Asia. A cruise through this UNESCO World Heritage site offers unforgettable views and experiences.</p>
      
      <h2>3. Bali, Indonesia</h2>
      <p>Known as the Island of the Gods, Bali enchants with its dramatic dances, colorful ceremonies, arts, and music. The island's beaches, volcanic mountains, and lush rice terraces make it a paradise for nature lovers and adventure seekers alike.</p>
      
      <h2>4. Bangkok, Thailand</h2>
      <p>Thailand's capital city is a feast for the senses. Visit the Grand Palace, explore floating markets, sample street food, and experience the vibrant nightlife that makes Bangkok one of Asia's most exciting cities.</p>
      
      <h2>5. Luang Prabang, Laos</h2>
      <p>This well-preserved UNESCO town sits at the confluence of the Mekong and Nam Khan rivers. With its colonial architecture, glistening temples, and morning alms-giving ceremony, Luang Prabang offers a glimpse into a more tranquil way of life.</p>
      
      <p>Whether you're backpacking on a budget or seeking luxury experiences, Southeast Asia has something for every type of traveler. The region's combination of affordability, hospitality, and cultural richness makes it an unbeatable destination for your next adventure.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop',
    date: '2023-11-15',
    author: {
      name: 'Sophie Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
    },
    categoryIds: ['2'],
    slug: 'top-10-must-visit-destinations-in-southeast-asia',
    featured: true,
    readTime: 8
  },
  {
    id: '2',
    title: 'A Foodie\'s Guide to Japanese Cuisine',
    excerpt: 'Discover the rich culinary traditions of Japan beyond just sushi and ramen.',
    content: `
      <p>Japanese cuisine is celebrated worldwide for its meticulous preparation, fresh ingredients, and beautiful presentation. While sushi and ramen have gained international fame, there's so much more to discover about Japan's diverse culinary landscape.</p>
      
      <h2>Understanding Washoku</h2>
      <p>"Washoku," or traditional Japanese cuisine, was designated as a UNESCO Intangible Cultural Heritage in 2013. It emphasizes seasonal ingredients, balanced flavors, and aesthetic presentation. A typical Japanese meal follows the "ichiju-sansai" structure: one soup, three sides, plus rice and pickles.</p>
      
      <h2>Beyond Sushi and Ramen</h2>
      <p>While these popular dishes deserve their acclaim, Japan offers countless other delights:</p>
      <ul>
        <li><strong>Kaiseki:</strong> A multi-course dining experience comparable to Western haute cuisine</li>
        <li><strong>Okonomiyaki:</strong> A savory pancake filled with various ingredients</li>
        <li><strong>Yakitori:</strong> Skewered and grilled chicken pieces, seasoned with salt or tare sauce</li>
        <li><strong>Tempura:</strong> Lightly battered and deep-fried seafood and vegetables</li>
        <li><strong>Wagashi:</strong> Traditional Japanese confections often served with tea</li>
      </ul>
      
      <h2>Regional Specialties</h2>
      <p>Each region in Japan prides itself on unique local dishes:</p>
      <p>In Osaka, try takoyaki (octopus balls) and okonomiyaki. Hokkaido is famous for fresh seafood and dairy products. Kyoto specializes in refined, delicate flavors inspired by imperial court cuisine. Hiroshima has its own style of okonomiyaki layered with noodles.</p>
      
      <h2>The Dining Experience</h2>
      <p>In Japan, dining is about more than just food—it's an experience engaging all five senses. From the ritual of izakaya (casual pubs) to the precision of high-end sushi counters, each setting offers its own unique atmosphere and etiquette.</p>
      
      <p>Whether you're planning a trip to Japan or simply want to explore Japanese cuisine at home, moving beyond the familiar dishes will reward you with new flavors and culinary experiences. The depth and diversity of Japanese food culture truly make it one of the world's greatest culinary traditions.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-28',
    author: {
      name: 'Takashi Yamamoto',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop'
    },
    categoryIds: ['2', '4'],
    slug: 'a-foodies-guide-to-japanese-cuisine',
    featured: true,
    readTime: 6
  },
  {
    id: '3',
    title: 'Backpacking Through Europe on €50 a Day',
    excerpt: 'How to experience the beauty and culture of Europe without breaking the bank.',
    content: `
      <p>Traveling through Europe is a dream for many, but it often comes with a hefty price tag. However, with careful planning and smart choices, you can experience the richness of European culture and landscapes on just €50 a day.</p>
      
      <h2>Accommodation Strategies</h2>
      <p>The biggest expense when traveling is typically accommodation. Consider these budget-friendly options:</p>
      <ul>
        <li><strong>Hostels:</strong> Dormitory beds usually range from €15-25 per night</li>
        <li><strong>Couchsurfing:</strong> Stay with locals for free and gain insider knowledge</li>
        <li><strong>Work exchanges:</strong> Platforms like Workaway or WWOOF offer accommodation in exchange for a few hours of work daily</li>
      </ul>
      
      <h2>Transportation Hacks</h2>
      <p>Getting around Europe affordably requires strategy:</p>
      <ul>
        <li>Invest in a rail pass if you plan to visit multiple countries</li>
        <li>Book bus journeys through Flixbus or similar budget carriers</li>
        <li>Consider overnight buses or trains to save on accommodation</li>
        <li>Use BlaBlaCar for ridesharing between cities</li>
        <li>Walk or use public transportation within cities</li>
      </ul>
      
      <h2>Food on a Budget</h2>
      <p>Eating well without overspending:</p>
      <ul>
        <li>Shop at local markets and prepare simple meals</li>
        <li>Take advantage of hostel kitchens</li>
        <li>Try street food for authentic and affordable local cuisine</li>
        <li>Look for "menu del día" or fixed-price lunch specials</li>
        <li>Carry a reusable water bottle to avoid buying drinks</li>
      </ul>
      
      <h2>Free and Low-Cost Activities</h2>
      <p>Many European attractions can be enjoyed on a budget:</p>
      <ul>
        <li>Research free walking tours in major cities</li>
        <li>Visit museums on free entry days (often the first Sunday of the month)</li>
        <li>Explore parks, beaches, and public spaces</li>
        <li>Attend free festivals, concerts, and cultural events</li>
      </ul>
      
      <p>With these strategies, you'll be able to stretch your euros further and extend your European adventure. Remember that some of the most memorable travel experiences—watching a sunset over a historic city, striking up a conversation with locals, or stumbling upon a hidden gem—don't cost anything at all.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop',
    date: '2023-09-12',
    author: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    categoryIds: ['5', '6'],
    slug: 'backpacking-through-europe-on-50-euros-a-day',
    featured: false,
    readTime: 7
  },
  {
    id: '4',
    title: 'The Ultimate Guide to Solo Female Travel',
    excerpt: 'Essential tips, destinations, and insights for women traveling the world alone.',
    content: `
      <p>Solo female travel has surged in popularity in recent years, with more women than ever embarking on independent adventures around the globe. While traveling alone as a woman presents unique considerations, the rewards—personal growth, freedom, and unforgettable experiences—make it well worth the journey.</p>
      
      <h2>Choosing Your Destination</h2>
      <p>When planning your first solo trip, consider starting with destinations known for safety and traveler-friendly infrastructure:</p>
      <ul>
        <li><strong>Japan:</strong> Extremely low crime rates and efficient public transportation</li>
        <li><strong>New Zealand:</strong> Stunning landscapes and a well-established backpacker network</li>
        <li><strong>Portugal:</strong> Affordable European destination with friendly locals</li>
        <li><strong>Canada:</strong> Diverse cities and natural beauty with minimal safety concerns</li>
      </ul>
      
      <h2>Safety Strategies</h2>
      <p>While safety is a concern for all travelers, women often need to take additional precautions:</p>
      <ul>
        <li>Research neighborhoods before booking accommodation</li>
        <li>Share your itinerary with trusted friends or family</li>
        <li>Consider using a door stopper alarm in hotels</li>
        <li>Trust your intuition and remove yourself from uncomfortable situations</li>
        <li>Dress according to local customs to avoid unwanted attention</li>
      </ul>
      
      <h2>Building Connections</h2>
      <p>One misconception about solo travel is that it's lonely. In reality, it often leads to more meaningful connections:</p>
      <ul>
        <li>Stay in social hostels or guesthouses</li>
        <li>Join walking tours or group activities</li>
        <li>Use apps like Bumble BFF or Tourlina to meet other female travelers</li>
        <li>Participate in cooking classes, language exchanges, or volunteer opportunities</li>
      </ul>
      
      <h2>Practical Tips</h2>
      <p>Some practical advice to enhance your solo journey:</p>
      <ul>
        <li>Pack light—you'll be handling all your luggage yourself</li>
        <li>Build confidence by dining alone and embracing "me time"</li>
        <li>Take photos of yourself using tripods or by asking others</li>
        <li>Learn basic phrases in the local language</li>
        <li>Consider single supplements for tours or cruises in your budget</li>
      </ul>
      
      <p>Solo female travel isn't just about visiting new places—it's about discovering your own strength, resilience, and capabilities. The woman who returns from a solo journey is rarely the same one who left home, transformed by the freedom and self-reliance that comes from navigating the world on her own terms.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop',
    date: '2023-08-05',
    author: {
      name: 'Elena Petrova',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop'
    },
    categoryIds: ['1'],
    slug: 'the-ultimate-guide-to-solo-female-travel',
    featured: false,
    readTime: 9
  },
  {
    id: '5',
    title: 'Ancient Wonders: Exploring Machu Picchu',
    excerpt: 'A journey through time to Peru\'s most iconic archaeological site.',
    content: `
      <p>Perched high in the Andes Mountains at 2,430 meters above sea level, Machu Picchu stands as a testament to the ingenuity and skill of the Inca civilization. This 15th-century citadel, often referred to as the "Lost City of the Incas," continues to captivate travelers from around the world with its mysterious origins and breathtaking setting.</p>
      
      <h2>Historical Context</h2>
      <p>Machu Picchu was built around 1450 AD during the height of the Inca Empire but was abandoned just over a century later, likely due to the Spanish conquest. Remarkably, the Spanish never discovered this hidden city, which helped preserve its structures from colonial destruction.</p>
      
      <p>The site remained unknown to the outside world until 1911, when American historian Hiram Bingham was led to the ruins by a local farmer. Though Bingham is often credited with "discovering" Machu Picchu, local people had known of its existence for generations.</p>
      
      <h2>Planning Your Visit</h2>
      <p>Visiting Machu Picchu requires careful planning:</p>
      <ul>
        <li><strong>Permits:</strong> Daily visitor numbers are limited, so purchase your entry ticket well in advance</li>
        <li><strong>Best time to visit:</strong> The dry season (May to October) offers the clearest views, though it's also the busiest</li>
        <li><strong>Getting there:</strong> Most visitors base themselves in Cusco or the closer town of Aguas Calientes</li>
        <li><strong>Altitude acclimation:</strong> Spend a few days in Cusco (3,400m) to adjust before visiting</li>
      </ul>
      
      <h2>Routes to Machu Picchu</h2>
      <p>There are several ways to reach this ancient wonder:</p>
      <ul>
        <li><strong>The Classic Inca Trail:</strong> A 4-day, 43km trek that follows ancient Inca pathways</li>
        <li><strong>The Salkantay Trek:</strong> A more challenging but less crowded 5-day alternative</li>
        <li><strong>Train and bus:</strong> For those short on time or preferring comfort, take the train to Aguas Calientes and then a shuttle bus</li>
      </ul>
      
      <h2>Archaeological Highlights</h2>
      <p>Don't miss these significant structures within the complex:</p>
      <ul>
        <li>The Intihuatana Stone: A ritual stone associated with the astronomical calendar</li>
        <li>Temple of the Sun: With precise windows aligned with solstices</li>
        <li>Room of the Three Windows: Part of the Sacred District</li>
        <li>Agricultural terraces: Showcasing advanced farming techniques</li>
      </ul>
      
      <p>Visiting Machu Picchu is more than just checking off a bucket list item—it's an opportunity to connect with one of humanity's most impressive achievements. As you walk through the ancient stone structures with the misty peaks of Huayna Picchu rising dramatically in the background, you'll understand why this site continues to inspire awe and wonder in all who make the journey.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    date: '2023-07-22',
    author: {
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    },
    categoryIds: ['1', '3'],
    slug: 'ancient-wonders-exploring-machu-picchu',
    featured: true,
    readTime: 8
  },
  {
    id: '6',
    title: 'Hidden Gems of Central Europe',
    excerpt: 'Discover the lesser-known but equally enchanting destinations beyond the tourist trail.',
    content: `
      <p>While cities like Paris, Rome, and Barcelona rightfully earn their spots on most European itineraries, Central Europe harbors countless treasures that offer equally enriching experiences with fewer crowds and lower prices. This guide highlights some of the region's most captivating yet overlooked destinations.</p>
      
      <h2>Olomouc, Czech Republic</h2>
      <p>Often overshadowed by Prague, Olomouc boasts a stunning UNESCO-protected old town with six baroque fountains and the Holy Trinity Column. Home to the country's second-oldest university, the city combines historical architecture with a vibrant student atmosphere. Don't miss trying Olomoucké tvarůžky, the city's famously pungent cheese.</p>
      
      <h2>Banska Štiavnica, Slovakia</h2>
      <p>This medieval mining town nestled in the Štiavnica Mountains is a UNESCO World Heritage site with remarkably preserved Renaissance buildings. Explore the open-air mining museum, hike around the artificial lakes called tajchy, and enjoy the bohemian café culture that has emerged as artists and creatives have rediscovered this gem.</p>
      
      <h2>Maribor, Slovenia</h2>
      <p>Slovenia's second-largest city sits near the Austrian border, surrounded by wine-growing hills. Visit the Old Vine House, home to the world's oldest producing vine (over 400 years old), explore the charming Lent district along the Drava River, and use the city as a base to discover the beautiful Pohorje Mountains.</p>
      
      <h2>Pécs, Hungary</h2>
      <p>This multicultural city near the Croatian border features influences from Ottoman Turkish times, visible in the central Széchenyi Square and the former mosque of Pasha Qasim. The Early Christian Necropolis is a UNESCO site, and the Zsolnay Cultural Quarter showcases the city's famous ceramics. The mild climate and Mediterranean atmosphere have earned Pécs the nickname "the city of sunshine."</p>
      
      <h2>Lublin, Poland</h2>
      <p>Eastern Poland's largest city boasts a well-preserved Old Town and Renaissance buildings that escaped WWII destruction. Explore the Royal Castle, wander the narrow streets filled with street art, and learn about the city's multicultural history at the Open Air Village Museum. Lublin's annual cultural festivals and lively student population create an energetic atmosphere year-round.</p>
      
      <p>These Central European destinations offer authentic cultural experiences without the overtourism affecting many Western European cities. By venturing beyond the usual tourist circuit, you'll discover the region's remarkable diversity, connect with locals more easily, and likely stretch your travel budget further—all while collecting stories from places your friends may never have heard of.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop',
    date: '2023-06-18',
    author: {
      name: 'Lukas Wagner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
    },
    categoryIds: ['3', '6'],
    slug: 'hidden-gems-of-central-europe',
    featured: false,
    readTime: 7
  }
];

export const getPostsByCategory = (categoryId: string): Post[] => {
  return posts.filter(post => post.categoryIds.includes(categoryId));
};

export const getFeaturedPosts = (): Post[] => {
  return posts.filter(post => post.featured);
};

export const getRecentPosts = (count: number = 4): Post[] => {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getPostCategories = (post: Post) => {
  return categories.filter(category => post.categoryIds.includes(category.id));
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const searchPosts = (query: string): Post[] => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.excerpt.toLowerCase().includes(lowercaseQuery) || 
    post.content.toLowerCase().includes(lowercaseQuery)
  );
};
