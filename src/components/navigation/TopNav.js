import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { AppBar, Box, Button, Divider, Drawer, IconButton, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useTheme } from '@mui/material/styles';
const TopNav = () => {
    const { t, i18n } = useTranslation();
    const language = useAppStore((state) => state.language);
    const setLanguage = useAppStore((state) => state.setLanguage);
    const user = useAppStore((state) => state.user);
    const setUser = useAppStore((state) => state.setUser);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
            document.documentElement.lang = language;
        }
    }, [i18n, language]);
    const handleLanguageChange = (_, value) => {
        if (!value)
            return;
        setLanguage(value);
        i18n.changeLanguage(value);
        document.documentElement.lang = value;
    };
    const dashboardPath = user?.role === 'client' ? '/c/dashboard' : '/p/dashboard';
    const navLinks = useMemo(() => [
        { label: t('nav.links.home'), to: '/' },
        { label: t('nav.links.register'), to: '/register' },
        { label: t('nav.links.login'), to: '/login' }
    ], [t]);
    const renderLanguageToggle = (_jsxs(ToggleButtonGroup, { value: language, exclusive: true, size: "small", onChange: handleLanguageChange, "aria-label": t('nav.languageToggle'), color: "primary", children: [_jsx(ToggleButton, { value: "bn", children: "\u09AC\u09BE\u0982\u09B2\u09BE" }), _jsx(ToggleButton, { value: "en", children: "EN" })] }));
    return (_jsxs(_Fragment, { children: [_jsx(AppBar, { position: "fixed", color: "transparent", elevation: 0, children: _jsxs(Toolbar, { sx: {
                        justifyContent: 'space-between',
                        gap: 2,
                        py: 1,
                        px: { xs: 2, lg: 4 }
                    }, children: [_jsx(Stack, { direction: "row", spacing: 2, alignItems: "center", children: _jsxs(Box, { component: RouterLink, to: "/", sx: { display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }, children: [_jsx(Box, { component: "img", src: "/logo.png", alt: t('brand.name'), sx: { height: 56, width: 'auto' } }), !isMobile && (_jsxs(Stack, { spacing: 0, minWidth: 160, children: [_jsx(Typography, { variant: "h6", fontWeight: 700, children: t('brand.name') }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('brand.tagline') })] }))] }) }), !isMobile && (_jsx(Stack, { direction: "row", spacing: 2, component: "nav", children: navLinks.map((item) => (_jsx(Button, { component: RouterLink, to: item.to, variant: "text", color: "inherit", sx: { fontWeight: 500 }, children: item.label }, item.to))) })), _jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", children: [!isMobile && renderLanguageToggle, _jsx(Button, { component: RouterLink, to: "/register", variant: "contained", size: "medium", children: t('pages.home.ctaPrimary') }), isMobile && (_jsx(IconButton, { onClick: () => setDrawerOpen(true), "aria-label": t('nav.openMenu'), children: _jsx(MenuIcon, {}) }))] })] }) }), _jsxs(Drawer, { anchor: "right", open: drawerOpen, onClose: () => setDrawerOpen(false), PaperProps: { sx: { width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2 } }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: [_jsx(Typography, { variant: "h6", children: t('brand.name') }), _jsx(IconButton, { onClick: () => setDrawerOpen(false), "aria-label": t('nav.closeMenu'), children: _jsx(CloseIcon, {}) })] }), _jsx(Divider, {}), _jsx(Stack, { spacing: 1.5, children: navLinks.map((item) => (_jsx(Button, { component: RouterLink, to: item.to, variant: "text", onClick: () => setDrawerOpen(false), children: item.label }, item.to))) }), _jsx(Divider, {}), renderLanguageToggle, _jsx(Button, { component: RouterLink, to: dashboardPath, variant: "outlined", onClick: () => setDrawerOpen(false), children: t('nav.links.dashboard') }), user ? (_jsx(Button, { variant: "contained", color: "secondary", onClick: () => {
                            setUser(null);
                            setDrawerOpen(false);
                        }, children: t('nav.auth.logout') })) : (_jsxs(Stack, { spacing: 1, children: [_jsx(Button, { component: RouterLink, to: "/login", variant: "text", onClick: () => setDrawerOpen(false), children: t('nav.links.login') }), _jsx(Button, { component: RouterLink, to: "/register", variant: "contained", onClick: () => setDrawerOpen(false), children: t('pages.home.ctaPrimary') })] }))] })] }));
};
export default TopNav;
