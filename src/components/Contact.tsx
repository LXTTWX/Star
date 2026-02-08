import { motion } from 'framer-motion';
import { Github, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">联系我</span>
          </h2>
          <p className="text-galaxy-gray max-w-2xl mx-auto">
            欢迎通过以下方式与我联系，期待与你的交流。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-8 text-starlight-white text-center">联系方式</h3>
            <div className="space-y-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-starlight-white/80 hover:text-stardust-gold transition-colors group"
              >
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-stardust-gold/20 transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-lg">GitHub联系</span>
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('Lqx_2008');
                  alert('微信号已复制到剪贴板，请打开微信添加好友');
                }}
                className="flex items-center gap-4 text-starlight-white/80 hover:text-stardust-gold transition-colors group w-full text-left"
              >
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-stardust-gold/20 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-lg">微信: Lqx_2008</span>
              </button>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl bg-gradient-to-br from-midnight-purple/50 to-deep-space/50 mt-8 text-center">
            <p className="text-starlight-white/80 leading-relaxed italic">
              "脚踏实地，仰望星空。"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
