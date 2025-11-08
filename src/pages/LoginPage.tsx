import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { alpha } from '@mui/material/styles';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { phoneRegex } from '@/utils/validators';

const LoginVisualCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const paths = [
    {
      key: 'provider',
      tag: t('pages.register.providerTab'),
      title: t('pages.login.loginProvider'),
      body: t('pages.home.personas.sokti.preview'),
      accent: '#FF4D6D',
      gradient: 'linear-gradient(135deg, #FF4D6D 0%, #E63E60 50%, #C63253 100%)',
      icon: <PersonIcon sx={{ fontSize: 36 }} />,
      onClick: () => navigate('/p/dashboard')
    },
    {
      key: 'client',
      tag: t('pages.register.clientTab'),
      title: t('pages.login.loginClient'),
      body: t('pages.home.personas.sathi.preview'),
      accent: '#0EA5E9',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)',
      icon: <BusinessIcon sx={{ fontSize: 36 }} />,
      onClick: () => navigate('/c/dashboard')
    }
  ];

  return (
    <Stack spacing={3}>
      {paths.map((path) => (
        <Box
          key={path.key}
          onClick={path.onClick}
          sx={{
            position: 'relative',
            borderRadius: 4,
            backgroundImage: path.gradient,
            color: '#fff',
            p: 4,
            cursor: 'pointer',
            transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
              opacity: 0,
              transition: 'opacity 400ms ease'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 400ms ease'
            },
            '&:hover': {
              transform: 'translateY(-12px) scale(1.03)',
              boxShadow: `0 40px 100px ${alpha(path.accent, 0.4)}`,
              '&::before': {
                opacity: 1
              },
              '&::after': {
                opacity: 1
              },
              '& .arrow-icon': {
                transform: 'translateX(8px)'
              }
            }
          }}
        >
          <Stack direction="row" spacing={3} alignItems="flex-start" sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderRadius: 3,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}
            >
              {path.icon}
            </Box>
            <Box flex={1}>
              <Chip
                label={path.tag}
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  color: '#fff',
                  fontWeight: 700,
                  px: 2.5,
                  py: 1,
                  mb: 2,
                  fontSize: '0.8rem',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
              />
              <Typography variant="h5" fontWeight={700} mb={1.5} sx={{ textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                {path.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {path.body}
              </Typography>
            </Box>
            <ArrowForwardIcon
              className="arrow-icon"
              sx={{
                fontSize: 32,
                transition: 'transform 400ms ease',
                opacity: 0.95,
                mt: 1
              }}
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #EBF2FF 0%, #F0F9FF 50%, #FFFFFF 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14,165,233,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 8 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" sx={{ minHeight: { md: '80vh' } }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={4} alignItems="flex-start">
              <Box>
                <Chip
                  icon={<PsychologyIcon />}
                  label={t('ai.companion.label')}
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    px: 3,
                    py: 1.5,
                    mb: 3,
                    fontSize: '0.85rem',
                    boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                    '& .MuiChip-icon': {
                      color: '#fff'
                    }
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 3,
                    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #475569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {t('pages.login.title')}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  fontWeight={400}
                  sx={{ maxWidth: 550, lineHeight: 1.7, mb: 4 }}
                >
                  {t('pages.login.description')}
                </Typography>
              </Box>

              <Box
                sx={{
                  borderRadius: 4,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  background: `linear-gradient(135deg, ${alpha('#2563EB', 0.08)} 0%, ${alpha('#0EA5E9', 0.05)} 100%)`,
                  p: 4,
                  width: '100%',
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 8px 32px ${alpha('#2563EB', 0.1)}`
                }}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                      borderRadius: 3,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(37,99,235,0.3)'
                    }}
                  >
                    <LockIcon sx={{ color: '#fff', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={1}>
                      Secure & Protected
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
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

        <Box mt={{ xs: 6, md: 10 }}>
          <Card
            component="form"
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 800,
              mx: 'auto',
              boxShadow: '0 30px 80px rgba(15,23,42,0.2)',
              borderRadius: 5,
              border: '1px solid',
              borderColor: alpha('#2563EB', 0.1),
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: 'linear-gradient(90deg, #2563EB 0%, #0EA5E9 50%, #2563EB 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Stack spacing={4}>
                <Box>
                  <Stack direction="row" spacing={3} alignItems="center" mb={3}>
                    <Box
                      sx={{
                        background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                        borderRadius: 3,
                        p: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(37,99,235,0.3)'
                      }}
                    >
                      <PhoneIcon sx={{ color: '#fff', fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={700} mb={1}>
                        {t('pages.login.continue')}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
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
                      fontSize: '1.15rem',
                      borderRadius: 3,
                      backgroundColor: 'background.default',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem'
                    }
                  }}
                />

                <Alert
                  severity="info"
                  icon={<LockIcon />}
                  sx={{
                    borderRadius: 3,
                    backgroundColor: alpha('#2563EB', 0.08),
                    border: `2px solid ${alpha('#2563EB', 0.2)}`,
                    '& .MuiAlert-icon': {
                      color: 'primary.main'
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
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
                    py: 2,
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)',
                    boxShadow: '0 12px 32px rgba(37,99,235,0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1D4ED8 0%, #0284C7 100%)',
                      boxShadow: '0 16px 40px rgba(37,99,235,0.5)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {t('pages.login.continue')}
                </Button>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/p/dashboard')}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      borderColor: '#FF4D6D',
                      color: '#FF4D6D',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#E63E60',
                        backgroundColor: alpha('#FF4D6D', 0.08),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 300ms ease'
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
                      borderRadius: 3,
                      borderColor: '#0EA5E9',
                      color: '#0EA5E9',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#0284C7',
                        backgroundColor: alpha('#0EA5E9', 0.08),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 300ms ease'
                    }}
                  >
                    {t('pages.login.loginClient')}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoginPage;
