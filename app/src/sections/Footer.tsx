import { Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { label: 'Vidrio Blindado', href: '#products' },
    { label: 'Vidrio Laminado', href: '#products' },
    { label: 'Vidrio Templado', href: '#products' },
    { label: 'Vidrio Anti-huracán', href: '#products' },
  ];

  const companyLinks = [
    { label: 'Nosotros', href: '#about' },
    { label: 'Certificaciones', href: '#about' },
    { label: 'Proceso', href: '#about' },
    { label: 'Proyectos', href: '#products' },
  ];

  const supportLinks = [
    { label: 'FAQ', href: '#' },
    { label: 'Instalación', href: '#' },
    { label: 'Garantía', href: '#' },
    { label: 'Contacto', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative w-full bg-dark pt-20 pb-8 overflow-hidden ml-16 lg:ml-20">
      {/* Large watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[20vw] font-light text-white/[0.02] whitespace-nowrap select-none">
          Vidrio AK
        </span>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 relative z-50">
            <a href="#hero" className="inline-block mb-6 transition-opacity duration-300 hover:opacity-80 relative z-50">
              <img src="/logo-vidrio.png" alt="Vidrio AK Logo" className="h-14 lg:h-16 w-auto object-contain relative z-50" />
            </a>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Seguridad y elegancia en cada proyecto. 18 años de experiencia
              fabricando vidrios blindados y arquitectónicos de la más alta
              calidad.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-sm bg-white/5 text-white/60 hover:bg-gold/10 hover:text-gold transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              Productos
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              Soporte
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Vidrio AK. Todos los derechos
            reservados.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
            >
              Términos de Servicio
            </a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-sm bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-all duration-300"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
