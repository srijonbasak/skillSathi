import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { walletSchema } from '@/utils/formSchemas';
import { useAppStore } from '@/store/useAppStore';
import PhoneInputBD from '@/components/inputs/PhoneInputBD';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type WalletFormValues = InferType<typeof walletSchema>;

const ProviderWalletContent = () => {
  const { t } = useTranslation();
  const wallet = useAppStore((state) => state.wallet);
  const withdrawAction = useAppStore((state) => state.withdraw);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WalletFormValues>({
    resolver: yupResolver(walletSchema),
    defaultValues: {
      amount: 500,
      method: 'bKash',
      msisdn: ''
    }
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = handleSubmit((values) => {
    if (values.amount > wallet.balance) {
      setStatus('error');
      return;
    }
    withdrawAction(values.amount, values.method as any, values.msisdn);
    setStatus('success');
    reset();
  });

  // Prepare chart data from wallet history
  const last6Months = [
    { month: 'জানু', deposits: 9500, withdrawals: 2000, net: 7500 },
    { month: 'ফেব', deposits: 11000, withdrawals: 1500, net: 9500 },
    { month: 'মার্চ', deposits: 12400, withdrawals: 3000, net: 9400 },
    { month: 'এপ্রি', deposits: 8000, withdrawals: 1000, net: 7000 },
    { month: 'মে', deposits: 13000, withdrawals: 2500, net: 10500 },
    { month: 'জুন', deposits: 14100, withdrawals: 1600, net: 12500 }
  ];

  const transactionByMethod = [
    { name: 'bKash', value: wallet.history.filter(e => e.method === 'bKash').length, color: '#2563EB' },
    { name: 'Nagad', value: wallet.history.filter(e => e.method === 'Nagad').length, color: '#10B981' },
    { name: 'Rocket', value: wallet.history.filter(e => e.method === 'Rocket').length, color: '#F59E0B' }
  ];

  const totalDeposits = wallet.history.filter(e => e.type === 'deposit').reduce((sum, e) => sum + Math.abs(e.delta), 0);
  const totalWithdrawals = wallet.history.filter(e => e.type === 'withdraw').reduce((sum, e) => sum + Math.abs(e.delta), 0);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {t('pages.providerDashboard.sidebar.menu.2.label')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('pages.providerDashboard.sidebar.menu.2.hint')}
          </Typography>
        </Box>

        {/* Balance Card */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" color="text.secondary">{t('pages.wallet.balance')}</Typography>
                <Typography variant="h3" fontWeight={700} color="primary.main">
                  ৳{wallet.balance.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {t('pages.wallet.availableBalance') || 'Available for withdrawal'}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Box sx={{ textAlign: 'center', px: 2, py: 1, borderRadius: 2, bgcolor: 'success.50' }}>
                  <Typography variant="caption" color="text.secondary">মোট জমা</Typography>
                  <Typography variant="h6" color="success.main">৳{totalDeposits.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', px: 2, py: 1, borderRadius: 2, bgcolor: 'error.50' }}>
                  <Typography variant="caption" color="text.secondary">মোট উত্তোলন</Typography>
                  <Typography variant="h6" color="error.main">৳{totalWithdrawals.toLocaleString()}</Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  মাসিক আয় ও ব্যয় বিশ্লেষণ
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={last6Months}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `৳${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="deposits" stroke="#10B981" name="জমা" strokeWidth={2} />
                    <Line type="monotone" dataKey="withdrawals" stroke="#EF4444" name="উত্তোলন" strokeWidth={2} />
                    <Line type="monotone" dataKey="net" stroke="#2563EB" name="নিট" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  পেমেন্ট মেথড
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={transactionByMethod}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {transactionByMethod.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Withdrawal Form */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" mb={2}>
              {t('pages.wallet.withdraw')}
            </Typography>
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label={t('forms.wallet.amount')}
                      error={Boolean(errors.amount)}
                      helperText={errors.amount ? t(errors.amount.message ?? 'validation.required') : ''}
                    />
                  )}
                />
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label={t('forms.wallet.method')}
                      error={Boolean(errors.method)}
                      helperText={errors.method ? t(errors.method.message ?? 'validation.required') : ''}
                    >
                      {['bKash', 'Nagad', 'Rocket'].map((method) => (
                        <MenuItem key={method} value={method}>
                          {method}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <PhoneInputBD control={control} name="msisdn" labelKey="forms.provider.wallet" />
                <Button type="submit" variant="contained" size="large">
                  {t('pages.wallet.withdraw')}
                </Button>
              </Stack>
            </Box>
            {status === 'success' && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {t('pages.wallet.withdrawSuccess')}
              </Alert>
            )}
            {status === 'error' && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {t('pages.wallet.withdrawError')}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Box>
          <Typography variant="h5" mb={2}>
            {t('pages.wallet.historyTitle')}
          </Typography>
          {wallet.history.length ? (
            <Card sx={{ borderRadius: 3 }}>
              <List>
                {wallet.history.map((entry, index) => (
                  <div key={entry.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="subtitle1">{entry.method} • {entry.msisdn}</Typography>
                            <Typography
                              variant="subtitle1"
                              color={entry.type === 'withdraw' ? 'error.main' : 'success.main'}
                              fontWeight={600}
                            >
                              {entry.type === 'withdraw' ? '-' : '+'}৳{Math.abs(entry.delta).toLocaleString()}
                            </Typography>
                          </Stack>
                        }
                        secondary={new Date(entry.timestamp).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      />
                    </ListItem>
                    {index < wallet.history.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Card>
          ) : (
            <Typography color="text.secondary">{t('pages.wallet.empty')}</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProviderWalletContent;
