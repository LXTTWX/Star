import { useEffect, useRef, useCallback } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    targetOpacity: number;
  }>>([]);

  // 使用 useCallback 缓存 resize 处理函数
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 使用 requestAnimationFrame 优化 resize 性能
    requestAnimationFrame(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 初始化 canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 优化：减少星星数量从 200 到 80，降低 CPU 占用
    const starCount = 80;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5, // 稍微减小尺寸
      speed: Math.random() * 0.3 + 0.05, // 降低速度
      opacity: Math.random(),
      targetOpacity: Math.random(),
    }));

    let frameCount = 0;
    const targetFPS = 30; // 限制帧率到 30fps
    const frameInterval = Math.round(60 / targetFPS);

    const animate = () => {
      frameCount++;
      
      // 跳帧渲染，降低 CPU 占用
      if (frameCount % frameInterval !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      starsRef.current.forEach((star) => {
        // 使用整数坐标，避免 sub-pixel 渲染
        const x = Math.round(star.x);
        const y = Math.round(star.y);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // 更新位置
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        
        // 优化闪烁效果：每 10 帧更新一次透明度
        if (frameCount % 10 === 0) {
          star.targetOpacity = Math.random();
        }
        // 平滑过渡透明度
        star.opacity += (star.targetOpacity - star.opacity) * 0.1;
        star.opacity = Math.max(0, Math.min(1, star.opacity));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 使用 passive 事件监听器优化滚动性能
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        willChange: 'transform', // 提示浏览器优化渲染
        contain: 'strict', // 限制布局范围
      }}
    />
  );
};

export default StarryBackground;
