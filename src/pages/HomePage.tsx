import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/CloseRounded';
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
  const theme = useTheme();
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

  const baseCard = {
    borderRadius: 20,
    border: '1px solid rgba(15,23,42,0.08)',
    backgroundColor: '#fff',
    p: { xs: 2.5, md: 3.5 },
    boxShadow: '0 18px 40px rgba(15,23,42,0.08)'
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Chip
                label={t('brand.tagline')}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  fontWeight: 600
                }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.2 }}>
                {t('pages.home.heroTitle')}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, fontWeight: 400 }}>
                {t('pages.home.heroSubcopy')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                <Button variant="contained" size="large" component={RouterLink} to="/register" sx={{ minWidth: 180 }}>
                  {t('pages.home.ctaPrimary')}
                </Button>
                <Button variant="outlined" size="large" onClick={() => setDemoOpen(true)} sx={{ minWidth: 180 }}>
                  {t('pages.home.ctaSecondary')}
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Box sx={{ ...baseCard, p: 3 }}>
                <Chip label={t('pages.home.heroCards.request.title')} size="small" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('pages.home.heroCards.request.subtitle')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <strong>{t('ai.assist')}</strong> - {t('pages.home.heroCards.request.suggestion')}
                </Typography>
              </Box>
              <Box sx={{ ...baseCard, p: 3 }}>
                <Chip label={t('pages.home.heroCards.gig.title')} size="small" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('pages.home.heroCards.gig.subtitle')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('pages.home.heroCards.gig.pricePill')}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Personas Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            {t('pages.home.personaSection.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            {t('pages.home.personaSection.body')}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {personaCards.map((card) => (
            <Grid item xs={12} md={6} key={card.key}>
              <Box
                sx={{
                  ...baseCard,
                  borderTop: `3px solid ${card.accent}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25
                }}
              >
                <Chip
                  label={card.tag}
                  size="small"
                  sx={{
                    alignSelf: 'flex-start',
                    backgroundColor: `${card.accent}15`,
                    color: card.accent,
                    fontWeight: 600,
                    borderRadius: 1
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {card.detail}
                </Typography>
                <Stack spacing={1}>
                  {card.bullets.map((bullet) => (
                    <Typography key={bullet} variant="body2" color="text.secondary">
                      - {bullet}
                    </Typography>
                  ))}
                </Stack>
                {card.note && (
                  <Typography variant="caption" color="text.secondary">
                    {card.note}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Differentiators Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
              {t('pages.home.differentiators.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              {t('pages.home.differentiators.body')}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {differentiators.map((card) => (
              <Grid item xs={12} md={4} key={card.key}>
                <Box sx={{ ...baseCard, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.body}
                  </Typography>
                  <Stack spacing={0.6} sx={{ mt: 'auto' }}>
                    {card.points.map((point) => (
                      <Typography key={point} variant="body2" color="text.secondary">
                        - {point}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Impact Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
              {t('pages.home.impactStats.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              {t('pages.home.impactStats.body')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {impactStats.map((stat) => (
                <Grid item xs={6} key={stat.key}>
                  <Box
                    sx={{
                      ...baseCard,
                      height: '100%',
                      boxShadow: '0 16px 38px rgba(15,23,42,0.08)'
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 700, color: 'primary.main' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.helper}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Working Journey Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
              {t('pages.home.workingJourney.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              {t('pages.home.workingJourney.body')}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {workingJourney.map((item, index) => (
              <Grid item xs={12} md={4} key={item.key}>
                <Box
                  sx={{
                    ...baseCard,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: 24,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1.5, mt: 1, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {item.body}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.helper}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h2" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
          {t('pages.home.howItWorks.title')}
        </Typography>
        <Grid container spacing={3}>
          {howCards.map((card) => (
            <Grid item xs={12} md={4} key={card.key}>
              <Box
                sx={{
                  ...baseCard,
                  height: '100%',
                  boxShadow: '0 16px 40px rgba(15,23,42,0.08)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
            {t('pages.home.categoriesTitle')}
          </Typography>
          <Grid container spacing={2}>
            {categories.map((cat) => (
              <Grid item xs={6} sm={4} md={3} key={cat.key}>
                <Box
                  sx={{
                    ...baseCard,
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    boxShadow: '0 10px 26px rgba(15,23,42,0.06)',
                    borderColor: 'rgba(15,23,42,0.05)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  {categoryIcons[cat.key]}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {cat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h2" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
          {t('pages.home.highlightsTitle')}
        </Typography>
        <Grid container spacing={3}>
          {highlightItems.map((item) => (
            <Grid item xs={12} md={4} key={item.key}>
              <Box
                sx={{
                  ...baseCard,
                  height: '100%',
                  boxShadow: '0 16px 38px rgba(15,23,42,0.08)'
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Trust & Security Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                {t('pages.home.trust.title')}
              </Typography>
              <Stack spacing={2}>
                {trustList.map((item, index) => (
                  <Stack direction="row" spacing={2} alignItems="flex-start" key={item}>
                    {index % 2 === 0 ? (
                      <ShieldIcon color="primary" sx={{ mt: 0.5 }} />
                    ) : (
                      <SecurityIcon color="primary" sx={{ mt: 0.5 }} />
                    )}
                    <Typography variant="body1">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  ...baseCard,
                  boxShadow: '0 16px 36px rgba(15,23,42,0.08)'
                }}
              >
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {t('pages.home.trust.description')}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.primary.main}`,
                    bgcolor: 'primary.50',
                    p: 2
                  }}
                >
                  <InfoIcon color="primary" sx={{ mt: 0.25 }} />
                  <Typography variant="body2">
                    {t('pages.home.trust.info')}{' '}
                    <Button href="/guidelines" variant="text" size="small" sx={{ textTransform: 'none' }}>
                      {t('pages.home.trust.link')}
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            ...baseCard,
            p: { xs: 4, md: 6 },
            boxShadow: '0 24px 60px rgba(15,23,42,0.12)',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
            {t('pages.home.ctaBand.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            {t('pages.home.ctaBand.body')}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large" component={RouterLink} to="/register" sx={{ minWidth: 200 }}>
              {t('pages.home.ctaPrimary')}
            </Button>
            <Button variant="outlined" size="large" onClick={() => setDemoOpen(true)} sx={{ minWidth: 200 }}>
              {t('pages.home.ctaSecondary')}
            </Button>
          </Stack>
        </Box>
      </Container>

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


