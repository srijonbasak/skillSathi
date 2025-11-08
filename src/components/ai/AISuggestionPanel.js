import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, CardActions, CardContent, Collapse, Stack, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useTranslation } from 'react-i18next';
const AISuggestionPanel = ({ open, titleKey = 'ai.suggestionTitle', suggestion, price, onApply, onRegenerate, onDismiss }) => {
    const { t } = useTranslation();
    return (_jsx(Collapse, { in: open, unmountOnExit: true, children: _jsxs(Card, { variant: "outlined", sx: {
                mt: 2,
                borderColor: 'divider',
                backgroundColor: 'background.default'
            }, children: [_jsxs(CardContent, { children: [_jsx(Typography, { variant: "overline", color: "text.secondary", children: t(titleKey) }), _jsx(Typography, { variant: "h6", mb: 1, children: t('ai.companion.label') }), suggestion && (_jsx(Typography, { variant: "body2", color: "text.secondary", sx: { whiteSpace: 'pre-line' }, children: suggestion })), price && (_jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1.5, mt: 2, sx: {
                                px: 2,
                                py: 1.5,
                                borderRadius: 2,
                                backgroundColor: 'rgba(31,75,153,0.08)'
                            }, children: [_jsx(PriceChangeIcon, { color: "primary" }), _jsxs(Typography, { variant: "body1", fontWeight: 600, children: [t('ai.suggestedPrice'), ": \u09F3", price.toLocaleString()] })] }))] }), _jsxs(CardActions, { sx: { justifyContent: 'flex-end', gap: 1, px: 3, pb: 3 }, children: [_jsx(Button, { startIcon: _jsx(CheckCircleIcon, {}), variant: "contained", size: "small", onClick: onApply, children: t('common.apply') }), _jsx(Button, { startIcon: _jsx(RestartAltIcon, {}), variant: "outlined", size: "small", onClick: onRegenerate, children: t('common.regenerate') }), onDismiss && (_jsx(Button, { size: "small", onClick: onDismiss, children: t('common.dismiss') }))] })] }) }));
};
export default AISuggestionPanel;
