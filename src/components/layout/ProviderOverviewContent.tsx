import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type BookingState = 'pending' | 'accepted' | 'counter';

const ProviderOverviewContent = () => {
  const { t } = useTranslation();
  const [gigLive, setGigLive] = useState(true);
  const [acceptBookings, setAcceptBookings] = useState(true);

  const profile = t('pages.providerDashboard.profile', { returnObjects: true }) as {
    name: string;
    role: string;
    bio: string;
    availability: string;
    editCta: string;
    badges: string[];
    metrics: { label: string; value: string }[];
  };

  const availabilityCopy = t('pages.providerDashboard.availability', { returnObjects: true }) as {
    title: string;
    gigSwitch: string;
    bookingSwitch: string;
    helper: string;
  };

  const monthly = t('pages.providerDashboard.monthly', { returnObjects: true }) as {
    title: string;
    helper: string;
    total: string;
    series: { month: string; value: number; label: string }[];
  };

  const bookingsCopy = t('pages.providerDashboard.bookings', { returnObjects: true }) as {
    title: string;
    helper: string;
    labels: { pending: string; accepted: string; counter: string };
    actions: { book: string; message: string; counter: string };
    items: {
      id: string;
      client: string;
      gig: string;
      date: string;
      price: string;
      note: string;
      state: BookingState;
    }[];
  };

  const counterOffers = t('pages.providerDashboard.counterOffers', { returnObjects: true }) as {
    title: string;
    helper: string;
    actions: { accept: string; respond: string };
    items: { id: string; client: string; offer: string; ask: string; note: string }[];
  };

  const returning = t('pages.providerDashboard.returning', { returnObjects: true }) as {
    title: string;
    helper: string;
    items: { name: string; gigs: string; rating: string; hours: string }[];
  };

  const bookingActionLabel = (state: BookingState) => {
    if (state === 'pending') return bookingsCopy.actions.book;
    if (state === 'accepted') return bookingsCopy.actions.message;
    return bookingsCopy.actions.counter;
  };

  const bookingChipLabel = (state: BookingState) => bookingsCopy.labels[state];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {t('pages.providerDashboard.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            আপনার ব্যবসার সারাংশ এবং গুরুত্বপূর্ণ তথ্য এখানে দেখুন
          </Typography>
          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    12
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    আজকের বার্তা
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    5
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    নতুন বুকিং
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    3
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    পেন্ডিং অনুরোধ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ borderRadius: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    4.9
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    গড় রেটিং
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'secondary.main', color: 'common.white' }}>
                  {profile.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5">{profile.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.role}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" mb={1.5}>
                  {profile.bio}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1.5}>
                  {profile.badges.map((badge) => (
                    <Chip key={badge} label={badge} icon={<ShieldIcon fontSize="small" />} size="small" />
                  ))}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {profile.availability}
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<EditIcon />} sx={{ alignSelf: 'flex-start' }}>
                {profile.editCta}
              </Button>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
              {profile.metrics.map((metric) => (
                <Grid item xs={6} md={3} key={metric.label}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2">{metric.value}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {metric.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{availabilityCopy.title}</Typography>
                <Stack spacing={1.5} mt={2}>
                  <FormControlLabel
                    control={<Switch checked={gigLive} onChange={(event) => setGigLive(event.target.checked)} />}
                    label={<Typography>{availabilityCopy.gigSwitch}</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch checked={acceptBookings} onChange={(event) => setAcceptBookings(event.target.checked)} />
                    }
                    label={<Typography>{availabilityCopy.bookingSwitch}</Typography>}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {availabilityCopy.helper}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{monthly.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {monthly.helper}
                </Typography>
                <Stack spacing={1.5}>
                  {monthly.series.map((item) => (
                    <Box key={item.month}>
                      <Stack direction="row" justifyContent="space-between" mb={0.5}>
                        <Typography variant="body2">{item.month}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.label}
                        </Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={item.value} />
                    </Box>
                  ))}
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                  {monthly.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="h6">{bookingsCopy.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {bookingsCopy.helper}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={2}>
              {bookingsCopy.items.map((booking) => (
                <Box
                  key={booking.id}
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 2
                  }}
                >
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} justifyContent="space-between">
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <Typography variant="subtitle1">{booking.client}</Typography>
                        <Chip label={bookingChipLabel(booking.state)} size="small" />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {booking.gig} • {booking.date}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} mt={0.5}>
                        {booking.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {booking.note}
                      </Typography>
                    </Box>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="flex-start">
                      <Button
                        variant={booking.state === 'pending' ? 'contained' : 'outlined'}
                        size="small"
                      >
                        {bookingActionLabel(booking.state)}
                      </Button>
                      <Button variant="text" size="small">
                        {t('pages.providerDashboard.openChat')}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{counterOffers.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {counterOffers.helper}
                </Typography>
                <Stack spacing={2}>
                  {counterOffers.items.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        p: 2
                      }}
                    >
                      <Typography variant="subtitle2">{item.client}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.note}
                      </Typography>
                      <Stack direction="row" spacing={1} my={1}>
                        <Chip label={item.offer} color="secondary" size="small" />
                        <Chip label={item.ask} variant="outlined" size="small" />
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Button variant="contained" size="small">
                          {counterOffers.actions.accept}
                        </Button>
                        <Button variant="text" size="small">
                          {counterOffers.actions.respond}
                        </Button>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{returning.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {returning.helper}
                </Typography>
                <Stack spacing={2}>
                  {returning.items.map((customer) => (
                    <Box
                      key={customer.name}
                      sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        p: 2
                      }}
                    >
                      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1}>
                        <Stack>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {customer.hours}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Chip label={customer.gigs} size="small" />
                          <Chip label={customer.rating} size="small" color="primary" />
                        </Stack>
                      </Stack>
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

export default ProviderOverviewContent;

