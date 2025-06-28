import BackgroundImage from '../assets/200630_fciccolella_money_final.webp'

export default function ParallaxSection() {
  return (
    <section
      className="w-full h-[600px] flex flex-col justify-center items-center bg-fixed bg-center bg-no-repeat bg-contain relative 
      bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center gap-8 px-4">
        {[
          {
            title: "Connect Instantly",
            desc: "Find and add like-minded professionals with just one click."
          },
          {
            title: "Chat Seamlessly",
            desc: "Real-time messaging that keeps your conversations flowing."
          },
          {
            title: "Build Your Circle",
            desc: "Track your growing network and manage connections with ease."
          }
        ].map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center 
            w-full md:w-[350px] 
            bg-black/30 dark:bg-gray-800/80
            rounded-xl shadow-lg p-6
            hover:scale-105 hover:shadow-2xl transition
            "
          >
            <h3 className="text-2xl font-bold mb-2 text-white dark:text-blue-200 drop-shadow-lg text-center">{f.title}</h3>
            <p className="text-white/90 dark:text-blue-100 text-center text-lg drop-shadow">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
