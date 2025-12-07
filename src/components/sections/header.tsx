import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary font-body">
      <div className="mx-auto flex h-[60px] max-w-[1100px] items-center justify-between px-5">
        <Link href="/">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/svgs/calculator-white-1.svg"
            alt="Calculator.net"
            width={208}
            height={22}
            priority
          />
        </Link>
        <nav>
          <a href="/my-account/sign-in.php" className="text-[16px] text-primary-foreground hover:underline">
            sign in
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;