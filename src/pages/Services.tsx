import { Link } from 'react-router-dom';
import { ArrowRight, Check, Scissors, Sparkles, Star } from 'lucide-react';
import { services, whatsappLink } from '@/data';

const iconMap: Record<string, typeof Sparkles> = { Sparkles, Scissors, Star, Check };

export default function Services() {
  return (
    <div>
      <section className="page-header-section section-pad">
        <div className="page-header">
          <p className="eyebrow">The studio</p>
          <h1>
            Wig services, <em>elevated.</em>
          </h1>
          <p className="page-subtitle">
            Personalized artistry and expert care, from our hands to your crown.
          </p>
        </div>
      </section>

      <section className="section-pad services-section">
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <article className="service-card" key={service.title}>
                <span className="service-number">0{index + 1}</span>
                <Icon size={25} strokeWidth={1.2} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a
                  href={whatsappLink(`Hello THE SIVIA NG, I would like to book ${service.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book this service <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="feature-split">
        <div className="feature-image">
          <img
            src="https://images.pexels.com/photos/13221803/pexels-photo-13221803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Luxury wig styling"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">The atelier</p>
          <h2>
            Effortless beauty.<br />
            <em>Perfectly crafted.</em>
          </h2>
          <p>
            From ready-to-wear silhouettes to custom luxury wigs made just for you, your next signature look
            begins here.
          </p>
          <div className="feature-list">
            <span>01 <b>Ready-to-wear wigs</b></span>
            <span>02 <b>Custom luxury wigs</b></span>
            <span>03 <b>Frontal & closure wigs</b></span>
            <span>04 <b>Machine-made wigs</b></span>
          </div>
          <div className="feature-buttons">
            <Link to="/category/luxury-wigs" className="button button-dark">
              Shop luxury wigs <ArrowRight size={16} />
            </Link>
            <a
              className="text-button dark"
              href={whatsappLink('Hello THE SIVIA NG, I would like to order a custom luxury wig.')}
              target="_blank"
              rel="noreferrer"
            >
              Order a custom wig <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="delivery-section">
        <div className="delivery-icon">
          <Check size={25} />
        </div>
        <div>
          <p className="eyebrow">Ready to book?</p>
          <h2>
            Let's create<br />
            <em>your next look.</em>
          </h2>
          <p>Reach out on WhatsApp to book any of our wig services.</p>
        </div>
        <a
          className="button button-dark"
          href={whatsappLink('Hello THE SIVIA NG, I would like to book a wig service.')}
          target="_blank"
          rel="noreferrer"
        >
          Book on WhatsApp <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
