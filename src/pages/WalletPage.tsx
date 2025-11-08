import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
import PageHero from '@/components/layout/PageHero';

type WalletFormValues = InferType<typeof walletSchema>;

const WalletPage = () => {
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

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <PageHero
        title={t('pages.wallet.title')}
        subtitle={t('ai.companion.subtitle')}
        chipLabel={t('ai.companion.label')}
      />
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="overline">{t('pages.wallet.balance')}</Typography>
          <Typography variant="h4">৳{wallet.balance.toLocaleString()}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
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
              <Button type="submit" variant="contained">
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
      <Typography variant="h5" mb={2}>
        {t('pages.wallet.historyTitle')}
      </Typography>
      {wallet.history.length ? (
        <Card>
          <List>
            {wallet.history.map((entry) => (
              <div key={entry.id}>
                <ListItem>
                  <ListItemText
                    primary={`${entry.method} • ${entry.msisdn}`}
                    secondary={`${entry.type === 'withdraw' ? '-' : '+'}৳${Math.abs(entry.delta).toLocaleString()}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Card>
      ) : (
        <Typography color="text.secondary">{t('pages.wallet.empty')}</Typography>
      )}
    </Box>
  );
};

export default WalletPage;
