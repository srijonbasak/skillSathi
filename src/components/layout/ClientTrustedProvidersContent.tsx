import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const ClientTrustedProvidersContent = () => {
  const { t } = useTranslation();

  const trustedProviders = [
    {
      id: '1',
      name: 'রুনা আক্তার',
      avatar: 'রা',
      rating: '4.9',
      reviews: '১২৩ রিভিউ',
      skills: ['ব্লাউজ প্যাটার্ন', 'ফিটিং', 'অল্টারেশন'],
      verified: true,
      completedJobs: 45,
      responseTime: '১ ঘন্টা'
    },
    {
      id: '2',
      name: 'ফাতেমা খাতুন',
      avatar: 'ফা',
      rating: '4.8',
      reviews: '৯৮ রিভিউ',
      skills: ['হোম ক্যাটারিং', 'রান্না', 'ইভেন্ট'],
      verified: true,
      completedJobs: 32,
      responseTime: '২ ঘন্টা'
    },
    {
      id: '3',
      name: 'আয়েশা বেগম',
      avatar: 'আ',
      rating: '5.0',
      reviews: '৭৬ রিভিউ',
      skills: ['বেবিসিটিং', 'শিশু যত্ন', 'টিউশন'],
      verified: true,
      completedJobs: 28,
      responseTime: '৩০ মিনিট'
    }
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            যাদের ওপর ভরসা
          </Typography>
          <Typography variant="body1" color="text.secondary">
            বিশ্বস্ত এবং যাচাইকৃত সেবা প্রদানকারী
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {trustedProviders.map((provider) => (
            <Grid item xs={12} md={6} lg={4} key={provider.id}>
              <Card sx={{ borderRadius: 3, height: '100%', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                        {provider.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                          <Typography variant="h6">{provider.name}</Typography>
                          {provider.verified && (
                            <VerifiedIcon color="primary" fontSize="small" />
                          )}
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <StarIcon sx={{ color: 'warning.main', fontSize: '1rem' }} />
                          <Typography variant="body2" fontWeight={600}>
                            {provider.rating}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {provider.reviews}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {provider.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" variant="outlined" />
                      ))}
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ pt: 1, borderTop: 1, borderColor: 'divider' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          সম্পন্ন কাজ
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {provider.completedJobs}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          সাড়া সময়
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {provider.responseTime}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default ClientTrustedProvidersContent;

