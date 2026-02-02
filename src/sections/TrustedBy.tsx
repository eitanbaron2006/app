import { useEffect, useRef, useState } from 'react';

const partners = [
  'Vogue',
  'Kinfolk',
  'Cereal',
  'Monocle',
  'Wallpaper*',
  'Dwell',
];

const TrustedBy = () => {
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
    <section ref={sectionRef} className="relative py-20">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Title */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p 
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Trusted by creators worldwide
          </p>
        </div>

        {/* Partners Track */}
        <div className="relative overflow-hidden">
          <div 
            className="absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
          />
          <div 
            className="absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
          />
          
          <div 
            className={`flex gap-16 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: 'scroll-left 35s linear infinite',
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div 
                key={index}
                className="flex-shrink-0 text-2xl font-display tracking-wide transition-colors duration-500 cursor-default"
                style={{ color: 'var(--text-muted)' }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};

export default TrustedBy;
