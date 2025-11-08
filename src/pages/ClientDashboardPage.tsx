import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import ClientOverviewContent from '@/components/layout/ClientOverviewContent';
import ClientWalletContent from '@/components/layout/ClientWalletContent';
import ClientChatContent from '@/components/layout/ClientChatContent';
import ClientTrustedProvidersContent from '@/components/layout/ClientTrustedProvidersContent';
import ClientJobPostsContent from '@/components/layout/ClientJobPostsContent';
import ProfileEditContent from '@/components/layout/ProfileEditContent';
import SettingsContent from '@/components/layout/SettingsContent';
import BuyerRequestPage from '@/pages/BuyerRequestPage';

const ClientDashboardPage = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardSidebar role="client" />
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
              <Route index element={<Navigate to="/c/dashboard/overview" replace />} />
              <Route path="overview" element={<ClientOverviewContent />} />
              <Route path="request/new" element={<BuyerRequestPage />} />
              <Route path="job-posts" element={<ClientJobPostsContent />} />
              <Route path="trusted" element={<ClientTrustedProvidersContent />} />
              <Route path="wallet" element={<ClientWalletContent />} />
              <Route path="chat" element={<ClientChatContent />} />
              <Route path="profile" element={<ProfileEditContent role="client" />} />
              <Route path="settings" element={<SettingsContent />} />
              <Route path="*" element={<Navigate to="/c/dashboard/overview" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ClientDashboardPage;
