import React, { useState, useRef, useEffect } from 'react';
import { Play, MapPin, Clock, ChevronRight, Plus, Edit2, Trash2, MessageCircle, Send, X } from 'lucide-react';

// Default starter data used if nothing is in localStorage yet
const NeighbourhoodTable = () => {

const DEFAULT_FOODS = [
  {
    id: 1,
    name: " Moujadara",
    origin: "Lebanon",
    region: "Middle East",
    videoUrl: "https://res.cloudinary.com/dz4f9wg07/video/upload/v1765506594/qzqqnr8cprcpmwr2si29.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1606851090164-5db7e0bc9a3c?w=800&q=80",
    story:
    "Moujadara is a traditional Lebanese dish made from lentils, rice, and caramelized onions. It’s simple, comforting, and packed with flavor. This dish has been enjoyed for generations as a nutritious, affordable meal that brings families together.",
    prepTime: "45 mins",
    year: "Traditional",
    recipeIngredients: `
1 cup lentils
1 cup rice
1 onion
Salt and pepper
  `,
  recipeSteps: `
1. Boil the lentils until they are halfway cooked.
2. Wash the rice well, then add it to the lentils with salt and pepper. Cover the pot and lower the heat.
3. Caramelize the onion in a pan.
4. Serve the Moujadara with the caramelized onions on top. It tastes great with yogurt if you have some.
  `
  },
  {
  id: 2,
  name: "Chickpea Curry",
  origin: "South Asia",
  region: "Global",
  videoUrl: "https://res.cloudinary.com/dz4f9wg07/video/upload/v1765518528/ycbvg1lnhymnqeqtqvto.mp4",
  thumbnailUrl: "https://images.unsplash.com/photo-1604909053194-9d61f2e83413?auto=format&w=800&q=80",
  story:
    "This recipe video breaks down how to make a quick, affordable chickpea curry using simple ingredients young people can actually find and cook with. It’s created for youth who may not have a lot of time, money, or kitchen access, but still want meals that taste good and feel familiar. The video keeps things easy, visual, and realistic—showing how one basic recipe can turn into a filling, nutritious meal while building confidence in the kitchen and encouraging independence around food choices.",
  prepTime: "20 mins",
  year: "Modern",
  recipeIngredients: `
1 can chickpeas
1 onion
2 cloves garlic
1 tbsp curry powder
1 cup tomato sauce
1/2 cup water or broth
Salt & pepper
Oil
  `,
  recipeSteps: `
1. Sauté chopped onions and garlic in a bit of oil.
2. Add curry powder and stir until fragrant.
3. Pour in tomato sauce and water/broth.
4. Add chickpeas, salt, and pepper. Let simmer 10 minutes.
5. Serve over rice, bread, or enjoy on its own.
  `
}
{
  id: 3,
  name: "Chakry",
  origin: "Gambia",
  region: "West Africa",
  videoUrl: "https://res.cloudinary.com/dz4f9wg07/video/upload/v1765519133/dml3qqvnvrnjxg5uvf9q.mp4",
  thumbnailUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&w=800&q=80",
  story:
    "Chakry is a traditional Gambian dessert served at cultural, social, and modern events. Loved across generations, it remains a staple dessert in Gambian households. Its creamy texture, refreshing taste, and simple ingredients make it a meaningful cultural dish enjoyed by all ages.",
  prepTime: "45 mins",
  year: "Traditional",
  recipeIngredients: `
1 liter 2% milk
1.3 kg yogurt or sour milk
1 cup sugar
Shredded coconut
2 packs of couscous
Vanilla extract
Water
(Optional: raisins, nutmeg, shredded apples)
  `,
  recipeSteps: `
1. Wash hands and use clean utensils.
2. In a large bowl, mix water, milk, and yogurt/sour milk until you achieve your desired thickness.
3. Add sugar to taste.
4. Add shredded coconut and vanilla extract for flavor.
5. Optional additions: raisins, nutmeg, or shredded apples.
6. Cover the milk mixture and let it sit in a warm temperature for 20 minutes.
7. Prepare the couscous: add hot water, cover for 15 minutes, then stir. Microwave for 2 minutes once water is absorbed.
8. Combine the couscous with the milk mixture and serve chilled or at room temperature.
9. Note: Do not consume if lactose intolerant.
  `
}
{
  id: 4,
  name: "Greek Lentil Soup (Fakes)",
  origin: "Greece",
  region: "Mediterranean",
  videoUrl: "https://res.cloudinary.com/dz4f9wg07/video/upload/v1765519309/joukxck1azkazzxcxjqg.mp4",
  thumbnailUrl: "https://images.unsplash.com/photo-1601050690597-df6f0a5c1e12?auto=format&w=800&q=80",
  story:
    "Greek Lentil Soup, known as 'Fakes,' is a simple yet comforting Mediterranean dish made with humble, wholesome ingredients. It has been enjoyed across Greek households for generations and is loved for its warmth, nourishment, and rich earthy flavour. It’s a recipe that feels just like a warm hug.",
  prepTime: "40 mins",
  year: "Traditional",
  recipeIngredients: `
1 cup lentils
1 onion, chopped
2 cloves garlic, minced
2 carrots, chopped
1–2 bay leaves
1 tbsp tomato paste
Olive oil
Salt and pepper
Water or vegetable broth
(Optional: vinegar for serving)
  `,
  recipeSteps: `
1. Rinse the lentils thoroughly and set aside.
2. In a pot, sauté the onion, garlic, and carrots in olive oil until softened.
3. Add the tomato paste and stir for 1–2 minutes.
4. Add the lentils, bay leaves, salt, pepper, and enough water or broth to cover everything.
5. Bring to a boil, then reduce heat and simmer for 30–35 minutes until lentils are tender.
6. Adjust seasoning to taste.
7. Serve warm, optionally adding a splash of vinegar for extra flavour.
  `
}


];



const CLOUDINARY_CLOUD_NAME = 'dz4f9wg07';          // 👈 exactly your cloud name
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_neighbourhood'; 
// --- Video helpers ---
const isDirectVideoUrl = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.ogg') ||
    lower.includes('res.cloudinary.com')
  );
};

