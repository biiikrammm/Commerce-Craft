import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeaturedBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Limited Edition</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
                The Heritage{' '}
                <span className="text-gradient-gold">Collection</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our exclusive capsule collection, featuring artisan-crafted pieces 
                inspired by timeless elegance. Limited quantities available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" size="lg">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="elegant" size="lg">
                  Learn More
                </Button>
              </div>
              
              {/* Mini stats */}
              <div className="flex gap-8 pt-6">
                <div>
                  <div className="font-serif text-2xl font-medium text-foreground">48</div>
                  <div className="text-sm text-muted-foreground">Pieces</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-medium text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Artisans</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-medium text-foreground">1</div>
                  <div className="text-sm text-muted-foreground">Vision</div>
                </div>
              </div>
            </div>
            
            {/* Image grid */}
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80"
                    alt="Heritage watch"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
                    alt="Heritage bag"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80"
                    alt="Heritage jewelry"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                    alt="Heritage accessories"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
