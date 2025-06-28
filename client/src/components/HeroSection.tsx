import Logo from '../assets/logo_cleaned.png'
export default function HeroSection() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center py-36 px-0 bg-white mt-16">
      {/* leftside text */}
      <div className="flex-1 pl-0 flex flex-col items-start justify-center">
        <h2 className="mb-6 text-5xl font-bold text-blue-600">
          Smart Platform For <span className="text-black">Networking</span>
        </h2>
        <p className="mb-6 text-xl text-gray-500">
          Helping you engage, message, and grow your professional circle.
        </p>
        
      </div>
      {/* rightside image */}
           <div className="flex-1 flex items-center justify-center">
        <img src={Logo} alt="Networking Logo" className="w-60 h-auto" />
      </div>
    </section>
  );
}