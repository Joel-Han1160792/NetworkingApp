export default function ContentSection() {
  return (
    <section
      id="about-us"
      className="w-full bg-gradient-to-b from-white to-blue-50 py-28 px-4 flex justify-center scroll-mt-24"
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left */}
        <div className="flex-1 p-10 flex flex-col justify-center items-center bg-gradient-to-b from-blue-600 to-blue-400 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">About Us</h2>
          <p className="text-lg font-semibold mb-4">Empowering Meaningful Connections</p>
          <div className="w-12 h-1 bg-white/60 rounded-full mb-4"></div>
          <span className="text-base opacity-80">
            We believe in breaking barriers and building bridges in the professional world.
          </span>
        </div>
        {/* Right */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Our Mission</h3>
          <p className="mb-5 text-gray-700 leading-relaxed">
            We are a student-led team passionate about creating a smarter, simpler way to build professional relationships. Our platform helps users <span className="font-semibold text-blue-600">connect</span>, <span className="font-semibold text-blue-600">chat</span>, and <span className="font-semibold text-blue-600">grow</span> — all in one seamless space.
          </p>
          <h3 className="text-xl font-bold text-blue-700 mb-2">How We Work</h3>
          <p className="mb-5 text-gray-700 leading-relaxed">
            Built with modern tech and clean design, our focus is on usability, speed, and privacy. Whether you’re a developer, designer, or entrepreneur, you’ll find your place to expand your circle.
          </p>
          <div className="mt-6 italic text-blue-500/80 text-base border-l-4 border-blue-300 pl-4">
            Join us as we reshape the way people network — one connection at a time.
          </div>
        </div>
      </div>
    </section>
  );
}
