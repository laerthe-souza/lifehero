import React from 'react';
import { AlertProvider } from './dialogBox';
import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <AlertProvider>
        <LoadingProvider>{children}</LoadingProvider>
      </AlertProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
