import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out our platform',
    features: [
      '1 photo album',
      'Up to 20 photos per album',
      'Basic layouts',
      'Standard quality print',
      'Digital download',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Basic',
    price: '$19',
    period: 'per month',
    description: 'Great for personal use',
    features: [
      '5 photo albums',
      'Up to 100 photos per album',
      'All layout templates',
      'Premium quality print',
      'Digital download',
      'Cloud storage',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$49',
    period: 'per month',
    description: 'For professionals and enthusiasts',
    features: [
      'Unlimited photo albums',
      'Unlimited photos',
      'All layout templates',
      'Museum quality print',
      'Digital download',
      'Unlimited cloud storage',
      'Priority support',
      'AI-powered layouts',
      'Custom branding',
      'Bulk export',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

const Pricing = () => {
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
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-white to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-elegant relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-5xl md:text-6xl mb-6 uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Pricing Plans
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Choose the perfect plan for your needs. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`elegant-card relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${plan.popular ? 'md:-translate-y-4' : ''}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                borderColor: plan.popular ? 'var(--accent-primary)' : 'var(--border-color)',
                borderWidth: plan.popular ? '2px' : '1px',
              }}
            >
              <div className="p-8">
                {/* Popular badge - inside card */}
                {plan.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)',
                      borderRadius: '12px 12px 0 0',
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Most Popular</span>
                  </div>
                )}

                <div className={plan.popular ? 'mt-12' : ''}>
                  {/* Plan name */}
                  <h3 className="font-display text-2xl uppercase tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl" style={{ color: 'var(--text-primary)' }}>
                        {plan.price}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={plan.popular ? 'btn-elegant-primary w-full mb-8' : 'btn-elegant w-full mb-8'}>
                    {plan.cta}
                  </button>

                  {/* Features list */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: plan.popular ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

