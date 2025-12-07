import Image from 'next/image';

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
    mainLink: '/financial-calculator.html',
    links: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator.html' },
      { name: 'Loan Calculator', href: '/loan-calculator.html' },
      { name: 'Auto Loan Calculator', href: '/auto-loan-calculator.html' },
      { name: 'Interest Calculator', href: '/interest-calculator.html' },
      { name: 'Payment Calculator', href: '/payment-calculator.html' },
      { name: 'Retirement Calculator', href: '/retirement-calculator.html' },
      { name: 'Amortization Calculator', href: '/amortization-calculator.html' },
      { name: 'Investment Calculator', href: '/investment-calculator.html' },
      { name: 'Inflation Calculator', href: '/inflation-calculator.html' },
      { name: 'Finance Calculator', href: '/finance-calculator.html' },
      { name: 'Income Tax Calculator', href: '/tax-calculator.html' },
      { name: 'Compound Interest Calculator', href: '/compound-interest-calculator.html' },
      { name: 'Salary Calculator', href: '/salary-calculator.html' },
      { name: 'Interest Rate Calculator', href: '/interest-rate-calculator.html' },
      { name: 'Sales Tax Calculator', href: '/sales-tax-calculator.html' },
    ],
  },
  {
    title: 'Fitness & Health Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/fitness-calculator-2.jpg',
    imageAlt: 'Fitness & Health Calculators',
    mainLink: '/fitness-and-health-calculator.html',
    links: [
      { name: 'BMI Calculator', href: '/bmi-calculator.html' },
      { name: 'Calorie Calculator', href: '/calorie-calculator.html' },
      { name: 'Body Fat Calculator', href: '/body-fat-calculator.html' },
      { name: 'BMR Calculator', href: '/bmr-calculator.html' },
      { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator.html' },
      { name: 'Pace Calculator', href: '/pace-calculator.html' },
      { name: 'Pregnancy Calculator', href: '/pregnancy-calculator.html' },
      { name: 'Pregnancy Conception Calculator', href: '/pregnancy-conception-calculator.html' },
      { name: 'Due Date Calculator', href: '/due-date-calculator.html' },
    ],
  },
  {
    title: 'Math Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/math-calculator-3.jpg',
    imageAlt: 'Math Calculators',
    mainLink: '/math-calculator.html',
    links: [
      { name: 'Scientific Calculator', href: '/scientific-calculator.html' },
      { name: 'Fraction Calculator', href: '/fraction-calculator.html' },
      { name: 'Percentage Calculator', href: '/percent-calculator.html' },
      { name: 'Random Number Generator', href: '/random-number-generator.html' },
      { name: 'Triangle Calculator', href: '/triangle-calculator.html' },
      { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator.html' },
    ],
  },
  {
    title: 'Other Calculators',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/images/other-calculator-4.jpg',
    imageAlt: 'Other Calculators',
    mainLink: '/other-calculator.html',
    links: [
      { name: 'Age Calculator', href: '/age-calculator.html' },
      { name: 'Date Calculator', href: '/date-calculator.html' },
      { name: 'Time Calculator', href: '/time-calculator.html' },
      { name: 'Hours Calculator', href: '/hours-calculator.html' },
      { name: 'GPA Calculator', href: '/gpa-calculator.html' },
      { name: 'Grade Calculator', href: '/grade-calculator.html' },
      { name: 'Concrete Calculator', href: '/concrete-calculator.html' },
      { name: 'Subnet Calculator', href: '/ip-subnet-calculator.html' },
      { name: 'Password Generator', href: '/password-generator.html' },
      { name: 'Conversion Calculator', href: '/conversion-calculator.html' },
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
              <a href={category.mainLink}>
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  width={135}
                  height={135}
                  className="rounded-full filter grayscale mx-auto"
                />
              </a>
              <h2 className="text-lg font-bold text-category-green mt-3 mb-[12px]">
                <a href={category.mainLink} className="text-category-green hover:underline">
                  {category.title}
                </a>
              </h2>
              <ul className="list-none p-0">
                {category.links.map((link) => (
                  <li key={link.name} className="mb-1">
                    <a href={link.href} className="text-sm text-link hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-5 pb-1">
          <a href="/sitemap.html">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/198ec530-e0fb-461c-9f7a-9b251371b6fb-calculator-net/assets/svgs/all-calculators-2.svg"
              alt="All Calculators"
              width={248}
              height={45}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;