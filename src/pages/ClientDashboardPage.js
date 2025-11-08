import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SafetyBanner from '@/components/feedback/SafetyBanner';
import PageHero from '@/components/layout/PageHero';
import GlassCard from '@/components/layout/GlassCard';
const ClientDashboardPage = () => {
    const { t } = useTranslation();
    const requests = [
        { id: 'open-1', title: t('pages.clientDashboard.newRequest'), status: t('common.statusDraft') }
    ];
    return (_jsxs(Box, { sx: { maxWidth: 1000, mx: 'auto' }, children: [_jsx(SafetyBanner, {}), _jsx(PageHero, { title: t('pages.clientDashboard.title'), subtitle: t('ai.companion.subtitle'), chipLabel: t('ai.companion.label') }), _jsx(GlassCard, { sx: { mb: 3, backgroundColor: 'secondary.main', color: 'common.white' }, children: _jsx(CardActionArea, { href: "/c/request/new", sx: { p: 3 }, children: _jsxs(Stack, { spacing: 1.5, children: [_jsx(Typography, { variant: "h5", children: t('pages.clientDashboard.newRequest') }), _jsx(Typography, { variant: "body2", sx: { color: 'rgba(255,255,255,0.85)' }, children: t('pages.buyerRequest.helper') }), _jsx(Button, { variant: "contained", sx: { alignSelf: 'flex-start' }, children: t('pages.clientDashboard.newRequest') })] }) }) }), _jsx(Typography, { variant: "h5", mb: 2, children: t('pages.clientDashboard.listTitle') }), requests.length ? (_jsx(Stack, { spacing: 2, children: requests.map((request) => (_jsx(GlassCard, { children: _jsx(CardContent, { children: _jsxs(Stack, { direction: "row", alignItems: "center", spacing: 2, children: [_jsx(Typography, { variant: "subtitle1", children: request.title }), _jsx(Chip, { label: request.status, color: "primary", size: "small" })] }) }) }, request.id))) })) : (_jsx(Typography, { color: "text.secondary", children: t('pages.clientDashboard.empty') }))] }));
};
export default ClientDashboardPage;
