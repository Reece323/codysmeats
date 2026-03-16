import { useState, useMemo, useEffect, useRef } from "react";

const RECIPES = [
  // ===== BEEF - CLASSIC =====
  { id: 1, name: "Old School Original", meat: "Beef", style: "Classic", spice: 1, description: "Traditional soy sauce and Worcestershire base with garlic and onion powder. The timeless jerky that started it all.", time: "6-8 hrs", key_ingredients: ["Soy sauce", "Worcestershire", "Garlic powder", "Onion powder", "Black pepper"] },
  { id: 2, name: "Best Ever Classic", meat: "Beef", style: "Classic", spice: 1, description: "Brown sugar meets smoked paprika in a marinade that balances sweet and savory perfectly. A crowd favorite.", time: "5-7 hrs", key_ingredients: ["Brown sugar", "Smoked paprika", "Soy sauce", "Worcestershire", "Meat tenderizer"] },
  { id: 3, name: "Homestyle Comfort", meat: "Beef", style: "Classic", spice: 1, description: "Simple pantry staples come together for a nostalgic jerky that tastes like grandma's kitchen.", time: "6-8 hrs", key_ingredients: ["Soy sauce", "Liquid smoke", "Brown sugar", "Garlic", "Onion powder"] },
  { id: 4, name: "1st Place Competition", meat: "Beef", style: "Classic", spice: 2, description: "Award-winning recipe with a secret blend of spices that keeps judges coming back for more.", time: "7-9 hrs", key_ingredients: ["Soy sauce", "Brown sugar", "Cayenne", "Garlic", "Curing salt"] },
  { id: 5, name: "Garlic Pepper", meat: "Beef", style: "Classic", spice: 2, description: "Heavy on the garlic and freshly cracked black pepper. A bold, savory bite every time.", time: "6-8 hrs", key_ingredients: ["Fresh garlic", "Cracked pepper", "Soy sauce", "Worcestershire", "Olive oil"] },
  { id: 6, name: "Cowboy Style", meat: "Beef", style: "Classic", spice: 2, description: "Rugged, smoky, and salt-forward. The kind of jerky you'd find on a cattle drive.", time: "8-10 hrs", key_ingredients: ["Liquid smoke", "Sea salt", "Black pepper", "Garlic", "Onion"] },
  { id: 7, name: "Simple Salt & Pepper", meat: "Beef", style: "Classic", spice: 1, description: "Just two seasonings done right. Lets the beef flavor truly shine through.", time: "5-7 hrs", key_ingredients: ["Coarse salt", "Cracked pepper", "Eye of round"] },
  { id: 8, name: "Organic Pure Beef", meat: "Beef", style: "Classic", spice: 1, description: "Grass-fed beef with minimal organic seasonings for the health-conscious jerky lover.", time: "6-8 hrs", key_ingredients: ["Organic soy sauce", "Organic garlic", "Sea salt", "Pepper", "Organic onion"] },
  { id: 9, name: "Smoky Mountain", meat: "Beef", style: "Classic", spice: 1, description: "Double-smoked flavor from liquid smoke and smoked salt. A campfire in every bite.", time: "7-9 hrs", key_ingredients: ["Hickory liquid smoke", "Smoked salt", "Brown sugar", "Pepper", "Paprika"] },
  { id: 10, name: "Garlic Mustard", meat: "Beef", style: "Classic", spice: 2, description: "Tangy whole grain mustard meets roasted garlic for a surprisingly addictive flavor combo.", time: "6-8 hrs", key_ingredients: ["Whole grain mustard", "Roasted garlic", "Soy sauce", "Honey", "Black pepper"] },

  // ===== BEEF - SWEET =====
  { id: 11, name: "Brown Sugar Bourbon", meat: "Beef", style: "Sweet", spice: 1, description: "Rich bourbon flavor with deep caramelized brown sugar. Smooth, sweet, irresistible.", time: "7-9 hrs", key_ingredients: ["Bourbon", "Brown sugar", "Soy sauce", "Vanilla extract", "Black pepper"] },
  { id: 12, name: "Pure Maple Syrup", meat: "Beef", style: "Sweet", spice: 1, description: "Real maple syrup and molasses create a caramelly, smoky sweetness that melts in your mouth.", time: "6-8 hrs", key_ingredients: ["Maple syrup", "Molasses", "Liquid smoke", "Soy sauce", "Black pepper"] },
  { id: 13, name: "Honey Glazed", meat: "Beef", style: "Sweet", spice: 1, description: "Golden wildflower honey creates a beautiful glaze and tender chew.", time: "6-8 hrs", key_ingredients: ["Wildflower honey", "Soy sauce", "Garlic powder", "Ginger", "Sesame oil"] },
  { id: 14, name: "Teriyaki Classic", meat: "Beef", style: "Sweet", spice: 1, description: "Sweet and tangy homemade teriyaki with ginger and sesame. The most popular jerky flavor worldwide.", time: "6-8 hrs", key_ingredients: ["Soy sauce", "Brown sugar", "Rice vinegar", "Ginger", "Sesame oil"] },
  { id: 15, name: "Kikkoman Teriyaki", meat: "Beef", style: "Sweet", spice: 1, description: "Using the iconic Kikkoman teriyaki sauce as the base for quick and consistently delicious jerky.", time: "5-7 hrs", key_ingredients: ["Kikkoman teriyaki", "Honey", "Garlic powder", "Onion powder", "Pepper"] },
  { id: 16, name: "Pineapple Teriyaki", meat: "Beef", style: "Sweet", spice: 1, description: "Tropical pineapple juice adds natural sweetness and tenderizes the meat beautifully.", time: "6-8 hrs", key_ingredients: ["Pineapple juice", "Teriyaki sauce", "Brown sugar", "Ginger", "Garlic"] },
  { id: 17, name: "Jack & Coke", meat: "Beef", style: "Sweet", spice: 1, description: "The classic cocktail combo turned into jerky. Whiskey and cola create a uniquely addictive glaze.", time: "7-9 hrs", key_ingredients: ["Jack Daniels", "Coca-Cola", "Brown sugar", "Soy sauce", "Garlic"] },
  { id: 18, name: "Root Beer Float", meat: "Beef", style: "Sweet", spice: 1, description: "Root beer reduction creates a nostalgic, creamy-sweet flavor you won't believe works this well.", time: "7-9 hrs", key_ingredients: ["Root beer", "Vanilla extract", "Brown sugar", "Soy sauce", "Liquid smoke"] },
  { id: 19, name: "Coca-Cola Glaze", meat: "Beef", style: "Sweet", spice: 1, description: "Reduced Coca-Cola creates an incredible sticky-sweet marinade with depth.", time: "6-8 hrs", key_ingredients: ["Coca-Cola", "Brown sugar", "Soy sauce", "Garlic", "Worcestershire"] },
  { id: 20, name: "Candied Bacon Beef", meat: "Beef", style: "Sweet", spice: 1, description: "Brown sugar and maple syrup create meat candy. Dangerously addictive.", time: "7-9 hrs", key_ingredients: ["Brown sugar", "Maple syrup", "Soy sauce", "Black pepper", "Smoked paprika"] },

  // ===== BEEF - SPICY =====
  { id: 21, name: "Carolina Reaper Inferno", meat: "Beef", style: "Spicy", spice: 5, description: "The world's former hottest pepper brings face-melting heat. Only for the truly brave.", time: "6-8 hrs", key_ingredients: ["Carolina Reaper peppers", "Soy sauce", "Garlic", "Vinegar", "Salt"] },
  { id: 22, name: "Ghost Pepper Extreme", meat: "Beef", style: "Spicy", spice: 5, description: "Bhut Jolokia brings a slow-building, relentless heat that lingers for minutes.", time: "6-8 hrs", key_ingredients: ["Ghost peppers", "Soy sauce", "Worcestershire", "Garlic", "Brown sugar"] },
  { id: 23, name: "Habanero Tabasco", meat: "Beef", style: "Spicy", spice: 4, description: "Habanero Tabasco sauce delivers bright, fruity heat with a vinegar tang.", time: "6-8 hrs", key_ingredients: ["Habanero Tabasco", "Worcestershire", "Smoked paprika", "Garlic powder", "Black pepper"] },
  { id: 24, name: "Dr. Pepper Jalapeño", meat: "Beef", style: "Spicy", spice: 3, description: "Sweet Dr. Pepper meets fresh jalapeño heat. An adventure in every bite.", time: "7-9 hrs", key_ingredients: ["Dr. Pepper", "Fresh jalapeños", "Worcestershire", "Garlic", "Brown sugar"] },
  { id: 25, name: "Sriracha Fire", meat: "Beef", style: "Spicy", spice: 3, description: "Thai Sriracha brings garlic-forward heat with sesame oil richness.", time: "6-8 hrs", key_ingredients: ["Sriracha", "Soy sauce", "Sesame oil", "Garlic", "Cilantro"] },
  { id: 26, name: "Cholula Chipotle", meat: "Beef", style: "Spicy", spice: 3, description: "Smoky chipotle meets the tangy complexity of Cholula hot sauce.", time: "6-8 hrs", key_ingredients: ["Cholula hot sauce", "Chipotle powder", "Soy sauce", "Brown sugar", "Garlic"] },
  { id: 27, name: "Cayenne Hellfire", meat: "Beef", style: "Spicy", spice: 4, description: "Pure cayenne heat, unapologetic and intense. For heat seekers only.", time: "6-8 hrs", key_ingredients: ["Cayenne pepper", "Red pepper flakes", "Soy sauce", "Garlic", "Vinegar"] },
  { id: 28, name: "Pineapple Jalapeño", meat: "Beef", style: "Spicy", spice: 3, description: "Tropical sweetness from fresh pineapple balances the jalapeño kick perfectly.", time: "6-8 hrs", key_ingredients: ["Fresh pineapple", "Jalapeños", "Soy sauce", "Brown sugar", "Ginger"] },
  { id: 29, name: "Frank's RedHot Buffalo", meat: "Beef", style: "Spicy", spice: 3, description: "Classic buffalo wing flavor on beef jerky. Perfect game day snack.", time: "6-8 hrs", key_ingredients: ["Frank's RedHot", "Butter powder", "Garlic", "Vinegar", "Celery salt"] },
  { id: 30, name: "Nashville Hot", meat: "Beef", style: "Spicy", spice: 4, description: "Inspired by Nashville hot chicken. Cayenne, paprika, and brown sugar create sweet heat.", time: "6-8 hrs", key_ingredients: ["Cayenne", "Paprika", "Brown sugar", "Garlic powder", "Black pepper"] },

  // ===== BEEF - SWEET & SPICY =====
  { id: 31, name: "Sweet & Spicy Habanero", meat: "Beef", style: "Sweet & Spicy", spice: 4, description: "Brown sugar and habanero peppers create an addictive sweet-heat combo that's hard to stop eating.", time: "7-9 hrs", key_ingredients: ["Habanero peppers", "Brown sugar", "Soy sauce", "Crushed red pepper", "Garlic"] },
  { id: 32, name: "Honey Peppered", meat: "Beef", style: "Sweet & Spicy", spice: 2, description: "Honey sweetness with cayenne and lemon juice for a tangy, mildly spicy bite.", time: "6-8 hrs", key_ingredients: ["Honey", "Cayenne pepper", "Lemon juice", "Soy sauce", "Garlic"] },
  { id: 33, name: "Teriyaki Sweet Hot", meat: "Beef", style: "Sweet & Spicy", spice: 3, description: "Bold teriyaki sweetness meets Cholula heat in the background. Perfectly balanced.", time: "6-8 hrs", key_ingredients: ["Teriyaki sauce", "Cholula hot sauce", "Liquid smoke", "Garlic powder", "Red pepper flakes"] },
  { id: 34, name: "Mango Habanero", meat: "Beef", style: "Sweet & Spicy", spice: 4, description: "Tropical mango puree tames the habanero's fury just enough to keep you reaching for more.", time: "7-9 hrs", key_ingredients: ["Mango puree", "Habanero peppers", "Lime juice", "Cilantro", "Soy sauce"] },
  { id: 35, name: "Spicy Maple", meat: "Beef", style: "Sweet & Spicy", spice: 3, description: "Pure maple sweetness with a red pepper flake kick. New England meets the Southwest.", time: "6-8 hrs", key_ingredients: ["Maple syrup", "Red pepper flakes", "Soy sauce", "Garlic", "Black pepper"] },
  { id: 36, name: "Hot Honey", meat: "Beef", style: "Sweet & Spicy", spice: 3, description: "The trending hot honey flavor profile on beef jerky. Sweet, sticky, and spicy.", time: "6-8 hrs", key_ingredients: ["Honey", "Cayenne", "Red pepper flakes", "Apple cider vinegar", "Garlic"] },
  { id: 37, name: "Peanut Butter Sriracha", meat: "Beef", style: "Sweet & Spicy", spice: 3, description: "Creamy peanut butter meets Sriracha heat for an unexpected Asian-fusion masterpiece.", time: "7-9 hrs", key_ingredients: ["Peanut butter", "Sriracha", "Soy sauce", "Honey", "Lime juice"] },
  { id: 38, name: "Smokey Sweet Mustard", meat: "Beef", style: "Sweet & Spicy", spice: 2, description: "Maple syrup and mustard create tangy-sweet magic with gentle heat.", time: "6-8 hrs", key_ingredients: ["Whole grain mustard", "Maple syrup", "Liquid smoke", "Cayenne", "Garlic"] },
  { id: 39, name: "Cherry Chipotle", meat: "Beef", style: "Sweet & Spicy", spice: 3, description: "Tart cherry preserves meet smoky chipotle for a deeply complex, fruity heat.", time: "7-9 hrs", key_ingredients: ["Cherry preserves", "Chipotle in adobo", "Soy sauce", "Garlic", "Lime"] },
  { id: 40, name: "Peach Habanero", meat: "Beef", style: "Sweet & Spicy", spice: 4, description: "Georgia peach sweetness clashes beautifully with Caribbean habanero fire.", time: "7-9 hrs", key_ingredients: ["Peach preserves", "Habanero", "Apple cider vinegar", "Soy sauce", "Ginger"] },

  // ===== BEEF - BBQ =====
  { id: 41, name: "Classic BBQ", meat: "Beef", style: "BBQ", spice: 2, description: "Kansas City-style BBQ sauce creates a tangy, smoky, slightly sweet jerky.", time: "6-8 hrs", key_ingredients: ["BBQ sauce", "Brown sugar", "Smoked paprika", "Garlic", "Onion powder"] },
  { id: 42, name: "Texas Mesquite", meat: "Beef", style: "BBQ", spice: 2, description: "Bold mesquite smoke flavor with Texas-style dry rub seasoning.", time: "8-10 hrs", key_ingredients: ["Mesquite liquid smoke", "Chili powder", "Cumin", "Black pepper", "Garlic"] },
  { id: 43, name: "Memphis Dry Rub", meat: "Beef", style: "BBQ", spice: 2, description: "No sauce needed. Memphis-style spice blend creates incredible depth.", time: "7-9 hrs", key_ingredients: ["Paprika", "Garlic powder", "Onion powder", "Cumin", "Brown sugar"] },
  { id: 44, name: "Carolina Vinegar", meat: "Beef", style: "BBQ", spice: 2, description: "Tangy apple cider vinegar base with red pepper flakes. East Carolina meets jerky.", time: "6-8 hrs", key_ingredients: ["Apple cider vinegar", "Red pepper flakes", "Brown sugar", "Salt", "Black pepper"] },
  { id: 45, name: "Hickory Smoked", meat: "Beef", style: "BBQ", spice: 1, description: "Double hickory smoke from liquid smoke and smoked salt. Pure smokehouse flavor.", time: "7-9 hrs", key_ingredients: ["Hickory liquid smoke", "Smoked salt", "Brown sugar", "Garlic", "Black pepper"] },
  { id: 46, name: "Mississippi Pot Roast", meat: "Beef", style: "BBQ", spice: 2, description: "Inspired by the viral Mississippi pot roast. Ranch, pepperoncini, and butter flavor.", time: "7-9 hrs", key_ingredients: ["Ranch seasoning", "Pepperoncini juice", "Butter powder", "Au jus mix", "Black pepper"] },
  { id: 47, name: "Applewood Bacon BBQ", meat: "Beef", style: "BBQ", spice: 2, description: "Applewood smoke and bacon seasoning create a breakfast-meets-BBQ experience.", time: "7-9 hrs", key_ingredients: ["Applewood liquid smoke", "Bacon seasoning", "BBQ sauce", "Brown sugar", "Garlic"] },

  // ===== BEEF - INTERNATIONAL =====
  { id: 48, name: "Korean BBQ Gochujang", meat: "Beef", style: "International", spice: 3, description: "Fermented gochujang paste brings deep, savory Korean heat with soy and brown sugar.", time: "7-9 hrs", key_ingredients: ["Gochujang paste", "Soy sauce", "Brown sugar", "Fish sauce", "Ginger"] },
  { id: 49, name: "Thai Basil Chili", meat: "Beef", style: "International", spice: 4, description: "Fresh Thai basil and bird's eye chili create an aromatic, fiery Southeast Asian jerky.", time: "6-8 hrs", key_ingredients: ["Thai basil", "Bird's eye chili", "Fish sauce", "Lime juice", "Palm sugar"] },
  { id: 50, name: "Japanese Bachan's", meat: "Beef", style: "International", spice: 1, description: "Bachan's Japanese BBQ sauce makes the easiest, most umami-rich jerky you'll ever taste.", time: "5-7 hrs", key_ingredients: ["Bachan's BBQ sauce", "Ginger", "Garlic", "Sesame seeds", "Mirin"] },
  { id: 51, name: "Birria Style", meat: "Beef", style: "International", spice: 3, description: "Mexican birria spices including guajillo and ancho chiles create rich, complex heat.", time: "8-10 hrs", key_ingredients: ["Guajillo chiles", "Ancho chiles", "Cumin", "Oregano", "Cinnamon"] },
  { id: 52, name: "Red Wine & Fish Sauce", meat: "Beef", style: "International", spice: 1, description: "Cabernet and fish sauce create an umami bomb that dyes jerky a beautiful deep red.", time: "7-9 hrs", key_ingredients: ["Red wine", "Fish sauce", "Garlic", "Brown sugar", "Black pepper"] },
  { id: 53, name: "Silk Road", meat: "Beef", style: "International", spice: 2, description: "Middle Eastern sumac and cinnamon with tomato powder for a tangy, exotic bite.", time: "6-8 hrs", key_ingredients: ["Sumac", "Tomato powder", "Cinnamon", "Cumin", "Garlic"] },
  { id: 54, name: "Citrus Basil", meat: "Beef", style: "International", spice: 1, description: "Fresh citrus oils and basil create a bright, herby Mediterranean-inspired jerky.", time: "6-8 hrs", key_ingredients: ["Orange zest", "Lemon zest", "Fresh basil", "Soy sauce", "Garlic"] },
  { id: 55, name: "South African Biltong", meat: "Beef", style: "International", spice: 2, description: "Coriander, vinegar, and thick-cut beef. Traditional biltong-style curing method.", time: "48-72 hrs", key_ingredients: ["Coriander", "Vinegar", "Coarse salt", "Black pepper", "Brown sugar"] },
  { id: 56, name: "Jamaican Jerk", meat: "Beef", style: "International", spice: 4, description: "Scotch bonnet peppers, allspice, and thyme bring Caribbean island heat.", time: "7-9 hrs", key_ingredients: ["Scotch bonnet", "Allspice", "Thyme", "Soy sauce", "Brown sugar"] },
  { id: 57, name: "Indian Tandoori", meat: "Beef", style: "International", spice: 3, description: "Yogurt-marinated with garam masala, turmeric, and cumin. Tandoori flavor in jerky form.", time: "7-9 hrs", key_ingredients: ["Yogurt", "Garam masala", "Turmeric", "Cumin", "Cayenne"] },
  { id: 58, name: "Vietnamese Lemongrass", meat: "Beef", style: "International", spice: 2, description: "Fresh lemongrass and fish sauce create a bright, aromatic Asian-style jerky.", time: "6-8 hrs", key_ingredients: ["Lemongrass", "Fish sauce", "Garlic", "Brown sugar", "Chili flakes"] },
  { id: 59, name: "Hawaiian Pineapple", meat: "Beef", style: "International", spice: 1, description: "Island-style with pineapple juice tenderizer and a touch of coconut aminos.", time: "6-8 hrs", key_ingredients: ["Pineapple juice", "Coconut aminos", "Ginger", "Garlic", "Brown sugar"] },

  // ===== BEEF - SAVORY =====
  { id: 60, name: "V8 Vegetable", meat: "Beef", style: "Savory", spice: 1, description: "V8 juice adds a unique vegetable-forward depth. A surprisingly delicious combo.", time: "6-8 hrs", key_ingredients: ["V8 juice", "Worcestershire", "Garlic powder", "Onion powder", "Black pepper"] },
  { id: 61, name: "Bloody Mary", meat: "Beef", style: "Savory", spice: 2, description: "Tomato, celery salt, horseradish, and a touch of vodka. Brunch in jerky form.", time: "7-9 hrs", key_ingredients: ["Tomato juice", "Celery salt", "Horseradish", "Vodka", "Worcestershire"] },
  { id: 62, name: "Bread & Butter Pickle", meat: "Beef", style: "Savory", spice: 1, description: "Tangy pickle brine creates an unexpectedly addictive sweet-sour jerky.", time: "6-8 hrs", key_ingredients: ["Pickle brine", "Dill", "Mustard seed", "Turmeric", "Garlic"] },
  { id: 63, name: "Horseradish & Herb", meat: "Beef", style: "Savory", spice: 2, description: "Bold horseradish with rosemary and thyme. A refined, herbaceous bite.", time: "6-8 hrs", key_ingredients: ["Horseradish", "Rosemary", "Thyme", "Garlic", "Dijon mustard"] },
  { id: 64, name: "Coffee Crusted", meat: "Beef", style: "Savory", spice: 2, description: "Coarsely ground coffee amplifies beef's bold flavor with earthy, bitter depth.", time: "6-8 hrs", key_ingredients: ["Coarse ground coffee", "Brown sugar", "Smoked paprika", "Garlic", "Salt"] },
  { id: 65, name: "Everything Bagel", meat: "Beef", style: "Savory", spice: 1, description: "Sesame, poppy, garlic, onion, and salt. Your favorite breakfast seasoning on jerky.", time: "6-8 hrs", key_ingredients: ["Everything bagel seasoning", "Soy sauce", "Cream cheese powder", "Garlic", "Onion"] },
  { id: 66, name: "A-1 Steakhouse", meat: "Beef", style: "Savory", spice: 1, description: "A-1 steak sauce base for a tangy, rich jerky that tastes like a steakhouse.", time: "6-8 hrs", key_ingredients: ["A-1 sauce", "Worcestershire", "Garlic", "Onion powder", "Black pepper"] },
  { id: 67, name: "Garlic Parmesan", meat: "Beef", style: "Savory", spice: 1, description: "Roasted garlic and parmesan create an Italian-inspired savory jerky.", time: "6-8 hrs", key_ingredients: ["Parmesan cheese", "Roasted garlic", "Italian herbs", "Olive oil", "Black pepper"] },
  { id: 68, name: "Ranch Seasoned", meat: "Beef", style: "Savory", spice: 1, description: "Cool, herbaceous ranch flavor on savory beef. A snack lover's dream.", time: "6-8 hrs", key_ingredients: ["Ranch seasoning", "Buttermilk powder", "Dill", "Garlic", "Onion"] },
  { id: 69, name: "Burger Style", meat: "Beef", style: "Savory", spice: 1, description: "All the flavors of a backyard burger: ketchup, mustard, pickles, and onion.", time: "6-8 hrs", key_ingredients: ["Ketchup", "Yellow mustard", "Pickle relish", "Onion powder", "Salt"] },
  { id: 70, name: "Nutella Bacon", meat: "Beef", style: "Savory", spice: 1, description: "Chocolate hazelnut spread on beef jerky. Sounds crazy, tastes incredible.", time: "7-9 hrs", key_ingredients: ["Nutella", "Bacon bits", "Soy sauce", "Brown sugar", "Vanilla"] },

  // ===== BEEF - SMOKED =====
  { id: 71, name: "Applewood Smoked", meat: "Beef", style: "Smoked", spice: 1, description: "Light, fruity applewood smoke gives a delicate sweetness to the beef.", time: "8-10 hrs", key_ingredients: ["Applewood chips", "Sea salt", "Brown sugar", "Garlic", "Black pepper"] },
  { id: 72, name: "Mesquite Smoked", meat: "Beef", style: "Smoked", spice: 2, description: "Bold, intense mesquite smoke for a deep Texas-style flavor profile.", time: "8-10 hrs", key_ingredients: ["Mesquite chips", "Chili powder", "Garlic", "Black pepper", "Salt"] },
  { id: 73, name: "Cherry Wood Smoked", meat: "Beef", style: "Smoked", spice: 1, description: "Sweet, mild cherry wood smoke imparts a subtle fruity undertone.", time: "8-10 hrs", key_ingredients: ["Cherry wood chips", "Brown sugar", "Soy sauce", "Garlic", "Onion"] },
  { id: 74, name: "Pecan Smoked Sweet Java", meat: "Beef", style: "Smoked", spice: 3, description: "Pecan wood smoke meets coffee and brown sugar. Complex and deeply satisfying.", time: "8-10 hrs", key_ingredients: ["Pecan chips", "Espresso powder", "Brown sugar", "Cayenne", "Garlic"] },

  // ===== VENISON / DEER =====
  { id: 75, name: "Classic Venison", meat: "Venison", style: "Classic", spice: 2, description: "Traditional deer jerky with soy, Worcestershire, and coriander. A hunter's staple.", time: "6-8 hrs", key_ingredients: ["Soy sauce", "Worcestershire", "Black pepper", "Coriander", "Garlic powder"] },
  { id: 76, name: "Spicy Ghost Pepper Deer", meat: "Venison", style: "Spicy", spice: 5, description: "Ghost peppers blended into a venison marinade. Extreme heat for the fearless hunter.", time: "6-8 hrs", key_ingredients: ["Ghost pepper", "Soy sauce", "Worcestershire", "Garlic", "Onion powder"] },
  { id: 77, name: "Sweet & Smoky Venison", meat: "Venison", style: "Sweet", spice: 2, description: "Brown sugar and smoked paprika bring out venison's wild, gamey richness.", time: "7-9 hrs", key_ingredients: ["Brown sugar", "Smoked paprika", "Soy sauce", "Worcestershire", "Red pepper flakes"] },
  { id: 78, name: "Teriyaki Deer", meat: "Venison", style: "Sweet", spice: 1, description: "Sweet teriyaki tames venison's wild flavor. A family-friendly game meat jerky.", time: "6-8 hrs", key_ingredients: ["Teriyaki sauce", "Brown sugar", "Ginger", "Garlic", "Sesame seeds"] },
  { id: 79, name: "Peppered Venison", meat: "Venison", style: "Classic", spice: 2, description: "Heavy cracked pepper crust on tender venison strips. Simple and bold.", time: "6-8 hrs", key_ingredients: ["Cracked black pepper", "Soy sauce", "Worcestershire", "Garlic", "Onion powder"] },
  { id: 80, name: "BBQ Venison", meat: "Venison", style: "BBQ", spice: 2, description: "Smoky BBQ sauce marinade pairs perfectly with venison's lean, rich flavor.", time: "7-9 hrs", key_ingredients: ["BBQ sauce", "Brown sugar", "Smoked salt", "Garlic", "Onion"] },
  { id: 81, name: "Chipotle Venison", meat: "Venison", style: "Spicy", spice: 3, description: "Smoky chipotle peppers in adobo sauce create a rich, spicy deer jerky.", time: "7-9 hrs", key_ingredients: ["Chipotle in adobo", "Soy sauce", "Brown sugar", "Cumin", "Garlic"] },
  { id: 82, name: "Cranberry Pemmican Venison", meat: "Venison", style: "Sweet", spice: 1, description: "Ground venison with dried cranberries and bacon. Inspired by traditional Native American pemmican.", time: "8-10 hrs", key_ingredients: ["Ground venison", "Dried cranberries", "Bacon", "Salt", "Black pepper"] },
  { id: 83, name: "Spicy Venison Traeger", meat: "Venison", style: "Spicy", spice: 4, description: "Smoked on a Traeger with cayenne, habanero, and red pepper flakes for triple heat.", time: "8-10 hrs", key_ingredients: ["Cayenne", "Red pepper flakes", "Habanero", "Apple cider vinegar", "Brown sugar"] },
  { id: 84, name: "White-tail Original", meat: "Venison", style: "Classic", spice: 1, description: "Clean, simple seasonings let the natural white-tail deer flavor come through.", time: "6-8 hrs", key_ingredients: ["Soy sauce", "Liquid smoke", "Garlic powder", "Salt", "Black pepper"] },
  { id: 85, name: "Canadian Whiskey Venison", meat: "Venison", style: "Sweet", spice: 1, description: "Smooth Canadian whiskey adds warmth and complexity to lean venison.", time: "7-9 hrs", key_ingredients: ["Canadian whiskey", "Brown sugar", "Soy sauce", "Garlic", "Maple syrup"] },

  // ===== TURKEY =====
  { id: 86, name: "Original Turkey", meat: "Turkey", style: "Classic", spice: 1, description: "Light, lean turkey jerky with classic seasonings. A healthier jerky option.", time: "5-7 hrs", key_ingredients: ["Soy sauce", "Worcestershire", "Garlic powder", "Onion powder", "Black pepper"] },
  { id: 87, name: "Texas Turkey", meat: "Turkey", style: "BBQ", spice: 2, description: "Lone Star BBQ spices on lean turkey breast. Bold flavor, lean protein.", time: "6-8 hrs", key_ingredients: ["Chili powder", "Cumin", "Paprika", "Garlic powder", "Brown sugar"] },
  { id: 88, name: "Cajun Turkey", meat: "Turkey", style: "Spicy", spice: 3, description: "Louisiana Cajun seasoning brings bayou heat to turkey breast jerky.", time: "6-8 hrs", key_ingredients: ["Cajun seasoning", "Cayenne", "Garlic", "Onion powder", "Paprika"] },
  { id: 89, name: "Cranberry Turkey", meat: "Turkey", style: "Sweet", spice: 1, description: "Thanksgiving in jerky form. Cranberry sauce and sage create holiday nostalgia.", time: "6-8 hrs", key_ingredients: ["Cranberry sauce", "Sage", "Thyme", "Soy sauce", "Brown sugar"] },
  { id: 90, name: "Lemon Pepper Turkey", meat: "Turkey", style: "Classic", spice: 1, description: "Bright lemon zest and cracked pepper on lean turkey. Light and refreshing.", time: "5-7 hrs", key_ingredients: ["Lemon zest", "Cracked pepper", "Garlic", "Olive oil", "Salt"] },
  { id: 91, name: "Ground Turkey Combo", meat: "Turkey", style: "Classic", spice: 2, description: "Ground turkey jerky made with a jerky gun. Easy, chewy, and flavorful.", time: "5-7 hrs", key_ingredients: ["Ground turkey", "Celery salt", "Garlic powder", "Pepper seasoning", "Curing salt"] },
  { id: 92, name: "Sweet Chili Turkey", meat: "Turkey", style: "Sweet & Spicy", spice: 3, description: "Thai sweet chili sauce glazed turkey jerky. Sticky, sweet, and spicy.", time: "6-8 hrs", key_ingredients: ["Sweet chili sauce", "Soy sauce", "Ginger", "Garlic", "Rice vinegar"] },
  { id: 93, name: "Maple Glazed Turkey", meat: "Turkey", style: "Sweet", spice: 1, description: "Pure maple syrup creates a candied coating on lean turkey breast.", time: "6-8 hrs", key_ingredients: ["Maple syrup", "Soy sauce", "Cinnamon", "Nutmeg", "Black pepper"] },

  // ===== PORK / BACON =====
  { id: 94, name: "Maple Pork Jerky", meat: "Pork", style: "Sweet", spice: 1, description: "Maple syrup and pork loin make for sweet, tender, melt-in-your-mouth jerky.", time: "6-8 hrs", key_ingredients: ["Maple syrup", "Soy sauce", "Brown sugar", "Garlic", "Black pepper"] },
  { id: 95, name: "Chinese Five Spice Pork", meat: "Pork", style: "International", spice: 2, description: "Traditional Chinese five spice blend on pork creates an aromatic, complex jerky.", time: "6-8 hrs", key_ingredients: ["Five spice powder", "Soy sauce", "Hoisin", "Rice wine", "Garlic"] },
  { id: 96, name: "Bacon Jerky Original", meat: "Pork", style: "Classic", spice: 1, description: "Thick-cut bacon dehydrated into chewy, smoky jerky. Pure bacon bliss.", time: "4-6 hrs", key_ingredients: ["Thick-cut bacon", "Brown sugar", "Black pepper", "Garlic powder", "Smoked paprika"] },
  { id: 97, name: "Sriracha Bacon", meat: "Pork", style: "Spicy", spice: 3, description: "Spicy Sriracha glaze on thick bacon strips. Sweet, salty, spicy perfection.", time: "4-6 hrs", key_ingredients: ["Bacon", "Sriracha", "Brown sugar", "Soy sauce", "Garlic"] },
  { id: 98, name: "Candied Bacon", meat: "Pork", style: "Sweet", spice: 1, description: "Brown sugar and maple create the ultimate meat candy from thick-cut bacon.", time: "4-6 hrs", key_ingredients: ["Thick bacon", "Brown sugar", "Maple syrup", "Black pepper", "Cayenne"] },
  { id: 99, name: "PB Sriracha Bacon", meat: "Pork", style: "Sweet & Spicy", spice: 3, description: "Peanut butter and Sriracha glazed bacon. Sounds wild, tastes amazing.", time: "5-7 hrs", key_ingredients: ["Bacon", "Peanut butter", "Sriracha", "Honey", "Soy sauce"] },
  { id: 100, name: "BBQ Pork Jerky", meat: "Pork", style: "BBQ", spice: 2, description: "Southern BBQ sauce on lean pork loin. Tangy, sweet, and impossibly tender.", time: "6-8 hrs", key_ingredients: ["Pork loin", "BBQ sauce", "Brown sugar", "Liquid smoke", "Garlic"] },
  { id: 101, name: "Teriyaki Pork", meat: "Pork", style: "Sweet", spice: 1, description: "Teriyaki-glazed pork jerky with sesame and ginger. An Asian-inspired favorite.", time: "6-8 hrs", key_ingredients: ["Pork loin", "Teriyaki sauce", "Ginger", "Sesame seeds", "Garlic"] },

  // ===== FISH =====
  { id: 102, name: "Classic Salmon Jerky", meat: "Fish", style: "Classic", spice: 1, description: "Wild-caught salmon with soy, lemon, and liquid smoke. Light and smoky.", time: "8-10 hrs", key_ingredients: ["Wild salmon", "Soy sauce", "Lemon juice", "Liquid smoke", "Black pepper"] },
  { id: 103, name: "Honey Miso Salmon", meat: "Fish", style: "Sweet", spice: 1, description: "Japanese-inspired miso and honey glaze on salmon. Umami-rich and sweet.", time: "8-10 hrs", key_ingredients: ["Salmon", "White miso", "Honey", "Rice vinegar", "Sesame oil"] },
  { id: 104, name: "Maple Smoked Salmon", meat: "Fish", style: "Smoked", spice: 1, description: "Real maple syrup basted salmon smoked low and slow. A Pacific Northwest classic.", time: "5-6 hrs", key_ingredients: ["Salmon", "Maple syrup", "Salt", "Brown sugar", "Wood chips"] },
  { id: 105, name: "Sriracha Salmon Jerky", meat: "Fish", style: "Spicy", spice: 3, description: "Sweet and spicy Sriracha on wild salmon. The perfect spicy fish jerky.", time: "8-10 hrs", key_ingredients: ["Salmon", "Sriracha", "Brown sugar", "Soy sauce", "Sesame oil"] },
  { id: 106, name: "Lemon Dill Salmon", meat: "Fish", style: "Savory", spice: 1, description: "Fresh dill and bright lemon on salmon. Light, herby, and elegant.", time: "8-10 hrs", key_ingredients: ["Salmon", "Fresh dill", "Lemon juice", "Garlic", "Sea salt"] },
  { id: 107, name: "Smoked Trout Jerky", meat: "Fish", style: "Smoked", spice: 1, description: "Delicate rainbow trout smoked to perfection. A fisherman's reward.", time: "6-8 hrs", key_ingredients: ["Rainbow trout", "Salt", "Brown sugar", "Liquid smoke", "Black pepper"] },
  { id: 108, name: "Cajun Catfish Jerky", meat: "Fish", style: "Spicy", spice: 3, description: "Southern catfish with bold Cajun seasoning. Bayou flavors in every strip.", time: "8-10 hrs", key_ingredients: ["Catfish", "Cajun seasoning", "Cayenne", "Garlic", "Lemon"] },

  // ===== BUFFALO / BISON =====
  { id: 109, name: "5 Gold Star Buffalo", meat: "Buffalo", style: "Classic", spice: 2, description: "Award-worthy buffalo jerky with a perfectly balanced spice blend.", time: "6-8 hrs", key_ingredients: ["Buffalo", "Soy sauce", "Worcestershire", "Garlic", "Onion powder"] },
  { id: 110, name: "Low Sodium Buffalo", meat: "Buffalo", style: "Classic", spice: 1, description: "Heart-healthy, low-sodium buffalo jerky for the health-conscious snacker.", time: "6-8 hrs", key_ingredients: ["Buffalo", "Coconut aminos", "Garlic", "Onion", "Black pepper"] },
  { id: 111, name: "Kid's Favorite Buffalo", meat: "Buffalo", style: "Sweet", spice: 1, description: "Mild and slightly sweet buffalo jerky that even picky eaters love.", time: "6-8 hrs", key_ingredients: ["Buffalo", "Brown sugar", "Soy sauce", "Garlic", "Maple syrup"] },
  { id: 112, name: "Southern BBQ Buffalo", meat: "Buffalo", style: "BBQ", spice: 2, description: "Southern-style BBQ sauce on lean, rich bison. A healthier BBQ jerky.", time: "7-9 hrs", key_ingredients: ["Buffalo", "BBQ sauce", "Brown sugar", "Liquid smoke", "Garlic"] },
  { id: 113, name: "Jalapeño Buffalo", meat: "Buffalo", style: "Spicy", spice: 3, description: "Fresh jalapeños meet lean bison for a spicy, protein-packed snack.", time: "6-8 hrs", key_ingredients: ["Buffalo", "Fresh jalapeños", "Soy sauce", "Garlic", "Cumin"] },

  // ===== EXOTIC / OTHER =====
  { id: 114, name: "Goose Breast Curry", meat: "Game", style: "Spicy", spice: 3, description: "Wild goose breast with fresh jalapeño and curry powder. Bold game jerky.", time: "7-9 hrs", key_ingredients: ["Goose breast", "Curry powder", "Jalapeño", "Soy sauce", "Garlic"] },
  { id: 115, name: "Maple Goose Jerky", meat: "Game", style: "Sweet", spice: 1, description: "Pure maple sweetness on wild goose breast. Sweet and spicy at once.", time: "7-9 hrs", key_ingredients: ["Goose breast", "Maple syrup", "Soy sauce", "Ginger", "Black pepper"] },
  { id: 116, name: "Wild Boar Jerky", meat: "Game", style: "Classic", spice: 2, description: "Rich, gamey wild boar with simple seasonings. For the adventurous palate.", time: "7-9 hrs", key_ingredients: ["Wild boar", "Soy sauce", "Worcestershire", "Garlic", "Juniper berries"] },
  { id: 117, name: "Elk Teriyaki", meat: "Game", style: "Sweet", spice: 1, description: "Lean elk meat in a sweet teriyaki marinade. Mild, tender, and delicious.", time: "6-8 hrs", key_ingredients: ["Elk", "Teriyaki sauce", "Brown sugar", "Ginger", "Sesame oil"] },
  { id: 118, name: "Alligator Jerky", meat: "Game", style: "Spicy", spice: 3, description: "Cajun-spiced alligator meat jerky. A true Southern delicacy.", time: "8-10 hrs", key_ingredients: ["Alligator", "Cajun seasoning", "Cayenne", "Garlic", "Lemon"] },
  { id: 119, name: "Ostrich Peppered", meat: "Game", style: "Classic", spice: 2, description: "Ultra-lean ostrich meat with bold cracked pepper. Exotic but approachable.", time: "5-7 hrs", key_ingredients: ["Ostrich", "Cracked pepper", "Soy sauce", "Garlic", "Worcestershire"] },
  { id: 120, name: "Lamb Shawarma", meat: "Game", style: "International", spice: 2, description: "Middle Eastern shawarma spices on tender lamb strips. Exotic and aromatic.", time: "7-9 hrs", key_ingredients: ["Lamb", "Cumin", "Coriander", "Turmeric", "Paprika"] },
];

