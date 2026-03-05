import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Layers, Wind, Home } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      // Distance from center of element to center of viewport
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

  const products: Product[] = [
    {
      id: 1,
      title: 'Vidrio Blindado',
      subtitle: 'Seguridad máxima',
      description:
        'Protección balística y anti-impacto para residencias y oficinas. Fabricado con capas de vidrio y policarbonato de alta resistencia.',
      image: '/product-1.jpg',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      id: 2,
      title: 'Vidrio Laminado',
      subtitle: 'Protección y estilo',
      description:
        'Ideal para fachadas y divisiones interiores. Ofrece seguridad y diseño en un solo producto.',
      image: '/product-2.jpg',
      icon: <Layers className="w-6 h-6" />,
    },
    {
      id: 3,
      title: 'Vidrio Templado',
      subtitle: 'Resistencia superior',
      description:
        'Hasta 5 veces más resistente que el vidrio convencional. Perfecto para puertas, ventanas y mamparas.',
      image: '/product-3.jpg',
      icon: <Home className="w-6 h-6" />,
    },
    {
      id: 4,
      title: 'Vidrio Anti-huracán',
      subtitle: 'Protección natural',
      description:
        'Diseñado para resistir vientos extremos e impactos de proyectiles. Protege tu inversión contra fenómenos naturales.',
      image: '/product-5.jpg',
      icon: <Wind className="w-6 h-6" />,
    },
  ];

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
                Nuestros Productos
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
              Soluciones en <span className="text-gold">Vidrio</span>
            </h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {products.map((product, index) => {
            const parallaxSpeeds = [0.03, 0.08, 0.05, 0.1];

            return (
              <div
                key={product.id}
                className={`transition-all duration-1000 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
                  }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div
                  className="group relative overflow-hidden rounded-sm cursor-pointer h-full"
                  style={{ transform: `translateY(${scrollProgress * parallaxSpeeds[index]}px)` }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-dark">
                    <div
                      className="w-full h-full"
                      style={{ transform: `translateY(${scrollProgress * -0.05}px) scale(1.15)` }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${hoveredId === product.id ? 'scale-110' : 'scale-100'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity duration-700 ${hoveredId === product.id ? 'opacity-90' : 'opacity-70'
                      }`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                    {/* Icon */}
                    <div
                      className={`mb-4 text-gold transition-all duration-700 ease-out ${hoveredId === product.id
                        ? 'opacity-100 translate-y-0 scale-110'
                        : 'opacity-0 translate-y-6 scale-95'
                        }`}
                    >
                      {product.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                      {product.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm tracking-wide text-gold mb-4 transition-transform duration-500 group-hover:-translate-y-1">{product.subtitle}</p>

                    {/* Description - Shows on hover */}
                    <p
                      className={`text-sm md:text-base text-white/80 mb-6 line-clamp-3 transition-all duration-700 ease-out ${hoveredId === product.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                        }`}
                    >
                      {product.description}
                    </p>

                    {/* CTA */}
                    <div
                      className={`flex items-center gap-3 text-sm tracking-wider uppercase text-white transition-all duration-700 ease-out ${hoveredId === product.id
                        ? 'opacity-100 translate-y-0 text-gold'
                        : 'opacity-0 translate-y-8'
                        }`}
                    >
                      <span>Ver detalles</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div
                    className={`absolute inset-0 border border-gold/0 rounded-sm transition-all duration-700 ${hoveredId === product.id ? 'border-gold/40 shadow-[inset_0_0_40px_rgba(212,175,55,0.1)]' : ''
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
