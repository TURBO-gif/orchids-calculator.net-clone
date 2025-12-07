import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-10 px-5 font-footer">
      <div className="max-w-[1100px] mx-auto text-center text-[12px] leading-[1.7] text-[#333]">
        <p className="mb-4">
          Calculator.net's sole focus is to provide fast, comprehensive, convenient, free online calculators in a plethora of areas. Currently, we have around 200 calculators to help you "do the math" quickly in areas such as finance, fitness, health, math, and others, and we are still developing more. Our goal is to become the one-stop, go-to site for people who need to make quick calculations. Furthermore, we believe the internet should be a source of free information. Therefore, all of our tools and services are completely free, with no registration required.
        </p>
        <p className="mb-6">
          We coded and developed each calculator individually and put each one through strict, comprehensive testing. However, please inform us if you notice even the slightest error – your input is extremely valuable to us. While most calculators on Calculator.net are designed to be universally applicable for worldwide usage, some are for specific countries only.
        </p>
        <div className="text-[12px] text-muted-foreground">
          <div className="mb-2">
            <a href="/about" className="text-link hover:text-link-hover hover:underline">about us</a>
            <span className="mx-2">|</span>
            <a href="/sitemap" className="text-link hover:text-link-hover hover:underline">sitemap</a>
            <span className="mx-2">|</span>
            <a href="/terms" className="text-link hover:text-link-hover hover:underline">terms of use</a>
            <span className="mx-2">|</span>
            <a href="/privacy" className="text-link hover:text-link-hover hover:underline">privacy policy</a>
          </div>
          <div>
            © 2008 - 2025 calculator.net
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;