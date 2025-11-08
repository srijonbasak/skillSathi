import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import ProviderDashboardPage from '@/pages/ProviderDashboardPage';
import GigCreatorPage from '@/pages/GigCreatorPage';
import ClientDashboardPage from '@/pages/ClientDashboardPage';
import BuyerRequestPage from '@/pages/BuyerRequestPage';
import WalletPage from '@/pages/WalletPage';
import ChatPage from '@/pages/ChatPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/p/dashboard/*" element={<ProviderDashboardPage />} />
    <Route path="/p/gig/new" element={<Navigate to="/p/dashboard/gig/new" replace />} />
    <Route path="/c/dashboard/*" element={<ClientDashboardPage />} />
    <Route path="/c/request/new" element={<Navigate to="/c/dashboard/request/new" replace />} />
    <Route path="/wallet" element={<WalletPage />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