const MEAT_COLORS = {
  Beef: { bg: "rgba(180,40,30,0.12)", border: "#b4281e", text: "#b4281e" },
  Venison: { bg: "rgba(120,70,30,0.12)", border: "#78461e", text: "#78461e" },
  Turkey: { bg: "rgba(200,150,50,0.12)", border: "#c89632", text: "#a07828" },
  Pork: { bg: "rgba(220,120,140,0.12)", border: "#dc788c", text: "#b44060" },
  Fish: { bg: "rgba(40,120,180,0.12)", border: "#2878b4", text: "#2878b4" },
  Buffalo: { bg: "rgba(100,60,30,0.12)", border: "#643c1e", text: "#643c1e" },
  Game: { bg: "rgba(60,100,60,0.12)", border: "#3c643c", text: "#3c643c" },
};

const SPICE_LABELS = ["", "Mild", "Medium", "Hot", "Very Hot", "Extreme"];
const SPICE_EMOJIS = ["", "🌶️", "🌶️🌶️", "🔥", "🔥🔥", "💀"];

const STYLE_ICONS = {
  Classic: "🥩", Sweet: "🍯", Spicy: "🌶️", "Sweet & Spicy": "🍯🌶️",
  BBQ: "🔥", International: "🌍", Savory: "🧂", Smoked: "💨",
};

