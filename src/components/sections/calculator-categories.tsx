import Image from 'next/image';
import Link from 'next/link';

interface CategoryLink {
  name: string;
  href: string;
}

interface Category {
  title: string;
  imageSrc: string;
  imageAlt: string;
  mainLink: string;
  links: CategoryLink[];
}

const categoriesData: Category[] = [
  {
    title: 'Financial Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/financial-calculator-1.jpg',
    imageAlt: 'Financial Calculators',
    mainLink: '/mortgage-calculator',
    links: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Loan Calculator', href: '/loan-calculator' },
      { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
      { name: 'Interest Calculator', href: '/interest-calculator' },
      { name: 'Payment Calculator', href: '/payment-calculator' },
      { name: 'Retirement Calculator', href: '/retirement-calculator' },
      { name: 'Amortization Calculator', href: '/amortization-calculator' },
      { name: 'Investment Calculator', href: '/investment-calculator' },
      { name: 'Inflation Calculator', href: '/inflation-calculator' },
      { name: 'Finance Calculator', href: '/finance-calculator' },
      { name: 'Income Tax Calculator', href: '/tax-calculator' },
      { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
      { name: 'Salary Calculator', href: '/salary-calculator' },
      { name: 'Interest Rate Calculator', href: '/interest-rate-calculator' },
      { name: 'Sales Tax Calculator', href: '/sales-tax-calculator' },
    ],
  },
  {
    title: 'Fitness & Health Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/fitness-calculator-2.jpg',
    imageAlt: 'Fitness & Health Calculators',
    mainLink: '/bmi-calculator',
    links: [
      { name: 'BMI Calculator', href: '/bmi-calculator' },
      { name: 'Calorie Calculator', href: '/calorie-calculator' },
      { name: 'Body Fat Calculator', href: '/body-fat-calculator' },
      { name: 'BMR Calculator', href: '/bmr-calculator' },
      { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator' },
      { name: 'Pace Calculator', href: '/pace-calculator' },
      { name: 'Pregnancy Calculator', href: '/pregnancy-calculator' },
      { name: 'Pregnancy Conception Calculator', href: '/pregnancy-conception-calculator' },
      { name: 'Due Date Calculator', href: '/due-date-calculator' },
    ],
  },
  {
    title: 'Math Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/math-calculator-3.jpg',
    imageAlt: 'Math Calculators',
    mainLink: '/scientific-calculator',
    links: [
      { name: 'Scientific Calculator', href: '/scientific-calculator' },
      { name: 'Fraction Calculator', href: '/fraction-calculator' },
      { name: 'Percentage Calculator', href: '/percentage-calculator' },
      { name: 'Random Number Generator', href: '/random-number-generator' },
      { name: 'Triangle Calculator', href: '/triangle-calculator' },
      { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator' },
    ],
  },
  {
    title: 'Other Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/other-calculator-4.jpg',
    imageAlt: 'Other Calculators',
    mainLink: '/age-calculator',
    links: [
      { name: 'Age Calculator', href: '/age-calculator' },
      { name: 'Date Calculator', href: '/date-calculator' },
      { name: 'Time Calculator', href: '/time-calculator' },
      { name: 'Hours Calculator', href: '/hours-calculator' },
      { name: 'GPA Calculator', href: '/gpa-calculator' },
      { name: 'Grade Calculator', href: '/grade-calculator' },
      { name: 'Concrete Calculator', href: '/concrete-calculator' },
      { name: 'Subnet Calculator', href: '/ip-subnet-calculator' },
      { name: 'Password Generator', href: '/password-generator' },
      { name: 'Conversion Calculator', href: '/conversion-calculator' },
    ],
  },
];

const CalculatorCategories = () => {
  return (
    <section className="bg-white w-full">
      <div className="max-w-[1100px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {categoriesData.map((category) => (
            <div key={category.title} className="text-center px-3 mb-5">
              <Link href={category.mainLink}>
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  width={135}
                  height={135}
                  className="rounded-full filter grayscale mx-auto"
                />
              </Link>
              <h2 className="text-lg font-bold text-category-green mt-3 mb-[12px]">
                <Link href={category.mainLink} className="text-category-green hover:underline">
                  {category.title}
                </Link>
              </h2>
              <ul className="list-none p-0">
                {category.links.map((link) => (
                  <li key={link.name} className="mb-1">
                    <Link href={link.href} className="text-sm text-link hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-5 pb-1">
          <Link href="/">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/svgs/all-calculators-2.svg"
              alt="All Calculators"
              width={248}
              height={45}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;