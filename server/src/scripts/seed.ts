import { supabase } from '../lib/supabase.js';

const products = [
  {
    name: "Artisan Leather Tote",
    description: "Handcrafted Italian leather tote with brass hardware and suede lining.",
    price: 485,
    original_price: 580,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Bags",
    badge: "Sale",
    rating: 4.9,
    reviews: 127,
    stock: 15,
  },
  {
    name: "Midnight Chronograph",
    description: "Swiss-made automatic movement with sapphire crystal and leather strap.",
    price: 1250,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Watches",
    badge: "New",
    rating: 4.8,
    reviews: 89,
    stock: 8,
  },
  {
    name: "Cashmere Blend Coat",
    description: "Luxurious wool-cashmere blend with classic tailoring and satin lining.",
    price: 890,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
    category: "Outerwear",
    rating: 4.7,
    reviews: 56,
    stock: 12,
  },
  {
    name: "Gold Vermeil Earrings",
    description: "18k gold vermeil with freshwater pearls, handmade by local artisans.",
    price: 195,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    category: "Jewelry",
    badge: "Bestseller",
    rating: 5.0,
    reviews: 234,
    stock: 25,
  },
  {
    name: "Silk Scarf Collection",
    description: "Hand-rolled edges with original artwork print on pure mulberry silk.",
    price: 265,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    category: "Accessories",
    rating: 4.6,
    reviews: 78,
    stock: 20,
  },
  {
    name: "Ceramic Vase Set",
    description: "Minimalist ceramic vases with reactive glaze finish, set of three.",
    price: 320,
    original_price: 380,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Home",
    badge: "Sale",
    rating: 4.8,
    reviews: 112,
    stock: 10,
  },
  {
    name: "Heritage Sunglasses",
    description: "Acetate frames with polarized lenses and titanium temples.",
    price: 345,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessories",
    rating: 4.7,
    reviews: 93,
    stock: 18,
  },
  {
    name: "Linen Throw Blanket",
    description: "Stonewashed Belgian linen with hand-tied fringe detail.",
    price: 175,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    category: "Home",
    badge: "New",
    rating: 4.9,
    reviews: 67,
    stock: 22,
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if products already exist
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (existingProducts && existingProducts.length > 0) {
      console.log('⚠️  Products already exist in database. Skipping seed.');
      console.log('💡 To reseed, delete existing products first.');
      return;
    }

    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (error) {
      throw error;
    }

    console.log(`✅ Successfully seeded ${data.length} products`);
    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
