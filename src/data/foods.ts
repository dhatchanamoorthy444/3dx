import { FoodItem } from '../types/calisthenics';

export const INITIAL_FOODS_DATABASE: FoodItem[] = [
  // --- BREAKFAST ---
  {
    id: 'food_idli_sambar',
    name: 'Idli with Sambar & Coconut Chutney',
    category: 'breakfast',
    calories: 320,
    proteinG: 12,
    carbsG: 58,
    fatG: 4,
    dietType: 'vegetarian',
    cuisine: 'south_indian',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_egg_bhurji_toast',
    name: '3 Egg Bhurji with Multigrain Toast',
    category: 'breakfast',
    calories: 420,
    proteinG: 24,
    carbsG: 32,
    fatG: 18,
    dietType: 'eggetarian',
    cuisine: 'north_indian',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_poha',
    name: 'Kanda Poha with Peanuts & Lemon',
    category: 'breakfast',
    calories: 350,
    proteinG: 9,
    carbsG: 62,
    fatG: 8,
    dietType: 'vegan',
    cuisine: 'indian',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_oats_protein_bowl',
    name: 'Oats with Almond Milk, Chia & Whey',
    category: 'breakfast',
    calories: 380,
    proteinG: 28,
    carbsG: 48,
    fatG: 7,
    dietType: 'vegetarian',
    cuisine: 'mixed',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80'
  },

  // --- LUNCH ---
  {
    id: 'food_chicken_rice_dal',
    name: 'Grilled Chicken Breast, Brown Rice & Dal',
    category: 'lunch',
    calories: 650,
    proteinG: 48,
    carbsG: 75,
    fatG: 12,
    dietType: 'non_vegetarian',
    cuisine: 'indian',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_paneer_tikka_roti',
    name: 'Paneer Tikka with 2 Whole Wheat Chapatis & Curd',
    category: 'lunch',
    calories: 580,
    proteinG: 28,
    carbsG: 64,
    fatG: 22,
    dietType: 'vegetarian',
    cuisine: 'north_indian',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_rajma_chawal',
    name: 'Rajma Chawal with Green Salad',
    category: 'lunch',
    calories: 520,
    proteinG: 20,
    carbsG: 88,
    fatG: 8,
    dietType: 'vegan',
    cuisine: 'north_indian',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80'
  },

  // --- SNACKS ---
  {
    id: 'food_sprouted_moong',
    name: 'Sprouted Moong Chaat with Tomato & Lemon',
    category: 'snack',
    calories: 210,
    proteinG: 14,
    carbsG: 34,
    fatG: 2,
    dietType: 'vegan',
    cuisine: 'indian',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_boiled_eggs',
    name: '3 Boiled Eggs with Black Pepper',
    category: 'snack',
    calories: 215,
    proteinG: 18,
    carbsG: 2,
    fatG: 14,
    dietType: 'eggetarian',
    cuisine: 'mixed',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80'
  },

  // --- DINNER ---
  {
    id: 'food_fish_curry_rice',
    name: 'South Indian Fish Curry with Steamed Rice',
    category: 'dinner',
    calories: 540,
    proteinG: 36,
    carbsG: 62,
    fatG: 14,
    dietType: 'non_vegetarian',
    cuisine: 'south_indian',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'food_tofu_stir_fry',
    name: 'Tofu & Mixed Veggie Stir-Fry with Quinoa',
    category: 'dinner',
    calories: 460,
    proteinG: 26,
    carbsG: 52,
    fatG: 16,
    dietType: 'vegan',
    cuisine: 'mixed',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80'
  }
];
