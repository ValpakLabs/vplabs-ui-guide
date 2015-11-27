import React from 'react';

const Html = (props) => {
  const {webpackStats, appContext, title} = props;
  return (
    <html lang='en-us'>
      <head>
        <meta charSet='utf-8'/>
        <title>{title || 'ValpakLabs UI Styleguide'}</title>
        <base href={`${appContext}/`} />
        <link rel='shortcut icon' href={`${appContext}/favicon.png`} />
        {webpackStats.css.files.map((css, i) =>
          <link href={css} key={i} media='screen, projection' rel='stylesheet' type='text/css'/>)}
      </head>
      <body>
        <div id='content' />
        <script src={webpackStats.script[0]}/>
        <script src={`${appContext}/prism.js`}/>
      </body>
    </html>
  );
};

export default Html;
