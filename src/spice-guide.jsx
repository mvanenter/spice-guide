import { useState } from "react";

const herbs = [
  { name: "Basil", emoji: "🌿", flavor: "Sweet, peppery, slightly clove-like", dishes: ["Pasta", "Pizza", "Caprese salad", "Pesto", "Tomato-based sauces"], cuisines: ["Italian", "Thai", "Mediterranean"], tip: "Add fresh basil at the very end. Heat kills its aroma. Tear rather than chop to preserve oils.", color: "#2E7D32", type: "herb" },
  { name: "Rosemary", emoji: "🌲", flavor: "Piney, woody, intensely aromatic", dishes: ["Roast lamb", "Focaccia", "Roast potatoes", "Chicken", "Marinades"], cuisines: ["Italian", "Mediterranean", "French"], tip: "Very strong, use sparingly. Woody stems can be used as skewers for grilling.", color: "#1B5E20", type: "herb" },
  { name: "Thyme", emoji: "🌱", flavor: "Earthy, minty, slightly lemony", dishes: ["Roast chicken", "Soups", "Stews", "Mushroom dishes", "Roasted vegetables"], cuisines: ["French", "Mediterranean", "European"], tip: "Holds up well to long cooking. Strip leaves by running fingers down the stem against the grain.", color: "#388E3C", type: "herb" },
  { name: "Parsley", emoji: "💚", flavor: "Fresh, clean, mildly grassy", dishes: ["Tabbouleh", "Chimichurri", "Soups", "Pasta", "Garnishes"], cuisines: ["Middle Eastern", "European", "South American"], tip: "Flat-leaf (Italian) parsley has more flavour than curly. Stalks are great in stocks.", color: "#43A047", type: "herb" },
  { name: "Coriander (fresh)", emoji: "🍃", flavor: "Citrusy, bright, slightly soapy to some", dishes: ["Curries", "Tacos", "Salsas", "Thai salads", "Chutneys"], cuisines: ["Indian", "Mexican", "Thai", "Middle Eastern"], tip: "Add at the end of cooking or as a garnish. Stalks are edible and flavourful, use them too.", color: "#66BB6A", type: "herb" },
  { name: "Mint", emoji: "🫧", flavor: "Cool, sweet, refreshing", dishes: ["Lamb dishes", "Tzatziki", "Tabbouleh", "Cocktails", "Desserts"], cuisines: ["Middle Eastern", "Greek", "British", "Moroccan"], tip: "Spearmint is best for cooking; peppermint is better for drinks and sweets.", color: "#00897B", type: "herb" },
  { name: "Sage", emoji: "🌿", flavor: "Earthy, slightly peppery, musty-savoury", dishes: ["Pasta with brown butter", "Pork", "Stuffing", "Gnocchi", "Bean soups"], cuisines: ["Italian", "European", "American"], tip: "Fry whole leaves in butter until crisp for an elegant garnish. Use dried sparingly, it's pungent.", color: "#558B2F", type: "herb" },
  { name: "Dill", emoji: "🌾", flavor: "Feathery, anise-like, fresh and grassy", dishes: ["Salmon", "Pickles", "Potato salad", "Tzatziki", "Egg dishes"], cuisines: ["Scandinavian", "Eastern European", "Greek"], tip: "Best used fresh, it loses most of its flavour when dried. Add at the end of cooking.", color: "#7CB342", type: "herb" },
  { name: "Tarragon", emoji: "🌿", flavor: "Distinctive anise, slightly sweet", dishes: ["Bearnaise sauce", "Chicken dishes", "Salad dressings", "Fish", "Eggs"], cuisines: ["French"], tip: "A cornerstone of French cooking. French tarragon is far superior to Russian tarragon.", color: "#9CCC65", type: "herb" },
  { name: "Chives", emoji: "🟢", flavor: "Mild onion, fresh and delicate", dishes: ["Baked potatoes", "Scrambled eggs", "Soups", "Cream cheese", "Dips"], cuisines: ["European", "American", "French"], tip: "Always use fresh, they are useless dried. Snip with scissors rather than chopping.", color: "#8BC34A", type: "herb" },
  { name: "Lemongrass", emoji: "🍋", flavor: "Citrusy, floral, ginger-like", dishes: ["Thai curries", "Soups", "Marinades", "Stir-fries", "Teas"], cuisines: ["Thai", "Vietnamese", "Indonesian"], tip: "Bruise or bash the stalk before adding to release the oils. Remove before serving, too fibrous to eat.", color: "#C0CA33", type: "herb" },
  { name: "Kaffir Lime Leaves", emoji: "🍃", flavor: "Intensely citrusy, floral, aromatic", dishes: ["Thai curries", "Tom kha soup", "Stir-fries", "Rice dishes", "Marinades"], cuisines: ["Thai", "Indonesian", "Malaysian"], tip: "Remove the central rib and slice very finely if eating. Otherwise use whole and remove before serving.", color: "#00C853", type: "herb" },
  { name: "Oregano", emoji: "🌱", flavor: "Robust, earthy, slightly bitter", dishes: ["Pizza", "Pasta sauce", "Greek salad", "Grilled meats", "Beans"], cuisines: ["Italian", "Greek", "Mexican"], tip: "Dried oregano is actually more potent than fresh. Add during cooking for best results.", color: "#4A6741", type: "herb" },
  { name: "Bay Leaves", emoji: "🍃", flavor: "Subtle, herbal, slightly floral", dishes: ["Soups", "Stews", "Bolognese", "Rice", "Braises"], cuisines: ["European", "Indian", "Middle Eastern"], tip: "Always remove before serving, they do not soften and can be a choking hazard.", color: "#5A7A45", type: "herb" },
  { name: "Marjoram", emoji: "🌿", flavor: "Mild, sweet oregano-like, floral", dishes: ["Sausages", "Roast meats", "Soups", "Egg dishes", "Stuffing"], cuisines: ["European", "Middle Eastern", "German"], tip: "Milder and sweeter than oregano. Add near the end of cooking to preserve its delicate flavour.", color: "#6A994E", type: "herb" },
  { name: "Lavender", emoji: "💜", flavor: "Floral, sweet, slightly perfumed", dishes: ["Lamb", "Shortbread", "Ice cream", "Honey glazes", "Herbes de Provence"], cuisines: ["French", "Mediterranean", "British baking"], tip: "Use sparingly, too much makes food taste like soap. Culinary lavender only, not ornamental.", color: "#7B5EA7", type: "herb" },
  { name: "Sorrel", emoji: "🍃", flavor: "Sharp, lemony, acidic", dishes: ["Salads", "Soups", "Sauces for fish", "Omelettes", "Creamy sauces"], cuisines: ["French", "Eastern European"], tip: "Use as you would spinach but expect a sour punch. It wilts and loses its bright colour quickly when cooked.", color: "#5D8A3C", type: "herb" },
  { name: "Vietnamese Mint", emoji: "🌿", flavor: "Peppery, spicy, pungent", dishes: ["Pho", "Spring rolls", "Salads", "Laksa", "Banh mi"], cuisines: ["Vietnamese", "Malaysian", "Thai"], tip: "Not actually mint, far more peppery. Essential in Vietnamese cooking. Use raw as a garnish.", color: "#3A7D44", type: "herb" },
  { name: "Curry Leaves", emoji: "🍃", flavor: "Warm, aromatic, citrusy with a slight anise note", dishes: ["South Indian curries", "Dal", "Coconut dishes", "Chutneys", "Rice dishes"], cuisines: ["Indian", "Sri Lankan"], tip: "Fry in hot oil at the start to release their aroma. Fresh curry leaves are far superior to dried.", color: "#4CAF50", type: "herb" },
  { name: "Epazote", emoji: "🌿", flavor: "Pungent, medicinal, herby with a petroleum-like edge", dishes: ["Black beans", "Quesadillas", "Tamales", "Mole", "Corn dishes"], cuisines: ["Mexican"], tip: "Traditional in Mexican cooking to reduce flatulence from beans. Use fresh if possible, strong flavour.", color: "#2E8B57", type: "herb" },
];

const spices = [
  { name: "Cumin", emoji: "🟤", flavor: "Earthy, warm, slightly smoky", dishes: ["Curries", "Tacos", "Chili", "Lentil soups", "Roasted vegetables"], cuisines: ["Mexican", "Indian", "Middle Eastern"], tip: "Toast whole seeds in a dry pan before grinding for deeper flavor.", color: "#C8763A", type: "spice" },
  { name: "Turmeric", emoji: "🟡", flavor: "Mild, earthy, slightly bitter", dishes: ["Curries", "Rice dishes", "Soups", "Scrambled eggs", "Smoothies"], cuisines: ["Indian", "Southeast Asian", "Middle Eastern"], tip: "Pairs with black pepper to boost absorption. Stains everything golden.", color: "#E8A020", type: "spice" },
  { name: "Paprika", emoji: "🔴", flavor: "Sweet, mild to smoky depending on variety", dishes: ["Goulash", "Chicken dishes", "Devilled eggs", "Roasted potatoes", "Hummus garnish"], cuisines: ["Spanish", "Hungarian", "American"], tip: "Smoked paprika adds depth to meat rubs and stews. Do not burn it, it turns bitter.", color: "#C0392B", type: "spice" },
  { name: "Cinnamon", emoji: "🌰", flavor: "Sweet, warm, slightly spicy", dishes: ["Baked goods", "Oatmeal", "Lamb tagine", "Mulled wine", "Chai"], cuisines: ["Moroccan", "Middle Eastern", "European baking"], tip: "Used in both sweet and savoury cooking. Ceylon cinnamon is milder than Cassia.", color: "#8B4513", type: "spice" },
  { name: "Coriander (ground)", emoji: "🌿", flavor: "Citrusy, nutty, slightly floral", dishes: ["Curries", "Falafel", "Soups", "Meat marinades", "Vegetable dishes"], cuisines: ["Indian", "Middle Eastern", "Thai"], tip: "Pairs brilliantly with cumin. Use seeds whole in pickling brines.", color: "#7A9E4E", type: "spice" },
  { name: "Garam Masala", emoji: "🫙", flavor: "Complex, warm, aromatic blend", dishes: ["Curries", "Dal", "Butter chicken", "Biryani", "Roasted meats"], cuisines: ["Indian", "Pakistani"], tip: "Add at the END of cooking to preserve the aromatic oils. It's a finishing spice.", color: "#9B6B3A", type: "spice" },
  { name: "Chilli Flakes", emoji: "🌶️", flavor: "Hot, slightly fruity", dishes: ["Pizza", "Pasta", "Stir-fries", "Eggs", "Marinades"], cuisines: ["Italian", "Korean", "Chinese", "American"], tip: "Add early for heat that melds into the dish, or late for a sharp spicy kick.", color: "#B22222", type: "spice" },
  { name: "Cardamom", emoji: "💚", flavor: "Floral, citrusy, intensely aromatic", dishes: ["Chai", "Rice pudding", "Curries", "Scandinavian pastries", "Biryanis"], cuisines: ["Indian", "Scandinavian", "Middle Eastern"], tip: "Use pods whole in slow-cooked dishes; use ground in baking. Very potent, use sparingly.", color: "#4A7C59", type: "spice" },
  { name: "Cloves", emoji: "🔶", flavor: "Intensely warm, sweet, pungent", dishes: ["Ham glazes", "Mulled wine", "Biryani", "Pumpkin pie", "Pickles"], cuisines: ["Indonesian", "Indian", "European"], tip: "Extremely strong, a little goes a long way. Remove whole cloves before serving.", color: "#6B3A2A", type: "spice" },
  { name: "Mustard Seeds", emoji: "⚪", flavor: "Nutty when toasted, sharp and pungent when raw", dishes: ["Pickles", "Indian curries", "Salad dressings", "Potato dishes", "Lentils"], cuisines: ["Indian", "European"], tip: "Pop in hot oil first (tempering) until they splutter, this releases their nuttiness.", color: "#D4A017", type: "spice" },
  { name: "Allspice", emoji: "🟫", flavor: "Like a mix of cinnamon, cloves, and nutmeg", dishes: ["Jerk chicken", "Mince pies", "Jamaican stews", "Pickles", "Mulled drinks"], cuisines: ["Caribbean", "British baking", "Middle Eastern"], tip: "Named allspice because it tastes like several spices at once. Great in meat rubs.", color: "#7B4F2E", type: "spice" },
  { name: "Star Anise", emoji: "⭐", flavor: "Strong liquorice, warm and sweet", dishes: ["Pho", "Chinese braised pork", "Mulled wine", "Biryani", "Duck dishes"], cuisines: ["Chinese", "Vietnamese", "French"], tip: "A key spice in Chinese five-spice. Use whole; remove before serving.", color: "#5C3A1A", type: "spice" },
  { name: "Fennel Seeds", emoji: "🌾", flavor: "Anise-like, sweet, slightly grassy", dishes: ["Italian sausage", "Pork dishes", "Bread", "Fish", "Indian curries"], cuisines: ["Italian", "Indian", "Scandinavian"], tip: "Chewing fennel seeds freshens breath, often served after meals in India.", color: "#7EA86B", type: "spice" },
  { name: "Nutmeg", emoji: "🟤", flavor: "Warm, sweet, slightly nutty", dishes: ["Bechamel sauce", "Eggnog", "Spinach dishes", "Custards", "Pumpkin dishes"], cuisines: ["European", "Indian", "Caribbean"], tip: "Freshly grated nutmeg is far superior to pre-ground. A tiny amount goes a long way.", color: "#8B6340", type: "spice" },
  { name: "Saffron", emoji: "🟠", flavor: "Floral, honeyed, slightly metallic", dishes: ["Paella", "Risotto Milanese", "Bouillabaisse", "Persian rice", "Biryanis"], cuisines: ["Spanish", "Italian", "Persian", "Indian"], tip: "Steep in warm water or stock for 15 minutes before using to release full colour and flavour. The world's most expensive spice.", color: "#FF8C00", type: "spice" },
  { name: "Fenugreek", emoji: "🟡", flavor: "Bitter, nutty, slightly maple-like", dishes: ["Curries", "Dal", "Spice blends", "Chutneys", "Bread"], cuisines: ["Indian", "Middle Eastern", "Ethiopian"], tip: "Roasting reduces the bitterness. The seeds smell strongly of maple syrup, used in artificial maple flavourings.", color: "#C49A00", type: "spice" },
  { name: "Sumac", emoji: "🔴", flavor: "Tangy, fruity, tart citrus flavour", dishes: ["Fattoush salad", "Grilled meats", "Hummus", "Fish", "Za'atar blend"], cuisines: ["Middle Eastern", "Lebanese", "Turkish"], tip: "Use as you would lemon juice, to add acidity and brightness. Sprinkle over dishes just before serving.", color: "#8B0000", type: "spice" },
  { name: "Za'atar", emoji: "🟢", flavor: "Herby, nutty, tangy blend", dishes: ["Flatbreads", "Grilled chicken", "Dips", "Roasted vegetables", "Labneh"], cuisines: ["Middle Eastern", "Lebanese", "Israeli"], tip: "Mix with olive oil and spread on bread before baking. It's a blend, not a single spice, recipes vary by region.", color: "#556B2F", type: "spice" },
  { name: "Five Spice", emoji: "🫙", flavor: "Complex, sweet, warm, anise-forward", dishes: ["Chinese roast pork", "Duck", "Marinades", "Stir-fries", "Braised meats"], cuisines: ["Chinese"], tip: "Use sparingly, it's very potent. Traditionally combines star anise, cloves, cinnamon, Sichuan pepper and fennel seeds.", color: "#8B4513", type: "spice" },
  { name: "Sichuan Pepper", emoji: "🔴", flavor: "Citrusy, numbing, tingly rather than spicy hot", dishes: ["Mapo tofu", "Dan dan noodles", "Kung pao chicken", "Hot pot", "Dry rubs"], cuisines: ["Chinese", "Sichuan"], tip: "Toast and grind fresh for the best flavour. Creates a unique numbing tingling sensation on the tongue.", color: "#A52A2A", type: "spice" },
  { name: "Smoked Paprika", emoji: "🟠", flavor: "Deep, smoky, rich, mildly sweet", dishes: ["Chorizo", "Patatas bravas", "Soups", "Meat rubs", "Roasted vegetables"], cuisines: ["Spanish"], tip: "One of the most versatile spices in the kitchen. Adds smokiness without a grill. Sweet, bittersweet or hot varieties available.", color: "#B5451B", type: "spice" },
  { name: "Cayenne Pepper", emoji: "🌶️", flavor: "Fiery hot, clean heat, slightly fruity", dishes: ["Hot sauces", "Chili", "Cajun dishes", "Spice rubs", "Soups"], cuisines: ["American", "Mexican", "Cajun"], tip: "A little goes a long way. Add gradually and taste as you go. Also used to boost metabolism in health drinks.", color: "#CC2200", type: "spice" },
  { name: "Black Pepper", emoji: "⚫", flavor: "Sharp, pungent, earthy warmth", dishes: ["Almost everything", "Steak", "Pasta cacio e pepe", "Salad dressings", "Marinades"], cuisines: ["Global"], tip: "Freshly ground is incomparably better than pre-ground. Add at the end of cooking for the brightest flavour.", color: "#2C2C2C", type: "spice" },
  { name: "White Pepper", emoji: "⚪", flavor: "Milder than black, earthy, slightly fermented", dishes: ["White sauces", "Chowders", "Swedish meatballs", "Chinese stir-fries", "Potato dishes"], cuisines: ["European", "Chinese", "Scandinavian"], tip: "Used when you want pepper heat without dark specks in a pale dish. Common in Chinese cooking.", color: "#D3C9A8", type: "spice" },
  { name: "Caraway Seeds", emoji: "🟤", flavor: "Warm, anise-like, slightly bitter", dishes: ["Rye bread", "Sauerkraut", "Goulash", "Cabbage dishes", "Seed cake"], cuisines: ["Eastern European", "German", "Scandinavian"], tip: "The defining flavour of rye bread. Toast before using to intensify the flavour.", color: "#8B7355", type: "spice" },
  { name: "Juniper Berries", emoji: "🫐", flavor: "Piney, resinous, citrusy, slightly floral", dishes: ["Game meats", "Gin marinades", "Sauerkraut", "Pork", "Sauces"], cuisines: ["Scandinavian", "German", "French"], tip: "Crush lightly before using to release oils. The key botanical flavour in gin.", color: "#4A235A", type: "spice" },
  { name: "Mace", emoji: "🟠", flavor: "Milder, more delicate version of nutmeg, slightly sweeter", dishes: ["Bechamel", "Pies", "Sausages", "Custards", "Spice blends"], cuisines: ["European", "Indian", "Indonesian"], tip: "Mace is the outer covering of the nutmeg seed. Use where you want nutmeg flavour but more subtlety.", color: "#E8822A", type: "spice" },
  { name: "Annatto (Achiote)", emoji: "🔴", flavor: "Mild, earthy, slightly peppery, subtle sweetness", dishes: ["Rice", "Chicken dishes", "Tamales", "Sauces", "Marinades"], cuisines: ["Mexican", "Caribbean", "Filipino"], tip: "Used mainly for its vivid red-orange colour. Infuse seeds in hot oil to extract colour, then remove.", color: "#CC4400", type: "spice" },
];

const allItems = [...spices, ...herbs];

const cuisineColors = {
  Mexican: "#E67E22", Indian: "#E74C3C", "Middle Eastern": "#9B59B6",
  "Southeast Asian": "#27AE60", Spanish: "#F39C12", Hungarian: "#C0392B",
  American: "#3498DB", Moroccan: "#E8A020", "European baking": "#8E44AD",
  European: "#2980B9", Thai: "#16A085", Pakistani: "#D35400",
  Italian: "#27AE60", Korean: "#C0392B", Chinese: "#E74C3C",
  Greek: "#2980B9", Scandinavian: "#7F8C8D", Indonesian: "#D35400",
  Caribbean: "#F39C12", Vietnamese: "#27AE60", French: "#2C3E50",
  Mediterranean: "#1ABC9C", "South American": "#F39C12", British: "#34495E",
  "British baking": "#8E44AD", "Eastern European": "#95A5A6",
  Persian: "#8E44AD", "Sri Lankan": "#E74C3C", Lebanese: "#27AE60",
  Turkish: "#E74C3C", Israeli: "#3498DB", Sichuan: "#C0392B",
  Cajun: "#D35400", Global: "#7F8C8D", German: "#95A5A6",
  Malaysian: "#27AE60", Filipino: "#3498DB", Ethiopian: "#E67E22",
  "South Indian": "#E74C3C",
};

export default function SpiceGuide() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = allItems.filter((s) => {
    const matchesType = filter === "all" || s.type === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.dishes.some((d) => d.toLowerCase().includes(search.toLowerCase())) ||
      s.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#FAF7F0", color: "#2C1A0E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .header { background: #2C1A0E; color: #FAF7F0; padding: 48px 32px 36px; text-align: center; }
        .header h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 700; letter-spacing: 0.02em; margin-bottom: 8px; }
        .header p { font-family: 'Lato', sans-serif; font-weight: 300; font-size: 1rem; color: #C8A87A; letter-spacing: 0.12em; text-transform: uppercase; }
        .search-bar { display: flex; justify-content: center; padding: 28px 24px 0; }
        .search-bar input { width: 100%; max-width: 500px; padding: 12px 20px; border: 2px solid #C8A87A; border-radius: 40px; background: white; font-family: 'Lato', sans-serif; font-size: 0.95rem; color: #2C1A0E; outline: none; transition: border-color 0.2s; }
        .search-bar input:focus { border-color: #8B4513; }
        .search-bar input::placeholder { color: #A08060; }
        .filter-tabs { display: flex; justify-content: center; gap: 8px; padding: 20px 24px 0; flex-wrap: wrap; }
        .filter-tab { padding: 7px 20px; border-radius: 30px; border: 2px solid #C8A87A; background: transparent; font-family: 'Lato', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8B6340; cursor: pointer; transition: all 0.18s; }
        .filter-tab:hover { background: #F0E8D8; }
        .filter-tab.active { background: #2C1A0E; border-color: #2C1A0E; color: #FAF7F0; }
        .filter-tab.herb-active { background: #2E7D32; border-color: #2E7D32; color: white; }
        .filter-tab.spice-active { background: #8B4513; border-color: #8B4513; color: white; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 28px 24px 48px; max-width: 1200px; margin: 0 auto; }
        .card { background: white; border-radius: 12px; overflow: hidden; border: 2px solid transparent; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; box-shadow: 0 2px 8px rgba(44,26,14,0.08); }
        .card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(44,26,14,0.15); border-color: #C8A87A; }
        .card-header { padding: 18px 20px 14px; display: flex; align-items: center; gap: 14px; }
        .spice-dot { width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .card-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #2C1A0E; }
        .card-flavor { font-family: 'Lato', sans-serif; font-size: 0.82rem; color: #8B6340; font-style: italic; margin-top: 2px; }
        .card-body { padding: 0 20px 18px; }
        .label { font-family: 'Lato', sans-serif; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #A08060; margin-bottom: 5px; margin-top: 12px; }
        .dishes { display: flex; flex-wrap: wrap; gap: 5px; }
        .dish-tag { background: #FAF7F0; border: 1px solid #E0D0B8; border-radius: 20px; padding: 3px 10px; font-family: 'Lato', sans-serif; font-size: 0.78rem; color: #5A3A1A; }
        .cuisine-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .cuisine-tag { border-radius: 4px; padding: 2px 8px; font-family: 'Lato', sans-serif; font-size: 0.72rem; font-weight: 700; color: white; opacity: 0.88; }
        .tip-box { margin-top: 12px; background: #FAF7F0; border-left: 3px solid #C8A87A; border-radius: 0 6px 6px 0; padding: 8px 12px; font-family: 'Lato', sans-serif; font-size: 0.82rem; color: #5A3A1A; font-style: italic; }
        .tip-box span { font-style: normal; font-weight: 700; color: #8B4513; }
        .type-badge { display: inline-block; font-family: 'Lato', sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 20px; margin-left: 8px; vertical-align: middle; }
        .type-badge.herb { background: #E8F5E9; color: #2E7D32; }
        .type-badge.spice { background: #FBE9E7; color: #8B4513; }
        .no-results { text-align: center; color: #A08060; font-family: 'Lato', sans-serif; padding: 48px; grid-column: 1/-1; font-size: 1rem; }
      `}</style>

      <div className="header">
        <h1>The Spice & Herb Cabinet</h1>
        <p>A reference guide to flavour, purpose & pairing</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, dish, or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All ({allItems.length})
        </button>
        <button className={`filter-tab ${filter === "spice" ? "spice-active" : ""}`} onClick={() => setFilter("spice")}>
          Spices ({spices.length})
        </button>
        <button className={`filter-tab ${filter === "herb" ? "herb-active" : ""}`} onClick={() => setFilter("herb")}>
          Herbs ({herbs.length})
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "12px 0 0", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "#A08060" }}>
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="grid">
        {filtered.length === 0 && <div className="no-results">No results found for "{search}"</div>}
        {filtered.map((item) => (
          <div className="card" key={item.name}>
            <div className="card-header">
              <div className="spice-dot" style={{ background: item.color + "22", border: `2px solid ${item.color}44` }}>
                {item.emoji}
              </div>
              <div>
                <div className="card-name">
                  {item.name}
                  <span className={`type-badge ${item.type}`}>{item.type}</span>
                </div>
                <div className="card-flavor">{item.flavor}</div>
              </div>
            </div>
            <div className="card-body">
              <div className="label">Use in</div>
              <div className="dishes">
                {item.dishes.map((d) => <span className="dish-tag" key={d}>{d}</span>)}
              </div>
              <div className="label">Cuisines</div>
              <div className="cuisine-tags">
                {item.cuisines.map((c) => (
                  <span className="cuisine-tag" key={c} style={{ background: cuisineColors[c] || "#8B4513" }}>{c}</span>
                ))}
              </div>
              <div className="tip-box"><span>Tip:</span> {item.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
