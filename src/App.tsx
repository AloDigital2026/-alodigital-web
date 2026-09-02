import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { SavingsCalculator } from './components/SavingsCalculator';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f7] selection:bg-[#30D158] selection:text-black font-sans">
      <Header />
      <main className="relative overflow-hidden">
        {/* Sophisticated Dark background ambient glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#30D158]/[0.035] blur-[150px] rounded-full" />
          <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-[#0A84FF]/[0.02] blur-[180px] rounded-full" />
          <div className="absolute bottom-[15%] left-[-5%] w-[500px] h-[500px] bg-[#FF9F0A]/[0.02] blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10">
          <Hero />
          <ProblemSection />
          <SolutionSection />
          <SavingsCalculator />
          <PricingSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}


