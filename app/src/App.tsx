import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import Features from './sections/Features';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Header />
      <main className="ml-16 lg:ml-20">
        <Hero />
        <About />
        <Products />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
