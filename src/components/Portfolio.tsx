import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, Calendar, MapPin, Camera, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';

// 作品类型定义
type WorkType = 'website' | 'photography';

interface BaseWork {
  id: string;
  title: string;
  description: string;
  type: WorkType;
  createdAt: string;
  views: number;
}

interface WebsiteWork extends BaseWork {
  type: 'website';
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  highlights: string[];
}

interface PhotographyWork extends BaseWork {
  type: 'photography';
  image: string;
  location: string;
  device: string;
  exif?: {
    aperture?: string;
    shutter?: string;
    iso?: string;
    focalLength?: string;
  };
}

type Work = WebsiteWork | PhotographyWork;

// 示例数据
const worksData: Work[] = [
  // 网站作品
  {
    id: '1',
    type: 'website',
    title: '个人学习笔记平台',
    description: '使用 React 和 TypeScript 搭建的个人知识管理系统，支持 Markdown 编辑和标签分类。',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['响应式设计', '暗黑模式', '本地存储同步'],
    createdAt: '2024-01-15',
    views: 328
  },
  {
    id: '2',
    type: 'website',
    title: '数学可视化工具',
    description: '帮助理解高中数学概念的交互式可视化工具，包含函数图像、几何图形等模块。',
    techStack: ['Vue 3', 'Canvas API', 'MathJax', 'Vite'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['实时计算', '动画演示', '公式渲染'],
    createdAt: '2023-11-20',
    views: 256
  },
  {
    id: '3',
    type: 'website',
    title: '摄影作品集网站',
    description: '展示个人摄影作品的画廊网站，采用瀑布流布局和灯箱查看效果。',
    techStack: ['React', 'Framer Motion', 'Cloudinary', 'PWA'],
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['瀑布流布局', '图片懒加载', 'PWA 离线访问'],
    createdAt: '2023-09-10',
    views: 412
  },
  {
    id: '4',
    type: 'website',
    title: '待办事项管理器',
    description: '简洁高效的待办事项管理应用，支持拖拽排序和分类标签功能。',
    techStack: ['React', 'Zustand', 'DnD Kit', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['拖拽排序', '数据持久化', '快捷键支持'],
    createdAt: '2023-07-05',
    views: 189
  },
  // 摄影作品
  {
    id: '5',
    type: 'photography',
    title: '晨光中的图书馆',
    description: '清晨的第一缕阳光透过图书馆的玻璃窗，洒在古老的书架上，营造出宁静而温暖的氛围。',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    location: '学校图书馆',
    device: 'Sony A7III + 35mm f/1.8',
    exif: {
      aperture: 'f/2.8',
      shutter: '1/125s',
      iso: '400',
      focalLength: '35mm'
    },
    createdAt: '2024-02-20',
    views: 156
  },
  {
    id: '6',
    type: 'photography',
    title: '雨后校园',
    description: '雨后的校园小径，地面倒映着路灯的微光，空气中弥漫着清新的泥土气息。',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
    location: '校园林荫道',
    device: 'iPhone 15 Pro',
    exif: {
      aperture: 'f/1.8',
      shutter: '1/60s',
      iso: '800',
      focalLength: '24mm'
    },
    createdAt: '2024-01-28',
    views: 234
  },
  {
    id: '7',
    type: 'photography',
    title: '夕阳下的篮球场',
    description: '傍晚时分，夕阳将整个篮球场染成金黄色，几位同学仍在球场上挥洒汗水。',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    location: '学校篮球场',
    device: 'Canon EOS R6 + 85mm f/1.4',
    exif: {
      aperture: 'f/2.0',
      shutter: '1/500s',
      iso: '200',
      focalLength: '85mm'
    },
    createdAt: '2023-12-15',
    views: 312
  },
  {
    id: '8',
    type: 'photography',
    title: '樱花季的教室',
    description: '春天樱花盛开时，从教室窗户望出去，粉色的花瓣随风飘落，构成一幅美丽的画面。',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
    location: '教学楼',
    device: 'Fujifilm X-T4 + 23mm f/1.4',
    exif: {
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: '160',
      focalLength: '23mm'
    },
    createdAt: '2023-04-10',
    views: 445
  }
];

// 懒加载图片组件 - 使用 memo 避免不必要的重渲染
const LazyImage = memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 使用 useCallback 缓存 onLoad 处理函数
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-midnight-purple/50 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// 网站作品卡片 - 使用 memo 避免不必要的重渲染
const WebsiteCard = memo(({ work, onClick }: { work: WebsiteWork; onClick: () => void }) => {
  // 使用 useCallback 缓存事件处理函数
  const handleDemoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleGithubClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel rounded-2xl overflow-hidden group cursor-pointer hover:border-stardust-gold/30 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <LazyImage
          src={work.image}
          alt={work.title}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <a
              href={work.demoUrl}
              className="p-2 bg-starlight-white text-deep-space rounded-full hover:scale-110 transition-transform"
              onClick={handleDemoClick}
            >
              <ExternalLink size={18} />
            </a>
            <a
              href={work.githubUrl}
              className="p-2 bg-starlight-white text-deep-space rounded-full hover:scale-110 transition-transform"
              onClick={handleGithubClick}
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-starlight-white group-hover:text-stardust-gold transition-colors">
          {work.title}
        </h3>
        <p className="text-starlight-white/60 text-sm mb-4 line-clamp-2">
          {work.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {work.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-starlight-white/70"
            >
              {tech}
            </span>
          ))}
          {work.techStack.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-starlight-white/50">
              +{work.techStack.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-starlight-white/40">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(work.createdAt).toLocaleDateString('zh-CN')}
          </span>
          <span>{work.views} 次浏览</span>
        </div>
      </div>
    </motion.div>
  );
});

WebsiteCard.displayName = 'WebsiteCard';

// 摄影作品卡片 - 使用 memo 避免不必要的重渲染
const PhotographyCard = memo(({ work, onClick }: { work: PhotographyWork; onClick: () => void }) => {
  // 使用 useMemo 缓存设备品牌，避免重复计算
  const deviceBrand = useMemo(() => work.device.split(' ')[0], [work.device]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel rounded-2xl overflow-hidden group cursor-pointer hover:border-stardust-gold/30 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <LazyImage
          src={work.image}
          alt={work.title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-starlight-white mb-1">
            {work.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-starlight-white/70">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {work.location}
            </span>
            <span className="flex items-center gap-1">
              <Camera size={12} />
              {deviceBrand}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-starlight-white/60 text-sm line-clamp-2 mb-3">
          {work.description}
        </p>
        
        {work.exif && (
          <div className="flex flex-wrap gap-2 text-xs text-starlight-white/40">
            {work.exif.aperture && <span>{work.exif.aperture}</span>}
            {work.exif.shutter && <span>{work.exif.shutter}</span>}
            {work.exif.iso && <span>ISO {work.exif.iso}</span>}
            {work.exif.focalLength && <span>{work.exif.focalLength}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
});

PhotographyCard.displayName = 'PhotographyCard';

// 作品详情模态框
const WorkDetailModal = ({ work, onClose }: { work: Work | null; onClose: () => void }) => {
  if (!work) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-space/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-panel rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={work.image}
              alt={work.title}
              className="w-full aspect-video object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-deep-space/80 rounded-full hover:bg-deep-space transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-starlight-white">{work.title}</h2>
            <p className="text-starlight-white/70 mb-6">{work.description}</p>
            
            {work.type === 'website' ? (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-stardust-gold mb-2">技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {(work as WebsiteWork).techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-stardust-gold mb-2">项目亮点</h3>
                  <ul className="space-y-1">
                    {(work as WebsiteWork).highlights.map((highlight, idx) => (
                      <li key={idx} className="text-starlight-white/70 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stardust-gold" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={(work as WebsiteWork).demoUrl}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-stardust-gold to-nebula-purple rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    <ExternalLink size={18} />
                    查看演示
                  </a>
                  <a
                    href={(work as WebsiteWork).githubUrl}
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors"
                  >
                    <Github size={18} />
                    源码
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-stardust-gold mb-1">拍摄地点</h3>
                    <p className="text-starlight-white/70 flex items-center gap-2">
                      <MapPin size={16} />
                      {(work as PhotographyWork).location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stardust-gold mb-1">拍摄设备</h3>
                    <p className="text-starlight-white/70 flex items-center gap-2">
                      <Camera size={16} />
                      {(work as PhotographyWork).device}
                    </p>
                  </div>
                </div>
                
                {(work as PhotographyWork).exif && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-stardust-gold mb-2">EXIF 信息</h3>
                    <div className="grid grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg">
                      {(work as PhotographyWork).exif?.aperture && (
                        <div className="text-center">
                          <p className="text-xs text-starlight-white/50">光圈</p>
                          <p className="text-sm font-medium">{(work as PhotographyWork).exif?.aperture}</p>
                        </div>
                      )}
                      {(work as PhotographyWork).exif?.shutter && (
                        <div className="text-center">
                          <p className="text-xs text-starlight-white/50">快门</p>
                          <p className="text-sm font-medium">{(work as PhotographyWork).exif?.shutter}</p>
                        </div>
                      )}
                      {(work as PhotographyWork).exif?.iso && (
                        <div className="text-center">
                          <p className="text-xs text-starlight-white/50">ISO</p>
                          <p className="text-sm font-medium">{(work as PhotographyWork).exif?.iso}</p>
                        </div>
                      )}
                      {(work as PhotographyWork).exif?.focalLength && (
                        <div className="text-center">
                          <p className="text-xs text-starlight-white/50">焦距</p>
                          <p className="text-sm font-medium">{(work as PhotographyWork).exif?.focalLength}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-starlight-white/50">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {new Date(work.createdAt).toLocaleDateString('zh-CN')}
              </span>
              <span>{work.views} 次浏览</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | WorkType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const itemsPerPage = 6;

  // 筛选和排序逻辑
  const filteredWorks = useMemo(() => {
    let result = [...worksData];

    // 分类筛选
    if (activeCategory !== 'all') {
      result = result.filter((work) => work.type === activeCategory);
    }

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (work) =>
          work.title.toLowerCase().includes(query) ||
          work.description.toLowerCase().includes(query) ||
          (work.type === 'website' &&
            (work as WebsiteWork).techStack.some((tech) =>
              tech.toLowerCase().includes(query)
            ))
      );
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // 分页逻辑
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 重置页码当筛选条件改变时
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  // 滚动到作品展示顶部
  const scrollToTop = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 处理页面切换
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">作品展示</span>
          </h2>
          <p className="text-galaxy-gray max-w-2xl mx-auto">
            这里展示了我的网站开发项目和摄影作品，记录我的创作历程。
          </p>
        </motion.div>

        {/* 筛选和搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* 分类标签 */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'all', label: '全部作品' },
              { key: 'website', label: '网站项目' },
              { key: 'photography', label: '摄影作品' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key as typeof activeCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.key
                    ? 'bg-gradient-to-r from-stardust-gold to-nebula-purple text-white'
                    : 'bg-white/5 border border-white/10 text-starlight-white/70 hover:bg-white/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* 搜索和排序 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-starlight-white/40" size={18} />
              <input
                type="text"
                placeholder="搜索作品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-stardust-gold focus:ring-1 focus:ring-stardust-gold outline-none transition-all text-starlight-white placeholder:text-starlight-white/40"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-starlight-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-starlight-white focus:border-stardust-gold outline-none cursor-pointer"
              >
                <option value="newest" className="bg-midnight-purple">最新发布</option>
                <option value="oldest" className="bg-midnight-purple">最早发布</option>
                <option value="views" className="bg-midnight-purple">最多浏览</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {paginatedWorks.map((work) =>
              work.type === 'website' ? (
                <WebsiteCard
                  key={work.id}
                  work={work as WebsiteWork}
                  onClick={() => setSelectedWork(work)}
                />
              ) : (
                <PhotographyCard
                  key={work.id}
                  work={work as PhotographyWork}
                  onClick={() => setSelectedWork(work)}
                />
              )
            )}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-starlight-white/50 text-lg">没有找到匹配的作品</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-starlight-white/70 hover:bg-white/10 transition-colors"
            >
              清除筛选
            </button>
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-stardust-gold to-nebula-purple text-white'
                    : 'bg-white/5 border border-white/10 text-starlight-white/70 hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* 详情模态框 */}
      <WorkDetailModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
};

export default Portfolio;
