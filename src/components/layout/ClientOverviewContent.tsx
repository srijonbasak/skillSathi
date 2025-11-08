import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';

const ClientOverviewContent = () => {
  const { t } = useTranslation();

  const spendSummary = t('pages.clientDashboard.spendSummary', { returnObjects: true }) as {
    title: string;
    helper: string;
    items: { label: string; value: string; helper: string }[];
  };

  const jobPosts = t('pages.clientDashboard.jobPosts', { returnObjects: true }) as {
    title: string;
    helper: string;
    actions: { view: string; chat: string; counter: string };
    items: {
      id: string;
      title: string;
      status: string;
      budget: string;
      hours: string;
      provider: string;
      review: string;
      state: 'negotiating' | 'booked' | 'counter';
      note: string;
    }[];
  };

  const providerInsights = t('pages.clientDashboard.providerInsights', { returnObjects: true }) as {
    title: string;
    helper: string;
    items: { name: string; rating: string; reviews: string; hours: string; note: string }[];
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {t('pages.clientDashboard.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            আপনার অনুরোধ এবং সেবা প্রদানকারীদের সারাংশ এখানে দেখুন
          </Typography>
          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    {jobPosts.items.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    সক্রিয় অনুরোধ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {jobPosts.items.filter(p => p.state === 'booked').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    বুক করা
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    {jobPosts.items.filter(p => p.state === 'negotiating').length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    দর-কষাকষি চলছে
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    {providerInsights.items.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    সেবা প্রদানকারী
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* New Request Card */}
        <Card sx={{ borderRadius: 3, bgcolor: 'primary.main', color: 'common.white' }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h5">{t('pages.clientDashboard.newRequest')}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {t('pages.buyerRequest.helper')}
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/c/dashboard/request/new"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'common.white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                {t('pages.clientDashboard.newRequest')}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Job Posts */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="h6">{jobPosts.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {jobPosts.helper}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={2}>
              {jobPosts.items.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 2
                  }}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} justifyContent="space-between">
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1">{post.title}</Typography>
                        <Chip label={post.status} size="small" color={post.state === 'booked' ? 'success' : 'default'} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {post.budget} • {post.hours}
                      </Typography>
                      <Typography variant="body2" mt={0.5}>
                        {post.provider} • {post.review}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.note}
                      </Typography>
                    </Box>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="flex-start">
                      <Button variant="outlined" size="small">
                        {jobPosts.actions.view}
                      </Button>
                      <Button variant="contained" size="small" component={RouterLink} to="/c/dashboard/chat">
                        {jobPosts.actions.chat}
                      </Button>
                      <Button variant="text" size="small">
                        {jobPosts.actions.counter}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Provider Insights */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{providerInsights.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {providerInsights.helper}
                </Typography>
                <Stack spacing={2}>
                  {providerInsights.items.map((provider) => (
                    <Box
                      key={provider.name}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        p: 2
                      }}
                    >
                      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1}>
                        <Stack>
                          <Typography variant="subtitle1">{provider.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {provider.hours}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {provider.note}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Chip label={provider.rating} color="primary" size="small" />
                          <Chip label={provider.reviews} size="small" variant="outlined" />
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Spend Summary */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{spendSummary.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {spendSummary.helper}
                </Typography>
                <Stack spacing={1.5}>
                  {spendSummary.items.map((item) => (
                    <Box key={item.label}>
                      <Typography variant="subtitle2">{item.label}</Typography>
                      <Typography variant="h6">{item.value}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.helper}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ClientOverviewContent;

