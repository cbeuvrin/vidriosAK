import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const FloatingWhatsApp = () => {
  const phoneNumber = '5568186170';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const { t } = useLanguage();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-dark-light text-white text-xs whitespace-nowrap rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gold/20 backdrop-blur-md">
        {t.whatsapp.tooltip}
      </span>
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default FloatingWhatsApp;
