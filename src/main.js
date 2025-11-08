import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { getAppTheme } from './theme';
import './index.css';
import './i18n/config';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-bengali/400.css';
import '@fontsource/noto-sans-bengali/700.css';
import { useAppStore } from './store/useAppStore';
const ThemedApp = () => {
    const themeName = useAppStore((state) => state.theme);
    const theme = useMemo(() => getAppTheme(themeName), [themeName]);
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(App, {})] }));
};
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(ThemedApp, {}) }));
