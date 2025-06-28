import Logo from '../assets/logo_cleaned.png'
export default function HeroSection() {
  return (
    <section id='hero-section' className="w-full bg-white dark:bg-gray-900 mt-16 py-36">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-4">
        {/* leftside text */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="mb-6 text-5xl font-bold text-blue-600 dark:text-blue-300">
            Smart Platform For <span className="text-black dark:text-white">Networking</span>
          </h2>
          <p className="mb-6 text-xl text-gray-500 dark:text-gray-200">
            Helping you engage, message, and grow your professional circle.
          </p>
        </div>
        {/* rightside image */}
        <div className="flex-1 flex items-center justify-center">
          <img src={Logo} alt="Networking Logo" className="w-60 h-auto" />
        </div>
      </div>
    </section>
  );
}
