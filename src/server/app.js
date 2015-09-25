import path from 'path';
import Express from 'express';
import hmr from './hmr';
import serveStatic from 'serve-static';
import appIndex from './appIndex';
import errorMiddleware from './errorMiddleware';

const app = new Express();
const staticPath = path.join(__dirname, '../..', 'static');

if (__DEVELOPMENT__)
  hmr(app);

app.use(serveStatic(staticPath));
app.use(appIndex());
app.use(errorMiddleware());

export default app;
