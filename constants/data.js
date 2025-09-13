export const TABS = ["Collections", "Outfits", "Items"];
export const FILTER_CHIPS = [
  { name: "Work", icon: "💼" },
  { name: "Leisure", icon: "🎯" },
  { name: "Designer", icon: "💎" },
];

export const ITEM_CARD_HEIGHT = 220;

export const INITIAL_ITEMS = Array.from({ length: 20 }).map((_, idx) => ({
  id: idx + 1,
  image:
    idx % 2 === 0
      ? "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400"
      : "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400",
  name: idx % 2 === 0 ? "Knot Detail Knit Top" : "Motif Printed Blouse",
  category: idx % 2 === 0 ? "Crop" : "Striped",
  categoryColor: idx % 2 === 0 ? "#E5E7EB" : "#DBEAFE",
  categoryText: idx % 2 === 0 ? "#374151" : "#1D4ED8",
  categoryIcon: idx % 2 === 0 ? "👕" : "👔",
  isSaved: true,
}));

export const SELECT_OPTIONS = {
  Type: ["Top", "Bottom", "Outerwear", "Dress", "Accessories"],
  Style: ["Casual", "Formal", "Bohemian", "Minimal", "Athleisure"],
  Mood: ["Happy", "Serious", "Romantic", "Sporty", "Chill"],
  Color: [
    { name: "Black", hex: "#111827" },
    { name: "White", hex: "#F9FAFB" },
    { name: "Blue", hex: "#1D4ED8" },
    { name: "Rose", hex: "#EF4444" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
  ],
};
