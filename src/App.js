import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopNav from './components/navigation/TopNav';
import MobileActionBar from './components/navigation/MobileActionBar';
import AppRoutes from './routes/AppRoutes';
import AICompanion from './components/ai/AICompanion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from './store/useAppStore';

const App = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const userRole = useAppStore((state) => state.user?.role);
    const isProviderArea = location.pathname.startsWith('/p');
    const showSoktiAssistant = userRole === 'provider' && isProviderArea;

    return (_jsxs(_Fragment, { children: [
        _jsx(MuiLink, { 
            href: "#main-content", 
            sx: {
                position: 'absolute',
                left: '-1000px',
                ':focus-visible': {
                    left: '16px',
                    top: '16px',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    zIndex: (theme) => theme.zIndex.modal + 1
                }
            },
            children: t('a11y.skipToContent')
        }),
        _jsx(TopNav, {}),
        _jsx(Box, { 
            component: "main", 
            id: "main-content", 
            sx: {
                minHeight: '100vh',
                bgcolor: 'background.default',
                px: { xs: 2, md: 4 },
                pt: { xs: 12, md: 14 },
                pb: { xs: 12, md: 6 }
            },
            children: _jsx(AppRoutes, {})
        }),
        _jsx(MobileActionBar, {}),
        showSoktiAssistant ? _jsx(AICompanion, {}) : null
    ]}));
};
export default App;
