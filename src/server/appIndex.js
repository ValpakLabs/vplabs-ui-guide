import config from '../config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {AppError} from './errors';
import Html from './Html';

const webpackStatsPath = '../../webpack-stats.json';
let webpackStats;

if (!__DEVELOPMENT__)
  webpackStats = require(webpackStatsPath);

export default function(app) {
  return (req, res, next) => {
    try {
      if (__DEVELOPMENT__) {
        webpackStats = require(webpackStatsPath);
        delete require.cache[require.resolve(webpackStatsPath)];
      }
      res.send('<!doctype html>' + ReactDOMServer.renderToString(
        <Html appContext={config.appContext} webpackStats={webpackStats}/>
      ));
    } catch (error) {
      console.log(error.stack);
      next(error);
    }
  };
}
