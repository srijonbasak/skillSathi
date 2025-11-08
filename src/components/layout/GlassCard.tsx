import { Card, CardProps } from '@mui/material';

const GlassCard = (props: CardProps) => (
  <Card
    {...props}
    sx={{
      borderRadius: 12,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      backgroundColor: (theme) => theme.palette.background.paper,
      boxShadow: '0 22px 50px rgba(23,23,17,0.08)',
      position: 'relative',
      zIndex: 0,
      overflow: 'hidden',
      ...props.sx
    }}
  />
);

export default GlassCard;
