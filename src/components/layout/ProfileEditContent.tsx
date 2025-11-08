import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useAppStore } from '@/store/useAppStore';
import EditIcon from '@mui/icons-material/EditRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ProfileEditContent = ({ role }: { role: 'provider' | 'client' }) => {
  const { t } = useTranslation();
  const user = useAppStore((state) => state.user);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: '',
      phone: '',
      bio: role === 'provider' ? 'নারী-প্রথম গিগ পার্টনার; ব্লাউজ প্যাটার্ন, জরুরি অল্টার ও বাড়িতে সেবা দেন।' : '',
      address: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Profile updated:', data);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            প্রোফাইল সম্পাদনা
          </Typography>
          <Typography variant="body1" color="text.secondary">
            আপনার প্রোফাইল তথ্য আপডেট করুন
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack spacing={4}>
              {/* Profile Picture */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: '3rem' }}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      minWidth: 'auto',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      p: 0
                    }}
                  >
                    <CameraAltIcon fontSize="small" />
                  </Button>
                </Box>
                <Box>
                  <Typography variant="h6">{user?.name || 'User'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role === 'provider' ? 'সেবা প্রদানকারী' : 'ক্লায়েন্ট'}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'নাম প্রয়োজন' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="নাম"
                          error={Boolean(errors.name)}
                          helperText={errors.name?.message as string}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: 'ইমেইল প্রয়োজন' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="email"
                          label="ইমেইল"
                          error={Boolean(errors.email)}
                          helperText={errors.email?.message as string}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: 'ফোন নম্বর প্রয়োজন' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="ফোন নম্বর"
                          error={Boolean(errors.phone)}
                          helperText={errors.phone?.message as string}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="ঠিকানা"
                        />
                      )}
                    />
                  </Grid>
                  {role === 'provider' && (
                    <Grid item xs={12}>
                      <Controller
                        name="bio"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            multiline
                            minRows={4}
                            label="বায়ো"
                            helperText="আপনার সেবা সম্পর্কে সংক্ষিপ্ত বিবরণ"
                          />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="outlined">
                        বাতিল
                      </Button>
                      <Button type="submit" variant="contained" startIcon={<EditIcon />}>
                        আপডেট করুন
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ProfileEditContent;

