import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TrustedBy from './sections/TrustedBy';
import Features from './sections/Features';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import ComponentsShowcase from './sections/ComponentsShowcase';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import SignInModal from './components/SignInModal';
import ScrollToTop from './components/ScrollToTop';
import MyAlbums from './pages/MyAlbums';
import AlbumEditor from './pages/AlbumEditor';
import './App.css';

// Landing Page Component
function LandingPage({ onSignInClick }: { onSignInClick: () => void }) {
  return (
    <>
      <Navigation onSignInClick={onSignInClick} />
      <main>
        <Hero />
        <TrustedBy />
        <section id="features">
          <Features />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <ComponentsShowcase />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen concrete-bg vignette">
          {/* Content */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage onSignInClick={() => setIsSignInOpen(true)} />} />
              <Route path="/albums" element={<MyAlbums />} />
              <Route path="/album/:id/edit" element={<AlbumEditor />} />
            </Routes>
          </div>

          {/* Sign In Modal */}
          <SignInModal
            isOpen={isSignInOpen}
            onClose={() => setIsSignInOpen(false)}
          />

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
