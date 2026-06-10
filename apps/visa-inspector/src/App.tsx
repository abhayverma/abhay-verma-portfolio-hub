import { Navigation, Footer } from '@portfolio/shared-ui';
import { InspectorDashboard } from './components/InspectorDashboard';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Global Navigation */}
      <Navigation currentApp="Visa Inspector" mainDomain="https://abhayverma.com" />

      {/* 2. Main Page Container */}
      <main className="flex-grow py-12 px-4 md:px-8 mt-20"> 
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Global Tech Visa Inspector
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Client-side regulatory threshold mapping for premium international engineering tracks. 
              Analyze legal entry windows, net tax impact, and relative purchasing power.
            </p>
          </div>
          
          <InspectorDashboard />
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer mainDomain="https://abhayverma.com" />
      
    </div>
  );
}

export default App;