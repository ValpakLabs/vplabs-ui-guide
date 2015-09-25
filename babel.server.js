require('babel/register');
const config = require('./src/config');
const logger = require('./src/server/logger');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const app = require('./src/server/app');

app.listen(config.port, (err) => {
  if (err)
    logger.error(err);
  else
    logger.info('App running on port %s', process.env.PORT || config.port);
});
