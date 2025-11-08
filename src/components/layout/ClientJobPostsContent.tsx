import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

const ClientJobPostsContent = () => {
  const { t } = useTranslation();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const jobPosts = [
    {
      id: '1',
      title: 'ব্লাউজ প্যাটার্ন ও ফিটিং',
      status: 'active',
      budget: '৳১,৫০০',
      bids: 5,
      views: 23,
      postedDate: '৩ দিন আগে',
      description: 'আমার একটি ব্লাউজের জন্য প্যাটার্ন এবং ফিটিং প্রয়োজন',
      bidDetails: [
        { provider: 'রুনা আক্তার', amount: '৳১,২০০', message: 'আমি শুক্রবার বিকালে আসতে পারি', status: 'pending' },
        { provider: 'ফাতেমা খাতুন', amount: '৳১,৩০০', message: 'আমি সোমবার সকালে আসতে পারি', status: 'pending' },
        { provider: 'আয়েশা বেগম', amount: '৳১,১০০', message: 'আমি শনিবার আসতে পারি', status: 'accepted' }
      ]
    },
    {
      id: '2',
      title: 'হোম ক্যাটারিং',
      status: 'active',
      budget: '৳৩,০০০',
      bids: 3,
      views: 18,
      postedDate: '৫ দিন আগে',
      description: '২০ জনের জন্য হোম ক্যাটারিং সেবা প্রয়োজন',
      bidDetails: [
        { provider: 'শীলা\'স কিচেন', amount: '৳২,৪০০', message: 'আমি ২০ জনের জন্য খাবার প্রস্তুত করতে পারি', status: 'pending' },
        { provider: 'রান্না ঘর', amount: '৳২,৬০০', message: 'আমি ইভেন্ট ক্যাটারিং করতে পারি', status: 'pending' }
      ]
    },
    {
      id: '3',
      title: 'বেবিসিটিং',
      status: 'closed',
      budget: '৳১,০০০',
      bids: 2,
      views: 15,
      postedDate: '১ সপ্তাহ আগে',
      description: 'সকাল ৯টা থেকে বিকাল ৫টা পর্যন্ত বেবিসিটিং প্রয়োজন',
      bidDetails: [
        { provider: 'আয়েশা বেগম', amount: '৳৮০০', message: 'আমি সকাল ৯টা থেকে বিকাল ৫টা পর্যন্ত উপলব্ধ', status: 'accepted' }
      ]
    }
  ];

  const selectedJob = jobPosts.find(j => j.id === selectedJobId);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Box>
              <Typography variant="h3" fontWeight={700} mb={1}>
                জব পোস্ট ও বিড
              </Typography>
              <Typography variant="body1" color="text.secondary">
                আপনার পোস্ট করা জব এবং প্রাপ্ত বিডসমূহ
              </Typography>
            </Box>
            <Button
              variant="contained"
              component={RouterLink}
              to="/c/dashboard/request/new"
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              নতুন অনুরোধ
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {jobPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <Typography variant="h6">{post.title}</Typography>
                          <Chip
                            label={post.status === 'active' ? 'সক্রিয়' : 'বন্ধ'}
                            color={post.status === 'active' ? 'success' : 'default'}
                            size="small"
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>
                      </Box>
                    </Stack>

                    <Divider />

                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="caption" color="text.secondary">
                          বাজেট
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {post.budget}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="caption" color="text.secondary">
                          <GavelIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                          বিড
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {post.bids}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="caption" color="text.secondary">
                          <VisibilityIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                          দেখা হয়েছে
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {post.views}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="caption" color="text.secondary">
                          পোস্ট করা হয়েছে
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {post.postedDate}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GavelIcon />}
                        onClick={() => setSelectedJobId(post.id)}
                        disabled={post.bids === 0}
                      >
                        বিড দেখুন ({post.bids})
                      </Button>
                      <Button variant="text" size="small">
                        সম্পাদনা
                      </Button>
                      <Button variant="text" size="small" color="error">
                        মুছুন
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* Bids Dialog */}
      <Dialog
        open={Boolean(selectedJobId)}
        onClose={() => setSelectedJobId(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">বিডসমূহ - {selectedJob?.title}</Typography>
            <IconButton onClick={() => setSelectedJobId(null)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Stack spacing={2}>
              {selectedJob.bidDetails.map((bid, index) => (
                <Card key={index} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight={600}>
                          {bid.provider}
                        </Typography>
                        <Chip
                          label={bid.status === 'accepted' ? 'গ্রহণ করা হয়েছে' : 'পেন্ডিং'}
                          color={bid.status === 'accepted' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Stack>
                      <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              বিড পরিমাণ
                            </Typography>
                            <Typography variant="h6" color="success.main">
                              {bid.amount}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              মূল বাজেট
                            </Typography>
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                              {selectedJob.budget}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {bid.message}
                      </Typography>
                      {bid.status === 'pending' && (
                        <Stack direction="row" spacing={1}>
                          <Button variant="contained" size="small" color="success">
                            গ্রহণ করুন
                          </Button>
                          <Button variant="outlined" size="small">
                            প্রত্যাখ্যান করুন
                          </Button>
                          <Button variant="text" size="small">
                            বার্তা পাঠান
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClientJobPostsContent;
