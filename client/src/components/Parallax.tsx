import BackgroundImage from '../assets/200630_fciccolella_money_final.webp'

export default function ParallaxSection() {
  return (
    <section
      className="w-full h-[600px] flex flex-col justify-center items-center bg-fixed bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      {/* 让半透明遮罩淡化图片，保证可读性 */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      {/* 内容区 */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-center items-center gap-8 px-4">
        {[{
          title: "Connect Instantly",
          desc: "Find and add like-minded professionals with just one click."
        }, {
          title: "Chat Seamlessly",
          desc: "Real-time messaging that keeps your conversations flowing."
        }, {
          title: "Build Your Circle",
          desc: "Track your growing network and manage connections with ease."
        }].map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center 
            w-full md:w-[350px] bg-white/20 dark:bg-black/40
            backdrop-blur-lg rounded-2xl shadow-xl p-8
            border border-white/30 dark:border-black/30
            hover:scale-105 hover:shadow-2xl transition 
            "
          >
            <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg text-center">{f.title}</h3>
            <p className="text-white/90 text-center text-lg drop-shadow">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
