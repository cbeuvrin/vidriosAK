import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-transform duration-[8000ms] ease-linear ${
            isVisible ? 'scale-100' : 'scale-110'
          }`}
        >
          <img
            src="/hero-bg.jpg"
            alt="Modern bathroom with architectural glass"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
      </div>

      {/* Floating Glass Shards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.3), transparent)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 pt-20">
        <div className="max-w-4xl">
          {/* Caption */}
          <div
            className={`mb-6 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gold">
              Fábrica de Vidrio Arquitectónico
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6">
            <span
              className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight leading-none transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              VIDRIO <span className="font-medium text-gold">BLINDADO</span>
            </span>
            <span
              className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white tracking-tight leading-none mt-2 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              ARQUITECTÓNICO
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg lg:text-xl text-white/70 max-w-xl mb-10 leading-relaxed transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            18 años de experiencia protegiendo lo que más valoras. Tecnología de
            vanguardia, seguridad incomparable.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <button
              onClick={scrollToProducts}
              className="group flex items-center gap-3 px-8 py-4 bg-gold text-dark font-medium rounded-sm hover:bg-gold-light transition-all duration-300 hover:shadow-glow-lg"
            >
              Ver Productos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-sm hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Contáctanos
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <span className="text-xs text-white/50 tracking-wider uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce-subtle" />
      </div>
    </section>
  );
};

export default Hero;
