const imageBySlug = {
  shirts:
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
  pants:
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
  belts:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  skirts:
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
  jackets:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
  "sports-shorts":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  "sports-tshirts":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  sweaters:
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1503342217505-b00a4cc15eaa?auto=format&fit=crop&w=900&q=80";

export function getCategoryImage(slug) {
  if (!slug) return DEFAULT_IMAGE;
  return imageBySlug[slug] || DEFAULT_IMAGE;
}

export default getCategoryImage;
