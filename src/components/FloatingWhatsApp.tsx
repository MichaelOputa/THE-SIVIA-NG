import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { whatsappLink } from '@/data';

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappLink('Hello THE SIVIA NG, I would like to make an enquiry about your products and services.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}