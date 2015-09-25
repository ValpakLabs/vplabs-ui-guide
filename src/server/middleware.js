import path from 'path';
import compression from 'compression';
import appIndex from './appIndex';
const STATIC_DIR = path.join(__dirname, '../..', 'static');

async function middleware(app) {

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });
  
  app.use(require('serve-static')(STATIC_DIR));

  

  app.use(appIndex);

}

export default middleware;
