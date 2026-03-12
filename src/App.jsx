import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollLine from './components/ui/ScrollLine';
import HeroSection from './components/sections/HeroSection';
import WhyMotionSection from './components/sections/WhyMotionSection';
import ServicesSection from './components/sections/ServicesSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import ComponentLibrary from './components/sections/ComponentLibrary';
import DevFriendlySection from './components/sections/DevFriendlySection';
import ContactSection from './components/sections/ContactSection';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <ScrollLine />
        <main className="main">
          <HeroSection />
          <WhyMotionSection />
          <ServicesSection />
          <ShowcaseSection />
          <ComponentLibrary />
          <DevFriendlySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
