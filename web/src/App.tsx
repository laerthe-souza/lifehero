import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks/index';
import Routes from './routes/index';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
