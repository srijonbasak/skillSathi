import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import LockIcon from '@mui/icons-material/LockOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SpaIcon from '@mui/icons-material/Spa';
import SchoolIcon from '@mui/icons-material/School';
import HandymanIcon from '@mui/icons-material/Handyman';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import SecurityIcon from '@mui/icons-material/SecurityOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';

const categoryIcons: Record<string, React.ReactNode> = {
  tailoring: <ContentCutIcon fontSize="small" />,
  cooking: <RestaurantIcon fontSize="small" />,
  beauty: <SpaIcon fontSize="small" />,
  tuition: <SchoolIcon fontSize="small" />,
  handicraft: <HandymanIcon fontSize="small" />,
  dataEntry: <KeyboardIcon fontSize="small" />,
  babysitting: <ChildCareIcon fontSize="small" />,
  housekeeping: <CleaningServicesIcon fontSize="small" />
};

const HomePage = () => {
  const { t } = useTranslation();
  const [demoOpen, setDemoOpen] = useState(false);

  const howCards = t('pages.home.howItWorks.cards', {
    returnObjects: true
  }) as { title: string; body: string; key: string }[];

  const categories = t('pages.home.categories', {
    returnObjects: true
  }) as { key: string; label: string }[];

  const trustList = t('pages.home.trust.list', { returnObjects: true }) as string[];

  const personaCards = [
    {
      key: 'sathi',
      accent: '#2563EB',
      tag: t('pages.home.personas.sathi.tag'),
      title: t('pages.home.personas.sathi.title'),
      detail: t('pages.home.personas.sathi.detail'),
      bullets: t('pages.home.personas.sathi.bullets', { returnObjects: true }) as string[]
    },
    {
      key: 'sokti',
      accent: '#FF4D6D',
      tag: t('pages.home.personas.sokti.tag'),
      title: t('pages.home.personas.sokti.title'),
      detail: t('pages.home.personas.sokti.detail'),
      bullets: t('pages.home.personas.sokti.bullets', { returnObjects: true }) as string[],
      note: t('pages.home.personas.sokti.note')
    }
  ];

  const highlightItems = t('pages.home.highlights', { returnObjects: true }) as {
    key: string;
    title: string;
    body: string;
  }[];

  const differentiators = t('pages.home.differentiators.cards', {
    returnObjects: true
  }) as { key: string; title: string; body: string; points: string[] }[];

  const impactStats = t('pages.home.impactStats.items', {
    returnObjects: true
  }) as { key: string; value: string; label: string; helper: string }[];

  const workingJourney = t('pages.home.workingJourney.items', {
    returnObjects: true
  }) as { key: string; title: string; body: string; helper: string }[];

  const frostedCard = {
    borderRadius: 16,
    border: '1px solid rgba(15,23,42,0.06)',
    background: '#fff',
    boxShadow: '0 14px 30px rgba(15,23,42,0.08)'
  };

  return (
    <Box sx={{ maxWidth: 1140, mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 3, md: 6 } }}>
      <Box
        sx={{
          border: '1px solid rgba(231,231,231,0.9)',
          borderRadius: 999,
          px: 2.5,
          py: 1,
          display: 'inline-flex',
          alignItems: 'center',
          mb: 4,
          backgroundColor: '#fff',
          boxShadow: '0 8px 16px rgba(15,23,42,0.05)'
        }}
      >
        <LockIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
        <Typography variant="body2">{t('pages.home.trustLine')}</Typography>
      </Box>

      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        <Grid item xs={12} md={7}>
          <Stack spacing={2.5} alignItems="flex-start">
            <Typography variant="overline" color="text.secondary">
              {t('brand.tagline')}
            </Typography>
            <Typography variant="h1">{t('pages.home.heroTitle')}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 540 }}>
              {t('pages.home.heroSubcopy')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} width="100%" maxWidth={420}>
              <Button fullWidth variant="contained" size="large" component={RouterLink} to="/register">
                {t('pages.home.ctaPrimary')}
              </Button>
              <Button fullWidth variant="outlined" size="large" onClick={() => setDemoOpen(true)}>
                {t('pages.home.ctaSecondary')}
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {t('pages.home.heroNote')}
              </Typography>
              <ArrowRightAltIcon fontSize="small" color="primary" />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                border: '1px solid rgba(15,23,42,0.08)',
                borderRadius: 16,
                p: 2.5,
                backgroundColor: '#fff',
                boxShadow: '0 12px 24px rgba(15,23,42,0.08)'
              }}
            >
              <Chip label={t('pages.home.heroCards.request.title')} size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary" mb={1}>
                {t('pages.home.heroCards.request.subtitle')}
              </Typography>
              <Typography variant="body2">
                <strong>{t('ai.assist')}</strong> — {t('pages.home.heroCards.request.suggestion')}
              </Typography>
            </Box>
            <Box
              sx={{
                border: '1px solid rgba(15,23,42,0.08)',
                borderRadius: 16,
                p: 2.5,
                backgroundColor: '#fff',
                boxShadow: '0 12px 24px rgba(15,23,42,0.08)'
              }}
            >
              <Chip label={t('pages.home.heroCards.gig.title')} size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" color="text.secondary" mb={1}>
                {t('pages.home.heroCards.gig.subtitle')}
              </Typography>
              <Typography variant="body2">
                {t('pages.home.heroCards.gig.pricePill')}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box mt={10}>
        <Typography variant="h4" mb={1}>
          {t('pages.home.personaSection.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {t('pages.home.personaSection.body')}
        </Typography>
        <Grid container spacing={3}>
          {personaCards.map((card, index) => (
            <Grid item xs={12} md={6} key={card.key}>
              <Box
                sx={{
                  ...frostedCard,
                  minHeight: 280,
                  borderTop: `4px solid ${index === 0 ? '#2563EB' : '#FF4D6D'}`
                }}
              >
                <Chip
                  label={card.tag}
                  sx={{
                    alignSelf: 'flex-start',
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 1.5
                  }}
                />
                <Typography variant="h4" fontWeight={700}>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {card.detail}
                </Typography>
                <Stack spacing={1.2}>
                  {card.bullets.map((bullet) => (
                    <Stack direction="row" spacing={1.2} key={bullet} alignItems="flex-start">
                      <Typography variant="body2" color="text.secondary">
                        {bullet}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                {card.note && (
                  <Typography variant="caption" mt={1} color="text.secondary">
                    {card.note}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" mb={1}>
          {t('pages.home.differentiators.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {t('pages.home.differentiators.body')}
        </Typography>
        <Grid container spacing={3}>
          {differentiators.map((card) => (
            <Grid item xs={12} md={4} key={card.key}>
              <Box
                sx={{
                  ...frostedCard,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                  borderTop: '4px solid rgba(37,99,235,0.35)'
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.body}
                </Typography>
                <Stack spacing={0.6} mt="auto">
                  {card.points.map((point) => (
                    <Typography key={point} variant="body2">
                      • {point}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        mt={8}
        sx={{
          borderRadius: 3,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
          p: { xs: 3, md: 4 }
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box flex={1}>
            <Typography variant="h4">{t('pages.home.impactStats.title')}</Typography>
            <Typography variant="body1" color="text.secondary">
              {t('pages.home.impactStats.body')}
            </Typography>
          </Box>
        <Grid container spacing={2} flex={1}>
            {impactStats.map((stat) => (
              <Grid item xs={6} key={stat.key}>
                <Box
                  sx={{
                    ...frostedCard,
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {stat.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.helper}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" mb={1}>
          {t('pages.home.workingJourney.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {t('pages.home.workingJourney.body')}
        </Typography>
        <Grid container spacing={2.5}>
          {workingJourney.map((item) => (
            <Grid item xs={12} md={4} key={item.key}>
              <Box
                sx={{
                  ...frostedCard,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25
                }}
              >
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.helper}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" mb={3}>
          {t('pages.home.howItWorks.title')}
        </Typography>
        <Grid container spacing={2.5}>
          {howCards.map((card) => (
            <Grid item xs={12} md={4} key={card.key}>
              <Box sx={{ ...frostedCard, minHeight: 180, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="subtitle1">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" mb={2}>
          {t('pages.home.categoriesTitle')}
        </Typography>
        <Grid container spacing={1.5}>
          {categories.map((cat) => (
            <Grid item xs={6} sm={4} md={3} key={cat.key}>
              <Box
                sx={{
                  ...frostedCard,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 1
                }}
              >
                {categoryIcons[cat.key]}
                <Typography variant="body2">{cat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" mb={3}>
          {t('pages.home.highlightsTitle')}
        </Typography>
        <Grid container spacing={2.5}>
          {highlightItems.map((item) => (
            <Grid item xs={12} md={4} key={item.key}>
              <Box sx={{ ...frostedCard, minHeight: 220, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={4} mt={8}>
        <Grid item xs={12} md={6}>
          <Box sx={{ ...frostedCard, height: '100%' }}>
            <Typography variant="h5" mb={2}>
              {t('pages.home.trust.title')}
            </Typography>
            <Stack spacing={1.5}>
              {trustList.map((item, index) => (
                <Stack direction="row" spacing={1.5} alignItems="center" key={item}>
                  {index % 2 === 0 ? <ShieldIcon color="primary" /> : <SecurityIcon color="primary" />}
                  <Typography variant="body2">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ ...frostedCard, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">{t('pages.home.trust.description')}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                px: 2,
                py: 1
              }}
            >
              <InfoIcon color="primary" />
              <Typography variant="body2">
                {t('pages.home.trust.info')}{' '}
                <Button href="/guidelines" variant="text" size="small">
                  {t('pages.home.trust.link')}
                </Button>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        mt={8}
        mb={6}
        sx={{
          ...frostedCard,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'center'
        }}
      >
        <Box flex={1}>
          <Typography variant="h4">{t('pages.home.ctaBand.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('pages.home.ctaBand.body')}
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" component={RouterLink} to="/register">
            {t('pages.home.ctaPrimary')}
          </Button>
          <Button variant="outlined" onClick={() => setDemoOpen(true)}>
            {t('pages.home.ctaSecondary')}
          </Button>
        </Stack>
      </Box>

      <Dialog fullWidth maxWidth="sm" open={demoOpen} onClose={() => setDemoOpen(false)}>
        <DialogTitle>
          {t('pages.home.aiDemoTitle')}
          <IconButton
            onClick={() => setDemoOpen(false)}
            aria-label={t('common.close')}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AISuggestionPanel
            open
            suggestion={`${t('forms.gig.title')}: ${t('pages.home.aiDemoDraftTitle')}\n${t('forms.gig.description')}: ${t(
              'pages.home.aiDemoDraftDescription'
            )}`}
            price={1200}
            onDismiss={() => setDemoOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomePage;
