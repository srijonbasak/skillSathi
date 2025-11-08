import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ActionItem = {
  key: string;
  to: string;
  labelKey: string;
  icon: React.ReactNode;
};

const MobileActionBar = () => {
  const { t } = useTranslation();
  const role = useAppStore((state) => state.user?.role ?? 'provider');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const items = useMemo<ActionItem[]>(() => {
    if (role === 'client') {
      return [
        { key: 'new_request', to: '/c/request/new', labelKey: 'nav.actions.newRequest', icon: <PlaylistAddIcon /> },
        { key: 'wallet', to: '/wallet', labelKey: 'nav.actions.wallet', icon: <WalletIcon /> },
        { key: 'chat', to: '/chat', labelKey: 'nav.actions.chat', icon: <ChatIcon /> }
      ];
    }
    return [
      { key: 'create_gig', to: '/p/gig/new', labelKey: 'nav.actions.createGig', icon: <AddCircleIcon /> },
      { key: 'wallet', to: '/wallet', labelKey: 'nav.actions.wallet', icon: <WalletIcon /> },
      { key: 'chat', to: '/chat', labelKey: 'nav.actions.chat', icon: <ChatIcon /> }
    ];
  }, [role]);

  if (!isMobile) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'rgba(255,252,245,0.95)',
        backdropFilter: 'blur(12px)'
      }}
      role="navigation"
      aria-label={t('nav.mobileBarLabel')}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            paddingBlock: 0.5,
            minHeight: 60,
            fontWeight: 600
          },
          '& .Mui-selected': {
            color: 'primary.main'
          }
        }}
        onChange={(_, newValue) => {
          setValue(newValue);
          navigate(items[newValue]?.to ?? '/');
        }}
      >
        {items.map((item) => (
          <BottomNavigationAction
            key={item.key}
            label={t(item.labelKey)}
            icon={item.icon}
            sx={{ flex: 1 }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MobileActionBar;
