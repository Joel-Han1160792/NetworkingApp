export default function ContentSection() {
  return (
    <section
      id="about-us"
      className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 py-28 px-4 flex justify-center scroll-mt-24"
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row 
        bg-white/80 dark:bg-gray-900/80 
        backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Left */}
        <div className="flex-1 p-10 flex flex-col justify-center items-center 
          bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 
          text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">About Us</h2>
          <p className="text-lg font-semibold mb-4 text-white/90">Empowering Meaningful Connections</p>
          <div className="w-12 h-1 bg-white/60 rounded-full mb-4"></div>
          <span className="text-base opacity-80">
            We believe in breaking barriers and building bridges in the professional world.
          </span>
        </div>
        {/* Right */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Our Mission</h3>
          <p className="mb-5 text-gray-700 dark:text-gray-200 leading-relaxed">
            We are a student-led team passionate about creating a smarter, simpler way to build professional relationships. Our platform helps users <span className="font-semibold text-blue-600 dark:text-blue-300">connect</span>, <span className="font-semibold text-blue-600 dark:text-blue-300">chat</span>, and <span className="font-semibold text-blue-600 dark:text-blue-300">grow</span> — all in one seamless space.
          </p>
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">How We Work</h3>
          <p className="mb-5 text-gray-700 dark:text-gray-200 leading-relaxed">
            Built with modern tech and clean design, our focus is on usability, speed, and privacy. Whether you’re a developer, designer, or entrepreneur, you’ll find your place to expand your circle.
          </p>
          <div className="mt-6 italic text-blue-500/80 dark:text-blue-300 text-base border-l-4 border-blue-300 dark:border-blue-500 pl-4">
            Join us as we reshape the way people network — one connection at a time.
          </div>
        </div>
      </div>
    </section>
  );
}
