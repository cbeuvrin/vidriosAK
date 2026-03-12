import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '../lib/LanguageContext';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert(t.contact.form.success);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t.contact.info.email,
      value: 'info@vidrioak.com',
      href: 'mailto:info@vidrioak.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t.contact.info.phone,
      value: '56 3560 3970',
      href: 'tel:5635603970',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t.contact.info.address,
      value: t.contact.info.addressValue,
      href: '#',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: t.contact.info.hours,
      value: t.contact.info.hoursValue,
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark-light overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/contact-bg.jpg"
          alt="Contact background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <div
              className={`mb-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gold">
                {t.contact.badge}
              </span>
            </div>

            <h2
              className={`text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-6 leading-tight transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t.contact.title}{' '}
              <span className="text-gold">{t.contact.titleHighlight}</span>
            </h2>

            <p
              className={`text-white/70 mb-10 leading-relaxed transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {t.contact.description}
            </p>

            {/* Contact Info */}
            <div
              className={`space-y-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-center gap-4 text-white/80 hover:text-gold transition-colors duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-white/5 group-hover:bg-gold/10 transition-colors duration-300">
                    <span className="text-gold">{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm">{item.value}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-sm p-8 lg:p-10"
            >
              <h3 className="text-xl font-medium text-white mb-6">
                {t.contact.form.legend}
              </h3>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-white/70 text-sm mb-2 block">
                    {t.contact.form.name}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email" className="text-white/70 text-sm mb-2 block">
                      {t.contact.form.email}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/70 text-sm mb-2 block">
                      {t.contact.form.phone}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20"
                      placeholder={t.contact.form.phonePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white/70 text-sm mb-2 block">
                    {t.contact.form.message}
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-light text-dark font-medium py-6 transition-all duration-300 hover:shadow-glow disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      {t.contact.form.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t.contact.form.submit}
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
