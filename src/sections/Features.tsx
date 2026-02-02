import { useEffect, useRef, useState } from 'react';
import { Layers, Sliders, Printer, Package, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Effortless Creation',
    description: 'Drag and drop your photos. Our intelligent layout engine arranges everything beautifully.',
    image: '/feature-editing.jpg',
  },
  {
    icon: Sliders,
    title: 'Professional Tools',
    description: 'Fine-tune every detail with advanced editing capabilities and premium filters.',
    image: '/feature-album.jpg',
  },
  {
    icon: Printer,
    title: 'Museum Quality',
    description: 'Archival-grade paper, expert binding, and meticulous attention to every detail.',
    image: '/feature-printing.jpg',
  },
  {
    icon: Package,
    title: 'White Glove Delivery',
    description: 'Your memories arrive in elegant packaging, ready to be cherished for generations.',
    image: '/feature-delivery.jpg',
  },
];

const Features = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div 
          className={`max-w-2xl mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span 
            className="text-sm tracking-[0.3em] uppercase mb-6 block"
            style={{ color: 'var(--text-muted)' }}
          >
            The Experience
          </span>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-display leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Everything you need to create
            <span style={{ color: 'var(--text-muted)' }} className="italic block mt-2"> perfection</span>
          </h2>
          <p 
            className="text-lg leading-relaxed font-light"
            style={{ color: 'var(--text-secondary)' }}
          >
            A complete platform designed for those who appreciate the art of preservation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="elegant-card rounded-2xl overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--bg-card), transparent, transparent)' }}
                  />
                  
                  {/* Icon */}
                  <div 
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ 
                      background: 'var(--bg-input)',
                      borderColor: 'var(--border-color)'
                    }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 
                      className="text-xl font-display transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {feature.title}
                    </h3>
                    <ArrowUpRight 
                      className="w-5 h-5 transition-colors" 
                      style={{ color: 'var(--text-muted)' }}
                    />
                  </div>
                  <p 
                    className="leading-relaxed font-light"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
