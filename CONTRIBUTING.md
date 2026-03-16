# Contributing to Cody's Meats

Thanks for your interest in contributing recipes!

## Adding a Recipe

1. Fork this repository
2. Edit `index.html` and add your recipe to the `R` array in the `<script>` section
3. Follow the existing format:
   ```json
   {
     "id": 161,
     "name": "Your Recipe Name",
     "meat": "Beef",
     "style": "Classic",
     "spice": 2,
     "desc": "Short description of the flavor profile.",
     "t": 160,
     "d": "5-7",
     "m": "8-24 hrs",
     "i": [
       ["2 lbs", "Beef top round, sliced 1/4\" thick"],
       ["1/4 cup", "Soy sauce"]
     ]
   }
   ```
4. Submit a pull request

## Recipe Guidelines

- Include exact measurements for all ingredients
- Specify dehydrator temperature in °F
- Include drying time range in hours
- Include marinate time
- Spice scale: 1=Mild, 2=Medium, 3=Hot, 4=Very Hot, 5=Extreme
- Valid meat types: Beef, Venison, Turkey, Pork, Fish, Buffalo, Game
- Valid styles: Classic, Sweet, Spicy, Sweet & Spicy, BBQ, International, Savory, Smoked

## Bug Reports

Open an issue with details about what's broken and how to reproduce it.
