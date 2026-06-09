import { Navigation, Footer } from '@portfolio/shared-ui';
import { OracleEngine } from './components/OracleEngine';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Global Navigation with Domain Routing */}
      <Navigation currentApp="Domain Oracle" mainDomain="https://abhayverma.com" />

      {/* 2. Micro-App Engine */}
      <main className="flex-grow py-12 px-4 md:px-8 mt-20"> 
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Global Domain Oracle
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Client-side domain availability engine featuring semantic name suggestions, 
              zero-latency DNS lookups, and an interactive history cache.
            </p>
          </div>
          
          <OracleEngine />
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer mainDomain="https://abhayverma.com" />
      
    </div>
  );
}

export default App;