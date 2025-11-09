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
  Divider
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
import { useTheme } from '@mui/material/styles';

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
    transition: 'all 0.25s ease',
    boxShadow: '0 18px 40px rgba(15,23,42,0.12)'
  };

  return (
    <Stack spacing={2}>
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
              boxShadow: `0 24px 60px ${path.accent}30`
            }
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                bgcolor: `${path.accent}15`,
                color: path.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
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
                  height: 24
                }}
              />
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                {path.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
    boxShadow: '0 28px 80px rgba(15,23,42,0.15)',
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)'
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #FFF5F7 0%, #F8FBFF 60%, #EEF2FF 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Chip
                label={t('brand.tagline')}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  fontWeight: 600
                }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.2 }}>
                {t('pages.login.title')}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 550 }}>
                {t('pages.login.description')}
              </Typography>

              <Box sx={{ ...frostedCard, p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <LockIcon sx={{ color: '#fff', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
                      Secure & Protected
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
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
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PhoneIcon sx={{ color: '#fff', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
                        {t('pages.login.continue')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
                      backgroundColor: 'rgba(248,250,252,0.95)'
                    }
                  }}
                />

                <Alert
                  severity="info"
                  icon={<LockIcon />}
                  sx={{
                    borderRadius: 2,
                    bgcolor: 'primary.50',
                    border: `1px solid ${theme.palette.primary.main}20`
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  {t('pages.login.continue')}
                </Button>

                <Divider />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/p/dashboard')}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#FF4D6D',
                      color: '#FF4D6D',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#E63E60',
                        bgcolor: '#FF4D6D10'
                      }
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
                      color: '#0EA5E9',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#0284C7',
                        bgcolor: '#0EA5E910'
                      }
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
