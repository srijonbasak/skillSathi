import { Box, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TopNav from './components/navigation/TopNav';
import MobileActionBar from './components/navigation/MobileActionBar';
import AppRoutes from './routes/AppRoutes';
import AICompanion from './components/ai/AICompanion';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isProviderArea = location.pathname.startsWith('/p');
  const allowedBots: ('sathi' | 'sokti')[] = isProviderArea ? ['sokti'] : ['sathi'];

  return (
    <>
      <MuiLink
        href="#main-content"
        sx={{
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
        }}
      >
        {t('a11y.skipToContent')}
      </MuiLink>
      <TopNav />
      <Box
        component="main"
        id="main-content"
        sx={{
          minHeight: '100vh',
          bgcolor: 'transparent',
          px: { xs: 2, md: 4 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 12, md: 6 }
        }}
      >
        <AppRoutes />
      </Box>
      <MobileActionBar />
      <AICompanion allowedBots={allowedBots} />
    </>
  );
};

export default App;
