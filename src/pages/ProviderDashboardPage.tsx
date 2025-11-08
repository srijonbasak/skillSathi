import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import ProviderOverviewContent from '@/components/layout/ProviderOverviewContent';
import ProviderGigManagementContent from '@/components/layout/ProviderGigManagementContent';
import ProviderWalletContent from '@/components/layout/ProviderWalletContent';
import ProviderChatContent from '@/components/layout/ProviderChatContent';
import ProfileEditContent from '@/components/layout/ProfileEditContent';
import SettingsContent from '@/components/layout/SettingsContent';
import GigCreatorPage from '@/pages/GigCreatorPage';

const ProviderDashboardPage = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar role="provider" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: '280px' },
          width: { md: 'calc(100% - 280px)' },
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 4 },
          backgroundColor: 'background.default',
          minHeight: '100vh',
          transition: 'all 0.3s ease'
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route index element={<Navigate to="/p/dashboard/overview" replace />} />
              <Route path="overview" element={<ProviderOverviewContent />} />
              <Route path="gigs" element={<ProviderGigManagementContent />} />
              <Route path="gig/new" element={<GigCreatorPage />} />
              <Route path="wallet" element={<ProviderWalletContent />} />
              <Route path="chat" element={<ProviderChatContent />} />
              <Route path="profile" element={<ProfileEditContent role="provider" />} />
              <Route path="settings" element={<SettingsContent />} />
              <Route path="*" element={<Navigate to="/p/dashboard/overview" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ProviderDashboardPage;
