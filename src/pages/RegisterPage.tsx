import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { alpha } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@mui/material';
import type { InferType } from 'yup';
import { providerSchema, clientSchema } from '@/utils/formSchemas';
import PhoneInputBD from '@/components/inputs/PhoneInputBD';
import LocationSelector from '@/components/inputs/LocationSelector';
import { skills } from '@/data/skills';
import { nidRegex } from '@/utils/validators';

type ProviderFormValues = InferType<typeof providerSchema>;
type ClientFormValues = InferType<typeof clientSchema>;

const renderErrors = (errors: FieldErrors, t: (key: string) => string, prefix: string) => {
  const entries = Object.entries(errors)
    .map(([field, detail]) => {
      if (!detail) return null;
      if ('message' in detail && detail.message) {
        return { field, message: detail.message as string };
      }
      return null;
    })
    .filter(Boolean) as { field: string; message: string }[];

  if (!entries.length) return null;

  return (
    <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        {t('forms.errorSummaryTitle')}
      </Typography>
      <Typography variant="body2" mb={1}>
        {t('forms.errorSummaryIntro')}
      </Typography>
      <List dense>
        {entries.map((entry) => (
          <ListItemButton key={entry.field} component="a" href={`#${prefix}-${entry.field}`}>
            {t(entry.message)}
          </ListItemButton>
        ))}
      </List>
    </Alert>
  );
};

