import { useState, useEffect } from 'react';
import { X, Phone, Search, Heart, User, ShoppingBag, Instagram, Send } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Productos', href: '#products' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Contacto', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.192-.054-.3-.297-.108l-5.965 3.759-2.568-.802c-.56-.176-.572-.56.116-.828l10.037-3.869c.466-.174.875.108.713.828z" />
        </svg>
      ), href: '#', label: 'Telegram'
    },
    { icon: <Send className="w-5 h-5" />, href: '#', label: 'WhatsApp' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Left Sidebar - Fixed */}
      <aside className="fixed left-0 top-0 h-full w-16 lg:w-20 z-50 flex flex-col items-center py-6 bg-white/10 backdrop-blur-xl border-r border-white/20">
        {/* Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col items-center gap-1 mb-8 group"
        >
          <div className="flex flex-col gap-1">
            <span className="w-6 h-px bg-white/70 group-hover:bg-gold transition-colors" />
            <span className="w-6 h-px bg-white/70 group-hover:bg-gold transition-colors" />
            <span className="w-6 h-px bg-white/70 group-hover:bg-gold transition-colors" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/50 group-hover:text-gold transition-colors mt-2">
            Menú
          </span>
        </button>

        {/* Social Icons */}
        <div className="flex flex-col gap-6 mt-auto mb-auto">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="text-white/50 hover:text-gold transition-all duration-300 hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Language Selector */}
        <div className="mt-auto flex flex-col gap-1 text-[10px] uppercase tracking-wider">
          <button
            onClick={() => setCurrentLang('es')}
            className={`py-1 px-2 rounded transition-colors ${currentLang === 'es' ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-white'
              }`}
          >
            Esp
          </button>
          <button
            onClick={() => setCurrentLang('en')}
            className={`py-1 px-2 rounded transition-colors ${currentLang === 'en' ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-white'
              }`}
          >
            Eng
          </button>
        </div>
      </aside>

      {/* Top Header - Glassmorphic */}
      <header
        className={`fixed top-0 left-16 lg:left-20 right-0 z-40 transition-all duration-500 border-b border-transparent ${isScrolled
          ? 'bg-white/10 backdrop-blur-md border-white/20 shadow-sm'
          : 'bg-transparent'
          }`}
        style={{ height: '80px' }}
      >
        <div className="h-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="group relative flex items-center z-50"
          >
            <img src="/logo-vidrio.png" alt="Vidrio AK Logo" className="h-10 lg:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 relative z-50" />
          </a>

          {/* Phone - Desktop */}
          <a
            href="tel:+525500000000"
            className="hidden lg:flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors duration-300 ml-8"
          >
            <Phone className="w-4 h-4" />
            <span>+52 (55) 0000 0000</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative text-sm text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-gold group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-gold transition-colors duration-300 hover:scale-110 transform">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/70 hover:text-gold transition-colors duration-300 hover:scale-110 transform">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-white/70 hover:text-gold transition-colors duration-300 hover:scale-110 transform">
              <User className="w-5 h-5" />
            </button>
            <button className="relative text-white/70 hover:text-gold transition-colors duration-300 hover:scale-110 transform">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-white/10 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="absolute inset-0 flex">
          {/* Close button area */}
          <div className="w-16 lg:w-20 flex flex-col items-center py-6 border-r border-white/20">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/70 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col justify-center px-12 lg:px-20">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-4xl lg:text-5xl font-light text-white hover:text-gold transition-colors duration-300 py-4"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.4s ease ${index * 100}ms`,
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Contact info in menu */}
            <div
              className="mt-12 pt-8 border-t border-white/10"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: 'opacity 0.4s ease 400ms',
              }}
            >
              <a
                href="tel:+525500000000"
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>+52 (55) 0000 0000</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
