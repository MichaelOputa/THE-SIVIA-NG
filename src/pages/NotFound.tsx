import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-pad empty-state">
      <p className="eyebrow">Page not found</p>
      <h1>
        Something went <em>astray.</em>
      </h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="button button-gold">
        Return home <ArrowRight size={16} />
      </Link>
    </div>
  );
}
