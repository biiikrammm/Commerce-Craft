import { useState } from 'react';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getBadgeVariant = (badge?: string) => {
    switch (badge?.toLowerCase()) {
      case 'sale': return 'sale';
      case 'new': return 'new';
      case 'bestseller': return 'bestseller';
      default: return 'gold';
    }
  };

  return (
    <article
      className="group relative animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/30 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={getBadgeVariant(product.badge)}>
              {product.badge}
            </Badge>
          </div>
        )}
        
        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isLiked ? "fill-destructive text-destructive" : "text-foreground"
            )}
          />
        </button>

        {/* Quick actions */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            variant="glass"
            size="sm"
            className="flex-1"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button variant="glass" size="icon" className="shrink-0">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 pt-1">
          <span className="font-semibold text-lg text-foreground">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