function SpiceBar({ level }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i <= level
            ? level >= 5 ? "#dc2626" : level >= 4 ? "#ea580c" : level >= 3 ? "#f59e0b" : level >= 2 ? "#eab308" : "#84cc16"
            : "rgba(255,255,255,0.15)",
          transition: "background 0.3s",
        }} />
      ))}
    </div>
  );
}

function RecipeCard({ recipe, onClick }) {
  const mc = MEAT_COLORS[recipe.meat];
  return (
    <div onClick={() => onClick(recipe)} style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: 20, cursor: "pointer",
      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      display: "flex", flexDirection: "column", gap: 10, minHeight: 200,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = mc.border; e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ background: mc.bg, color: mc.text, border: `1px solid ${mc.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{recipe.meat}</span>
          <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{recipe.style}</span>
        </div>
        <SpiceBar level={recipe.spice} />
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>{recipe.name}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5, flex: 1 }}>{recipe.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}>⏱ {recipe.time}</span>
        <span style={{ fontSize: 12, color: mc.text }}>{SPICE_EMOJIS[recipe.spice]} {SPICE_LABELS[recipe.spice]}</span>
      </div>
    </div>
  );
}

function RecipeModal({ recipe, onClose }) {
  const mc = MEAT_COLORS[recipe.meat];
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1a1a", borderRadius: 20, maxWidth: 600, width: "100%", maxHeight: "90vh",
        overflow: "auto", border: `1px solid ${mc.border}`, position: "relative",
      }}>
        <div style={{ background: `linear-gradient(135deg, ${mc.border}22, transparent)`, padding: "32px 32px 24px" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)",
            border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%",
            cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span style={{ background: mc.bg, color: mc.text, border: `1px solid ${mc.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600, fontFamily: "'DM Mono', monospace", textTransform: "uppercase" }}>{recipe.meat}</span>
            <span style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{STYLE_ICONS[recipe.style]} {recipe.style}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>{recipe.name}</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{recipe.description}</p>
        </div>
        <div style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 120, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Spice Level</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SpiceBar level={recipe.spice} />
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{SPICE_LABELS[recipe.spice]}</span>
                <span>{SPICE_EMOJIS[recipe.spice]}</span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 120, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Dry Time</div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>⏱ {recipe.time}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Ingredients</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {recipe.key_ingredients.map((ing, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "rgba(255,255,255,0.75)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>{ing}</span>
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${mc.border}15, ${mc.border}08)`, borderRadius: 12, padding: 20, border: `1px solid ${mc.border}30` }}>
            <div style={{ fontSize: 11, color: mc.text, fontFamily: "'DM Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Pro Tip</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              {recipe.meat === "Fish" ? "Keep the skin on during drying for better structure. Peel before eating. Use wild-caught for best flavor." :
               recipe.meat === "Venison" ? "Marinate for 24-48 hours for best flavor penetration. Trim all silver skin and fat. Game meats should be frozen for 8 weeks before use." :
               recipe.meat === "Turkey" ? "Turkey is very lean — don't over-dry or it will be brittle. Check at the minimum time and pull when it bends and cracks but doesn't snap." :
               recipe.meat === "Pork" ? "For bacon jerky, use thick-cut bacon and reduce drying time. For pork loin, freeze partially before slicing for even strips." :
               recipe.meat === "Buffalo" ? "Buffalo is leaner than beef so it dries faster. Keep a close eye to avoid over-drying. Pairs especially well with bold, smoky flavors." :
               recipe.meat === "Game" ? "Exotic meats vary widely in fat content. Trim thoroughly and adjust drying times. When in doubt, dry less — you can always put it back." :
               "Slice 1/8 to 1/4 inch thick. Cut against the grain for tender jerky, with the grain for chewy. Partially freeze the meat for easier slicing."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodysMeats() {
  const [page, setPage] = useState("recipes");
  const [search, setSearch] = useState("");
  const [meatFilter, setMeatFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [spiceFilter, setSpiceFilter] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const meats = ["All", ...new Set(RECIPES.map(r => r.meat))];
  const styles = ["All", ...new Set(RECIPES.map(r => r.style))];

  const filtered = useMemo(() => {
    return RECIPES.filter(r => {
      if (meatFilter !== "All" && r.meat !== meatFilter) return false;
      if (styleFilter !== "All" && r.style !== styleFilter) return false;
      if (spiceFilter > 0 && r.spice !== spiceFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        return r.name.toLowerCase().includes(s) || r.description.toLowerCase().includes(s) ||
          r.key_ingredients.some(i => i.toLowerCase().includes(s)) || r.meat.toLowerCase().includes(s) || r.style.toLowerCase().includes(s);
      }
      return true;
    });
  }, [search, meatFilter, styleFilter, spiceFilter]);

  const stats = useMemo(() => ({
    total: RECIPES.length,
    meats: new Set(RECIPES.map(r => r.meat)).size,
    styles: new Set(RECIPES.map(r => r.style)).size,
    hottest: RECIPES.filter(r => r.spice === 5).length,
  }), []);

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)",
        background: "rgba(15,15,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #b4281e, #8b1a12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🥩</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>CODY'S MEATS</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["recipes", "shop"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{
                background: page === p ? "rgba(180,40,30,0.2)" : "transparent",
                border: page === p ? "1px solid rgba(180,40,30,0.4)" : "1px solid transparent",
                color: page === p ? "#e8534a" : "rgba(255,255,255,0.5)",
                borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13,
                fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase",
                letterSpacing: "0.05em", transition: "all 0.2s",
              }}>{p === "recipes" ? "Recipes" : "Shop"}</button>
            ))}
          </div>
        </div>
      </nav>

      {page === "recipes" ? (
        <>
          {/* HERO */}
          <div style={{
            background: "linear-gradient(180deg, rgba(180,40,30,0.08) 0%, transparent 60%)",
            padding: "60px 24px 40px", textAlign: "center",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>The Ultimate Collection</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1, letterSpacing: "-0.03em" }}>
                <span style={{ color: "#fff" }}>Jerky</span>{" "}
                <span style={{ background: "linear-gradient(135deg, #e8534a, #b4281e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Recipes</span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
                {stats.total} handcrafted recipes across {stats.meats} different meats and {stats.styles} flavor styles. From mild to face-melting.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
                {[
                  { n: stats.total, l: "Recipes" },
                  { n: stats.meats, l: "Meat Types" },
                  { n: stats.styles, l: "Styles" },
                  { n: stats.hottest, l: "Extreme Heat" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#e8534a" }}>{s.n}</div>
                    <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 32px" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 16,
            }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.3 }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recipes, ingredients, styles..."
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "12px 16px 12px 40px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                {/* Meat filter */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Meat Type</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {meats.map(m => (
                      <button key={m} onClick={() => setMeatFilter(m)} style={{
                        background: meatFilter === m ? (m === "All" ? "rgba(255,255,255,0.12)" : MEAT_COLORS[m]?.bg || "rgba(255,255,255,0.12)") : "rgba(255,255,255,0.04)",
                        border: `1px solid ${meatFilter === m ? (m === "All" ? "rgba(255,255,255,0.3)" : MEAT_COLORS[m]?.border || "rgba(255,255,255,0.3)") : "rgba(255,255,255,0.06)"}`,
                        color: meatFilter === m ? (m === "All" ? "#fff" : MEAT_COLORS[m]?.text || "#fff") : "rgba(255,255,255,0.45)",
                        borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12,
                        fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                      }}>{m}</button>
                    ))}
                  </div>
                </div>

                {/* Style filter */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Flavor Style</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {styles.map(s => (
                      <button key={s} onClick={() => setStyleFilter(s)} style={{
                        background: styleFilter === s ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${styleFilter === s ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                        color: styleFilter === s ? "#fff" : "rgba(255,255,255,0.45)",
                        borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12,
                        fontWeight: 500, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                      }}>{s !== "All" && STYLE_ICONS[s] ? `${STYLE_ICONS[s]} ` : ""}{s}</button>
                    ))}
                  </div>
                </div>

                {/* Spice filter */}
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Spice Level</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => setSpiceFilter(0)} style={{
                      background: spiceFilter === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${spiceFilter === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                      color: spiceFilter === 0 ? "#fff" : "rgba(255,255,255,0.45)",
                      borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12,
                      fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                    }}>All</button>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setSpiceFilter(s)} style={{
                        background: spiceFilter === s ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${spiceFilter === s ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                        color: spiceFilter === s ? "#fff" : "rgba(255,255,255,0.45)",
                        borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12,
                        fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                      }}>{SPICE_EMOJIS[s]}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Mono', monospace" }}>
                Showing {filtered.length} of {RECIPES.length} recipes
              </div>
            </div>
          </div>

          {/* RECIPE GRID */}
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 60px" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🤷</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>No recipes found</h3>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 16,
              }}>
                {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={setSelectedRecipe} />)}
              </div>
            )}
          </div>
        </>
      ) : (
        /* SHOP PAGE */
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🥩</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1 }}>
            <span style={{ color: "#fff" }}>Cody's </span>
            <span style={{ background: "linear-gradient(135deg, #e8534a, #b4281e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Homemade Jerky</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Small-batch, hand-crafted jerky made right here in Oklahoma. Every batch is made with premium cuts and our signature recipes.
          </p>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 40, marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🚧</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>Coming Soon</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 24px" }}>
              We're setting up our kitchen and getting all the permits in order. Sign up below to be the first to know when Cody's homemade jerky is available for purchase.
            </p>
            <div style={{ display: "flex", gap: 8, maxWidth: 400, margin: "0 auto" }}>
              <input placeholder="your@email.com" style={{
                flex: 1, padding: "14px 16px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff",
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
              }} />
              <button style={{
                background: "linear-gradient(135deg, #e8534a, #b4281e)", border: "none",
                color: "#fff", borderRadius: 10, padding: "14px 24px", cursor: "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
              }}>Notify Me</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: "🔥", title: "Small Batch", desc: "Every bag is made by hand in small batches for maximum quality." },
              { icon: "🌿", title: "Premium Cuts", desc: "Only the best cuts of meat make it into our jerky." },
              { icon: "📦", title: "Ships Fresh", desc: "Vacuum sealed and shipped within 48 hours of production." },
            ].map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{f.title}</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #b4281e, #8b1a12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🥩</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>CODY'S MEATS</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace" }}>
          Handcrafted in Oklahoma · {RECIPES.length} recipes and counting
        </p>
      </footer>

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
}
