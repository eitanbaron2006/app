import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Components', href: '#components' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onSignInClick: () => void;
}

const Navigation = ({ onSignInClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled 
            ? 'py-4 nav-glass' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="w-full px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <span className="text-xl font-display tracking-wide" style={{ color: 'var(--text-primary)' }}>
                Album<span style={{ color: 'var(--text-muted)' }}>Art</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="link-elegant text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button 
                onClick={onSignInClick}
                className="text-sm tracking-wide transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                Sign In
              </button>
              <button className="btn-elegant text-xs">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={toggleTheme}
                className="theme-toggle w-8 h-8"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-30 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 backdrop-blur-xl"
          style={{ background: 'rgba(var(--bg-primary), 0.98)' }}
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        <div 
          className={`absolute top-24 left-6 right-6 elegant-card rounded-2xl p-8 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg tracking-wide transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 flex flex-col gap-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSignInClick();
                }}
                className="w-full py-4 text-left tracking-wide transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                Sign In
              </button>
              <button className="btn-elegant-primary w-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
