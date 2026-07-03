import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generateHandler from './api/generate.js'

function localApiPlugin() {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/generate', async (req, res) => {
        const chunks = [];

        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', async () => {
          req.body = Buffer.concat(chunks).toString('utf8');
          res.status = (statusCode) => {
            res.statusCode = statusCode;
            return res;
          };
          res.json = (payload) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
          };

          await generateHandler(req, res);
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
})





