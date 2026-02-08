import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('firebase')) return 'vendor-firebase';
                        if (id.includes('react')) return 'vendor-react-core';
                        if (id.includes('react-router')) return 'vendor-react-router';
                        if (id.includes('react-icons') || id.includes('react-hot-toast')) return 'vendor-ui';
                        return 'vendor-misc';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom']
    }
})
