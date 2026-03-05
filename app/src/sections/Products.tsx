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
      className="relative w-full py-24 lg:py-32 bg-dark-light"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <div
            className={`mb-4 transition-all duration-700 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold">
              Nuestros Productos
            </span>
          </div>
          <h2
            className={`text-3xl lg:text-4xl xl:text-5xl font-light text-white transition-all duration-700 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            Soluciones en <span className="text-gold">Vidrio</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === product.id ? 'scale-110' : 'scale-100'
                    }`}
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent transition-opacity duration-500 ${hoveredId === product.id ? 'opacity-90' : 'opacity-70'
                  }`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div
                  className={`mb-4 text-gold transition-all duration-500 ${hoveredId === product.id
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                >
                  {product.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-light text-white mb-1">
                  {product.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gold mb-3">{product.subtitle}</p>

                {/* Description - Shows on hover */}
                <p
                  className={`text-sm text-white/70 mb-4 line-clamp-2 transition-all duration-500 ${hoveredId === product.id
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                >
                  {product.description}
                </p>

                {/* CTA */}
                <div
                  className={`flex items-center gap-2 text-sm text-white group-hover:text-gold transition-all duration-500 ${hoveredId === product.id
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}
                >
                  <span>Ver más</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Border glow on hover */}
              <div
                className={`absolute inset-0 border border-gold/0 rounded-sm transition-all duration-500 ${hoveredId === product.id ? 'border-gold/50' : ''
                  }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
