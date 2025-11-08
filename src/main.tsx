import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import { getAppTheme } from './theme';
import './index.css';
import './i18n/config';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-bengali/400.css';
import '@fontsource/noto-sans-bengali/700.css';
import { useAppStore, AppThemeName } from './store/useAppStore';

const ThemedApp = () => {
  const userRole = useAppStore((state) => state.user?.role);
  const location = useLocation();
  const isProviderArea = location.pathname.startsWith('/p');
  const isClientArea = location.pathname.startsWith('/c');
  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';
  
  let themeName: AppThemeName = 'sathi'; // default for home/login/register
  
  if (userRole === 'provider' && isProviderArea) {
    themeName = 'sokti';
  } else if (userRole === 'client' && isClientArea) {
    themeName = 'client';
  } else if (isRegisterPage || isLoginPage) {
    // For register/login, use sathi (home page theme) as default
    themeName = 'sathi';
  }
  
  const theme = useMemo(() => getAppTheme(themeName), [themeName]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const Root = () => (
  <BrowserRouter>
    <ThemedApp />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
