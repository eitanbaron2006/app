import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Wedding Photographer',
    avatar: 'https://picsum.photos/200/200?random=1',
    quote: 'AlbumArt has completely transformed how I deliver work to my clients. The quality is unmatched, and the process is seamless. My couples are always thrilled.',
  },
  {
    name: 'David Chen',
    role: 'Family Historian',
    avatar: 'https://picsum.photos/200/200?random=2',
    quote: 'Finally, a way to preserve family memories that feels as significant as the moments themselves. Every album becomes a treasured heirloom.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Travel Creator',
    avatar: 'https://picsum.photos/200/200?random=3',
    quote: 'The attention to detail is extraordinary. From the paper quality to the binding—everything speaks of craftsmanship and care.',
  },
  {
    name: 'Michael Thompson',
    role: 'Professional Photographer',
    avatar: 'https://picsum.photos/200/200?random=4',
    quote: 'I\'ve tried many album services, but AlbumArt stands out. The print quality is museum-grade, and my clients can\'t stop raving about their albums.',
  },
  {
    name: 'Lisa Anderson',
    role: 'Event Planner',
    avatar: 'https://picsum.photos/200/200?random=5',
    quote: 'Creating albums for my clients has never been easier. The interface is intuitive, and the final product always exceeds expectations.',
  },
  {
    name: 'James Wilson',
    role: 'Documentary Filmmaker',
    avatar: 'https://picsum.photos/200/200?random=6',
    quote: 'The perfect way to preserve my film stills. Each album tells a story, and the craftsmanship ensures they\'ll last for generations.',
  },
];

const Testimonials = () => {
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
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span 
            className="text-sm tracking-[0.3em] uppercase mb-6 block"
            style={{ color: 'var(--text-muted)' }}
          >
            Testimonials
          </span>
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-display"
            style={{ color: 'var(--text-primary)' }}
          >
            Loved by <span style={{ color: 'var(--text-muted)' }} className="italic">thousands</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="elegant-card rounded-2xl p-8 h-full relative">
                {/* Quote Mark - inside card */}
                <div
                  className="absolute top-4 left-6 text-6xl font-display leading-none"
                  style={{ color: 'var(--text-muted)', opacity: 0.15 }}
                >
                  "
                </div>

                {/* Quote */}
                <p
                  className="leading-relaxed font-light mb-8 relative z-10 pt-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div 
                  className="flex items-center gap-4 pt-6 border-t"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <div style={{ color: 'var(--text-primary)' }}>{testimonial.name}</div>
                    <div style={{ color: 'var(--text-muted)' }} className="text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
