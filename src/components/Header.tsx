import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { useCart } from '@/context/CartContext';
import { categoryGroups, whatsappLink } from '@/data';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="announcement">
          <span>Nationwide delivery across Nigeria</span>
          <span className="announcement-dot">·</span>
          <span>Premium hair. Timeless beauty.</span>
          <span className="announcement-dot">·</span>
          <span>Enquire via WhatsApp</span>
        </div>

        <div className="header-top">
          <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={21} />
          </button>
          <button className="header-search mobile-hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={18} />
          </button>
          <Link to="/" className="logo-center" aria-label="THE SIVIA NG home">
            <img
              src="/images/Sivia.png"
              alt="THE SIVIA NG"
              style={{ filter: 'drop-shadow(0 0 10px rgba(195,154,84,0.35))' }}
            />
          </Link>
          <div className="header-actions">
            <button className="header-search desktop-hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={18} />
            </button>
            <a
              className="header-whatsapp"
              href={whatsappLink('Hello THE SIVIA NG, I would like to make an enquiry about your products and services.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={16} color="#25D366" />
              <span>WhatsApp us</span>
            </a>
            <Link to="/cart" className="bag-button" aria-label="Shopping bag">
              <ShoppingBag size={19} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>

        <nav className="navbar" aria-label="Main navigation">
          <div className="navbar-inner">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>

            <div
              className="dropdown-wrapper"
              onMouseEnter={() => handleDropdownEnter('Shop')}
              onMouseLeave={handleDropdownLeave}
            >
              <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Products <ChevronDown size={12} />
              </NavLink>
              {openDropdown === 'Shop' && (
                <div className="dropdown-menu mega">
                  {categoryGroups.map((group) => (
                    <div className="dropdown-group" key={group.label}>
                      <p className="dropdown-group-label">{group.label}</p>
                      {group.items.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/category/${cat.slug}`}
                          className="dropdown-link"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {categoryGroups.map((group) => (
              <div
                key={group.label}
                className="dropdown-wrapper"
                onMouseEnter={() => handleDropdownEnter(group.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="nav-link">
                  {group.label} <ChevronDown size={12} />
                </button>
                {openDropdown === group.label && (
                  <div className="dropdown-menu">
                    {group.items.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className="dropdown-link"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Services
            </NavLink>
            <NavLink to="/training" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Training
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <Link to="/" className="wordmark" onClick={() => setMobileOpen(false)}>
                THE SIVIA <b>NG</b>
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={21} />
              </button>
            </div>
            <div className="drawer-links">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)}>All Products</Link>
              {categoryGroups.map((group) => (
                <div key={group.label} className="drawer-group">
                  <p className="drawer-group-label">{group.label}</p>
                  {group.items.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link to="/services" onClick={() => setMobileOpen(false)}>Services</Link>
              <Link to="/training" onClick={() => setMobileOpen(false)}>Training</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
            <a
              className="button button-gold"
              href={whatsappLink('Hello THE SIVIA NG, I would like to make an enquiry.')}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp <WhatsAppIcon size={16} />
            </a>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={21} />
            </button>
            <p className="eyebrow">Search the edit</p>
            <form className="search-input" onSubmit={handleSearch}>
              <Search size={19} />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try “wig”, “hair” or “care”"
              />
            </form>
            <button className="button button-gold" onClick={handleSearch}>
              View results
            </button>
          </div>
        </div>
      )}
    </>
  );
}