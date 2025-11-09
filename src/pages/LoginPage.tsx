import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Alert,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { phoneRegex } from '@/utils/validators';

const LoginVisualCards = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const paths = [
    {
      key: 'provider',
      tag: t('pages.register.providerTab'),
      title: t('pages.login.loginProvider'),
      body: t('pages.home.personas.sokti.preview'),
      accent: '#FF4D6D',
      icon: <PersonIcon sx={{ fontSize: 28 }} />
    },
    {
      key: 'client',
      tag: t('pages.register.clientTab'),
      title: t('pages.login.loginClient'),
      body: t('pages.home.personas.sathi.preview'),
      accent: '#0EA5E9',
      icon: <BusinessIcon sx={{ fontSize: 28 }} />
    }
  ];

  const visualCardBase = {
    borderRadius: 3,
    border: '1px solid rgba(15,23,42,0.08)',
    backgroundColor: '#fff',
    p: 3,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 24px rgba(15,23,42,0.08)'
  };

  return (
    <Stack spacing={2.5}>
      {paths.map((path) => (
        <Box
          key={path.key}
          onClick={() => navigate(path.key === 'provider' ? '/p/dashboard' : '/c/dashboard')}
          sx={{
            ...visualCardBase,
            borderLeft: `6px solid ${path.accent}`,
            background:
              path.key === 'provider'
                ? 'linear-gradient(135deg, #fff 0%, #FFF0F5 100%)'
                : 'linear-gradient(135deg, #fff 0%, #EFF6FF 100%)',
            '&:hover': {
              borderColor: path.accent,
              transform: 'translateY(-6px)',
              boxShadow: `0 20px 48px ${alpha(path.accent, 0.25)}`
            }
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: `${path.accent}15`,
                color: path.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  bgcolor: `${path.accent}25`
                }
              }}
            >
              {path.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Chip
                label={path.tag}
                size="small"
                sx={{
                  mb: 1,
                  bgcolor: `${path.accent}15`,
                  color: path.accent,
                  fontWeight: 600,
                  height: 26,
                  px: 1.5
                }}
              />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                {path.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {path.body}
              </Typography>
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phoneRegex.test(phone.trim())) {
      setError('validation.phone');
      return;
    }
    setError(null);
    navigate('/p/dashboard');
  };

  const frostedCard = {
    borderRadius: 4,
    border: '1px solid rgba(15,23,42,0.08)',
    boxShadow: '0 20px 60px rgba(15,23,42,0.12)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)'
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #FFF5F7 0%, #F8FBFF 60%, #EEF2FF 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,77,109,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14,165,233,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Chip
                label={t('brand.tagline')}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 600,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('pages.login.title')}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 550, lineHeight: 1.7 }}>
                {t('pages.login.description')}
              </Typography>

              <Box sx={{ ...frostedCard, p: 3.5 }}>
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                  >
                    <LockIcon sx={{ color: '#fff', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
                      Secure & Protected
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {t('pages.login.otpInfo')}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <LoginVisualCards />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 8, md: 10 } }}>
          <Card
            component="form"
            onSubmit={handleSubmit}
            sx={{
              ...frostedCard,
              maxWidth: 720,
              mx: 'auto'
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 5 } }}>
              <Stack spacing={4}>
                <Box>
                  <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
                      }}
                    >
                      <PhoneIcon sx={{ color: '#fff', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                        {t('pages.login.continue')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {t('pages.login.helper')}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <TextField
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                  type="tel"
                  inputMode="tel"
                  label={t('forms.provider.phone')}
                  fullWidth
                  error={Boolean(error)}
                  helperText={error ? t(error) : ''}
                  inputProps={{
                    pattern: phoneRegex.source,
                    maxLength: 14
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(248,250,252,0.95)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(248,250,252,1)'
                      },
                      '&.Mui-focused': {
                        backgroundColor: '#fff',
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }
                  }}
                />

                <Alert
                  severity="info"
                  icon={<LockIcon />}
                  sx={{
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                    {t('phone.maskedBanner')}
                  </Typography>
                </Alert>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.75,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('pages.login.continue')}
                </Button>

                <Divider sx={{ my: 1 }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/p/dashboard')}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#FF4D6D',
                      borderWidth: 2,
                      color: '#FF4D6D',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#E63E60',
                        borderWidth: 2,
                        bgcolor: alpha('#FF4D6D', 0.08),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {t('pages.login.loginProvider')}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/c/dashboard')}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#0EA5E9',
                      borderWidth: 2,
                      color: '#0EA5E9',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#0284C7',
                        borderWidth: 2,
                        bgcolor: alpha('#0EA5E9', 0.08),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {t('pages.login.loginClient')}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
