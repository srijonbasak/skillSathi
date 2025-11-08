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
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gigSchema } from '@/utils/formSchemas';
import { skills } from '@/data/skills';
import AIChip from '@/components/ai/AIChip';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';
import { mockDraftGig, mockSuggestPrice } from '@/services/mockAi';

type GigFormValues = InferType<typeof gigSchema>;

const GigCreatorPage = () => {
  const { t, i18n } = useTranslation();
  const { control, handleSubmit, formState, reset, setValue, watch } = useForm<GigFormValues>({
    resolver: yupResolver(gigSchema),
    defaultValues: {
      skill: '',
      title: '',
      description: '',
      price: 100
    }
  });

  const [draftSuggestion, setDraftSuggestion] = useState<{ title: string; description: string } | null>(null);
  const [priceSuggestion, setPriceSuggestion] = useState<number | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedSkill = watch('skill');
  const descriptionValue = watch('description');

  const onSubmit = handleSubmit(() => {
    setSuccess(true);
  });

  const fetchDraft = async () => {
    setAiLoading(true);
    try {
      const response = await mockDraftGig({ skill: selectedSkill, hint: descriptionValue });
      setDraftSuggestion(response);
    } finally {
      setAiLoading(false);
    }
  };

  const fetchPrice = async () => {
    setPriceLoading(true);
    try {
      const response = await mockSuggestPrice({ skill: selectedSkill });
      setPriceSuggestion(response);
    } finally {
      setPriceLoading(false);
    }
  };

  const applyDraft = () => {
    if (!draftSuggestion) return;
    setValue('title', draftSuggestion.title);
    setValue('description', draftSuggestion.description);
    setDraftSuggestion(null);
    setDialogOpen(false);
  };

  const skillOptions = skills.map((skill) => ({
    id: skill.id,
    label: i18n.language === 'bn' ? skill.nameBn : skill.nameEn
  }));

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} mb={1}>
          {t('pages.gigCreator.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('pages.gigCreator.helper')}
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{t('forms.gig.skill')}</Typography>
                </Stack>
                <Controller
                  name="skill"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label={t('forms.gig.skill')}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                    >
                      {skillOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{t('forms.gig.title')}</Typography>
                  <AIChip onClick={fetchDraft} loading={aiLoading} />
                </Stack>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label={t('forms.gig.title')}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      multiline
                      minRows={4}
                      fullWidth
                      label={t('forms.gig.description')}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{t('forms.gig.price')}</Typography>
                  <AIChip onClick={fetchPrice} loading={priceLoading} labelKey="forms.gig.priceSuggest" />
                </Stack>
                <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      label={t('forms.gig.price')}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.required') : t('ai.priceHint')}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => reset()}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" variant="contained">
                {t('forms.gig.publish')}
              </Button>
            </Box>
          </Box>
          {formState.isSubmitSuccessful && success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {t('pages.gigCreator.publishSuccess')}
            </Alert>
          )}
          <AISuggestionPanel
            open={Boolean(draftSuggestion)}
            suggestion={
              draftSuggestion ? `${draftSuggestion.title}\n\n${draftSuggestion.description}` : undefined
            }
            onApply={() => setDialogOpen(true)}
            onRegenerate={fetchDraft}
          />
          <AISuggestionPanel
            open={Boolean(priceSuggestion)}
            titleKey="ai.priceHint"
            price={priceSuggestion ?? undefined}
            onApply={() => {
              if (!priceSuggestion) return;
              setValue('price', priceSuggestion);
              setPriceSuggestion(null);
            }}
            onRegenerate={fetchPrice}
          />
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t('ai.confirmApplyTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('ai.confirmApplyBody')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={applyDraft} variant="contained">
            {t('common.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GigCreatorPage;
