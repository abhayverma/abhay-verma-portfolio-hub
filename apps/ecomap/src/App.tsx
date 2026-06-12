import { Navigation, Footer } from '@portfolio/shared-ui';
import { EcoMapDashboard } from './components/EcoMapDashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      <Navigation currentApp="EcoMap" mainDomain="https://abhayverma.com" />

      <main className="flex-grow py-12 px-4 md:px-8 mt-20"> 
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 font-serif">
              EcoMap: Native Flora & Conservation Oracle
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans">
              Geospatial engine tracking regional native botanical profiles, local micro-extinction historical logs, and newly verified civic source lineages.
            </p>
          </div>

          <EcoMapDashboard />
        </div>
      </main>

      <Footer mainDomain="https://abhayverma.com" />
      
    </div>
  );
}

export default App;