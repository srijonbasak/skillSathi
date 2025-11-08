import { jsx as _jsx } from "react/jsx-runtime";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const MobileActionBar = () => {
    const { t } = useTranslation();
    const role = useAppStore((state) => state.user?.role ?? 'provider');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const items = useMemo(() => {
        if (role === 'client') {
            return [
                { key: 'new_request', to: '/c/request/new', labelKey: 'nav.actions.newRequest', icon: _jsx(PlaylistAddIcon, {}) },
                { key: 'wallet', to: '/wallet', labelKey: 'nav.actions.wallet', icon: _jsx(WalletIcon, {}) },
                { key: 'chat', to: '/chat', labelKey: 'nav.actions.chat', icon: _jsx(ChatIcon, {}) }
            ];
        }
        return [
            { key: 'create_gig', to: '/p/gig/new', labelKey: 'nav.actions.createGig', icon: _jsx(AddCircleIcon, {}) },
            { key: 'wallet', to: '/wallet', labelKey: 'nav.actions.wallet', icon: _jsx(WalletIcon, {}) },
            { key: 'chat', to: '/chat', labelKey: 'nav.actions.chat', icon: _jsx(ChatIcon, {}) }
        ];
    }, [role]);
    if (!isMobile) {
        return null;
    }
    return (_jsx(Paper, { elevation: 0, sx: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: 'rgba(255,252,245,0.95)',
            backdropFilter: 'blur(12px)'
        }, role: "navigation", "aria-label": t('nav.mobileBarLabel'), children: _jsx(BottomNavigation, { showLabels: true, value: value, sx: {
                '& .MuiBottomNavigationAction-root': {
                    paddingBlock: 0.5,
                    minHeight: 60,
                    fontWeight: 600
                },
                '& .Mui-selected': {
                    color: 'primary.main'
                }
            }, onChange: (_, newValue) => {
                setValue(newValue);
                navigate(items[newValue]?.to ?? '/');
            }, children: items.map((item) => (_jsx(BottomNavigationAction, { label: t(item.labelKey), icon: item.icon, sx: { flex: 1 } }, item.key))) }) }));
};
export default MobileActionBar;
