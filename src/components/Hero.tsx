import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-40 h-40 mx-auto rounded-full border-4 border-stardust-gold/30 p-2 relative overflow-hidden">
             <img
               src="/avatar.svg"
               alt="Profile"
               className="w-full h-full rounded-full bg-midnight-purple object-cover"
             />
             <div className="absolute inset-0 rounded-full border-4 border-t-stardust-gold animate-[spin_8s_linear_infinite]"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            你好，我是 <span className="text-gradient">دوكنكد</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-galaxy-gray mb-8">
            高三学生 | 编程爱好者
          </h2>
          <p className="max-w-2xl mx-auto text-starlight-white/80 leading-relaxed mb-10">
            仰望星空，脚踏实地。作为一名高三学生，我热爱编程和技术探索。
            在这里记录我的学习历程、项目作品和成长轨迹。
          </p>
          
          <div className="flex justify-center gap-4">
            <a href="#portfolio" className="px-8 py-3 rounded-full bg-gradient-to-r from-stardust-gold to-nebula-purple text-white font-bold hover:shadow-[0_0_20px_rgba(157,78,221,0.5)] transition-all transform hover:scale-105">
              查看作品
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border border-starlight-white/20 hover:bg-white/10 transition-all font-medium">
              联系我
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#portfolio" className="text-starlight-white/50 hover:text-stardust-gold">
          <ChevronDown size={32} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
