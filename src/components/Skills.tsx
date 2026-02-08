import { motion } from 'framer-motion';

const skills: { name: string; level: number; color: string }[] = [];

const timeline = [
  { year: '2026', title: '高三在读', desc: '备战高考，为理想大学努力奋斗' },
  { year: '2023', title: '高中入学', desc: '进入高中，开启新的学习旅程' },
  { year: '2008', title: '出生', desc: '2008年4月，来到这个世界' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative bg-midnight-purple/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">技能与经历</span>
          </h2>
          <p className="text-galaxy-gray max-w-2xl mx-auto">
            持续学习，不断精进。这是我的技术栈和成长轨迹。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skills Column */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-stardust-gold rounded-full"></span>
              技术能力
            </h3>
            {skills.length > 0 ? (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-starlight-white">{skill.name}</span>
                      <span className="text-starlight-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}80` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-starlight-white/50 text-lg">暂无技能记录</p>
              </div>
            )}
          </div>

          {/* Timeline Column */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-nebula-purple rounded-full"></span>
              成长轨迹
            </h3>
            <div className="relative border-l-2 border-white/10 ml-3 space-y-10 pl-8 py-2">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-deep-space border-4 border-nebula-purple shadow-[0_0_10px_rgba(157,78,221,0.5)]"></span>
                  <span className="text-stardust-gold font-bold text-sm mb-1 block">{item.year}</span>
                  <h4 className="text-xl font-bold text-starlight-white mb-2">{item.title}</h4>
                  <p className="text-starlight-white/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
