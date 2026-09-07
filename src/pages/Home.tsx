import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Truck } from 'lucide-react';
import { categories, services, whatsappLink } from '@/data';
import { useCatalog } from '@/context/CatalogContext';
import ProductCard from '@/components/ProductCard';

const iconMap: Record<string, typeof Sparkles> = { Sparkles, Scissors: Sparkles, Star: Sparkles, Check };

export default function Home() {
  const { products } = useCatalog();
  const featured = products.slice(0, 4);
  const heroCategories = categories.slice(0, 5);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">The art of beautiful hair</p>
          <h1>
            Luxury hair.<br />
            <em>Timeless beauty.</em>
          </h1>
          <p className="hero-copy">
            Premium human hair, luxury wigs and personalized wig services for women who never compromise on quality.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="button button-gold">
              Shop the collection <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="text-button light">
              Book a wig service <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
          <span>Uyo · Nigeria</span>
        </div>
        <div className="hero-seal">
          <span>Since</span>
          <strong>2019</strong>
          <span>Beauty in every strand</span>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="intro-label">
          <span className="eyebrow">01 — The Sivia way</span>
          <span className="vertical-rule" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Your beauty, our passion</p>
          <h2>
            Made for the woman<br />
            <em>who knows her worth.</em>
          </h2>
          <p>
            At THE SIVIA NG, we believe beautiful hair is more than an accessory — it is a statement of
            confidence, elegance and individuality.
          </p>
          <p>
            From carefully selected luxury extensions to professionally crafted custom wigs and expert revamp
            services, every detail is considered so you can wear your beauty with ease.
          </p>
          <Link to="/about" className="text-button dark">
            Discover our story <ArrowRight size={16} />
          </Link>
        </div>
        <div className="intro-image">
          <img
            src="/images/products/Raw Vietnamese bone straight.jpeg"
            alt="Woman with elegant hair and soft makeup"
          />
          <div className="image-caption">
            A little luxury,<br />
            <em>every day.</em>
          </div>
        </div>
      </section>

      <section className="cream-section section-pad categories-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2>
              Shop by <em>collection</em>
            </h2>
          </div>
          <Link to="/products" className="text-button dark">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {heroCategories.map((category, index) => (
            <Link
              to={`/category/${category.slug}`}
              className={`category-card ${index === 0 ? 'category-wide' : ''}`}
              key={category.slug}
            >
              <img src={category.image} alt={category.name} />
              <span className="category-overlay" />
              <span className="category-name">
                {category.name}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-pad shop-section">
        <div className="section-heading shop-heading">
          <div>
            <p className="eyebrow">The edit</p>
            <h2>
              Luxury, <em>designed for you.</em>
            </h2>
          </div>
          <Link to="/products" className="text-button dark">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="shop-note">
          <span>
            <Sparkles size={17} /> Prices are tailored to length, weight and style.
          </span>
          <a
            href={whatsappLink('Hello THE SIVIA NG, I would like to request current pricing for your hair and wig collections.')}
            target="_blank"
            rel="noreferrer"
          >
            Request current price <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <section className="feature-split">
        <div className="feature-image">
          <img
            src="/images/products/Raw donor bounce.jpeg"
            alt="Woman with long flowing hair"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">The wig atelier</p>
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

      <section className="section-pad services-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The studio</p>
            <h2>
              Wig services, <em>elevated.</em>
            </h2>
          </div>
          <p className="heading-note">
            Personalized artistry and expert care,<br />from our hands to your crown.
          </p>
        </div>
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

      <section className="values-section section-pad">
        <div className="section-heading centered">
          <p className="eyebrow">Why The Sivia</p>
          <h2>
            The standard is <em>luxury.</em>
          </h2>
          <p>Every product and service is shaped by our promise to make you feel beautifully, unmistakably you.</p>
        </div>
        <div className="values-grid">
          {[
            ['01', 'Premium quality', 'Carefully selected luxury human hair.'],
            ['02', 'Expert craftsmanship', 'Professionally made wigs with an eye for detail.'],
            ['03', 'Personalized experience', 'Solutions designed around your beauty needs.'],
            ['04', 'Nationwide delivery', 'Luxury delivered to your doorstep across Nigeria.'],
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
          <Truck size={25} />
        </div>
        <div>
          <p className="eyebrow">Wherever you are</p>
          <h2>
            Luxury delivered<br />
            <em>to your doorstep.</em>
          </h2>
          <p>We deliver your favorite hair, wigs and wig products conveniently across Nigeria.</p>
        </div>
        <a
          className="button button-dark"
          href={whatsappLink('Hello THE SIVIA NG, I would like to place an order for delivery.')}
          target="_blank"
          rel="noreferrer"
        >
          Place an order on WhatsApp <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
