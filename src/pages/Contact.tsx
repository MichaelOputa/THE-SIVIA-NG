import { Clock3, Instagram, MapPin, MessageCircle, Send } from 'lucide-react';
import { TikTokIcon } from '@/components/icons/BrandIcons';
import { whatsappLink } from '@/data';

export default function Contact() {
  return (
    <div className="page-pad contact-section">
      <div className="contact-copy">
        <p className="eyebrow">Come say hello</p>
        <h1>
          Let's create<br />
          <em>your next look.</em>
        </h1>
        <p>
          Have a question, a special request or a wig that needs some love? We are here to help.
        </p>
        <div className="contact-details">
          <span><MapPin size={16} />Uyo, Akwa Ibom State, Nigeria</span>
          <span><MessageCircle size={16} />0912 132 5113</span>
          <span><Clock3 size={16} />Monday – Saturday · 8:00 AM – 6:00 PM</span>
        </div>
        <div className="contact-socials">
          <a href="https://instagram.com/thesivia_ng" target="_blank" rel="noreferrer">
            <Instagram size={17} />Instagram
          </a>
          <a href="https://www.tiktok.com/@the_sivia" target="_blank" rel="noreferrer">
            <TikTokIcon size={17} />TikTok
          </a>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(whatsappLink('Hello THE SIVIA NG, I would like to make an enquiry.'), '_blank');
        }}
      >
        <label>
          Your name
          <input required placeholder="Jane Doe" />
        </label>
        <label>
          Email address
          <input type="email" required placeholder="you@example.com" />
        </label>
        <label>
          How can we help?
          <textarea required placeholder="Tell us a little about what you are looking for..." rows={4} />
        </label>
        <button className="button button-gold" type="submit">
          Send an enquiry <Send size={16} />
        </button>
      </form>
    </div>
  );
}