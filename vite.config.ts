import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

const config = {
    template: {
        compilerOptions: {
            isCustomElement: e => /^mwc-/.test(e)
        }
    }
};

export default defineConfig({
    plugins: [
        vue(config)
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, '/src'),
            '~': resolve(__dirname, '/src')
        }
    }
});
