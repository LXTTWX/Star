import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署需要配置 base 路径
  // 如果仓库名是 username.github.io，则 base 为 '/'
  // 否则 base 为 '/仓库名/'
  base: '/STAR/',
  build: {
    // 生产环境不生成 sourcemap，减少构建时间
    sourcemap: false,
    // 优化 chunk 大小
    rollupOptions: {
      output: {
        manualChunks: {
          // 将第三方库单独打包
          vendor: ['react', 'react-dom', 'framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})
