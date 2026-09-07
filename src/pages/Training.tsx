import { ArrowRight, Check } from 'lucide-react';
import { trainingAreas, whatsappLink } from '@/data';

export default function Training() {
  return (
    <div>
      <section className="training-section">
        <div className="training-image">
          <img
            src="https://images.pexels.com/photos/38979627/pexels-photo-38979627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Elegant woman with long hair"
          />
        </div>
        <div className="training-copy">
          <p className="eyebrow">The Sivia academy</p>
          <h1>
            Learn the art<br />
            <em>of wig making.</em>
          </h1>
          <p>
            Turn your passion into a professional skill with practical techniques and luxury-quality methods
            that help you create beautiful, durable wigs.
          </p>
          <div className="training-areas">
            {trainingAreas.map((area) => (
              <span key={area}>
                <Check size={14} />
                {area}
              </span>
            ))}
          </div>
          <a
            className="button button-gold"
            href={whatsappLink('Hello THE SIVIA NG, I would like to enquire about Wig Making Training.')}
            target="_blank"
            rel="noreferrer"
          >
            Enquire about training <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="section-heading centered">
          <p className="eyebrow">Why train with us</p>
          <h2>
            The standard is <em>excellence.</em>
          </h2>
          <p>Our training combines practical techniques with luxury-quality standards, so you leave with real skills.</p>
        </div>
        <div className="values-grid">
          {[
            ['01', 'Hands-on practice', 'Learn by doing with real materials and expert guidance.'],
            ['02', 'Professional methods', 'Techniques used by working wig makers in the industry.'],
            ['03', 'Luxury quality focus', 'Create wigs that meet the highest beauty standards.'],
            ['04', 'Flexible scheduling', 'Training designed to fit your life and commitments.'],
          ].map(([number, title, text]) => (
            <div className="value-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
