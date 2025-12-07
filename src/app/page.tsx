import Header from '@/components/sections/header';
import CalculatorHero from '@/components/sections/calculator-hero';
import CalculatorCategories from '@/components/sections/calculator-categories';
import Footer from '@/components/sections/footer';

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[60px]">
        <CalculatorHero />
        <CalculatorCategories />
      </main>
      <Footer />
    </div>
  );
}