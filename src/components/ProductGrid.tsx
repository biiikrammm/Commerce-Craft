import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-32" id="products">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-widest mb-4 block">
            Featured Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-6">
            Handpicked for You
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our carefully curated selection of premium products, each chosen for its exceptional quality and timeless design.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
