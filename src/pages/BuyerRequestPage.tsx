import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useTranslation } from 'react-i18next';
import { requestSchema } from '@/utils/formSchemas';
import VoiceInput from '@/components/inputs/VoiceInput';
import AIChip from '@/components/ai/AIChip';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';
import { mockDraftGig } from '@/services/mockAi';

type RequestFormValues = InferType<typeof requestSchema>;

const BuyerRequestPage = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, watch, formState } = useForm<RequestFormValues>({
    resolver: yupResolver(requestSchema),
    defaultValues: {
      details: '',
      priceRange: undefined
    }
  });
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const details = watch('details');

  const onSubmit = handleSubmit(() => {
    setConfirmOpen(true);
  });

  const confirmRequest = () => {
    setConfirmOpen(false);
    setSubmitted(true);
  };

  const fetchAiSuggestion = async () => {
    setAiLoading(true);
    try {
      const result = await mockDraftGig({ hint: details });
      setAiSuggestion(`${result.title}\n\n${result.description}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} mb={1}>
          {t('pages.buyerRequest.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('pages.buyerRequest.helper')}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Box component="form" noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AIChip onClick={fetchAiSuggestion} loading={aiLoading} />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="details"
                  control={control}
                  render={({ field, fieldState }) => (
                    <VoiceInput
                      label={t('forms.request.details')}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="priceRange"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label={t('forms.request.priceRange')}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                {t('forms.request.submit')}
              </Button>
            </Box>
          </Box>
          {submitted && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {t('pages.register.success')}
            </Alert>
          )}
          <AISuggestionPanel
            open={Boolean(aiSuggestion)}
            suggestion={aiSuggestion ?? undefined}
            onApply={() => {
              if (aiSuggestion) {
                setValue('details', `${details}\n${aiSuggestion}`);
              }
              setAiSuggestion(null);
            }}
            onRegenerate={fetchAiSuggestion}
          />
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{t('pages.buyerRequest.confirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('pages.buyerRequest.confirmBody')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={confirmRequest} variant="contained">
            {t('pages.buyerRequest.confirmAction')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuyerRequestPage;
