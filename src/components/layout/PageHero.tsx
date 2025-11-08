import { Box, Stack, Typography, StackProps } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { ReactNode } from 'react';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  helper?: string;
  chipLabel?: string;
  actions?: ReactNode;
  adornment?: ReactNode;
  sx?: StackProps['sx'];
};

const PageHero = ({ title, subtitle, helper, chipLabel, actions, adornment, sx }: PageHeroProps) => {
  return (
    <Box
      sx={{
        borderRadius: 20,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 },
        alignItems: { md: 'stretch' },
        position: 'relative',
        ...sx
      }}
    >
      <Stack spacing={1.5} flex={1}>
        {chipLabel && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.25,
              py: 0.5,
              borderRadius: 1.5,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: 12,
              letterSpacing: 0.6,
              textTransform: 'uppercase'
            }}
          >
            <PsychologyIcon fontSize="small" />
            {chipLabel}
          </Box>
        )}
        <Typography variant="h2">{title}</Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
            {subtitle}
          </Typography>
        )}
        {helper && (
          <Typography variant="body2" color="text.secondary">
            {helper}
          </Typography>
        )}
        {actions && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mt={1}>
            {actions}
          </Stack>
        )}
      </Stack>
      {adornment && (
        <Box
          sx={{
            borderRadius: 16,
            border: (theme) => `1px dashed ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.background.default,
            flexBasis: { md: 260 },
            flexShrink: 0,
            p: { xs: 2, md: 3 }
          }}
        >
          {adornment}
        </Box>
      )}
    </Box>
  );
};

export default PageHero;
