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
  useTheme,
  alpha
} from '@mui/material';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
      bullets: t('pages.home.personas.sathi.bullets', { returnObjects: true }) as string[],
      note: t('pages.home.personas.sathi.note')
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

  const enhancedCard = {
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    bgcolor: 'background.paper',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
      borderColor: theme.palette.primary.main
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, rgba(14,165,233,0.02) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        {/* Hero Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Chip
                label={t('brand.tagline')}
                size="small"
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 600,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('pages.home.heroTitle')}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, lineHeight: 1.7 }}>
                {t('pages.home.heroSubcopy')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('pages.home.ctaPrimary')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setDemoOpen(true)}
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('pages.home.ctaSecondary')}
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5}>
              <Box
                sx={{
                  ...enhancedCard,
                  p: 3.5,
                  borderLeft: `4px solid ${theme.palette.primary.main}`
                }}
              >
                <Chip label={t('pages.home.heroCards.request.title')} size="small" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('pages.home.heroCards.request.subtitle')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                  <strong>{t('ai.assist')}</strong> — {t('pages.home.heroCards.request.suggestion')}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...enhancedCard,
                  p: 3.5,
                  borderLeft: `4px solid ${theme.palette.secondary.main || '#FF4D6D'}`
                }}
              >
                <Chip label={t('pages.home.heroCards.gig.title')} size="small" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('pages.home.heroCards.gig.subtitle')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'secondary.main' }}>
                  {t('pages.home.heroCards.gig.pricePill')}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* Personas Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
              {t('pages.home.personaSection.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              {t('pages.home.personaSection.body')}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {personaCards.map((card) => (
              <Grid item xs={12} md={6} key={card.key}>
                <Box
                  sx={{
                    ...enhancedCard,
                    borderTop: `4px solid ${card.accent}`,
                    p: 4,
                    height: { md: 520 },
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Chip
                    label={card.tag}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      mb: 2.5,
                      bgcolor: alpha(card.accent, 0.1),
                      color: card.accent,
                      fontWeight: 600,
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      height: 28
                    }}
                  />
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.3 }}>
                    {(() => {
                      const name = card.key === 'sathi' ? 'Sathi' : 'Sokti';
                      const parts = card.title.split(name);
                      if (parts.length > 1) {
                        return (
                          <>
                            {parts[0]}
                            <Box
                              component="span"
                              sx={{
                                color: card.accent,
                                fontWeight: 800,
                                bgcolor: alpha(card.accent, 0.12),
                                px: 1.25,
                                py: 0.5,
                                borderRadius: 1.5,
                                display: 'inline-block',
                                mx: 0.5,
                                border: `1px solid ${alpha(card.accent, 0.2)}`
                              }}
                            >
                              {name}
                            </Box>
                            {parts[1]}
                          </>
                        );
                      }
                      return card.title;
                    })()}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3, 
                      lineHeight: 1.7, 
                      fontSize: '1rem',
                      minHeight: { md: 80 }
                    }}
                  >
                    {card.detail}
                  </Typography>
                  <Stack spacing={1.5} sx={{ flex: 1, mb: 2 }}>
                    {card.bullets.map((bullet) => (
                      <Stack direction="row" spacing={1.5} key={bullet} alignItems="flex-start">
                        <CheckCircleIcon sx={{ color: card.accent, fontSize: 20, mt: 0.25, flexShrink: 0 }} />
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            lineHeight: 1.6, 
                            fontSize: '0.9375rem',
                            flex: 1
                          }}
                        >
                          {bullet}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  {card.note && (
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 'auto',
                        pt: 3,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '0.8125rem'
                      }}
                    >
                      {card.note}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Differentiators Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 }, borderRadius: 3, mb: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                {t('pages.home.differentiators.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                {t('pages.home.differentiators.body')}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {differentiators.map((card) => (
                <Grid item xs={12} md={4} key={card.key}>
                  <Box
                    sx={{
                      ...enhancedCard,
                      p: 3.5,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: 'primary.main' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1, lineHeight: 1.6 }}>
                      {card.body}
                    </Typography>
                    <Stack spacing={1}>
                      {card.points.map((point) => (
                        <Stack direction="row" spacing={1.5} key={point} alignItems="flex-start">
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                            • {point}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Impact Stats Section */}
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                {t('pages.home.impactStats.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                {t('pages.home.impactStats.body')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {impactStats.map((stat) => (
                  <Grid item xs={6} key={stat.key}>
                    <Box
                      sx={{
                        ...enhancedCard,
                        p: 3,
                        height: '100%',
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="h3" sx={{ mb: 0.5, fontWeight: 700, color: 'primary.main' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {stat.helper}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Divider sx={{ my: 8 }} />

        {/* Working Journey Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 }, borderRadius: 3, mb: 8 }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                {t('pages.home.workingJourney.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                {t('pages.home.workingJourney.body')}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {workingJourney.map((item, index) => (
                <Grid item xs={12} md={4} key={item.key}>
                  <Box
                    sx={{
                      ...enhancedCard,
                      p: 3.5,
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: 24,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1.5, mt: 2, fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                      {item.body}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {item.helper}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Typography variant="h2" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
            {t('pages.home.howItWorks.title')}
          </Typography>
          <Grid container spacing={3}>
            {howCards.map((card) => (
              <Grid item xs={12} md={4} key={card.key}>
                <Box
                  sx={{
                    ...enhancedCard,
                    p: 3.5,
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {card.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider sx={{ my: 8 }} />

        {/* Categories Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 }, borderRadius: 3, mb: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
              {t('pages.home.categoriesTitle')}
            </Typography>
            <Grid container spacing={2}>
              {categories.map((cat) => (
                <Grid item xs={6} sm={4} md={3} key={cat.key}>
                  <Box
                    sx={{
                      ...enhancedCard,
                      p: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      textAlign: 'left'
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {categoryIcons[cat.key]}
                    </Box>
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
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Typography variant="h2" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
            {t('pages.home.highlightsTitle')}
          </Typography>
          <Grid container spacing={3}>
            {highlightItems.map((item) => (
              <Grid item xs={12} md={4} key={item.key}>
                <Box
                  sx={{
                    ...enhancedCard,
                    p: 3.5,
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider sx={{ my: 8 }} />

        {/* Trust & Security Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 }, borderRadius: 3, mb: 8 }}>
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
                        <ShieldIcon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                      ) : (
                        <SecurityIcon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                      )}
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    ...enhancedCard,
                    p: 3.5,
                    height: '100%'
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                    {t('pages.home.trust.description')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.primary.main}`,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      p: 2.5
                    }}
                  >
                    <InfoIcon color="primary" sx={{ mt: 0.25, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {t('pages.home.trust.info')}{' '}
                      <Button href="/guidelines" variant="text" size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>
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
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Box
            sx={{
              ...enhancedCard,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              {t('pages.home.ctaBand.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
              {t('pages.home.ctaBand.body')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/register"
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t('pages.home.ctaPrimary')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setDemoOpen(true)}
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t('pages.home.ctaSecondary')}
              </Button>
            </Stack>
          </Box>
        </Container>
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
