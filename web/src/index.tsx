import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Favicon url="https://lifehero-pictures.s3-sa-east-1.amazonaws.com/16c2b0e670d103ecec7fbea0566619a0-faviconLifeHero.png" />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
