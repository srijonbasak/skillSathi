import { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useTheme } from '@mui/material/styles';

const TopNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
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

  const handleLanguageChange = (_: React.MouseEvent<HTMLElement>, value: 'bn' | 'en' | null) => {
    if (!value) return;
    setLanguage(value);
    i18n.changeLanguage(value);
    document.documentElement.lang = value;
  };

  const dashboardPath = user?.role === 'client' ? '/c/dashboard' : '/p/dashboard';
  const navLinks = useMemo(
    () => [
      { label: t('nav.links.home'), to: '/' },
      { label: t('nav.links.register'), to: '/register' },
      { label: t('nav.links.login'), to: '/login' }
    ],
    [t]
  );

  const renderLanguageToggle = (
    <ToggleButtonGroup
      value={language}
      exclusive
      size="small"
      onChange={handleLanguageChange}
      aria-label={t('nav.languageToggle')}
      color="primary"
    >
      <ToggleButton value="bn">বাংলা</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // Only adjust position on desktop when sidebar is present
          ...(location.pathname.startsWith('/p/dashboard') || location.pathname.startsWith('/c/dashboard')
            ? {
                ml: { md: '280px' },
                width: { md: 'calc(100% - 280px)' }
              }
            : {})
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: 2,
            py: 1,
            px: { xs: 2, lg: 4 }
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}
            >
              <Box component="img" src="/logo.png" alt={t('brand.name')} sx={{ height: 56, width: 'auto' }} />
              {!isMobile && (
                <Stack spacing={0} minWidth={160}>
                  <Typography variant="h6" fontWeight={700}>
                    {t('brand.name')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('brand.tagline')}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>

          {!isMobile && (
            <Stack direction="row" spacing={2} component="nav">
              {navLinks.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  variant="text"
                  color="inherit"
                  sx={{ fontWeight: 500 }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          <Stack direction="row" spacing={1.5} alignItems="center">
            {!isMobile && renderLanguageToggle}
            <Button component={RouterLink} to="/register" variant="contained" size="medium">
              {t('pages.home.ctaPrimary')}
            </Button>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label={t('nav.openMenu')}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{t('brand.name')}</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label={t('nav.closeMenu')}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack spacing={1.5}>
          {navLinks.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              variant="text"
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
        <Divider />
        {renderLanguageToggle}
        <Button component={RouterLink} to={dashboardPath} variant="outlined" onClick={() => setDrawerOpen(false)}>
          {t('nav.links.dashboard')}
        </Button>
        {user ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setUser(null);
              setDrawerOpen(false);
            }}
          >
            {t('nav.auth.logout')}
          </Button>
        ) : (
          <Stack spacing={1}>
            <Button component={RouterLink} to="/login" variant="text" onClick={() => setDrawerOpen(false)}>
              {t('nav.links.login')}
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" onClick={() => setDrawerOpen(false)}>
              {t('pages.home.ctaPrimary')}
            </Button>
          </Stack>
        )}
      </Drawer>
    </>
  );
};

export default TopNav;
