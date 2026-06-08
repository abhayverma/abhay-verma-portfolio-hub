import { Navigation, Footer } from '@portfolio/shared-ui';
import { TaxCalculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Global Navigation */}
      {/* FIXED: Added currentApp and mainDomain to enable cross-subdomain redirection */}
      <Navigation currentApp="Finance" mainDomain="https://abhayverma.com" />

      {/* 2. Micro-App Engine */}
      {/* The flex-grow ensures the footer stays at the bottom even on massive monitors */}
      <main className="flex-grow py-12 px-4 md:px-8 mt-20"> 
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Wealth & Tax Simulator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced financial projection engine calculating real-world inflation erosion, 
              compound growth, and structured asset allocation.
            </p>
          </div>
          
          <TaxCalculator />
        </div>
      </main>

      {/* 3. Global Footer */}
      {/* Passing the main domain ensures the quick links route correctly back to the main site */}
      <Footer mainDomain="https://abhayverma.com" />
      
    </div>
  );
}

export default App;