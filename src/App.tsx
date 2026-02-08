import StarryBackground from './components/StarryBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen font-sans text-starlight-white bg-deep-space">
      <StarryBackground />
      <Navigation />
      <main>
        <Hero />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      <footer className="py-6 text-center text-starlight-white/40 text-sm relative z-10 bg-deep-space">
        <p>&copy; {new Date().getFullYear()} Alex Star. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
