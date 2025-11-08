import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const passwordSchema = yup.object({
  currentPassword: yup.string().required('বর্তমান পাসওয়ার্ড প্রয়োজন'),
  newPassword: yup
    .string()
    .min(8, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে')
    .required('নতুন পাসওয়ার্ড প্রয়োজন'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'পাসওয়ার্ড মিলছে না')
    .required('পাসওয়ার্ড নিশ্চিত করুন')
});

type PasswordFormValues = yup.InferType<typeof passwordSchema>;

const SettingsContent = () => {
  const { t, i18n } = useTranslation();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordSubmit = handleSubmit((data) => {
    // Simulate password change
    console.log('Password change requested:', data);
    setPasswordDialogOpen(false);
    reset();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  });

  const handleDeleteAccount = () => {
    // Simulate account deletion
    console.log('Account deletion requested');
    setDeleteDialogOpen(false);
    // In real app, this would trigger logout and redirect
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            সেটিংস
          </Typography>
          <Typography variant="body1" color="text.secondary">
            আপনার অ্যাকাউন্ট সেটিংস পরিচালনা করুন
          </Typography>
        </Box>

        {saveSuccess && (
          <Alert severity="success" onClose={() => setSaveSuccess(false)}>
            সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে
          </Alert>
        )}

        {/* Language & Preferences */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <LanguageIcon color="primary" />
              <Typography variant="h6">ভাষা ও পছন্দসমূহ</Typography>
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" mb={2}>
                  ভাষা
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant={language === 'bn' ? 'contained' : 'outlined'}
                    size="medium"
                    onClick={() => handleLanguageChange('bn')}
                    sx={{ minWidth: 100 }}
                  >
                    বাংলা
                  </Button>
                  <Button
                    variant={language === 'en' ? 'contained' : 'outlined'}
                    size="medium"
                    onClick={() => handleLanguageChange('en')}
                    sx={{ minWidth: 100 }}
                  >
                    English
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1">ডার্ক মোড</Typography>
                      <Typography variant="caption" color="text.secondary">
                        অন্ধকার থিম ব্যবহার করুন
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <NotificationsIcon color="primary" />
              <Typography variant="h6">নোটিফিকেশন</Typography>
            </Stack>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">ইমেইল নোটিফিকেশন</Typography>
                    <Typography variant="caption" color="text.secondary">
                      গুরুত্বপূর্ণ আপডেটের জন্য ইমেইল পান
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">পুশ নোটিফিকেশন</Typography>
                    <Typography variant="caption" color="text.secondary">
                      রিয়েল-টাইম আপডেট পান
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Security */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">নিরাপত্তা</Typography>
            </Stack>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">দুই-ফ্যাক্টর প্রমাণীকরণ</Typography>
                    <Typography variant="caption" color="text.secondary">
                      আপনার অ্যাকাউন্টের নিরাপত্তা বাড়ান
                    </Typography>
                  </Box>
                }
              />
              <Button
                variant="outlined"
                size="medium"
                onClick={() => setPasswordDialogOpen(true)}
                sx={{ alignSelf: 'flex-start' }}
              >
                পাসওয়ার্ড পরিবর্তন করুন
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <PrivacyTipIcon color="primary" />
              <Typography variant="h6">প্রাইভেসি</Typography>
            </Stack>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacyProfileVisible}
                    onChange={(e) => handleSettingChange('privacyProfileVisible', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">প্রোফাইল দৃশ্যমান</Typography>
                    <Typography variant="caption" color="text.secondary">
                      অন্যরা আপনার প্রোফাইল দেখতে পারবে
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowDirectMessages}
                    onChange={(e) => handleSettingChange('allowDirectMessages', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">সরাসরি বার্তা অনুমতি</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ব্যবহারকারীরা সরাসরি বার্তা পাঠাতে পারবে
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <AccountCircleIcon color="primary" />
              <Typography variant="h6">অ্যাকাউন্ট ব্যবস্থাপনা</Typography>
            </Stack>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                color="error"
                size="medium"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
                sx={{ alignSelf: 'flex-start' }}
              >
                অ্যাকাউন্ট মুছুন
              </Button>
              <Typography variant="caption" color="text.secondary">
                আপনার অ্যাকাউন্ট এবং সমস্ত ডেটা স্থায়ীভাবে মুছে যাবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Password Change Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
          reset();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">পাসওয়ার্ড পরিবর্তন করুন</Typography>
            <IconButton onClick={() => {
              setPasswordDialogOpen(false);
              reset();
            }} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <form onSubmit={handlePasswordSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="বর্তমান পাসওয়ার্ড"
                    fullWidth
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="নতুন পাসওয়ার্ড"
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setPasswordDialogOpen(false);
              reset();
            }}>
              বাতিল
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              পরিবর্তন করুন
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="error">
              অ্যাকাউন্ট মুছুন
            </Typography>
            <IconButton onClick={() => setDeleteDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            আপনি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট মুছতে চান?
          </Alert>
          <Typography variant="body2" color="text.secondary">
            এই কাজটি:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                আপনার সমস্ত ডেটা স্থায়ীভাবে মুছে ফেলবে
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                আপনার সমস্ত গিগ, চ্যাট এবং লেনদেন মুছে ফেলবে
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                পূর্বাবস্থায় ফেরানো যাবে না
              </Typography>
            </li>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            বাতিল
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            startIcon={<DeleteIcon />}
          >
            স্থায়ীভাবে মুছুন
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsContent;
