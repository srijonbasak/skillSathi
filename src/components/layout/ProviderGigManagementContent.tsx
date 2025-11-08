import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

const ProviderGigManagementContent = () => {
  const { t } = useTranslation();

  // Mock data for existing gigs
  const gigs = [
    {
      id: '1',
      title: 'ব্লাউজ প্যাটার্ন ও ফিটিং',
      description: 'বুটিক স্টাইলের ব্লাউজ প্যাটার্ন তৈরি এবং পারফেক্ট ফিটিং সেবা',
      price: '৳১,২০০',
      packages: 3,
      status: 'live'
    },
    {
      id: '2',
      title: 'জরুরি অল্টারেশন',
      description: 'দ্রুত এবং নিখুঁত কাপড়ের অল্টারেশন সেবা',
      price: '৳৮০০',
      packages: 2,
      status: 'live'
    },
    {
      id: '3',
      title: 'বাড়িতে সেলাই সেবা',
      description: 'আপনার বাড়িতে গিয়ে সেলাই এবং ফিটিং সেবা',
      price: '৳১,৫০০',
      packages: 1,
      status: 'draft'
    }
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {t('pages.providerDashboard.sidebar.menu.1.label')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('pages.providerDashboard.sidebar.menu.1.hint')}
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            component={RouterLink}
            to="/p/gig/new"
            sx={{ mb: 3 }}
          >
            {t('pages.providerDashboard.createGig')}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {gigs.map((gig) => (
            <Grid item xs={12} md={6} lg={4} key={gig.id}>
              <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                          {gig.title}
                        </Typography>
                        <Chip
                          label={gig.status === 'live' ? t('common.live') : t('common.draft')}
                          color={gig.status === 'live' ? 'success' : 'default'}
                          size="small"
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {gig.description}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle2" color="primary.main">
                          {gig.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • {gig.packages} {t('common.packages')}
                        </Typography>
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        sx={{ flex: 1 }}
                      >
                        {t('common.edit')}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                      >
                        {t('common.delete')}
                      </Button>
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

export default ProviderGigManagementContent;

