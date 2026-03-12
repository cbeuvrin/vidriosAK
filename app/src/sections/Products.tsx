import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Layers, Wind, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '../lib/LanguageContext';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  specs: string[];
  image: string;
  icon: React.ReactNode;
}

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const centerDistance = (rect.top + rect.height / 2) - (window.innerHeight / 2);

      setScrollProgress(centerDistance);
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 0) {
        lastScrollY = window.scrollY;
        animationFrameId = requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const products: Product[] = t.products.items.map((item: any, index: number) => ({
    ...item,
    image: index === 0 ? '/product-1.jpg' : index === 1 ? '/product-2.jpg' : '/product-5.jpg',
    icon: index === 0 ? <Shield className="w-6 h-6" /> : index === 1 ? <Layers className="w-6 h-6" /> : <Wind className="w-6 h-6" />
  }));

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40 bg-dark-light overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center md:text-left ml-0 md:ml-4 lg:ml-12">
          <div
            className={`mb-4 transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <div style={{ transform: `translateY(${scrollProgress * 0.05}px)` }}>
              <span className="text-xs tracking-[0.3em] uppercase text-gold">
                {t.products.badge}
              </span>
            </div>
          </div>
          <div
            className={`transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-light text-white"
              style={{ transform: `translateY(${scrollProgress * 0.02}px)` }}
            >
              {t.products.title} <span className="text-gold">{t.products.titleHighlight}</span>
            </h2>
          </div>
        </div>

        {/* Products Flex Grid (Single Row with Expansion) */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 max-w-7xl mx-auto h-[600px] lg:h-[700px]">
          {products.map((product, index) => {
            const parallaxSpeeds = [0.03, 0.08, 0.05];
            const isHovered = hoveredId === product.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <div
                key={product.id}
                className={`h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
                  } ${isHovered ? 'flex-[2.5]' : isAnyHovered ? 'flex-1' : 'flex-[1.5]'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="group relative overflow-hidden rounded-sm cursor-pointer h-full w-full"
                  style={{ transform: `translateY(${scrollProgress * parallaxSpeeds[index]}px)` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image Container */}
                  <div className="absolute inset-0 overflow-hidden bg-dark">
                    <div
                      className="w-full h-full transition-transform duration-1000 ease-out"
                      style={{
                        transform: `translateY(${scrollProgress * -0.05}px) scale(1.15)`,
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-75'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-80' : 'opacity-60'
                      }`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end overflow-hidden">
                    {/* Icon */}
                    <div
                      className={`mb-4 text-gold transition-all duration-700 ease-out ${isHovered
                        ? 'opacity-100 translate-y-0 scale-110'
                        : 'opacity-70 translate-y-0 scale-100'
                        }`}
                    >
                      {product.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`font-light text-white mb-2 transition-all duration-500 whitespace-nowrap ${isHovered ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
                      }`}>
                      {product.title}
                    </h3>

                    {/* Subtitle */}
                    <p className={`tracking-wide text-gold mb-4 transition-all duration-500 ${isHovered ? 'text-base opacity-100' : 'text-sm opacity-80'
                      }`}>
                      {product.subtitle}
                    </p>

                    {/* Description - Expands on hover */}
                    <div className={`grid transition-all duration-700 ease-in-out ${isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}>
                      <div className="overflow-hidden">
                        <p className="text-sm md:text-base text-white/80 mb-6 leading-relaxed max-w-md">
                          {product.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-3 text-sm tracking-wider uppercase text-gold">
                          <span>{t.products.viewDetails}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div
                    className={`absolute inset-0 border border-gold/0 rounded-sm transition-all duration-700 ${isHovered ? 'border-gold/40 shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]' : ''
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-7xl bg-dark/95 border-gold/20 text-white p-0 overflow-hidden outline-none">
          {selectedProduct && (
            <div className="flex flex-col h-full max-h-[70vh]">
              {/* Content Only Layout - Shorter and Wider */}
              <div className="w-full p-8 lg:p-14 flex flex-col h-full overflow-y-auto custom-scrollbar bg-dark/40 backdrop-blur-sm">
                <DialogHeader className="mb-12">
                  <span className="text-xs tracking-[0.5em] uppercase text-gold mb-4 block opacity-80">
                    {selectedProduct.subtitle}
                  </span>
                  <DialogTitle className="text-4xl lg:text-6xl font-light text-white mb-0 leading-tight">
                    {selectedProduct.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-xs font-medium text-gold uppercase tracking-[0.3em]">
                      {t.products.modal.descriptionLabel}
                    </h4>
                    <p className="text-xl text-white/70 leading-relaxed font-light max-w-4xl">
                      {selectedProduct.longDescription}
                    </p>
                  </div>

                  <div className="pt-10 border-t border-white/10">
                    <h4 className="text-xs font-medium text-gold uppercase tracking-[0.3em] mb-8">
                      {t.products.modal.specsLabel}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {selectedProduct.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-4 text-base text-white/80 group">
                          <div className="mt-1.5 w-5 h-5 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold/60 transition-colors">
                            <Check className="w-3 h-3 text-gold" />
                          </div>
                          <span className="leading-snug">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 pt-12">
                    <button 
                      className="group relative w-full md:w-auto px-12 py-5 bg-transparent border border-gold/40 text-gold text-xs uppercase tracking-[0.4em] overflow-hidden transition-all duration-500 rounded-sm hover:text-dark"
                      onClick={() => {
                        setSelectedProduct(null);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="relative z-10">{t.products.modal.cta}</span>
                      <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Products;