const [foods, setFoods] = useState(() => {
  try {
    const stored = localStorage.getItem("neighbourhoodFoods");
    return stored ? JSON.parse(stored) : DEFAULT_FOODS;
  } catch (err) {
    console.error("Failed to read foods from localStorage:", err);
    return DEFAULT_FOODS;
  }
});

useEffect(() => {
  try {
    localStorage.setItem("neighbourhoodFoods", JSON.stringify(foods));
  } catch (err) {
    console.error("Failed to save foods:", err);
  }
}, [foods]);

  
  const [selectedFood, setSelectedFood] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFood, setCurrentFood] = useState({
    
    name: '',
    origin: '',
    region: '',
    videoUrl: '',
    thumbnail: '',
    story: '',
    prepTime: '',
    year: ''
  });
  // Video upload states
const [isUploadingVideo, setIsUploadingVideo] = useState(false);
const [videoUploadError, setVideoUploadError] = useState('');



  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hey there! 👋 I love talking about food and the stories behind it. What are you curious about?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const chatMessagesRef = useRef(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  const handleAddNew = () => {
    setCurrentFood({
      name: '',
      origin: '',
      region: '',
      videoUrl: '',
      thumbnail: '',
      story: '',
      prepTime: '',
      year: ''
    });
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (food) => {
    setCurrentFood(food);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (isEditing) {
      setFoods(foods.map(f => f.id === currentFood.id ? currentFood : f));
    } else {
      const newFood = { ...currentFood, id: Date.now() };
      setFoods([...foods, newFood]);
    }
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      setFoods(foods.filter(f => f.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
  };
  // Step 3 fix 
  const handleVideoFileUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setVideoUploadError('');
  setIsUploadingVideo(true);

  try {
    const formData = new FormData();
    formData.append('file', file);
      formData.append('upload_preset', 'unsigned_neighbourhood');
     const res = await fetch(
      'https://api.cloudinary.com/v1_1/dz4f9wg07/video/upload', // cloudinary name 
      {
        method: 'POST',
        body: formData,
      }
    );

      const data = await res.json();
    console.log('Cloudinary response:', data);

    if (!res.ok) {
      const msg = data?.error?.message || 'Upload failed';
      throw new Error(msg);
    }

    const videoUrl = data.secure_url;
    setCurrentFood((prev) => ({ ...prev, videoUrl }));
  } catch (err) {
    console.error('Upload error:', err);
    setVideoUploadError(err.message || 'Video upload failed. Please try again.');
  } finally {
    setIsUploadingVideo(false);
  }
  };




  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Create context about available dishes
      const dishContext = foods.map(f => 
        `${f.name} from ${f.region}, ${f.origin}: ${f.story}`
      ).join('\n\n');

      const response = await fetch(
        "https://api.anthropic.com/v1/messages",
         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a warm, friendly food lover chatting casually on Neighbourhood Table, a website about food culture and stories. Be conversational, enthusiastic, and natural - like talking to a friend over coffee, not a formal assistant.

Here are the dishes currently featured:
${dishContext}

Guidelines for your responses:
- Keep it casual and warm, like you're having a real conversation
- Use natural language - contractions, occasional emojis, friendly tone
- Share personal enthusiasm about food
- Keep responses concise (2-4 sentences typically)
- Ask follow-up questions to keep the conversation flowing
- Don't list things unless specifically asked
- Share interesting tidbits naturally, not in formal formats
- If something's not about the dishes shown, still be helpful and chat about food culture, cooking tips, or related topics

User: ${userInput}`
            }
          ],
        })
      });

      const data = await response.json();
      const assistantMessage = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");

      setChatMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Oops, something went wrong on my end! Mind trying that again? 😅' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300">
      <style>{`
           @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');


        
        .scrollbar-chat {
          overflow-y: scroll !important;
        }
        .scrollbar-chat::-webkit-scrollbar {
          width: 12px;
        }
        .scrollbar-chat::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
          margin: 4px;
        }
        .scrollbar-chat::-webkit-scrollbar-thumb {
          background: #fb923c;
          border-radius: 10px;
          border: 2px solid #fef3c7;
        }
        .scrollbar-chat::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
        /* Firefox scrollbar */
        .scrollbar-chat {
          scrollbar-width: thin;
          scrollbar-color: #fb923c #fef3c7;
        }
        
        .logo-neighbourhood {
         font-family: 'Pacifico', cursive;
         font-size: 2rem;
         color: #ffffff;
         line-height: 1.2;
         font-weight: 700;      /* ← NEW: Makes it bold */
         font-style: italic;     /* ← NEW: Makes it italic */
        }

        .logo-table {
        font-family: 'Pacifico', cursive;
        font-size: 2rem;
        color: #ffffff;
       line-height: 1.2;
        font-weight: 700;      /* ← NEW: Makes it bold */
        font-style: italic;     /* ← NEW: Makes it italic */
       }
      `}</style>
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-300 to-yellow-200 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Text Logo */}
              <div className="flex flex-col items-start">
                <div className="logo-neighbourhood">Neighbourhood</div>
                <div className="logo-table">Table</div>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-white hover:bg-orange-50 text-orange-600 px-6 py-3 rounded-lg font-semibold flex items-center transition shadow-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Dish
            </button>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="bg-gradient-to-r from-orange-400 to-yellow-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveSection('home')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'home'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveSection('recipes')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'recipes'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                Food Recipes & Videos
              </button>
              <button
                onClick={() => setActiveSection('rescue')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'rescue'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                Food Rescue Tips
              </button>
              <button
                onClick={() => setActiveSection('awareness')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'awareness'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                
                 
                Awareness Campaign
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'about'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`px-6 py-4 font-semibold transition ${
                  activeSection === 'contact'
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-white/30'
                }`}
              >
                
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

       {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
               {/* Home Logo Badge */}
{activeSection === 'home' && (
  <div className="flex justify-center mb-12">
    <div className="flex flex-col items-center">
      {/* Earth Logo */}
      <div className="w-56 h-56 flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            {/* Earth gradient in website colours */}
            <radialGradient id="earthFill" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#fee2b3" />
              <stop offset="45%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#f97316" />
            </radialGradient>
          </defs>

          {/* Earth circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="url(#earthFill)"
            stroke="#fb923c"
            strokeWidth="3"
          />

          {/* Land shapes (abstract continents) */}
          <path
            d="M30 50
               C 34 40, 46 32, 60 34
               C 70 36, 78 44, 80 54
               C 76 58, 70 60, 64 58
               C 56 56, 48 58, 42 62
               C 36 60, 32 56, 30 50Z"
            fill="#fef3c7"
            opacity="0.95"
          />
          <path
            d="M70 70
               C 78 68, 86 70, 90 76
               C 86 82, 80 86, 72 86
               C 66 84, 62 80, 60 76
               C 64 72, 68 70, 70 70Z"
            fill="#fed7aa"
            opacity="0.95"
          />
          <path
            d="M32 72
               C 38 68, 46 68, 52 72
               C 50 78, 46 82, 40 84
               C 36 82, 34 78, 32 72Z"
            fill="#facc15"
            opacity="0.9"
          />

          {/* Subtle "ocean lines" */}
          <path
            d="M30 44 Q 60 34 90 44"
            stroke="#fff7ed"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M26 64 Q 60 56 94 64"
            stroke="#fff7ed"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M32 82 Q 60 76 88 82"
            stroke="#fff7ed"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Bowl at the bottom to represent food & sharing */}
          <g transform="translate(35,82)">
            {/* Bowl base */}
            <path
              d="M0 10 Q 12 22 25 22 Q 38 22 50 10 Q 50 6 0 6 Z"
              fill="#ffffff"
              stroke="#fb923c"
              strokeWidth="2"
            />
            {/* Inside shadow */}
            <path
              d="M4 9 Q 25 18 46 9"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Small "steam" lines */}
            <path
              d="M18 0 C 16 -4, 18 -7, 20 -10"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M30 -1 C 28 -5, 30 -8, 32 -11"
              stroke="#ea580c"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Text on top of Earth */}
          <foreignObject x="10" y="14" width="100" height="50">
            <div
              style={{
                fontFamily: "'Pacifico', cursive",
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: '1.45rem',
                lineHeight: 1.2,
                color: 'white',
                textAlign: 'center',
                textShadow: '0 3px 6px rgba(0,0,0,0.35)',
              }}
            >
              
              <br />
              
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Tagline */}
      <p className="mt-5 text-sm md:text-base tracking-[0.35em] uppercase text-orange-900 font-semibold text-center">
        Food Culture Belonging
      </p>
    </div>
  </div>
)}




        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            {activeSection === 'rescue'
              ? 'Cook Smarter, Waste Less'
              : activeSection === 'awareness'
                ? 'Food, Nutrition & Fair Access'
                : 'Food That Brings Us Together'}
          </h2>

          {activeSection === 'rescue' ? (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Food rescue isn’t just about leftovers—it’s about planning, cooking,
              and storing food in ways that respect your time, budget, and the planet.
              Here are simple, practical ways to cook efficiently and save as much
              food as possible.
            </p>
          ) : activeSection === 'awareness' ? (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Around the world, and even in our own neighbourhoods, many people are
              eating enough calories but still missing key nutrients. At the same time,
              food insecurity and the rising cost of groceries make it harder for
              people to access fresh, nourishing food. This campaign explores why that
              matters—and how communities can respond.
            </p>
          ) : (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every dish has a story. Every meal connects us to a place, a culture,
              and the people who made it special.
            </p>
          )}
        </div>

        {/* Recipes / Home content */}
        {(activeSection === 'home' || activeSection === 'recipes') && (
          <div id="stories" className="grid md:grid-cols-2 gap-8 mt-12">
            {foods.map((food) => (
              <div
                key={food.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedFood(food)}
                >
                  <img
                    src={
                      food.thumbnail ||
                      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
                    }
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {food.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/90 text-sm">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {food.region}, {food.origin}
                      </span>
                      {food.prepTime && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {food.prepTime}
                        </span>
                      )}
                    </div>
                  </div>
                  {food.year && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {food.year}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-4">
                      <Play className="w-8 h-8 text-orange-600" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 line-clamp-3">{food.story}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="flex items-center text-orange-600 font-semibold hover:text-orange-700 transition"
                    >
                      Read Full Story
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(food)}
                        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Food Rescue Tips content */}
        {activeSection === 'rescue' && (
          <div className="max-w-4xl mx-auto mt-12 space-y-8">
            <div className="bg-white/80 rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Simple Ways to Cook Efficiently & Save Food
              </h3>
              <p className="text-gray-700 mb-6">
                You don’t have to be perfect to reduce food waste. Small habits in how
                you plan, cook, and store food can make a big difference—for your
                wallet and for the environment.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-orange-700">
                    1. Plan portions and “cook once, eat twice”
                  </h4>
                  <p className="text-gray-700">
                    Before you start cooking, think about how many people you’re
                    actually feeding. Make enough for the meal plus one extra serving
                    that can become lunch or dinner the next day. This saves time,
                    energy, and keeps random leftovers from piling up.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-orange-700">
                    2. Turn leftovers into new meals
                  </h4>
                  <p className="text-gray-700">
                    Leftover rice can become fried rice, extra veggies can go into
                    omelettes, soups, or wraps, and stale bread can be croutons or
                    breadcrumbs. Think of leftovers as “prepped ingredients” instead
                    of boring repeats.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-orange-700">
                    3. Use the “First In, First Out” rule
                  </h4>
                  <p className="text-gray-700">
                    When you unpack groceries, move older items to the front of the
                    fridge or pantry and put newer things at the back. This simple
                    habit helps you use what you already have before it expires.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-orange-700">
                    4. Save scraps for stocks, sauces, and snacks
                  </h4>
                  <p className="text-gray-700">
                    Veggie peels, herb stems, and chicken bones can be frozen in a bag
                    and turned into broth. Overripe fruit works great in smoothies or
                    baked desserts instead of going in the trash.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-orange-700">
                    5. Store food the right way
                  </h4>
                  <p className="text-gray-700">
                    Keep leftovers in clear containers so you can actually see them.
                    Label them with the date, and try a weekly “fridge clean-out”
                    night where you build a meal from what’s already there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Awareness Campaign content */}
        {activeSection === 'awareness' && (
          <div className="max-w-5xl mx-auto mt-12 space-y-10">
            {/* Card 1: The nutrition gap */}
            <div className="bg-white/80 rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. The Nutrition Gap: Calories ≠ Nutrition
              </h3>
              <p className="text-gray-700 mb-4">
                Around the world, many people are eating enough—or even too many—
                calories but still not getting the vitamins and minerals their bodies
                need. This is sometimes called “hidden hunger”: you might feel full,
                but your body is low on key nutrients like iron, vitamin D, calcium,
                folate, and zinc. Globally, more than two billion people are estimated
                to be affected by micronutrient deficiencies, including about half of
                preschool-aged children and two-thirds of women of reproductive age.
              </p>
              <p className="text-gray-700 mb-4">
                In Canada, national surveys and Canada’s Food Guide show that most
                people do not eat enough vegetables, fruits, and whole grains on a
                regular basis. Many diets are heavy in ultra-processed foods—like
                sugary drinks, fast food, packaged snacks, and instant meals—that are
                high in salt, sugar, and unhealthy fats but low in fibre and
                micronutrients. Over time, this pattern can lead to higher risks of
                heart disease, type 2 diabetes, certain cancers, and poor mental
                health.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Not eating enough vegetables and fruits means missing out on fibre,
                  antioxidants, and vitamins that support immunity and gut health.
                </li>
                <li>
                  Low intakes of iron and folate can contribute to fatigue, poor
                  concentration, and anemia.
                </li>
                <li>
                  Vitamin D and calcium are important for strong bones and may play a
                  role in mood and immune function.
                </li>
              </ul>
            </div>

            {/* Card 2: Food insecurity & access */}
            <div className="bg-white/80 rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Food Insecurity: When Healthy Choices Aren’t Really a Choice
              </h3>
              <p className="text-gray-700 mb-4">
                It’s not that people don’t care about eating well—many simply can’t
                afford or access nutritious food. In recent years, household food
                insecurity in Canada has risen sharply, with roughly 1 in 6 households
                struggling to afford enough food. The burden is not shared equally:
                food insecurity is higher among low-income households, renters,
                single-parent families, racialized communities, and people relying on
                social assistance.
              </p>
              <p className="text-gray-700 mb-4">
                Food insecurity is about more than “skipping a snack.” It can mean:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Worrying that food will run out before there is money to buy more.</li>
                <li>Buying cheaper, less nutritious foods just to make it through the week.</li>
                <li>
                  Adults quietly eating less so that children in the household can have
                  more.
                </li>
                <li>
                  Relying on food banks or community meals, which are helpful but do
                  not solve the root causes.
                </li>
              </ul>
              <p className="text-gray-700">
                Living with food insecurity is linked with higher rates of chronic
                disease, stress, anxiety, and depression. It also affects children’s
                ability to learn and feel like they belong at school and in their
                communities.
              </p>
            </div>

            {/* Card 3: Why projects like Neighbourhood Table matter */}
            <div className="bg-white/80 rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Building Solutions Together: Community, Culture & Belonging
              </h3>
              <p className="text-gray-700 mb-4">
                No single recipe can fix food insecurity, but community-led projects
                can make a real difference. When neighbours cook, share knowledge, and
                eat together, it becomes easier to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  Share low-cost, high-nutrition recipes that use beans, lentils,
                  whole grains, and seasonal produce.
                </li>
                <li>
                  Celebrate cultural foods that are nourishing, comforting, and rooted
                  in tradition—not just whatever is cheapest on the shelf.
                </li>
                <li>
                  Swap tips on budgeting, batch cooking, and using every part of an
                  ingredient to reduce waste.
                </li>
                <li>
                  Create welcoming spaces where people feel safe to talk about food,
                  money, and health without shame.
                </li>
              </ul>
              <p className="text-gray-700">
                Neighbourhood Table is about more than recipes. It’s about recognizing
                that everyone deserves tasty, nourishing food—and that when we sit
                around a table together, we can start imagining fairer, healthier food
                systems for everyone.
              </p>
            </div>
                        {/* Card 4: Expiry Dates, Best-Before & Food Safety */}
            <div className="bg-white/80 rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                4. Expiry Dates: What They Really Mean for Your Food
              </h3>
              <p className="text-gray-700 mb-4">
                Date labels on food can be confusing, and many people throw away food
                that is still safe to eat because they are not sure what the wording
                means. Terms like <strong>&quot;best-before&quot;</strong>, 
                <strong> &quot;use by&quot;</strong>, and <strong>&quot;expiry&quot;</strong> 
                do not all mean the same thing, and they do not always mean the food
                is unsafe the next day.
              </p>

              <p className="text-gray-700 mb-4">
                In many places, a <strong>best-before date</strong> is about 
                <em>quality</em>, not strict safety. It tells you how long the food is
                expected to taste its best, keep its texture, and hold its nutrients
                when it is stored properly and the package is unopened. After that
                date, the food might be a bit stale, less crunchy, or less flavorful,
                but it can sometimes still be safe for a short time.
              </p>

              <h4 className="text-lg font-semibold text-orange-700 mb-2">
                Foods that may still be okay shortly after the date (if stored properly)
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  Dry goods like rice, pasta, flour, oats, and many unopened cereals
                  — they may lose some quality over time but often do not suddenly
                  become unsafe right after the date.
                </li>
                <li>
                  Canned foods with no damage, bulging, or rust may still be okay
                  for a while past the best-before date, although flavour and texture
                  can decline.
                </li>
                <li>
                  Shelf-stable items like unopened crackers, cookies, and snacks 
                  may become stale but are not always dangerous immediately after
                  the date.
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-orange-700 mb-2">
                Foods you should be extra careful with
              </h4>
              <p className="text-gray-700 mb-2">
                Some foods are higher risk and should not be eaten once they are past 
                their date or if they have been left out too long:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>
                  Fresh meat, poultry, and fish — especially if they smell off, feel
                  sticky or slimy, or have changed colour.
                </li>
                <li>
                  Dairy products like milk, cream, soft cheeses, and yogurt that are
                  lumpy, sour-smelling, or have mold.
                </li>
                <li>
                  Prepared ready-to-eat foods such as deli meats, salads, and cooked
                  leftovers that have been in the fridge for too long.
                </li>
                <li>
                  Foods with visible mold (other than foods where mold is intentional,
                  like certain specialty cheeses).
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-orange-700 mb-2">
                Using your senses & staying safe
              </h4>
              <p className="text-gray-700 mb-4">
                Date labels are only one part of the picture. It is also important to
                pay attention to how the food looks, smells, and feels, and to how it
                has been stored. If a product has been left at room temperature when it
                should have been refrigerated, it may be unsafe even before the date.
              </p>
              <p className="text-gray-700">
                A good rule is: <strong>when in doubt, it is safer to throw it out</strong>.
                Learning the difference between quality dates and safety risks can help
                reduce unnecessary food waste while still protecting people from foodborne
                illness. Projects like Neighbourhood Table can support this by sharing
                practical tips on storage, leftovers, and how to read labels with more 
                confidence.
              </p>
            </div>

          </div>
        )}
        

        {/* About Us Section */}
{activeSection === 'about' && (
  <div className="max-w-5xl mx-auto mt-16 space-y-10 bg-white/80 shadow-xl rounded-3xl p-10">
    <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
      About Neighbourhood Table
    </h2>

    <p className="text-gray-700 text-lg leading-relaxed">
      Neighbourhood Table was built on a simple belief: <strong>food is one of the 
      most powerful ways to bring people together</strong>. No matter where we come 
      from, what language we speak, or how different our lives are, we all have 
      memories, traditions, and emotions connected to the meals we love.
    </p>

    <p className="text-gray-700 text-lg leading-relaxed">
      Our goal is to create a space where food becomes a bridge — a way for 
      people to explore new cultures, share their stories, and understand one 
      another on a deeper level. Every dish on this website represents more than 
      ingredients and instructions. It represents identity, community, and the 
      comfort of feeling at home, even with people you’ve never met before.
    </p>

    <h3 className="text-2xl font-bold text-gray-900 mt-8">
      Why We Care About Nutrition
    </h3>

    <p className="text-gray-700 text-lg leading-relaxed">
      Across Canada and around the world, many people struggle not just with 
      accessing food — but accessing <strong>nutritious</strong> food. That’s why 
      Neighbourhood Table also focuses on helping visitors learn how to meet 
      their nutritional needs through culturally meaningful meals.
    </p>

    <p className="text-gray-700 text-lg leading-relaxed">
      We believe that eating well doesn’t have to be boring, expensive, or 
      complicated. Traditional foods from every culture contain rich nutrients, 
      generations of knowledge, and practical ways of nourishing the body. By 
      combining cultural storytelling with nutrition awareness, we hope to help 
      you eat meals that make you feel both connected <em>and</em> healthy.
    </p>

    <h3 className="text-2xl font-bold text-gray-900 mt-8">
      A Website For Everyone
    </h3>

    <p className="text-gray-700 text-lg leading-relaxed">
      Whether you’re a student learning to cook, someone exploring new cuisines,
      a newcomer looking to share your cultural food, or a family trying to make 
      healthier choices — this platform is for you. We want Neighbourhood Table 
      to feel welcoming, accessible, and uplifting for people of all backgrounds.
    </p>

    <p className="text-gray-700 text-lg leading-relaxed">
      Explore recipes, learn about food stories, read about nutrition, or 
      discover ways to reduce food waste. Every click is a chance to learn 
      something new, connect with a different culture, or appreciate your own.
    </p>

    <h3 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h3>

    <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
      <li>Celebrate cultural diversity through food.</li>
      <li>Create a platform where people feel connected and seen.</li>
      <li>Encourage nutritious eating through simple and meaningful dishes.</li>
      <li>Promote food literacy and awareness of food insecurity.</li>
      <li>Inspire community-level solutions built around sharing food.</li>
    </ul>

    <p className="text-gray-700 text-lg leading-relaxed mt-6">
      At the heart of Neighbourhood Table is a belief in belonging. 
      We hope this space encourages you to discover new tastes, share 
      your stories, and build a community where everyone has a seat at the table.
    </p>
  </div>
)}
     {/* Contact + Foodbank Section */}
{activeSection === 'contact' && (
  <div className="max-w-5xl mx-auto mt-16 space-y-10">
    {/* Contact Info */}
    <div className="bg-white/80 shadow-xl rounded-3xl p-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Contact Neighbourhood Table
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
        Have a question, want to share a cultural dish, or just want to connect?  
        You can reach us through Instagram or email — we&apos;d love to hear from you.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Instagram card */}
        <div className="border border-orange-100 rounded-2xl p-6 bg-orange-50/60">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Instagram
          </h3>
          <p className="text-gray-700 mb-3">
            Follow us and send a DM to share your food stories, recipes,
            or feedback about the site.
          </p>
          <a
            href="https://www.instagram.com/neighborhood_table"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
          >
            @neighborhood_table
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* Email card */}
        <div className="border border-orange-100 rounded-2xl p-6 bg-orange-50/40">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Email
          </h3>
          <p className="text-gray-700 mb-3">
            For questions, collaboration ideas, or project inquiries, feel free
            to send us an email anytime.
          </p>
          <a
            href="mailto:neighbourhoodtable1@gmail.com"
            className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 break-all"
          >
            neighbourhoodtable1@gmail.com
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>

    {/* Foodbanks Availability – with ANIDA link */}
    <div className="bg-white/80 rounded-3xl shadow-lg p-10 space-y-6">
      <h3 className="text-3xl font-bold text-gray-900 mb-2">
        Need Food Support? 🌱
      </h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        If you or someone you know is having a hard time affording groceries,
        community food programs are here to help. Food banks, community
        fridges, and meal programs exist to provide respectful, judgement-free
        support for individuals and families.
      </p>

      {/* ANIDA highlight */}
      <div className="mb-4 p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-white shadow-md">
        <h4 className="text-xl font-semibold mb-2">
          Featured Community Partner: ANIDA Food Bank
        </h4>
        <p className="mb-3 text-sm md:text-base">
          <strong>ANIDA Food Bank</strong> offers food hampers and support to
          individuals and families in need. They focus on dignity, care, and
          community, making sure people are not facing food insecurity alone.
        </p>
        <a
          href="https://anidafoodbank.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-orange-600 font-semibold shadow hover:bg-orange-50 transition"
        >
          Visit ANIDA Food Bank Website
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>

      <p className="text-gray-700 leading-relaxed">
        Every food bank has its own schedule and system. Some require
        appointments, while others are walk-in. You may be asked simple
        questions about your household size so they can prepare the right
        amount of food. Items often include pantry staples (rice, pasta, beans,
        canned goods) and, when available, fresh produce and bread.
      </p>

      <p className="text-gray-700 leading-relaxed">
        If ANIDA is not close to you, you can also search online for food banks
        in your city, contact local community centres, or dial <strong>2-1-1</strong> 
        (where available) to find more support options near you.
      </p>
    </div>
  </div>
)}


      </section>



      {/* Add/Edit Form Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEditing ? 'Edit Dish' : 'Add New Dish'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dish Name</label>
                  <input
                    type="text"
                    value={currentFood.name}
                    onChange={(e) => setCurrentFood({...currentFood, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Jollof Rice"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={currentFood.origin}
                      onChange={(e) => setCurrentFood({...currentFood, origin: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Nigeria"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Region/City</label>
                    <input
                      type="text"
                      value={currentFood.region}
                      onChange={(e) => setCurrentFood({...currentFood, region: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Lagos"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prep Time</label>
                    <input
                      type="text"
                      value={currentFood.prepTime}
                      onChange={(e) => setCurrentFood({...currentFood, prepTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 1 hour"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year/Era</label>
                    <input
                      type="text"
                      value={currentFood.year}
                      onChange={(e) => setCurrentFood({...currentFood, year: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 1960s"
                    />
                  </div>
                </div>
                <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Video</label>
                 <input
                type="file"
               accept="video/*"
              onChange={handleVideoFileUpload}
               disabled={isUploadingVideo}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  />
  {isUploadingVideo && (
    <p className="text-orange-600 text-sm mt-2 flex items-center">
      <span className="animate-spin mr-2">⏳</span> Uploading video... this may take a minute
    </p>
  )}
  {videoUploadError && (
    <p className="text-red-600 text-sm mt-2">❌ {videoUploadError}</p>
  )}
  {currentFood.videoUrl && !isUploadingVideo && !videoUploadError && (
    <p className="text-green-600 text-sm mt-2">✓ Video uploaded successfully!</p>
  )}
</div>
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Or paste Video URL</label>
  <input
    type="text"
    value={currentFood.videoUrl}
    onChange={(e) => setCurrentFood({...currentFood, videoUrl: e.target.value})}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    placeholder="YouTube, Vimeo, or direct video link"
  />
  <p className="text-gray-500 text-xs mt-1">
    You can upload a file above OR paste a video URL here
  </p>
</div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image URL</label>
                  <input
                    type="text"
                    value={currentFood.thumbnail}
                    onChange={(e) => setCurrentFood({...currentFood, thumbnail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Paste image URL here"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cultural Story</label>
                  <textarea
                    value={currentFood.story}
                    onChange={(e) => setCurrentFood({...currentFood, story: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell the story behind this dish... Where did it come from? What makes it special?"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Save Dish
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedFood && !isEditing && !isAdding && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              {selectedFood.videoUrl ? (
                <iframe
                  src={selectedFood.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                                  <>
                  <img
                    src={selectedFood.thumbnail || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'}
                    alt={selectedFood.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 hover:bg-orange-600 rounded-full p-6 cursor-pointer transition">
                      <Play className="w-12 h-12 text-white" fill="currentColor" />
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => setSelectedFood(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-4xl font-bold text-gray-900">{selectedFood.name}</h2>
                {selectedFood.year && (
                  <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
                    {selectedFood.year}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  {selectedFood.region}, {selectedFood.origin}
                </span>
                {selectedFood.prepTime && (
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    {selectedFood.prepTime}
                  </span>
                )}
              </div>
              <div className="prose max-w-none">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Story</h3>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{selectedFood.story}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Neighbourhood Table</h3>
            <p className="text-gray-400 mb-6">Where every meal tells a story</p>
            <p className="text-gray-500 text-sm mt-8">© 2024 Neighbourhood Table. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="font-semibold">Food Culture Assistant</span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-white/20 rounded-lg p-2 transition"
              title="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatMessagesRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-chat"
            style={{ scrollBehavior: 'smooth' }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about any dish..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeighbourhoodTable;