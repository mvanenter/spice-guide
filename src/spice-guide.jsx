import { useState, useEffect } from "react";

const herbs = [
  { name: "Basil", emoji: "🌿", flavor: "Sweet, peppery, slightly clove-like", dishes: ["Pasta", "Pizza", "Caprese salad", "Pesto", "Tomato-based sauces"], cuisines: ["Italian", "Thai", "Mediterranean"], tip: "Add fresh basil at the very end. Heat kills its aroma. Tear rather than chop to preserve oils.", color: "#2E7D32", type: "herb", freshDried: "fresh", pairs: ["Garlic", "Oregano", "Parsley", "Lemon"] },
  { name: "Rosemary", emoji: "🌲", flavor: "Piney, woody, intensely aromatic", dishes: ["Roast lamb", "Focaccia", "Roast potatoes", "Chicken", "Marinades"], cuisines: ["Italian", "Mediterranean", "French"], tip: "Very strong, use sparingly. Woody stems can be used as skewers for grilling.", color: "#1B5E20", type: "herb", freshDried: "both", pairs: ["Thyme", "Garlic", "Sage", "Bay Leaves"] },
  { name: "Thyme", emoji: "🌱", flavor: "Earthy, minty, slightly lemony", dishes: ["Roast chicken", "Soups", "Stews", "Mushroom dishes", "Roasted vegetables"], cuisines: ["French", "Mediterranean", "European"], tip: "Holds up well to long cooking. Strip leaves by running fingers down the stem against the grain.", color: "#388E3C", type: "herb", freshDried: "both", pairs: ["Rosemary", "Bay Leaves", "Parsley", "Sage"] },
  { name: "Parsley", emoji: "💚", flavor: "Fresh, clean, mildly grassy", dishes: ["Tabbouleh", "Chimichurri", "Soups", "Pasta", "Garnishes"], cuisines: ["Middle Eastern", "European", "South American"], tip: "Flat-leaf (Italian) parsley has more flavour than curly. Stalks are great in stocks.", color: "#43A047", type: "herb", freshDried: "fresh", pairs: ["Garlic", "Lemon", "Basil", "Chives"] },
  { name: "Coriander (fresh)", emoji: "🍃", flavor: "Citrusy, bright, slightly soapy to some", dishes: ["Curries", "Tacos", "Salsas", "Thai salads", "Chutneys"], cuisines: ["Indian", "Mexican", "Thai", "Middle Eastern"], tip: "Add at the end of cooking or as a garnish. Stalks are edible and flavourful, use them too.", color: "#66BB6A", type: "herb", freshDried: "fresh", pairs: ["Cumin", "Chilli Flakes", "Lime", "Mint"] },
  { name: "Mint", emoji: "🫧", flavor: "Cool, sweet, refreshing", dishes: ["Lamb dishes", "Tzatziki", "Tabbouleh", "Cocktails", "Desserts"], cuisines: ["Middle Eastern", "Greek", "British", "Moroccan"], tip: "Spearmint is best for cooking; peppermint is better for drinks and sweets.", color: "#00897B", type: "herb", freshDried: "fresh", pairs: ["Coriander (fresh)", "Lemon", "Parsley", "Cardamom"] },
  { name: "Sage", emoji: "🌿", flavor: "Earthy, slightly peppery, musty-savoury", dishes: ["Pasta with brown butter", "Pork", "Stuffing", "Gnocchi", "Bean soups"], cuisines: ["Italian", "European", "American"], tip: "Fry whole leaves in butter until crisp for an elegant garnish. Use dried sparingly, it's pungent.", color: "#558B2F", type: "herb", freshDried: "both", pairs: ["Rosemary", "Thyme", "Bay Leaves", "Nutmeg"] },
  { name: "Dill", emoji: "🌾", flavor: "Feathery, anise-like, fresh and grassy", dishes: ["Salmon", "Pickles", "Potato salad", "Tzatziki", "Egg dishes"], cuisines: ["Scandinavian", "Eastern European", "Greek"], tip: "Best used fresh, it loses most of its flavour when dried. Add at the end of cooking.", color: "#7CB342", type: "herb", freshDried: "fresh", pairs: ["Lemon", "Mustard Seeds", "Parsley", "Chives"] },
  { name: "Tarragon", emoji: "🌿", flavor: "Distinctive anise, slightly sweet", dishes: ["Bearnaise sauce", "Chicken dishes", "Salad dressings", "Fish", "Eggs"], cuisines: ["French"], tip: "A cornerstone of French cooking. French tarragon is far superior to Russian tarragon.", color: "#9CCC65", type: "herb", freshDried: "fresh", pairs: ["Parsley", "Chives", "Thyme", "Lemon"] },
  { name: "Chives", emoji: "🟢", flavor: "Mild onion, fresh and delicate", dishes: ["Baked potatoes", "Scrambled eggs", "Soups", "Cream cheese", "Dips"], cuisines: ["European", "American", "French"], tip: "Always use fresh, they are useless dried. Snip with scissors rather than chopping.", color: "#8BC34A", type: "herb", freshDried: "fresh", pairs: ["Parsley", "Tarragon", "Dill", "Lemon"] },
  { name: "Lemongrass", emoji: "🍋", flavor: "Citrusy, floral, ginger-like", dishes: ["Thai curries", "Soups", "Marinades", "Stir-fries", "Teas"], cuisines: ["Thai", "Vietnamese", "Indonesian"], tip: "Bruise or bash the stalk before adding to release the oils. Remove before serving, too fibrous to eat.", color: "#C0CA33", type: "herb", freshDried: "fresh", pairs: ["Kaffir Lime Leaves", "Coriander (fresh)", "Turmeric", "Ginger"] },
  { name: "Kaffir Lime Leaves", emoji: "🍃", flavor: "Intensely citrusy, floral, aromatic", dishes: ["Thai curries", "Tom kha soup", "Stir-fries", "Rice dishes", "Marinades"], cuisines: ["Thai", "Indonesian", "Malaysian"], tip: "Remove the central rib and slice very finely if eating. Otherwise use whole and remove before serving.", color: "#00C853", type: "herb", freshDried: "fresh", pairs: ["Lemongrass", "Coriander (fresh)", "Galangal", "Chilli Flakes"] },
  { name: "Oregano", emoji: "🌱", flavor: "Robust, earthy, slightly bitter", dishes: ["Pizza", "Pasta sauce", "Greek salad", "Grilled meats", "Beans"], cuisines: ["Italian", "Greek", "Mexican"], tip: "Dried oregano is actually more potent than fresh. Add during cooking for best results.", color: "#4A6741", type: "herb", freshDried: "dried", pairs: ["Basil", "Thyme", "Garlic", "Rosemary"] },
  { name: "Bay Leaves", emoji: "🍃", flavor: "Subtle, herbal, slightly floral", dishes: ["Soups", "Stews", "Bolognese", "Rice", "Braises"], cuisines: ["European", "Indian", "Middle Eastern"], tip: "Always remove before serving, they do not soften and can be a choking hazard.", color: "#5A7A45", type: "herb", freshDried: "both", pairs: ["Thyme", "Rosemary", "Parsley", "Cloves"] },
  { name: "Marjoram", emoji: "🌿", flavor: "Mild, sweet oregano-like, floral", dishes: ["Sausages", "Roast meats", "Soups", "Egg dishes", "Stuffing"], cuisines: ["European", "Middle Eastern", "German"], tip: "Milder and sweeter than oregano. Add near the end of cooking to preserve its delicate flavour.", color: "#6A994E", type: "herb", freshDried: "both", pairs: ["Oregano", "Thyme", "Basil", "Sage"] },
  { name: "Lavender", emoji: "💜", flavor: "Floral, sweet, slightly perfumed", dishes: ["Lamb", "Shortbread", "Ice cream", "Honey glazes", "Herbes de Provence"], cuisines: ["French", "Mediterranean", "British baking"], tip: "Use sparingly, too much makes food taste like soap. Culinary lavender only, not ornamental.", color: "#7B5EA7", type: "herb", freshDried: "both", pairs: ["Rosemary", "Thyme", "Mint", "Lemon"] },
  { name: "Sorrel", emoji: "🍃", flavor: "Sharp, lemony, acidic", dishes: ["Salads", "Soups", "Sauces for fish", "Omelettes", "Creamy sauces"], cuisines: ["French", "Eastern European"], tip: "Use as you would spinach but expect a sour punch. It wilts quickly when cooked.", color: "#5D8A3C", type: "herb", freshDried: "fresh", pairs: ["Parsley", "Chives", "Dill", "Lemon"] },
  { name: "Vietnamese Mint", emoji: "🌿", flavor: "Peppery, spicy, pungent", dishes: ["Pho", "Spring rolls", "Salads", "Laksa", "Banh mi"], cuisines: ["Vietnamese", "Malaysian", "Thai"], tip: "Not actually mint, far more peppery. Essential in Vietnamese cooking. Use raw as a garnish.", color: "#3A7D44", type: "herb", freshDried: "fresh", pairs: ["Coriander (fresh)", "Mint", "Lemongrass", "Chilli Flakes"] },
  { name: "Curry Leaves", emoji: "🍃", flavor: "Warm, aromatic, citrusy with a slight anise note", dishes: ["South Indian curries", "Dal", "Coconut dishes", "Chutneys", "Rice dishes"], cuisines: ["Indian", "Sri Lankan"], tip: "Fry in hot oil at the start to release their aroma. Fresh curry leaves are far superior to dried.", color: "#4CAF50", type: "herb", freshDried: "fresh", pairs: ["Mustard Seeds", "Turmeric", "Cumin", "Coriander (ground)"] },
  { name: "Epazote", emoji: "🌿", flavor: "Pungent, medicinal, herby with a petroleum-like edge", dishes: ["Black beans", "Quesadillas", "Tamales", "Mole", "Corn dishes"], cuisines: ["Mexican"], tip: "Traditional in Mexican cooking to reduce flatulence from beans. Use fresh if possible.", color: "#2E8B57", type: "herb", freshDried: "fresh", pairs: ["Coriander (fresh)", "Cumin", "Chilli Flakes", "Oregano"] },
];

const spices = [
  { name: "Cumin", emoji: "🟤", flavor: "Earthy, warm, slightly smoky", dishes: ["Curries", "Tacos", "Chili", "Lentil soups", "Roasted vegetables"], cuisines: ["Mexican", "Indian", "Middle Eastern"], tip: "Toast whole seeds in a dry pan before grinding for deeper flavor.", color: "#C8763A", type: "spice", heat: 0, pairs: ["Coriander (ground)", "Turmeric", "Chilli Flakes", "Paprika"] },
  { name: "Turmeric", emoji: "🟡", flavor: "Mild, earthy, slightly bitter", dishes: ["Curries", "Rice dishes", "Soups", "Scrambled eggs", "Smoothies"], cuisines: ["Indian", "Southeast Asian", "Middle Eastern"], tip: "Pairs with black pepper to boost absorption. Stains everything golden.", color: "#E8A020", type: "spice", heat: 0, pairs: ["Cumin", "Coriander (ground)", "Ginger", "Black Pepper"] },
  { name: "Paprika", emoji: "🔴", flavor: "Sweet, mild to smoky depending on variety", dishes: ["Goulash", "Chicken dishes", "Devilled eggs", "Roasted potatoes", "Hummus garnish"], cuisines: ["Spanish", "Hungarian", "American"], tip: "Smoked paprika adds depth to meat rubs and stews. Do not burn it, it turns bitter.", color: "#C0392B", type: "spice", heat: 1, pairs: ["Cumin", "Garlic", "Cayenne Pepper", "Oregano"] },
  { name: "Cinnamon", emoji: "🌰", flavor: "Sweet, warm, slightly spicy", dishes: ["Baked goods", "Oatmeal", "Lamb tagine", "Mulled wine", "Chai"], cuisines: ["Moroccan", "Middle Eastern", "European baking"], tip: "Used in both sweet and savoury cooking. Ceylon cinnamon is milder than Cassia.", color: "#8B4513", type: "spice", heat: 0, pairs: ["Cardamom", "Cloves", "Nutmeg", "Allspice"] },
  { name: "Coriander (ground)", emoji: "🌿", flavor: "Citrusy, nutty, slightly floral", dishes: ["Curries", "Falafel", "Soups", "Meat marinades", "Vegetable dishes"], cuisines: ["Indian", "Middle Eastern", "Thai"], tip: "Pairs brilliantly with cumin. Use seeds whole in pickling brines.", color: "#7A9E4E", type: "spice", heat: 0, pairs: ["Cumin", "Turmeric", "Garam Masala", "Paprika"] },
  { name: "Chilli Flakes", emoji: "🌶️", flavor: "Hot, slightly fruity", dishes: ["Pizza", "Pasta", "Stir-fries", "Eggs", "Marinades"], cuisines: ["Italian", "Korean", "Chinese", "American"], tip: "Add early for heat that melds into the dish, or late for a sharp spicy kick.", color: "#B22222", type: "spice", heat: 3, pairs: ["Garlic", "Paprika", "Cumin", "Oregano"] },
  { name: "Cardamom", emoji: "💚", flavor: "Floral, citrusy, intensely aromatic", dishes: ["Chai", "Rice pudding", "Curries", "Scandinavian pastries", "Biryanis"], cuisines: ["Indian", "Scandinavian", "Middle Eastern"], tip: "Use pods whole in slow-cooked dishes; use ground in baking. Very potent, use sparingly.", color: "#4A7C59", type: "spice", heat: 0, pairs: ["Cinnamon", "Cloves", "Ginger", "Nutmeg"] },
  { name: "Cloves", emoji: "🔶", flavor: "Intensely warm, sweet, pungent", dishes: ["Ham glazes", "Mulled wine", "Biryani", "Pumpkin pie", "Pickles"], cuisines: ["Indonesian", "Indian", "European"], tip: "Extremely strong, a little goes a long way. Remove whole cloves before serving.", color: "#6B3A2A", type: "spice", heat: 0, pairs: ["Cinnamon", "Nutmeg", "Cardamom", "Allspice"] },
  { name: "Mustard Seeds", emoji: "⚪", flavor: "Nutty when toasted, sharp and pungent when raw", dishes: ["Pickles", "Indian curries", "Salad dressings", "Potato dishes", "Lentils"], cuisines: ["Indian", "European"], tip: "Pop in hot oil first (tempering) until they splutter, this releases their nuttiness.", color: "#D4A017", type: "spice", heat: 1, pairs: ["Curry Leaves", "Turmeric", "Cumin", "Fenugreek"] },
  { name: "Allspice", emoji: "🟫", flavor: "Like a mix of cinnamon, cloves, and nutmeg", dishes: ["Jerk chicken", "Mince pies", "Jamaican stews", "Pickles", "Mulled drinks"], cuisines: ["Caribbean", "British baking", "Middle Eastern"], tip: "Named allspice because it tastes like several spices at once. Great in meat rubs.", color: "#7B4F2E", type: "spice", heat: 0, pairs: ["Cinnamon", "Cloves", "Nutmeg", "Black Pepper"] },
  { name: "Fennel Seeds", emoji: "🌾", flavor: "Anise-like, sweet, slightly grassy", dishes: ["Italian sausage", "Pork dishes", "Bread", "Fish", "Indian curries"], cuisines: ["Italian", "Indian", "Scandinavian"], tip: "Chewing fennel seeds freshens breath, often served after meals in India.", color: "#7EA86B", type: "spice", heat: 0, pairs: ["Star Anise", "Coriander (ground)", "Cumin", "Caraway Seeds"] },
  { name: "Nutmeg", emoji: "🟤", flavor: "Warm, sweet, slightly nutty", dishes: ["Bechamel sauce", "Eggnog", "Spinach dishes", "Custards", "Pumpkin dishes"], cuisines: ["European", "Indian", "Caribbean"], tip: "Freshly grated nutmeg is far superior to pre-ground. A tiny amount goes a long way.", color: "#8B6340", type: "spice", heat: 0, pairs: ["Cinnamon", "Cloves", "Mace", "Cardamom"] },
  { name: "Saffron", emoji: "🟠", flavor: "Floral, honeyed, slightly metallic", dishes: ["Paella", "Risotto Milanese", "Bouillabaisse", "Persian rice", "Biryanis"], cuisines: ["Spanish", "Italian", "Persian", "Indian"], tip: "Steep in warm water or stock for 15 minutes before using. The world's most expensive spice.", color: "#FF8C00", type: "spice", heat: 0, pairs: ["Cardamom", "Cinnamon", "Turmeric", "Rose Water"] },
  { name: "Fenugreek", emoji: "🟡", flavor: "Bitter, nutty, slightly maple-like", dishes: ["Curries", "Dal", "Spice blends", "Chutneys", "Bread"], cuisines: ["Indian", "Middle Eastern", "Ethiopian"], tip: "Roasting reduces the bitterness. The seeds smell strongly of maple syrup.", color: "#C49A00", type: "spice", heat: 0, pairs: ["Cumin", "Coriander (ground)", "Mustard Seeds", "Turmeric"] },
  { name: "Sumac", emoji: "🔴", flavor: "Tangy, fruity, tart citrus flavour", dishes: ["Fattoush salad", "Grilled meats", "Hummus", "Fish", "Za'atar blend"], cuisines: ["Middle Eastern", "Lebanese", "Turkish"], tip: "Use as you would lemon juice, to add acidity. Sprinkle over dishes just before serving.", color: "#8B0000", type: "spice", heat: 0, pairs: ["Za'atar", "Oregano", "Thyme", "Cumin"] },
  { name: "Five Spice", emoji: "🫙", flavor: "Complex, sweet, warm, anise-forward", dishes: ["Chinese roast pork", "Duck", "Marinades", "Stir-fries", "Braised meats"], cuisines: ["Chinese"], tip: "Use sparingly, very potent. Combines star anise, cloves, cinnamon, Sichuan pepper and fennel.", color: "#8B4513", type: "spice", heat: 1, pairs: ["Star Anise", "Sichuan Pepper", "Ginger", "Cloves"] },
  { name: "Sichuan Pepper", emoji: "🔴", flavor: "Citrusy, numbing, tingly rather than hot", dishes: ["Mapo tofu", "Dan dan noodles", "Kung pao chicken", "Hot pot", "Dry rubs"], cuisines: ["Chinese", "Sichuan"], tip: "Toast and grind fresh. Creates a unique numbing tingling sensation on the tongue.", color: "#A52A2A", type: "spice", heat: 2, pairs: ["Five Spice", "Chilli Flakes", "Ginger", "Star Anise"] },
  { name: "Smoked Paprika", emoji: "🟠", flavor: "Deep, smoky, rich, mildly sweet", dishes: ["Chorizo", "Patatas bravas", "Soups", "Meat rubs", "Roasted vegetables"], cuisines: ["Spanish"], tip: "Adds smokiness without a grill. Sweet, bittersweet or hot varieties available.", color: "#B5451B", type: "spice", heat: 1, pairs: ["Cumin", "Garlic", "Oregano", "Cayenne Pepper"] },
  { name: "Cayenne Pepper", emoji: "🌶️", flavor: "Fiery hot, clean heat, slightly fruity", dishes: ["Hot sauces", "Chili", "Cajun dishes", "Spice rubs", "Soups"], cuisines: ["American", "Mexican", "Cajun"], tip: "Add gradually and taste as you go. Also used to boost metabolism in health drinks.", color: "#CC2200", type: "spice", heat: 4, pairs: ["Smoked Paprika", "Cumin", "Garlic", "Oregano"] },
  { name: "Black Pepper", emoji: "⚫", flavor: "Sharp, pungent, earthy warmth", dishes: ["Almost everything", "Steak", "Pasta cacio e pepe", "Salad dressings", "Marinades"], cuisines: ["Global"], tip: "Freshly ground is incomparably better than pre-ground. Add at the end for brightest flavour.", color: "#2C2C2C", type: "spice", heat: 1, pairs: ["Salt", "Cumin", "Coriander (ground)", "Turmeric"] },
  { name: "White Pepper", emoji: "⚪", flavor: "Milder than black, earthy, slightly fermented", dishes: ["White sauces", "Chowders", "Swedish meatballs", "Chinese stir-fries", "Potato dishes"], cuisines: ["European", "Chinese", "Scandinavian"], tip: "Used when you want pepper heat without dark specks in a pale dish.", color: "#D3C9A8", type: "spice", heat: 1, pairs: ["Black Pepper", "Nutmeg", "Ginger", "Garlic"] },
  { name: "Caraway Seeds", emoji: "🟤", flavor: "Warm, anise-like, slightly bitter", dishes: ["Rye bread", "Sauerkraut", "Goulash", "Cabbage dishes", "Seed cake"], cuisines: ["Eastern European", "German", "Scandinavian"], tip: "The defining flavour of rye bread. Toast before using to intensify the flavour.", color: "#8B7355", type: "spice", heat: 0, pairs: ["Fennel Seeds", "Coriander (ground)", "Cumin", "Dill"] },
  { name: "Juniper Berries", emoji: "🫐", flavor: "Piney, resinous, citrusy, slightly floral", dishes: ["Game meats", "Gin marinades", "Sauerkraut", "Pork", "Sauces"], cuisines: ["Scandinavian", "German", "French"], tip: "Crush lightly before using to release oils. The key botanical flavour in gin.", color: "#4A235A", type: "spice", heat: 0, pairs: ["Bay Leaves", "Thyme", "Black Pepper", "Allspice"] },
  { name: "Mace", emoji: "🟠", flavor: "Milder, more delicate version of nutmeg, slightly sweeter", dishes: ["Bechamel", "Pies", "Sausages", "Custards", "Spice blends"], cuisines: ["European", "Indian", "Indonesian"], tip: "Mace is the outer covering of the nutmeg seed. More subtle than nutmeg.", color: "#E8822A", type: "spice", heat: 0, pairs: ["Nutmeg", "Cinnamon", "Cloves", "Cardamom"] },
  { name: "Annatto (Achiote)", emoji: "🔴", flavor: "Mild, earthy, slightly peppery, subtle sweetness", dishes: ["Rice", "Chicken dishes", "Tamales", "Sauces", "Marinades"], cuisines: ["Mexican", "Caribbean", "Filipino"], tip: "Used mainly for vivid red-orange colour. Infuse seeds in hot oil then remove.", color: "#CC4400", type: "spice", heat: 0, pairs: ["Cumin", "Oregano", "Coriander (ground)", "Garlic"] },
];

const blends = [
  { name: "Curry Powder", emoji: "🟡", flavor: "Warm, earthy, mildly spicy, complex", dishes: ["Curries", "Rice dishes", "Roasted vegetables", "Soups", "Eggs"], cuisines: ["British", "Indian", "Caribbean"], tip: "A British-invented blend inspired by Indian flavours. Heat it briefly in oil first to wake up the spices.", color: "#D4A017", type: "blend", heat: 1, pairs: ["Turmeric", "Cumin", "Coriander (ground)", "Garam Masala"] },
  { name: "Garam Masala", emoji: "🫙", flavor: "Complex, warm, aromatic", dishes: ["Curries", "Dal", "Butter chicken", "Biryani", "Roasted meats"], cuisines: ["Indian", "Pakistani"], tip: "Add at the END of cooking to preserve the aromatic oils. It is a finishing spice.", color: "#9B6B3A", type: "blend", heat: 1, pairs: ["Cumin", "Turmeric", "Coriander (ground)", "Cardamom"] },
  { name: "Mixed Herbs", emoji: "🌿", flavor: "Herby, earthy, versatile", dishes: ["Pasta sauces", "Soups", "Roast meats", "Stuffing", "Bread"], cuisines: ["European", "Italian", "Mediterranean"], tip: "A convenient everyday blend. Typically contains oregano, thyme, basil, marjoram and rosemary.", color: "#4A7C3F", type: "blend", heat: 0, pairs: ["Garlic Powder", "Onion Powder", "Paprika", "Bay Leaves"] },
  { name: "Cajun Seasoning", emoji: "🔴", flavor: "Smoky, spicy, garlicky, bold", dishes: ["Chicken", "Fish", "Rice", "Prawns", "Roasted vegetables"], cuisines: ["Cajun", "American"], tip: "Great as a dry rub. Contains paprika, cayenne, garlic, onion and herbs. Adjust heat by how much you use.", color: "#B22222", type: "blend", heat: 3, pairs: ["Smoked Paprika", "Cayenne Pepper", "Garlic Powder", "Oregano"] },
  { name: "Taco Seasoning", emoji: "🌮", flavor: "Cumin-forward, mildly spicy, garlicky", dishes: ["Tacos", "Beef mince", "Chicken", "Nachos", "Burritos"], cuisines: ["Mexican", "American"], tip: "Mix with a splash of water when browning mince to create a sauce. Also good on roasted sweet potato.", color: "#C8763A", type: "blend", heat: 2, pairs: ["Cumin", "Chilli Flakes", "Garlic Powder", "Paprika"] },
  { name: "Moroccan Seasoning", emoji: "🟠", flavor: "Warm, aromatic, slightly sweet and spicy", dishes: ["Lamb", "Chicken", "Roasted vegetables", "Couscous", "Tagines"], cuisines: ["Moroccan", "Middle Eastern"], tip: "Typically contains cumin, coriander, cinnamon, ginger and paprika. Excellent as a marinade with oil and lemon.", color: "#E8822A", type: "blend", heat: 1, pairs: ["Cinnamon", "Cumin", "Coriander (ground)", "Turmeric"] },
  { name: "Za'atar", emoji: "🟢", flavor: "Herby, nutty, tangy", dishes: ["Flatbreads", "Grilled chicken", "Dips", "Roasted vegetables", "Labneh"], cuisines: ["Middle Eastern", "Lebanese", "Israeli"], tip: "Mix with olive oil and spread on bread before baking. Recipes vary by region.", color: "#556B2F", type: "blend", heat: 0, pairs: ["Sumac", "Oregano", "Sesame Seeds", "Thyme"] },
  { name: "Garlic Salt", emoji: "🧄", flavor: "Salty, garlicky, savory", dishes: ["Roasted vegetables", "Pasta", "Grilled meats", "Garlic bread", "Popcorn"], cuisines: ["American", "European"], tip: "Use in place of salt where you want garlic flavour without the prep. Go easy, it is easy to over-salt.", color: "#C8A87A", type: "blend", heat: 0, pairs: ["Onion Powder", "Paprika", "Oregano", "Black Pepper"] },
  { name: "Lemon Pepper", emoji: "🍋", flavor: "Citrusy, peppery, aromatic", dishes: ["Chicken", "Fish", "Pasta", "Roasted vegetables", "Salad dressings"], cuisines: ["American", "European"], tip: "Great on grilled chicken or fish. The lemon zest lifts the whole dish. Also good on scrambled eggs.", color: "#E8C840", type: "blend", heat: 1, pairs: ["Garlic Powder", "Parsley", "Dill", "Paprika"] },
];

const extraSpices = [
  { name: "Salt", emoji: "🤍", flavor: "Pure savoury, mineral", dishes: ["Everything", "Baking", "Brines", "Pasta water", "Sauces"], cuisines: ["Global"], tip: "Salt at every stage of cooking, not just at the end. Properly salted pasta water should taste like the sea.", color: "#B0BEC5", type: "spice", heat: 0, pairs: ["Black Pepper", "Garlic Powder", "Lemon", "Herbs"] },
  { name: "Garlic Powder", emoji: "🧄", flavor: "Mellow, sweet garlic, slightly toasty", dishes: ["Rubs", "Marinades", "Sauces", "Roasted vegetables", "Soups"], cuisines: ["American", "European", "Global"], tip: "Not a substitute for fresh garlic but ideal in dry rubs and spice blends where fresh would burn.", color: "#D4C46A", type: "spice", heat: 0, pairs: ["Onion Powder", "Paprika", "Cumin", "Oregano"] },
  { name: "Onion Powder", emoji: "🧅", flavor: "Sweet, mild onion, slightly savory", dishes: ["Rubs", "Soups", "Sauces", "Burgers", "Roasted meats"], cuisines: ["American", "European", "Global"], tip: "Adds onion flavour without moisture or texture. Great in dry rubs alongside garlic powder.", color: "#C8A050", type: "spice", heat: 0, pairs: ["Garlic Powder", "Paprika", "Cumin", "Black Pepper"] },
  { name: "Ground Ginger", emoji: "🟡", flavor: "Warm, spicy, slightly sweet and citrusy", dishes: ["Baked goods", "Curries", "Stir-fries", "Chai", "Marinades"], cuisines: ["Indian", "Asian", "European baking"], tip: "Dried ginger and fresh ginger are not interchangeable. Dried is warmer and more intense, fresh is brighter.", color: "#D4A020", type: "spice", heat: 1, pairs: ["Cinnamon", "Cardamom", "Turmeric", "Cloves"] },
  { name: "Mustard Powder", emoji: "🟡", flavor: "Sharp, pungent, slightly bitter", dishes: ["Cheese sauces", "Devilled eggs", "Salad dressings", "Marinades", "Rubs"], cuisines: ["British", "American", "European"], tip: "Activates when mixed with cold water. Add to cheese sauce to sharpen the flavour without adding liquid.", color: "#D4B800", type: "spice", heat: 2, pairs: ["Paprika", "Turmeric", "Black Pepper", "Garlic Powder"] },
  { name: "Ground Cloves", emoji: "🟤", flavor: "Intensely warm, sweet, pungent", dishes: ["Spice blends", "Baked goods", "Mulled wine", "Stews", "Rice dishes"], cuisines: ["European", "Indian", "Caribbean"], tip: "Extremely potent. Use even less than you think you need. Overpowering is easy.", color: "#6B3A2A", type: "spice", heat: 0, pairs: ["Cinnamon", "Nutmeg", "Cardamom", "Allspice"] },
  { name: "Ground Allspice", emoji: "🟫", flavor: "Like a mix of cinnamon, cloves, and nutmeg", dishes: ["Jerk chicken", "Mince pies", "Stews", "Spice blends", "Baking"], cuisines: ["Caribbean", "Middle Eastern", "European baking"], tip: "Ground allspice loses its potency faster than whole berries. Buy small amounts and use within 6 months.", color: "#7B4F2E", type: "spice", heat: 0, pairs: ["Cinnamon", "Cloves", "Nutmeg", "Black Pepper"] },
  { name: "Sesame Seeds", emoji: "🤍", flavor: "Nutty, rich, slightly sweet when toasted", dishes: ["Stir-fries", "Sushi", "Salads", "Bread", "Asian noodles"], cuisines: ["Japanese", "Chinese", "Middle Eastern"], tip: "Toast in a dry pan for 2 minutes to dramatically intensify the flavour. Watch carefully, they burn fast.", color: "#D4C48A", type: "spice", heat: 0, pairs: ["Soy sauce", "Ginger", "Garlic", "Five Spice"] },
  { name: "Ground Cardamom", emoji: "💚", flavor: "Floral, citrusy, intensely aromatic", dishes: ["Chai", "Baked goods", "Curries", "Rice pudding", "Biryanis"], cuisines: ["Indian", "Scandinavian", "Middle Eastern"], tip: "Ground cardamom loses flavour quickly. Buy pods and grind your own when possible.", color: "#4A7C59", type: "spice", heat: 0, pairs: ["Cinnamon", "Cloves", "Ginger", "Nutmeg"] },
  { name: "Cumin Seeds", emoji: "🟤", flavor: "Earthy, warm, nuttier than ground cumin", dishes: ["Indian curries", "Dal", "Rice", "Roasted vegetables", "Flatbreads"], cuisines: ["Indian", "Middle Eastern", "Mexican"], tip: "Fry whole seeds in hot oil at the start of cooking until they pop. This releases a deeper flavour than ground.", color: "#C8763A", type: "spice", heat: 0, pairs: ["Mustard Seeds", "Coriander (ground)", "Turmeric", "Curry Leaves"] },
  { name: "Whole Peppercorns", emoji: "⚫", flavor: "Sharp, pungent, earthy, more complex than pre-ground", dishes: ["Stocks", "Brines", "Stews", "Sauces", "Grinders"], cuisines: ["Global"], tip: "Grind fresh for each dish. Whole peppercorns keep their flavour for years; pre-ground goes stale in months.", color: "#2C2C2C", type: "spice", heat: 1, pairs: ["Bay Leaves", "Cloves", "Coriander Seeds", "Salt"] },
  { name: "Cinnamon Sticks", emoji: "🌰", flavor: "Sweet, warm, more subtle and fragrant than ground", dishes: ["Mulled wine", "Rice dishes", "Curries", "Chai", "Poached fruit"], cuisines: ["Moroccan", "Middle Eastern", "European"], tip: "Use whole in liquids and slow-cooked dishes. Remove before serving. Reusable if rinsed and dried.", color: "#8B4513", type: "spice", heat: 0, pairs: ["Cardamom", "Cloves", "Star Anise", "Nutmeg"] },
  { name: "Whole Cloves", emoji: "🔶", flavor: "Intensely warm, sweet, pungent", dishes: ["Ham glazes", "Mulled wine", "Stocks", "Rice dishes", "Brines"], cuisines: ["European", "Indian", "Indonesian"], tip: "Stud into onions for stocks and braises. Remove before serving. More control than ground cloves.", color: "#6B3A2A", type: "spice", heat: 0, pairs: ["Cinnamon Sticks", "Star Anise", "Bay Leaves", "Cardamom"] },
  { name: "Star Anise", emoji: "⭐", flavor: "Strong liquorice, warm and sweet", dishes: ["Pho", "Chinese braised pork", "Mulled wine", "Biryani", "Duck dishes"], cuisines: ["Chinese", "Vietnamese", "French"], tip: "A key spice in Chinese five-spice. Use whole; remove before serving.", color: "#5C3A1A", type: "spice", heat: 0, pairs: ["Five Spice", "Cloves", "Cinnamon", "Fennel Seeds"] },
];

const allItems = [...spices, ...extraSpices, ...herbs, ...blends];

const dishTypes = ["All dishes", "Chicken", "Fish", "Lamb", "Pork", "Beef", "Pasta", "Rice", "Soup", "Salad", "Baking", "Vegetarian"];

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

const dishKeywords = {
  Chicken: ["chicken", "poultry", "butter chicken", "kung pao chicken", "jerk chicken", "grilled chicken"],
  Fish: ["fish", "salmon", "seafood", "bouillabaisse", "pho", "anchovy"],
  Lamb: ["lamb", "tagine", "mutton"],
  Pork: ["pork", "ham", "chorizo", "sausage", "italian sausage", "jerk"],
  Beef: ["beef", "steak", "bolognese", "goulash", "stew", "braise"],
  Pasta: ["pasta", "pizza", "gnocchi", "cacio e pepe"],
  Rice: ["rice", "biryani", "paella", "risotto", "pilaf"],
  Soup: ["soup", "stew", "broth", "chowder", "dal", "lentil", "pho"],
  Salad: ["salad", "tabbouleh", "fattoush", "slaw"],
  Baking: ["bak", "bread", "cake", "pastry", "cookie", "shortbread", "pie", "custard", "eggnog"],
  Vegetarian: ["vegetable", "roasted veg", "bean", "lentil", "tofu", "egg", "mushroom", "potato", "hummus"],
};

