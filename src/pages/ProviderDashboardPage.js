import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Card, CardActionArea, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PageHero from '@/components/layout/PageHero';
const ProviderDashboardPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const actions = [
        { label: t('pages.providerDashboard.createGig'), to: '/p/gig/new', color: 'primary' },
        { label: t('pages.providerDashboard.openChat'), to: '/chat', color: 'secondary' },
        { label: t('pages.providerDashboard.wallet'), to: '/wallet', color: 'primary' }
    ];
    const requests = [
        {
            id: 'req-1',
            title: t('pages.providerDashboard.sampleRequests.tailoring'),
            price: t('pages.providerDashboard.samplePrices.tailoring')
        },
        {
            id: 'req-2',
            title: t('pages.providerDashboard.sampleRequests.catering'),
            price: t('pages.providerDashboard.samplePrices.catering')
        },
        {
            id: 'req-3',
            title: t('pages.providerDashboard.sampleRequests.craft'),
            price: t('pages.providerDashboard.samplePrices.craft')
        }
    ];
    return (_jsxs(Box, { sx: { maxWidth: 1100, mx: 'auto' }, children: [_jsx(PageHero, { title: t('pages.providerDashboard.title'), subtitle: t('ai.companion.subtitle'), chipLabel: t('ai.companion.label') }), _jsx(Alert, { severity: "info", sx: { mb: 3 }, children: t('pages.providerDashboard.trustBanner') }), _jsx(Grid, { container: true, spacing: 3, children: actions.map((action, index) => (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { sx: {
                            borderRadius: 3,
                            minHeight: 160,
                            backgroundColor: index === 0 ? 'primary.main' : 'background.paper',
                            color: index === 0 ? 'primary.contrastText' : 'text.primary',
                            boxShadow: index === 0 ? '0 20px 40px rgba(138,43,226,0.35)' : undefined
                        }, children: _jsx(CardActionArea, { href: action.to, sx: { height: '100%', p: 2 }, children: _jsxs(Stack, { spacing: 2, children: [_jsx(Typography, { variant: "h6", children: action.label }), _jsx(Chip, { label: t('common.statusReady'), color: action.color === 'secondary' ? 'secondary' : 'primary', variant: index === 0 ? 'filled' : 'outlined' })] }) }) }) }, action.label))) }), _jsxs(Box, { mt: 4, children: [_jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, mb: 2, children: [_jsx(Typography, { variant: "h5", children: t('pages.providerDashboard.requestsTitle') }), _jsx(Chip, { label: t('common.statusDraft'), sx: { backgroundColor: theme.palette.warning.main, color: theme.palette.getContrastText(theme.palette.warning.main) } })] }), _jsx(Stack, { spacing: 2, children: requests.map((request) => (_jsx(Card, { variant: "outlined", sx: { borderRadius: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", children: request.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: request.price })] }) }, request.id))) })] })] }));
};
export default ProviderDashboardPage;