const RegisterVisualCards = ({
  activeTab,
  onTabChange
}: {
  activeTab: 'provider' | 'client';
  onTabChange: (tab: 'provider' | 'client') => void;
}) => {
  const { t } = useTranslation();

  const paths = [
    {
      key: 'provider' as const,
      tag: t('pages.register.providerTab'),
      title: t('pages.home.personas.sokti.title'),
      body: t('pages.home.personas.sokti.preview'),
      gradient: 'linear-gradient(135deg, #FF4D6D 0%, #E63E60 50%, #C63253 100%)',
      accent: '#FF4D6D',
      icon: <PersonIcon sx={{ fontSize: 36 }} />
    },
    {
      key: 'client' as const,
      tag: t('pages.register.clientTab'),
      title: t('pages.home.personas.sathi.title'),
      body: t('pages.home.personas.sathi.preview'),
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)',
      accent: '#0EA5E9',
      icon: <BusinessIcon sx={{ fontSize: 36 }} />
    }
  ];

  return (
    <Stack spacing={3}>
      {paths.map((path) => {
        const isActive = activeTab === path.key;
        return (
          <Box
            key={path.key}
            onClick={() => onTabChange(path.key)}
            sx={{
              position: 'relative',
              borderRadius: 4,
              backgroundImage: path.gradient,
              color: '#fff',
              p: 4,
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isActive
                ? '0 30px 80px rgba(0,0,0,0.25)'
                : '0 20px 60px rgba(0,0,0,0.15)',
              border: isActive ? '3px solid rgba(255,255,255,0.5)' : '3px solid transparent',
              transform: isActive ? 'translateY(-8px) scale(1.02)' : 'none',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 300ms ease'
              },
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
                borderColor: 'rgba(255,255,255,0.5)',
                '&::before': {
                  opacity: 1
                }
              }
            }}
          >
            {isActive && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  borderRadius: '50%',
                  p: 1,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 24, color: '#fff' }} />
              </Box>
            )}
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  borderRadius: 3,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                {path.icon}
              </Box>
              <Box flex={1}>
                <Chip
                  label={path.tag}
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    fontWeight: 700,
                    px: 2,
                    py: 0.5,
                    mb: 1.5,
                    fontSize: '0.75rem',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Typography variant="h5" fontWeight={700} mb={1.5} sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  {path.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.7 }}>
                  {path.body}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'provider' | 'client'>('provider');

  const providerForm = useForm<ProviderFormValues>({
    resolver: yupResolver(providerSchema),
    defaultValues: {
      nameBn: '',
      nameEn: '',
      phone: '',
      division: '',
      district: '',
      upazila: '',
      area: '',
      skills: [],
      wallet: '',
      email: '',
      nid: ''
    }
  });

  const clientForm = useForm<ClientFormValues>({
    resolver: yupResolver(clientSchema),
    defaultValues: {
      name: '',
      orgType: '',
      phone: '',
      division: '',
      district: '',
      upazila: '',
      area: ''
    }
  });

  const [providerSuccess, setProviderSuccess] = useState(false);
  const [clientSuccess, setClientSuccess] = useState(false);

  const skillOptions = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        label: i18n.language === 'bn' ? skill.nameBn : skill.nameEn
      })),
    [i18n.language]
  );

  const handleProviderSubmit = providerForm.handleSubmit(() => {
    setProviderSuccess(true);
  });

  const handleClientSubmit = clientForm.handleSubmit(() => {
    setClientSuccess(true);
  });

  const orgTypes = ['individual', 'sme', 'ngo', 'company'];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 6 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '500px',
          background: 'linear-gradient(180deg, rgba(37,99,235,0.03) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="stretch"
        sx={{ pt: { xs: 7, md: 10 }, position: 'relative', zIndex: 1 }}
      >
        <Grid item xs={12} md={7}>
          <Stack spacing={4} alignItems="flex-start">
            <Box>
              <Chip
                label={t('brand.tagline')}
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  mb: 2,
                  fontSize: '0.75rem'
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  background: 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2
                }}
              >
                {t('pages.register.title')}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ maxWidth: 600 }}>
                {t('ai.helper')}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <RegisterVisualCards activeTab={activeTab} onTabChange={setActiveTab} />
        </Grid>
      </Grid>

      <Box mt={10} sx={{ position: 'relative', zIndex: 1 }}>
        <Card
          sx={{
            boxShadow: '0 25px 60px rgba(15,23,42,0.15)',
            borderRadius: 4,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                activeTab === 'client'
                  ? 'linear-gradient(90deg, #0EA5E9 0%, #0284C7 100%)'
                  : 'linear-gradient(90deg, #FF4D6D 0%, #E63E60 100%)'
            }
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value as 'provider' | 'client')}
            variant="fullWidth"
            aria-label={t('pages.register.title')}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                py: 3
              },
              '& .Mui-selected': {
                color: activeTab === 'client' ? '#0EA5E9' : '#FF4D6D'
              }
            }}
          >
            <Tab
              label={t('pages.register.providerTab')}
              value="provider"
              sx={{
                '&.Mui-selected': {
                  color: '#FF4D6D'
                }
              }}
            />
            <Tab
              label={t('pages.register.clientTab')}
              value="client"
              sx={{
                '&.Mui-selected': {
                  color: '#0EA5E9'
                }
              }}
            />
          </Tabs>
          <CardContent sx={{ p: { xs: 4, md: 5 } }}>
            {activeTab === 'provider' && (
              <Box component="form" noValidate onSubmit={handleProviderSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} id="provider-nameBn">
                    <Controller
                      name="nameBn"
                      control={providerForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t('forms.provider.nameBn')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-nameEn">
                    <Controller
                      name="nameEn"
                      control={providerForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t('forms.provider.nameEn')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-phone">
                    <PhoneInputBD control={providerForm.control} name="phone" />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-area">
                    <Controller
                      name="area"
                      control={providerForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t('forms.provider.area')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} id="provider-location">
                    <LocationSelector
                      control={providerForm.control}
                      divisionName="division"
                      districtName="district"
                      upazilaName="upazila"
                      idPrefix="provider"
                    />
                  </Grid>
                  <Grid item xs={12} id="provider-skills">
                    <Controller
                      name="skills"
                      control={providerForm.control}
                      render={({ field, fieldState }) => (
                        <Autocomplete
                          multiple
                          options={skillOptions}
                          value={skillOptions.filter((option) => field.value?.includes(option.id))}
                          onChange={(_, value) => field.onChange(value.map((item) => item.id))}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t('forms.provider.skills')}
                              error={Boolean(fieldState.error)}
                              helperText={
                                fieldState.error ? t(fieldState.error.message ?? 'validation.skills') : undefined
                              }
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-wallet">
                    <PhoneInputBD control={providerForm.control} name="wallet" labelKey="forms.provider.wallet" />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-email">
                    <Controller
                      name="email"
                      control={providerForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="email"
                          label={t('forms.provider.email')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.email') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="provider-nid">
                    <Controller
                      name="nid"
                      control={providerForm.control}
                      render={({ field, fieldState }) => {
                        const isVerified = field.value && nidRegex.test(field.value.trim());
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            label={t('forms.provider.nid')}
                            error={Boolean(fieldState.error)}
                            helperText={
                              fieldState.error
                                ? t(fieldState.error.message ?? 'validation.nid')
                                : isVerified
                                ? t('forms.provider.nidVerified')
                                : ''
                            }
                            InputProps={{
                              endAdornment: isVerified ? (
                                <InputAdornment position="end">
                                  <Chip
                                    icon={<VerifiedUserIcon sx={{ color: 'success.main' }} />}
                                    label={t('common.verified')}
                                    size="small"
                                    sx={{
                                      backgroundColor: (theme) => alpha(theme.palette.success.main, 0.15),
                                      color: 'success.main',
                                      fontWeight: 700,
                                      border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                                    }}
                                  />
                                </InputAdornment>
                              ) : null
                            }}
                          />
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Box mt={4} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      backgroundColor: '#FF4D6D',
                      boxShadow: '0 8px 24px rgba(255,77,109,0.3)',
                      '&:hover': {
                        backgroundColor: '#E63E60',
                        boxShadow: '0 12px 32px rgba(255,77,109,0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 300ms ease'
                    }}
                  >
                    {t('pages.register.submit')}
                  </Button>
                </Box>
                {providerSuccess && (
                  <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                    {t('pages.register.success')}
                  </Alert>
                )}
                {providerForm.formState.isSubmitted && !providerForm.formState.isSubmitSuccessful
                  ? renderErrors(providerForm.formState.errors, t, 'provider')
                  : null}
              </Box>
            )}

            {activeTab === 'client' && (
              <Box component="form" noValidate onSubmit={handleClientSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} id="client-name">
                    <Controller
                      name="name"
                      control={clientForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t('forms.client.name')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="client-orgType">
                    <Controller
                      name="orgType"
                      control={clientForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label={t('forms.client.orgType')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        >
                          {orgTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {t(`forms.clientOrgTypes.${type}`)}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} id="client-phone">
                    <PhoneInputBD control={clientForm.control} name="phone" labelKey="forms.client.phone" />
                  </Grid>
                  <Grid item xs={12} md={6} id="client-area">
                    <Controller
                      name="area"
                      control={clientForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={t('forms.provider.area')}
                          error={Boolean(fieldState.error)}
                          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} id="client-location">
                    <LocationSelector
                      control={clientForm.control}
                      divisionName="division"
                      districtName="district"
                      upazilaName="upazila"
                      idPrefix="client"
                    />
                  </Grid>
                </Grid>
                <Box mt={4} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      backgroundColor: '#0EA5E9',
                      boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
                      '&:hover': {
                        backgroundColor: '#0284C7',
                        boxShadow: '0 12px 32px rgba(14,165,233,0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 300ms ease'
                    }}
                  >
                    {t('pages.register.submit')}
                  </Button>
                </Box>
                {clientSuccess && (
                  <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                    {t('pages.register.success')}
                  </Alert>
                )}
                {clientForm.formState.isSubmitted && !clientForm.formState.isSubmitSuccessful
                  ? renderErrors(clientForm.formState.errors, t, 'client')
                  : null}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegisterPage;
