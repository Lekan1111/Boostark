import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import CoinGrid from './components/CoinGrid';
import ParticlesBackground from './components/ParticlesBackground';
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <div className="content-wrapper relative z-10">
        <Header />
        <StatsBanner />
        <main className="container mx-auto px-6 py-8">
          <CoinGrid />
        </main>
        <Footer />
      </div>
    </div>
  );
}