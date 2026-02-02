import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Templates', href: '#templates' },
    { label: 'Print Options', href: '#print' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press', href: '#press' },
  ],
  support: [
    { label: 'Help Center', href: '#help' },
    { label: 'Contact', href: '#contact' },
    { label: 'Shipping', href: '#shipping' },
    { label: 'Returns', href: '#returns' },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative pt-24 pb-12">
      {/* Top Divider */}
      <div className="divider-elegant mb-16" />

      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
                Album<span style={{ color: 'var(--text-muted)' }}>Art</span>
              </span>
            </div>
            <p 
              className="mb-8 max-w-sm leading-relaxed font-light"
              style={{ color: 'var(--text-muted)' }}
            >
              Transforming digital moments into timeless physical art. 
              Crafted with care, delivered with love.
            </p>
            
            {/* Newsletter */}
            <div>
              <p 
                className="text-sm mb-4 tracking-wide"
                style={{ color: 'var(--text-secondary)' }}
              >
                Stay inspired
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input-elegant px-4 py-3 rounded-lg text-sm flex-1"
                />
                <button 
                  type="submit"
                  className="px-4 py-3 rounded-lg transition-colors"
                  style={{ background: 'var(--bg-input)' }}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for subscribing.
                </p>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 
              className="text-sm tracking-wide mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Product
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 
              className="text-sm tracking-wide mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 
              className="text-sm tracking-wide mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {/* Copyright */}
          <div 
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            © 2024 AlbumArt. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#privacy" 
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
