import { Button, Card, CardActions, CardContent, Collapse, Stack, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  titleKey?: string;
  suggestion?: string;
  price?: number;
  onApply?: () => void;
  onRegenerate?: () => void;
  onDismiss?: () => void;
};

const AISuggestionPanel = ({
  open,
  titleKey = 'ai.suggestionTitle',
  suggestion,
  price,
  onApply,
  onRegenerate,
  onDismiss
}: Props) => {
  const { t } = useTranslation();
  return (
    <Collapse in={open} unmountOnExit>
      <Card
        variant="outlined"
        sx={{
          mt: 2,
          borderColor: 'divider',
          backgroundColor: 'background.default'
        }}
      >
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {t(titleKey)}
          </Typography>
          <Typography variant="h6" mb={1}>
            {t('ai.companion.label')}
          </Typography>
          {suggestion && (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {suggestion}
            </Typography>
          )}
          {price && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              mt={2}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: 'rgba(31,75,153,0.08)'
              }}
            >
              <PriceChangeIcon color="primary" />
              <Typography variant="body1" fontWeight={600}>
                {t('ai.suggestedPrice')}: ৳{price.toLocaleString()}
              </Typography>
            </Stack>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', gap: 1, px: 3, pb: 3 }}>
          <Button startIcon={<CheckCircleIcon />} variant="contained" size="small" onClick={onApply}>
            {t('common.apply')}
          </Button>
          <Button startIcon={<RestartAltIcon />} variant="outlined" size="small" onClick={onRegenerate}>
            {t('common.regenerate')}
          </Button>
          {onDismiss && (
            <Button size="small" onClick={onDismiss}>
              {t('common.dismiss')}
            </Button>
          )}
        </CardActions>
      </Card>
    </Collapse>
  );
};

export default AISuggestionPanel;