function HeatIndicator({ level }) {
  if (level === 0) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
      {[1,2,3,4].map(i => (
        <span key={i} style={{ fontSize: "0.75rem", opacity: i <= level ? 1 : 0.2 }}>🌶️</span>
      ))}
      <span style={{ fontSize: "0.68rem", color: "#B22222", fontFamily: "'Lato', sans-serif", fontWeight: 700, marginLeft: 2 }}>
        {level === 1 ? "Mild" : level === 2 ? "Medium" : level === 3 ? "Hot" : "Very Hot"}
      </span>
    </div>
  );
}

function FreshDriedBadge({ value }) {
  if (!value) return null;
  const config = {
    fresh: { label: "Best fresh", bg: "#E8F5E9", color: "#2E7D32" },
    dried: { label: "Best dried", bg: "#FFF8E1", color: "#F57F17" },
    both: { label: "Fresh or dried", bg: "#E3F2FD", color: "#1565C0" },
  };
  const c = config[value];
  return (
    <span style={{ display: "inline-block", background: c.bg, color: c.color, borderRadius: 20, padding: "2px 8px", fontSize: "0.68rem", fontFamily: "'Lato', sans-serif", fontWeight: 700, marginLeft: 6 }}>
      {c.label}
    </span>
  );
}

export default function SpiceGuide() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dishFilter, setDishFilter] = useState("All dishes");
  const [darkMode, setDarkMode] = useState(false);
  const [myRack, setMyRack] = useState(() => {
    try { return JSON.parse(localStorage.getItem("spiceRack") || "[]"); } catch { return []; }
  });
  const [showRackOnly, setShowRackOnly] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("spiceRack", JSON.stringify(myRack)); } catch {}
  }, [myRack]);

  const toggleRack = (name) => {
    setMyRack(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const bg = darkMode ? "#1A1008" : "#FAF7F0";
  const cardBg = darkMode ? "#2C1A0E" : "white";
  const text = darkMode ? "#FAF7F0" : "#2C1A0E";
  const subtext = darkMode ? "#C8A87A" : "#8B6340";
  const tagBg = darkMode ? "#3A2010" : "#FAF7F0";
  const tagBorder = darkMode ? "#5A3A1A" : "#E0D0B8";
  const tagText = darkMode ? "#D4A882" : "#5A3A1A";
  const tipBg = darkMode ? "#2A1508" : "#FAF7F0";

  const filtered = allItems.filter((s) => {
    const matchesType = filter === "all" || s.type === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.dishes.some((d) => d.toLowerCase().includes(search.toLowerCase())) ||
      s.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesDish = dishFilter === "All dishes" || (dishKeywords[dishFilter] || []).some(kw =>
      s.dishes.some(d => d.toLowerCase().includes(kw))
    );
    const matchesRack = !showRackOnly || myRack.includes(s.name);
    return matchesType && matchesSearch && matchesDish && matchesRack;
  });

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: bg, color: text, transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .header { background: #2C1A0E; color: #FAF7F0; padding: 40px 32px 32px; text-align: center; position: relative; }
        .header h1 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 700; letter-spacing: 0.02em; margin-bottom: 6px; }
        .header p { font-family: 'Lato', sans-serif; font-weight: 300; font-size: 0.9rem; color: #C8A87A; letter-spacing: 0.12em; text-transform: uppercase; }
        .dark-toggle { position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 30px; padding: 6px 14px; color: #FAF7F0; font-family: 'Lato', sans-serif; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .dark-toggle:hover { background: rgba(255,255,255,0.2); }
        .search-bar { display: flex; justify-content: center; padding: 24px 24px 0; }
        .search-bar input { width: 100%; max-width: 500px; padding: 11px 20px; border: 2px solid #C8A87A; border-radius: 40px; background: transparent; font-family: 'Lato', sans-serif; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
        .search-bar input:focus { border-color: #8B4513; }
        .filter-tabs { display: flex; justify-content: center; gap: 7px; padding: 16px 24px 0; flex-wrap: wrap; }
        .filter-tab { padding: 6px 16px; border-radius: 30px; border: 2px solid #C8A87A; background: transparent; font-family: 'Lato', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8B6340; cursor: pointer; transition: all 0.18s; }
        .filter-tab:hover { background: rgba(200,168,122,0.15); }
        .filter-tab.active { background: #2C1A0E; border-color: #2C1A0E; color: #FAF7F0; }
        .filter-tab.herb-active { background: #2E7D32; border-color: #2E7D32; color: white; }
        .filter-tab.spice-active { background: #8B4513; border-color: #8B4513; color: white; }
        .filter-tab.rack-active { background: #6B3A2A; border-color: #6B3A2A; color: white; }
        .dish-filters { display: flex; justify-content: center; gap: 6px; padding: 12px 24px 0; flex-wrap: wrap; }
        .dish-tab { padding: 5px 13px; border-radius: 20px; border: 1.5px solid #C8A87A; background: transparent; font-family: 'Lato', sans-serif; font-size: 0.72rem; font-weight: 700; color: #8B6340; cursor: pointer; transition: all 0.15s; }
        .dish-tab:hover { background: rgba(200,168,122,0.15); }
        .dish-tab.active { background: #C8A87A; border-color: #C8A87A; color: white; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; padding: 24px 24px 48px; max-width: 1200px; margin: 0 auto; }
        .card { border-radius: 12px; overflow: hidden; border: 2px solid transparent; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; box-shadow: 0 2px 8px rgba(44,26,14,0.1); }
        .card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(44,26,14,0.15); border-color: #C8A87A; }
        .card-header { padding: 16px 18px 12px; display: flex; align-items: flex-start; gap: 12px; }
        .spice-dot { width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .card-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; }
        .card-flavor { font-family: 'Lato', sans-serif; font-size: 0.8rem; font-style: italic; margin-top: 2px; }
        .card-body { padding: 0 18px 16px; }
        .label { font-family: 'Lato', sans-serif; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #A08060; margin-bottom: 5px; margin-top: 11px; }
        .dishes { display: flex; flex-wrap: wrap; gap: 4px; }
        .dish-tag { border-radius: 20px; padding: 3px 9px; font-family: 'Lato', sans-serif; font-size: 0.75rem; border: 1px solid; }
        .cuisine-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .cuisine-tag { border-radius: 4px; padding: 2px 7px; font-family: 'Lato', sans-serif; font-size: 0.7rem; font-weight: 700; color: white; opacity: 0.9; }
        .pairs-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .pair-tag { border-radius: 20px; padding: 2px 9px; font-family: 'Lato', sans-serif; font-size: 0.73rem; border: 1.5px dashed #C8A87A; color: #8B6340; }
        .tip-box { margin-top: 11px; border-left: 3px solid #C8A87A; border-radius: 0 6px 6px 0; padding: 7px 11px; font-family: 'Lato', sans-serif; font-size: 0.8rem; font-style: italic; }
        .tip-box span { font-style: normal; font-weight: 700; color: #8B4513; }
        .type-badge { display: inline-block; font-family: 'Lato', sans-serif; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 7px; border-radius: 20px; margin-left: 6px; vertical-align: middle; }
        .filter-tab.blend-active { background: #D4A017; border-color: #D4A017; color: white; }
        .type-badge.blend { background: #FFF8E1; color: #D4A017; }
        .type-badge.herb { background: #E8F5E9; color: #2E7D32; }
        .type-badge.spice { background: #FBE9E7; color: #8B4513; }
        .rack-btn { display: flex; align-items: center; gap: 5px; margin-top: 10px; padding: 5px 12px; border-radius: 20px; border: 1.5px solid #C8A87A; background: transparent; font-family: 'Lato', sans-serif; font-size: 0.75rem; font-weight: 700; color: #8B6340; cursor: pointer; transition: all 0.15s; width: fit-content; }
        .rack-btn:hover { background: rgba(200,168,122,0.2); }
        .rack-btn.owned { background: #C8A87A; color: white; border-color: #C8A87A; }
        .rack-summary { text-align: center; font-family: 'Lato', sans-serif; font-size: 0.82rem; color: #A08060; padding: 10px 0 0; }
        .no-results { text-align: center; color: #A08060; font-family: 'Lato', sans-serif; padding: 48px; grid-column: 1/-1; font-size: 1rem; }
      `}</style>

      <div className="header">
        <button className="dark-toggle" onClick={() => setDarkMode(d => !d)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <h1>The Spice & Herb Cabinet</h1>
        <p>A reference guide to flavour, purpose & pairing</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, dish, or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: text, borderColor: "#C8A87A" }}
        />
      </div>

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === "all" && !showRackOnly ? "active" : ""}`} onClick={() => { setFilter("all"); setShowRackOnly(false); }}>
          All ({allItems.length})
        </button>
        <button className={`filter-tab ${filter === "spice" && !showRackOnly ? "spice-active" : ""}`} onClick={() => { setFilter("spice"); setShowRackOnly(false); }}>
          Spices ({spices.length})
        </button>
        <button className={`filter-tab ${filter === "herb" && !showRackOnly ? "herb-active" : ""}`} onClick={() => { setFilter("herb"); setShowRackOnly(false); }}>
          Herbs ({herbs.length})
        </button>
        <button className={`filter-tab ${filter === "blend" && !showRackOnly ? "blend-active" : ""}`} onClick={() => { setFilter("blend"); setShowRackOnly(false); }}>
          Blends ({blends.length})
        </button>
        <button className={`filter-tab ${showRackOnly ? "rack-active" : ""}`} onClick={() => setShowRackOnly(r => !r)}>
          🗄️ My Rack ({myRack.length})
        </button>
      </div>

      <div className="dish-filters">
        {dishTypes.map(d => (
          <button key={d} className={`dish-tab ${dishFilter === d ? "active" : ""}`} onClick={() => setDishFilter(d)}>{d}</button>
        ))}
      </div>

      <div className="rack-summary">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {myRack.length > 0 && !showRackOnly && <span style={{ marginLeft: 10, color: "#8B4513" }}>· {myRack.length} in your rack</span>}
      </div>

      <div className="grid">
        {filtered.length === 0 && <div className="no-results">No results found. Try adjusting your filters.</div>}
        {filtered.map((item) => (
          <div className="card" key={item.name} style={{ background: cardBg }}>
            <div className="card-header">
              <div className="spice-dot" style={{ background: item.color + "22", border: `2px solid ${item.color}44` }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div className="card-name" style={{ color: text }}>
                  {item.name}
                  <span className={`type-badge ${item.type}`}>{item.type}</span>
                  {item.type === "herb" && <FreshDriedBadge value={item.freshDried} />}
                </div>
                <div className="card-flavor" style={{ color: subtext }}>{item.flavor}</div>
                {(item.type === "spice" || item.type === "blend") && <HeatIndicator level={item.heat} />}
              </div>
            </div>
            <div className="card-body">
              <div className="label">Use in</div>
              <div className="dishes">
                {item.dishes.map((d) => <span className="dish-tag" key={d} style={{ background: tagBg, borderColor: tagBorder, color: tagText }}>{d}</span>)}
              </div>
              <div className="label">Cuisines</div>
              <div className="cuisine-tags">
                {item.cuisines.map((c) => (
                  <span className="cuisine-tag" key={c} style={{ background: cuisineColors[c] || "#8B4513" }}>{c}</span>
                ))}
              </div>
              {item.pairs && item.pairs.length > 0 && (
                <>
                  <div className="label">Pairs well with</div>
                  <div className="pairs-tags">
                    {item.pairs.map((p) => <span className="pair-tag" key={p}>{p}</span>)}
                  </div>
                </>
              )}
              <div className="tip-box" style={{ background: tipBg, color: tagText }}>
                <span>Tip:</span> {item.tip}
              </div>
              <button
                className={`rack-btn ${myRack.includes(item.name) ? "owned" : ""}`}
                onClick={() => toggleRack(item.name)}
              >
                {myRack.includes(item.name) ? "✓ In my rack" : "+ Add to my rack"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
