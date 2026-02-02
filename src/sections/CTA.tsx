import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-secondary)/50, transparent)' }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-8 block"
              style={{ color: 'var(--text-muted)' }}
            >
              Begin Your Journey
            </span>
          </div>

          {/* Headline */}
          <h2 
            className={`text-4xl sm:text-5xl lg:text-7xl font-display leading-tight mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Ready to create
            <span style={{ color: 'var(--text-muted)' }} className="italic block mt-2">something timeless?</span>
          </h2>

          {/* Subheadline */}
          <p 
            className={`text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            Join thousands of creators who have discovered the art of 
            preserving memories. Start free—no credit card required.
          </p>

          {/* CTA Button */}
          <div 
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button className="btn-elegant-primary text-base flex items-center gap-3 mx-auto group">
              <span>Create Your First Album</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div 
            className={`flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="text-center">
              <div className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>Free</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>to start</div>
            </div>
            <div className="w-px" style={{ background: 'var(--border-color)' }} />
            <div className="text-center">
              <div className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>No</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>credit card</div>
            </div>
            <div className="w-px" style={{ background: 'var(--border-color)' }} />
            <div className="text-center">
              <div className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>Cancel</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>anytime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
