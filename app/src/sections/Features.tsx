import { useEffect, useRef, useState } from 'react';
import { Cpu, Package, Award } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features: Feature[] = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Tecnología de Vanguardia',
      description:
        'Laboratorio de pruebas propio con equipos importados de última generación para garantizar la máxima calidad.',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Materiales Premium',
      description:
        'Insumos importados de las mejores marcas internacionales. La mejor relación calidad-precio del mercado.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certificaciones Internacionales',
      description:
        'Cumplimos con los más altos estándares de calidad y seguridad a nivel nacional e internacional.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`mb-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold">
              Por Qué Elegirnos
            </span>
          </div>
          <h2
            className={`text-3xl lg:text-4xl xl:text-5xl font-light text-white transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Excelencia en cada <span className="text-gold">detalle</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative text-center p-8 rounded-sm transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Hexagon background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-32 h-32 border border-gold/20 rotate-45 transition-all duration-500 group-hover:border-gold/40 group-hover:scale-110"
                  style={{
                    clipPath:
                      'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
              </div>

              {/* Icon */}
              <div className="relative mb-6 inline-flex items-center justify-center w-20 h-20 text-gold">
                <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse" />
                <div className="relative">{feature.icon}</div>
              </div>

              {/* Title */}
              <h3 className="relative text-xl font-medium text-white mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative text-white/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gold/30 group-hover:w-24 group-hover:bg-gold/60 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-20 max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-white/70 leading-relaxed">
            Nuestra planta de producción se encuentra en la zona centro de la
            Ciudad de México, diseñada para cumplir con los más altos estándares
            y regulaciones en materia de calidad, seguridad y tecnología. Nuestro
            proceso de fabricación inicia con la compra de los mejores materiales
            en acuerdo comercial con las mejores marcas a nivel internacional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
