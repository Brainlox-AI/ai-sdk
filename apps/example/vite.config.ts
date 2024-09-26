import { defineConfig, ViteDevServer } from 'vite';
import { resolve } from 'path';
import { realpathSync } from 'fs';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

function watchPackages(packageNames: string[]) {
    let isWatching = false;

    return {
        name: 'vite-plugin-watch-packages',

        buildStart() {
            if (!isWatching) {
                packageNames.forEach((packageName) => {
                    const absPackagePath = resolve('node_modules', packageName);
                    const realPackagePath = realpathSync(absPackagePath);

                    if ('addWatchFile' in this) {
                        (this as any).addWatchFile(realPackagePath);
                    }
                });

                isWatching = true;
            }
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJsPlugin(),
        watchPackages(['@debales-ai/ai-sdk']),
    ],
    build: {
        sourcemap: true,

        rollupOptions: {
            output: {
                dir: 'dist',
                entryFileNames: 'assets/[name].min.js',
                assetFileNames: 'assets/[name].min.[ext]',
            },
        },
        manifest: true,
    },
    optimizeDeps: {
        exclude: ['@debales-ai/ai-sdk'],
    },
});
