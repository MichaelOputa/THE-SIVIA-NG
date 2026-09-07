import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { WhatsAppIcon, TikTokIcon } from '@/components/icons/BrandIcons';
import { whatsappLink } from '@/data';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          src="/images/Sivia.png"
          alt="THE SIVIA NG logo"
          style={{ filter: 'drop-shadow(0 0 10px rgba(195,154,84,0.35))' }}
        />
        <p>Your beauty, our passion.</p>
      </div>
      <div className="footer-links">
        <div>
          <span>Explore</span>
          <Link to="/products">Shop</Link>
          <Link to="/category/luxury-wigs">Luxury Wigs</Link>
          <Link to="/category/luxury-human-hair">Luxury Hair</Link>
          <Link to="/services">Services</Link>
          <Link to="/training">Training</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <span>Contact</span>
          <a href={whatsappLink('Hello THE SIVIA NG, I would like to make an enquiry.')} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={14} /> WhatsApp us
          </a>
          <a href="https://instagram.com/thesivia_ng" target="_blank" rel="noreferrer">
            <Instagram size={14} /> Instagram
          </a>
          <a href="https://www.tiktok.com/@the_sivia" target="_blank" rel="noreferrer">
            <TikTokIcon size={14} /> TikTok
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 THE SIVIA NG. All rights reserved.</span>
        <span>Made for beautiful beginnings.</span>
      </div>
    </footer>
  );
}