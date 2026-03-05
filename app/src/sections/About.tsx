import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}

const Counter = ({ end, suffix, label, isVisible }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isVisible]);

  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-light text-gold mb-2">
        {count}
        <span className="text-2xl lg:text-3xl">{suffix}</span>
      </div>
      <div className="text-sm text-white/60 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const About = () => {
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

  const stats = [
    { end: 18, suffix: '+', label: 'Años de experiencia' },
    { end: 100, suffix: '%', label: 'Seguridad garantizada' },
    { end: 500, suffix: '+', label: 'Proyectos completados' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src="/about-image.jpg"
                alt="Nuestra misión"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/30 rounded-sm" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold/10 rounded-sm" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            {/* Label */}
            <div
              className={`mb-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gold">
                Nuestra Historia
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-6 leading-tight transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              We love what we do.
              <br />
              <span className="text-gold">Our mission</span>
            </h2>

            {/* Body Text */}
            <div
              className={`space-y-4 mb-10 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <p className="text-white/70 leading-relaxed">
                Vidrio AK, fábrica de vidrio blindado y arquitectónico es una
                empresa mexicana fundada en el año 2005, contando así con 18
                años de experiencia, cuyo principal objetivo es satisfacer
                necesidades en fabricación de vidrio blindado o laminado para
                proyectos automotrices y de construcción.
              </p>
              <p className="text-white/70 leading-relaxed">
                Utilizamos insumos importados de la mejor calidad y tecnologías
                de vanguardia desarrolladas en nuestro laboratorio de pruebas.
                Las instituciones más prestigiadas del país han sido testigos de
                la experiencia y profesionalismo de Vidrio AK.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 pt-8 border-t border-white/10 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {stats.map((stat, index) => (
                <Counter
                  key={index}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
