import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section className="about-hero">
        <img
          src="https://images.pexels.com/photos/38979627/pexels-photo-38979627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Elegant woman with long hair"
        />
        <div className="about-hero-shade" />
        <div className="about-hero-content">
          <p className="eyebrow light">The Sivia story</p>
          <h1>
            Your beauty,<br />
            <em>our passion.</em>
          </h1>
        </div>
      </section>

      <section className="page-pad about-content">
        <div className="about-text">
          <p className="eyebrow">Who we are</p>
          <h2>Made for the woman<br /><em>who knows her worth.</em></h2>
          <p>
            THE SIVIA NG is a luxury hair brand specializing in premium human hair, luxury wigs, professional
            wig making and expert wig revamp services. We provide high-quality hair and personalized wig
            solutions for women who value quality, beauty, confidence and timeless elegance.
          </p>
          <p>
            From carefully selected luxury hair extensions to professionally crafted custom wigs and expert
            wig revamp services, every service is delivered with attention to detail and a commitment to
            quality. THE SIVIA NG also offers wig tools, wig care products and professional wig-making
            training, making the brand a complete destination for luxury hair and wig services.
          </p>
          <Link to="/products" className="button button-gold">
            Shop the collection <ArrowRight size={16} />
          </Link>
        </div>
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/6100174/pexels-photo-6100174.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Woman with elegant hair"
          />
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="section-heading centered">
          <p className="eyebrow">Our promise</p>
          <h2>The standard is <em>luxury.</em></h2>
          <p>Every product and service is shaped by our promise to make you feel beautifully, unmistakably you.</p>
        </div>
        <div className="values-grid">
          {[
            ['01', 'Premium quality', 'Carefully selected luxury human hair.'],
            ['02', 'Expert craftsmanship', 'Professionally made wigs with an eye for detail.'],
            ['03', 'Personalized experience', 'Solutions designed around your beauty needs.'],
            ['04', 'Nationwide delivery', 'Luxury delivered to your doorstep across Nigeria.'],
            ['05', 'Professional wig services', 'From wig making to revamp and restoration.'],
            ['06', 'Luxury experience', 'Every product and service reflects quality, beauty and elegance.'],
          ].map(([number, title, text]) => (
            <div className="value-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="delivery-section">
        <div className="delivery-icon">
          <Check size={25} />
        </div>
        <div>
          <p className="eyebrow">Nationwide</p>
          <h2>
            Luxury delivered<br />
            <em>to your doorstep.</em>
          </h2>
          <p>We deliver your favorite hair, wigs and wig products conveniently across Nigeria.</p>
        </div>
        <Link to="/contact" className="button button-dark">
          Contact us <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
