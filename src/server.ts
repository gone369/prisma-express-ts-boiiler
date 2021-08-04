import { config } from 'dotenv';
// initialize dotenv
const result = config();
if (result.error) {
  throw result.error;
}

import express from 'express';
import cors from 'cors';
//import cookieParser from 'cookie-parser';
import { host, port, https } from '../server.config.json';

import middleware from './middleware';
import api from './api';

(async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: '*',
      //credentials: true, // allow cookies
    })
  );

  middleware(app);
  api(app);

  await new Promise<void>((resolve) =>
    app.listen({ port, hostname: host }, resolve)
  );

  const url = `${https ? 'https' : 'http'}://${host}:${port}`;

  console.log(`
   🚀 Server listening at: ${url}
   ⭐ Use Postman or curl to test the server...
   ⭐ Ctrl + C to close server...
  `);
})();
