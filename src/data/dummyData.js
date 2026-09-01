const imageByCategory = {
  shirts: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
  pants: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
  belts: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  skirts: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
  jackets: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
  "sports-shorts": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  "sports-tshirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  sweaters: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
};
// const imageByCategory = {
//   shirts: "/images/categories/shirts.jpg",
//   pants: "/images/categories/pants.jpg",
//   belts: "/images/categories/belts.jpg",
//   skirts: "/images/categories/skirts.jpg",
//   jackets: "/images/categories/jackets.jpg",
//   "sports-shorts": "/images/categories/sports-shorts.jpg",
//   "sports-tshirts": "/images/categories/sports-tshirts.jpg",
//   sweaters: "/images/categories/sweaters.jpg",
// };


export const shopCategories = [
  { id: "shirts", name: "Shirts", image: imageByCategory.shirts },
  { id: "pants", name: "Pants", image: imageByCategory.pants },
  { id: "belts", name: "Belts", image: imageByCategory.belts },
  { id: "skirts", name: "Skirts", image: imageByCategory.skirts },
  { id: "jackets", name: "Jackets", image: imageByCategory.jackets },
  { id: "sports-shorts", name: "Sports Shorts", image: imageByCategory["sports-shorts"] },
  { id: "sports-tshirts", name: "Sports T-Shirts", image: imageByCategory["sports-tshirts"] },
  { id: "sweaters", name: "Sweaters", image: imageByCategory.sweaters },
];

export const collections = [
  { id: "daily-uniform", name: "Daily Uniform", description: "Everyday shirts, pants and skirts for school.", image: imageByCategory.shirts, categories: ["shirts","pants","skirts"] },
  { id: "winter-uniform", name: "Winter Collection", description: "Jackets and sweaters for winter school days.", image: imageByCategory.jackets, categories: ["jackets","sweaters"] },
  { id: "sports-collection", name: "Sports Collection", description: "Sports T-shirts and shorts for PT and activity days.", image: imageByCategory["sports-tshirts"], categories: ["sports-tshirts","sports-shorts"] },
  { id: "school-accessories", name: "School Accessories", description: "Belts and useful uniform finishing essentials.", image: imageByCategory.belts, categories: ["belts"] },
];

const dbProducts = [
  ["HALF PANTS","sports-shorts",499,"daily-uniform"],
  ["BOYS TROUSER (Note : From 5th Class Onwards)","pants",755,"daily-uniform"],
  ["GIRLS SKIRT","skirts",699,"daily-uniform"],
  ["T-SHIRT","sports-tshirts",499,"sports-collection"],
  ["TRACK","sports-shorts",699,"sports-collection"],
  ["JACKET","jackets",1099,"winter-uniform"],
  ["SOCKS","belts",199,"school-accessories"],
  ["BELT","belts",249,"school-accessories"],
  ["GIRLS TROUSER (Note : From 5th Class Onwards)","pants",755,"daily-uniform"],
  ["BOYS SHIRTS","shirts",599,"daily-uniform"],
  ["GIRLS SHIRT (Note : From 5th Class Onwards)","shirts",599,"daily-uniform"],
  ["GIRLS SHIRT","shirts",599,"daily-uniform"],
];

export const products = dbProducts.map(([name, categoryId, price, collectionId], index) => {
  const image=imageByCategory[categoryId] || imageByCategory.shirts;
  return {
    id:index+1, name, categoryId, collectionId,
    category: shopCategories.find(x=>x.id===categoryId)?.name || categoryId,
    price, oldPrice:price+200, discount:Math.round(200/(price+200)*100),
    rating:4.8, reviews:37+index*8, image, images:[image,image],
    description:`${name} from the school uniform product collection. Designed for a neat school appearance, comfort and regular everyday use.`,
    fabric:categoryId==="belts"?"Synthetic leather":"Cotton blend",
    sizes:categoryId==="belts"?["S","M","L","XL"]:["24","26","28","30","32","34","36"],
    stock:15+index
  };
});

export const testimonials = [
  { id:1,name:"School Administrator",role:"School",rating:5,message:"The uniform range is practical, neat and easy for parents to order." },
  { id:2,name:"Parent",role:"Student Parent",rating:5,message:"The category and size selection makes shopping very simple." },
  { id:3,name:"School Coordinator",role:"School",rating:5,message:"Daily, winter and sports collections cover our regular requirements." },
  { id:4,name:"School Administrator",role:"School",rating:5,message:"The uniform range is practical, neat and easy for parents to order." },
  { id:5,name:"Parent",role:"Student Parent",rating:5,message:"The category and size selection makes shopping very simple." },
];

export const faqs = [
  {question:"Which schoolwear categories are available?",answer:"Shirts, pants, belts, skirts, jackets, sports shorts, sports T-shirts and sweaters."},
  {question:"Can I select size on the product details page?",answer:"Yes. The size selector is visible on the product page. If you click Add to Cart or Buy Now without selecting one, a size popup asks you to select it."},
  {question:"Can I change quantity in cart?",answer:"Yes. Use the plus and minus controls in the cart."},
  {question:"Are related products shown?",answer:"Yes. Product details includes similar products and a recently viewed section."},
  {question:"What happens after checkout?",answer:"A successful checkout takes you to the order success page."}
];
