import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center">
      <div className="w-full px-8 lg:px-16 xl:px-24 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-10">
            {/* Eyebrow */}
            <div 
              className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <span 
                className="text-sm tracking-[0.3em] uppercase font-light"
                style={{ color: 'var(--text-muted)' }}
              >
                Digital to Physical
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-display leading-[1.1] transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ color: 'var(--text-primary)' }}
              >
                Craft Your
              </h1>
              <h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-display leading-[1.1] transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ color: 'var(--text-primary)' }}
              >
                Memories Into
              </h1>
              <h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-display leading-[1.1] italic transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ color: 'var(--text-muted)' }}
              >
                Timeless Art
              </h1>
            </div>

            {/* Subheadline */}
            <p 
              className={`text-lg max-w-md leading-relaxed font-light transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ color: 'var(--text-secondary)' }}
            >
              Transform your digital moments into beautifully crafted photo albums. 
              Drag, design, and deliver—effortlessly.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button
                onClick={() => navigate('/albums')}
                className="btn-elegant-primary flex items-center gap-3 group"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-elegant">
                View Gallery
              </button>
            </div>

            {/* Stats */}
            <div 
              className={`flex gap-10 pt-10 border-t transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div>
                <div className="text-3xl font-display" style={{ color: 'var(--text-primary)' }}>12K+</div>
                <div className="text-sm mt-1 tracking-wide" style={{ color: 'var(--text-muted)' }}>Albums Created</div>
              </div>
              <div>
                <div className="text-3xl font-display" style={{ color: 'var(--text-primary)' }}>4.9</div>
                <div className="text-sm mt-1 tracking-wide" style={{ color: 'var(--text-muted)' }}>Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-display" style={{ color: 'var(--text-primary)' }}>48h</div>
                <div className="text-sm mt-1 tracking-wide" style={{ color: 'var(--text-muted)' }}>Delivery Time</div>
              </div>
            </div>
          </div>

          {/* Bento Grid Gallery */}
          <div
            className={`relative transition-all duration-1200 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[600px]">

              {/* Large Image - Top Left (2x2) */}
              <div
                className={`col-span-2 row-span-2 transition-all duration-700 delay-300 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/400/400?random=1"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-sm font-light tracking-wide">Premium Album</span>
                  </div>
                </div>
              </div>

              {/* Tall Image - Top Right (1x2) */}
              <div
                className={`col-span-2 row-span-2 transition-all duration-700 delay-400 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/400/400?random=2"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Small Image - Middle Left */}
              <div
                className={`col-span-1 row-span-1 transition-all duration-700 delay-500 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/200/200?random=3"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Wide Image - Middle (2x1) */}
              <div
                className={`col-span-2 row-span-1 transition-all duration-700 delay-600 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/400/200?random=4"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Small Image - Middle Right */}
              <div
                className={`col-span-1 row-span-1 transition-all duration-700 delay-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/200/200?random=5"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Wide Image - Bottom Left (2x1) */}
              <div
                className={`col-span-2 row-span-1 transition-all duration-700 delay-800 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/400/200?random=6"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Small Images - Bottom Right (2x1 split) */}
              <div
                className={`col-span-1 row-span-1 transition-all duration-700 delay-900 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/200/200?random=7"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              <div
                className={`col-span-1 row-span-1 transition-all duration-700 delay-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <div className="relative w-full h-full elegant-card overflow-hidden group cursor-pointer">
                  <img
                    src="https://picsum.photos/200/200?random=8"
                    alt="Album Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

             {/* Floating Tag on last image */}
            <div className="absolute -bottom-3 -right-3 elegant-card px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: 'var(--text-muted)' }}
                />
                <span className="text-xs tracking-wide whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                  8+ Albums
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
