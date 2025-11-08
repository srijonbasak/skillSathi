import { Box, Stack, Typography, StackProps } from '@mui/material';
import { ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  sx?: StackProps['sx'];
};

const SectionHeading = ({ title, subtitle, action, sx }: SectionHeadingProps) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      spacing={2}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        pb: 2,
        mb: 2,
        ...sx
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ width: 28, height: 4, borderRadius: 2, backgroundColor: 'primary.main' }} />
          {subtitle && (
            <Typography variant="overline" color="text.secondary" letterSpacing={0.5}>
              {subtitle}
            </Typography>
          )}
        </Stack>
        <Typography variant="h4">{title}</Typography>
      </Stack>
      {action}
    </Stack>
  );
};

export default SectionHeading;
