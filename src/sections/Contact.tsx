import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-6 block"
              style={{ color: 'var(--text-muted)' }}
            >
              Get In Touch
            </span>
          </div>
          
          <h2 
            className={`text-4xl sm:text-5xl lg:text-6xl font-display leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Let's Create
            <span style={{ color: 'var(--text-muted)' }} className="italic block mt-2">Something Beautiful</span>
          </h2>
          
          <p 
            className={`text-lg leading-relaxed font-light transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            Have a question or ready to start your project? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Email Card */}
            <div 
              className={`elegant-card p-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-input)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <h3 className="font-display mb-2" style={{ color: 'var(--text-primary)' }}>Email</h3>
                  <a 
                    href="mailto:hello@albumart.com"
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    hello@albumart.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              className={`elegant-card p-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-input)' }}
                >
                  <Phone className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <h3 className="font-display mb-2" style={{ color: 'var(--text-primary)' }}>Phone</h3>
                  <a 
                    href="tel:+15551234567"
                    className="text-sm transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div 
              className={`elegant-card p-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--bg-input)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <h3 className="font-display mb-2" style={{ color: 'var(--text-primary)' }}>Office</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    123 Creative Street<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-2 elegant-card p-8 lg:p-10 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h3
              className="text-2xl font-display mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              Send us a message
            </h3>

            {isSubmitted && (
              <div
                className="mb-6 p-4 rounded-lg"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <p style={{ color: 'var(--text-secondary)' }}>
                  ✓ Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm mb-2 tracking-wide"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-elegant px-4 py-3 rounded-lg w-full"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm mb-2 tracking-wide"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-elegant px-4 py-3 rounded-lg w-full"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  className="block text-sm mb-2 tracking-wide"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="input-elegant px-4 py-3 rounded-lg w-full"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-sm mb-2 tracking-wide"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project..."
                  className="textarea-elegant px-4 py-3 rounded-lg w-full"
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-elegant-primary w-full md:w-auto flex items-center justify-center gap-3 group"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

