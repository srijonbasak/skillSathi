import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
  Avatar
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboardRounded';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgentOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloseIcon from '@mui/icons-material/CloseRounded';
import MenuIcon from '@mui/icons-material/MenuRounded';
import BoltIcon from '@mui/icons-material/Bolt';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EditIcon from '@mui/icons-material/EditRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import TrustIcon from '@mui/icons-material/VerifiedUser';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

type SidebarItem = {
  key: string;
  label: string;
  hint?: string;
  to: string;
  icon: React.ReactNode;
};

type DashboardSidebarProps = {
  role: 'provider' | 'client';
};

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  const providerMenu: SidebarItem[] = [
    {
      key: 'overview',
      label: 'ওভারভিউ বোর্ড',
      hint: 'স্ট্যাটস ও গিগ হেলথ',
      to: '/p/dashboard/overview',
      icon: <SpaceDashboardIcon />
    },
    {
      key: 'gigs',
      label: 'গিগ ম্যানেজ করুন',
      hint: 'প্যাকেজ ও দাম সম্পাদনা',
      to: '/p/dashboard/gigs',
      icon: <DesignServicesIcon />
    },
    {
      key: 'wallet',
      label: 'ওয়ালেট ও পেআউট',
      hint: 'ইনস্ট্যান্ট উইথড্র সিমুলেশন',
      to: '/p/dashboard/wallet',
      icon: <AccountBalanceWalletIcon />
    },
    {
      key: 'chat',
      label: 'মাস্কড চ্যাট',
      hint: 'নিরাপদ দর-কষাকষি',
      to: '/p/dashboard/chat',
      icon: <ChatBubbleIcon />
    },
    {
      key: 'profile',
      label: 'প্রোফাইল সম্পাদনা',
      hint: 'আপনার প্রোফাইল আপডেট করুন',
      to: '/p/dashboard/profile',
      icon: <EditIcon />
    },
    {
      key: 'settings',
      label: 'সেটিংস',
      hint: 'অ্যাকাউন্ট সেটিংস',
      to: '/p/dashboard/settings',
      icon: <SettingsIcon />
    }
  ];

  const clientMenu: SidebarItem[] = [
    {
      key: 'overview',
      label: 'ড্যাশবোর্ড',
      hint: 'সারাংশ ও স্ট্যাটাস',
      to: '/c/dashboard/overview',
      icon: <SpaceDashboardIcon />
    },
    {
      key: 'requests',
      label: 'নতুন অনুরোধ',
      hint: 'জব পোস্ট করুন',
      to: '/c/dashboard/request/new',
      icon: <PlaylistAddIcon />
    },
    {
      key: 'job-posts',
      label: 'জব পোস্ট ও বিড',
      hint: 'আপনার পোস্ট এবং বিড',
      to: '/c/dashboard/job-posts',
      icon: <AssignmentIcon />
    },
    {
      key: 'trusted',
      label: 'যাদের ওপর ভরসা',
      hint: 'বিশ্বস্ত সেবা প্রদানকারী',
      to: '/c/dashboard/trusted',
      icon: <TrustIcon />
    },
    {
      key: 'wallet',
      label: 'ওয়ালেট',
      hint: 'ব্যালেন্স ও লেনদেন',
      to: '/c/dashboard/wallet',
      icon: <AccountBalanceWalletIcon />
    },
    {
      key: 'chat',
      label: 'মাস্কড চ্যাট',
      hint: 'নিরাপদ বার্তা',
      to: '/c/dashboard/chat',
      icon: <ChatBubbleIcon />
    },
    {
      key: 'profile',
      label: 'প্রোফাইল সম্পাদনা',
      hint: 'আপনার প্রোফাইল আপডেট করুন',
      to: '/c/dashboard/profile',
      icon: <EditIcon />
    },
    {
      key: 'settings',
      label: 'সেটিংস',
      hint: 'অ্যাকাউন্ট সেটিংস',
      to: '/c/dashboard/settings',
      icon: <SettingsIcon />
    }
  ];

  const menu = role === 'provider' ? providerMenu : clientMenu;

  const sidebarGradient =
    role === 'provider'
      ? 'linear-gradient(180deg, #FF4D6D 0%, #E63E60 50%, #C63253 100%)'
      : 'linear-gradient(180deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)';

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: sidebarGradient,
          opacity: 0.05,
          pointerEvents: 'none'
        },
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.text.secondary, 0.2),
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.secondary, 0.3)
          }
        }
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: sidebarGradient,
          color: '#fff',
          p: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            pointerEvents: 'none'
          }
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            {role === 'provider' ? (
              <BoltIcon sx={{ fontSize: 24, color: '#fff' }} />
            ) : (
              <PsychologyIcon sx={{ fontSize: 24, color: '#fff' }} />
            )}
          </Box>
          <Box>
            <Chip
              label={role === 'provider' ? t('chatbots.sokti.title') : t('chatbots.sathi.title')}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 24,
                mb: 0.5,
                backdropFilter: 'blur(10px)'
              }}
            />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem', mt: 0.5 }}>
              {role === 'provider' ? t('chatbots.sokti.subtitle') : t('chatbots.sathi.subtitle')}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* User Profile Section */}
      {user && (
        <Box sx={{ p: 2.5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: sidebarGradient,
                fontWeight: 700
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={600} noWrap>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {role === 'provider' ? t('pages.providerDashboard.profile.role') : 'Client'}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
        <List sx={{ p: 0 }}>
          {menu.map((item) => {
            const isActive = 
              location.pathname === item.to || 
              location.pathname.startsWith(item.to + '/') ||
              (item.to === '/p/dashboard/overview' && (location.pathname === '/p/dashboard' || location.pathname === '/p/dashboard/')) ||
              (item.to === '/c/dashboard/overview' && (location.pathname === '/c/dashboard' || location.pathname === '/c/dashboard/'));
            return (
              <ListItemButton
                key={item.key}
                component={RouterLink}
                to={item.to}
                selected={isActive}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 1.25,
                  px: 2,
                  backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'action.hover'
                  },
                  '&.Mui-selected': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15)
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main'
                    }
                  },
                  transition: 'all 200ms ease'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.hint}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.7rem',
                    color: 'text.secondary'
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Support Section */}
      <Box
        sx={{
          p: 2.5,
          backgroundColor: 'background.default',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                background: sidebarGradient,
                borderRadius: 1.5,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SupportAgentIcon sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
              {role === 'provider'
                ? t('pages.providerDashboard.sidebar.support.title')
                : 'Need Help?'}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
            {role === 'provider'
              ? t('pages.providerDashboard.sidebar.support.body')
              : 'Get support from our team'}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            component={RouterLink}
            to={role === 'provider' ? '/p/dashboard/chat' : '/c/dashboard/chat'}
            onClick={() => isMobile && setMobileOpen(false)}
            sx={{
              alignSelf: 'flex-start',
              borderRadius: 2,
              fontSize: '0.75rem',
              py: 0.75,
              px: 2,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: alpha(theme.palette.primary.main, 0.08)
              }
            }}
          >
            {role === 'provider'
              ? t('pages.providerDashboard.sidebar.support.action')
              : 'Contact Support'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: 'fixed',
            top: 80,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'background.paper',
            boxShadow: 3,
            width: 48,
            height: 48,
            '&:hover': {
              backgroundColor: 'background.paper',
              transform: 'scale(1.05)'
            },
            transition: 'all 200ms ease'
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              boxShadow: '4px 0 24px rgba(0,0,0,0.15)'
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1,
                backgroundColor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'background.paper'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            {sidebarContent}
          </Box>
        </Drawer>
      </>
    );
  }

  return sidebarContent;
};

export default DashboardSidebar;
