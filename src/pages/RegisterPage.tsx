import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
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
import { useTheme } from '@mui/material/styles';

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
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        {t('forms.errorSummaryTitle')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
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
  const theme = useTheme();

  const paths = [
    {
      key: 'provider' as const,
      tag: t('pages.register.providerTab'),
      title: t('pages.home.personas.sokti.title'),
      body: t('pages.home.personas.sokti.preview'),
      accent: '#FF4D6D',
      icon: <PersonIcon sx={{ fontSize: 28 }} />
    },
    {
      key: 'client' as const,
      tag: t('pages.register.clientTab'),
      title: t('pages.home.personas.sathi.title'),
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
    boxShadow: '0 20px 48px rgba(15,23,42,0.12)'
  };

  return (
    <Stack spacing={2}>
      {paths.map((path) => {
        const isActive = activeTab === path.key;
        return (
          <Box
            key={path.key}
            onClick={() => onTabChange(path.key)}
            sx={{
              ...visualCardBase,
              borderColor: isActive ? path.accent : 'rgba(15,23,42,0.08)',
              borderLeft: `6px solid ${path.accent}`,
              background:
                path.key === 'provider'
                  ? 'linear-gradient(135deg, #fff 0%, #FFF0F5 100%)'
                  : 'linear-gradient(135deg, #fff 0%, #EFF6FF 100%)',
              transform: isActive ? 'translateY(-6px)' : 'none',
              boxShadow: isActive ? `0 28px 60px ${path.accent}25` : visualCardBase.boxShadow,
              '&:hover': {
                borderColor: path.accent,
                transform: 'translateY(-6px)',
                boxShadow: `0 28px 60px ${path.accent}25`
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
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
        );
      })}
    </Stack>
  );
};

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
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

  const frostedCard = {
    borderRadius: 4,
    border: '1px solid rgba(15,23,42,0.08)',
    backgroundColor: 'rgba(255,255,255,0.92)',
    boxShadow: '0 32px 90px rgba(15,23,42,0.15)',
    backdropFilter: 'blur(18px)'
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'rgba(248,250,252,0.9)'
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #FFF5F7 0%, #F8FBFF 55%, #EEF2FF 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start">
          <Grid item xs={12} md={7}>
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
                {t('pages.register.title')}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600 }}>
                {t('ai.helper')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <RegisterVisualCards activeTab={activeTab} onTabChange={setActiveTab} />
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Card
            sx={{
              ...frostedCard,
              overflow: 'hidden'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value as 'provider' | 'client')}
              variant="fullWidth"
              aria-label={t('pages.register.title')}
              sx={{
                px: { xs: 1, md: 2 },
                pt: 2,
                pb: 1,
                '& .MuiTabs-flexContainer': {
                  gap: 1
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                },
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 999,
                  minHeight: 'auto',
                  py: 1.25,
                  px: 3,
                  color: 'text.secondary'
                },
                '& .Mui-selected': {
                  color: activeTab === 'client' ? '#0EA5E9' : '#FF4D6D',
                  backgroundColor: activeTab === 'client' ? 'rgba(14,165,233,0.14)' : 'rgba(255,77,109,0.18)'
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
                            sx={inputStyles}
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
                            sx={inputStyles}
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
                            sx={inputStyles}
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
                                sx={inputStyles}
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
                            sx={inputStyles}
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
                                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.15),
                                        color: 'success.main',
                                        fontWeight: 600,
                                        border: (theme) => `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                                      }}
                                    />
                                  </InputAdornment>
                                ) : null
                              }}
                              sx={inputStyles}
                            />
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      bgcolor: '#FF4D6D',
                      '&:hover': {
                        bgcolor: '#E63E60'
                      }
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
                            sx={inputStyles}
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
                            sx={inputStyles}
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
                            sx={inputStyles}
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
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      bgcolor: '#0EA5E9',
                      '&:hover': {
                        bgcolor: '#0284C7'
                      }
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
      </Container>
    </Box>
  );
};

export default RegisterPage;

