import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      {
        name: 'copy-static-portal-assets',
        apply: 'build',
        closeBundle(error) {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(distDir)) return;

          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }

          const gamesDir = path.resolve(__dirname, 'games');
          const distGamesDir = path.resolve(distDir, 'games');
          if (fs.existsSync(gamesDir)) {
            fs.cpSync(gamesDir, distGamesDir, { recursive: true, force: true });
          }

          const gamesJson = path.resolve(__dirname, 'games.json');
          const distGamesJson = path.resolve(distDir, 'games.json');
          if (fs.existsSync(gamesJson)) {
            fs.copyFileSync(gamesJson, distGamesJson);
          }

          const stylesCss = path.resolve(__dirname, 'src/styles.css');
          const distStylesCss = path.resolve(distDir, 'src/styles.css');
          if (fs.existsSync(stylesCss)) {
            fs.mkdirSync(path.dirname(distStylesCss), { recursive: true });
            fs.copyFileSync(stylesCss, distStylesCss);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
