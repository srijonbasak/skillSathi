import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import LockIcon from '@mui/icons-material/LockOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';
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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import AIChip from '@/components/ai/AIChip';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';
const categoryIcons = {
    tailoring: _jsx(ContentCutIcon, { fontSize: "small" }),
    cooking: _jsx(RestaurantIcon, { fontSize: "small" }),
    beauty: _jsx(SpaIcon, { fontSize: "small" }),
    tuition: _jsx(SchoolIcon, { fontSize: "small" }),
    handicraft: _jsx(HandymanIcon, { fontSize: "small" }),
    dataEntry: _jsx(KeyboardIcon, { fontSize: "small" }),
    babysitting: _jsx(ChildCareIcon, { fontSize: "small" }),
    housekeeping: _jsx(CleaningServicesIcon, { fontSize: "small" })
};
const HeroVisualCards = ({ pulse }) => {
    const { t } = useTranslation();
    return (_jsxs(Box, { sx: { position: 'relative', minHeight: { xs: 360, md: 420 } }, children: [_jsx(Box, { sx: {
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 3,
                    backgroundColor: (theme) => theme.palette.background.default,
                    transform: 'skewY(-6deg)',
                    opacity: 0.6
                } }), _jsxs(Stack, { spacing: 3, position: "relative", children: [_jsx(Box, { sx: {
                            borderRadius: 3,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            boxShadow: '0 12px 32px rgba(17,24,39,0.12)',
                            backgroundColor: 'background.paper',
                            p: 3,
                            maxWidth: 320,
                            transform: 'rotate(-2deg)',
                            transition: 'transform 180ms ease, box-shadow 180ms ease',
                            '&:hover': {
                                transform: 'rotate(-1deg) translateY(-6px)',
                                boxShadow: '0 16px 40px rgba(17,24,39,0.16)'
                            }
                        }, children: _jsxs(Stack, { spacing: 1, children: [_jsx(Typography, { variant: "subtitle2", children: t('pages.home.heroCards.request.title') }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('pages.home.heroCards.request.subtitle') }), _jsx(AIChip, { labelKey: "ai.assist", pulse: pulse }), _jsxs(Box, { sx: {
                                        mt: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                                        backgroundColor: (theme) => theme.palette.background.default
                                    }, children: [_jsx(Typography, { variant: "caption", color: "text.secondary", children: t('pages.home.heroCards.request.helper') }), _jsx(Typography, { variant: "body2", children: t('pages.home.heroCards.request.suggestion') })] })] }) }), _jsx(Box, { sx: {
                            borderRadius: 3,
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            boxShadow: '0 12px 32px rgba(17,24,39,0.12)',
                            backgroundColor: 'background.paper',
                            p: 3,
                            maxWidth: 320,
                            alignSelf: 'flex-end',
                            transform: 'rotate(2deg)',
                            transition: 'transform 180ms ease, box-shadow 180ms ease',
                            '&:hover': {
                                transform: 'rotate(1deg) translateY(-6px)',
                                boxShadow: '0 16px 40px rgba(17,24,39,0.16)'
                            }
                        }, children: _jsxs(Stack, { spacing: 1.5, children: [_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", children: [_jsx(PsychologyIcon, { fontSize: "small" }), _jsx(Typography, { variant: "subtitle2", children: t('pages.home.heroCards.gig.title') })] }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('pages.home.heroCards.gig.subtitle') }), _jsx(Chip, { label: t('pages.home.heroCards.gig.pricePill'), sx: { alignSelf: 'flex-start', borderRadius: 2, borderStyle: 'dashed' } }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: t('pages.home.heroCards.gig.helper') })] }) })] }), _jsxs(Box, { component: "svg", viewBox: "0 0 180 80", sx: {
                    position: 'absolute',
                    right: -20,
                    top: 20,
                    height: 120,
                    width: 200,
                    opacity: 0.6
                }, children: [_jsx("path", { d: "M5 75 C45 15, 90 15, 140 70", stroke: "#D1D5DB", strokeWidth: "2", fill: "none" }), _jsx("path", { d: "M20 65 C60 25, 110 25, 170 60", stroke: "#F87171", strokeWidth: "1", fill: "none" })] })] }));
};
const HomePage = () => {
    const { t } = useTranslation();
    const [demoOpen, setDemoOpen] = useState(false);
    const [chipPulse, setChipPulse] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setChipPulse(false), 1800);
        return () => clearTimeout(timer);
    }, []);
    const howCards = t('pages.home.howItWorks.cards', {
        returnObjects: true
    });
    const categories = t('pages.home.categories', {
        returnObjects: true
    });
    const trustList = t('pages.home.trust.list', { returnObjects: true });
    return (_jsxs(Box, { sx: { maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 3, md: 6 } }, children: [_jsxs(Grid, { container: true, spacing: { xs: 4, md: 6 }, alignItems: "stretch", sx: { pt: { xs: 7, md: 10 } }, children: [_jsx(Grid, { item: true, xs: 12, md: 7, children: _jsxs(Stack, { spacing: 3, alignItems: "flex-start", children: [_jsx(Typography, { variant: "overline", color: "text.secondary", children: t('brand.tagline') }), _jsx(Typography, { variant: "h1", children: t('pages.home.heroTitle') }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: t('pages.home.heroSubcopy') }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 1.5, width: "100%", children: [_jsx(Button, { fullWidth: true, variant: "contained", size: "large", component: RouterLink, to: "/register", children: t('pages.home.ctaPrimary') }), _jsx(Button, { fullWidth: true, variant: "outlined", size: "large", onClick: () => setDemoOpen(true), children: t('pages.home.ctaSecondary') })] }), _jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", children: [_jsx(LockIcon, { fontSize: "small", color: "primary" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t('pages.home.trustLine') })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 5, children: _jsx(HeroVisualCards, { pulse: chipPulse }) })] }), _jsxs(Box, { mt: 8, children: [_jsx(Typography, { variant: "h4", mb: 3, children: t('pages.home.howItWorks.title') }), _jsx(Grid, { container: true, spacing: 2.5, children: howCards.map((card) => (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(Box, { sx: {
                                    borderRadius: 2,
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    p: 3,
                                    minHeight: 180,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5
                                }, children: [_jsx(Typography, { variant: "subtitle1", children: card.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: card.body }), _jsx(Box, { sx: {
                                            flexGrow: 1,
                                            borderRadius: 2,
                                            border: '1px dashed currentColor',
                                            opacity: 0.2
                                        } })] }) }, card.key))) })] }), _jsxs(Box, { mt: 8, children: [_jsx(Typography, { variant: "h4", mb: 2, children: t('pages.home.categoriesTitle') }), _jsx(Grid, { container: true, spacing: 1.5, children: categories.map((cat) => (_jsx(Grid, { item: true, xs: 6, sm: 4, md: 3, children: _jsxs(Box, { sx: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    borderRadius: 2,
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    px: 1.5,
                                    py: 1
                                }, children: [categoryIcons[cat.key], _jsx(Typography, { variant: "body2", children: cat.label })] }) }, cat.key))) })] }), _jsxs(Grid, { container: true, spacing: 4, mt: 8, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Box, { sx: {
                                borderRadius: 2,
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                p: 3,
                                height: '100%'
                            }, children: [_jsx(Typography, { variant: "h5", mb: 2, children: t('pages.home.trust.title') }), _jsx(Stack, { spacing: 1.5, children: trustList.map((item, index) => (_jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", children: [index % 2 === 0 ? _jsx(ShieldIcon, { color: "primary" }) : _jsx(SecurityIcon, { color: "primary" }), _jsx(Typography, { variant: "body2", children: item })] }, item))) })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Box, { sx: {
                                borderRadius: 2,
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }, children: [_jsx(Typography, { variant: "body1", children: t('pages.home.trust.description') }), _jsxs(Box, { sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        borderRadius: 2,
                                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                                        px: 2,
                                        py: 1
                                    }, children: [_jsx(InfoIcon, { color: "primary" }), _jsxs(Typography, { variant: "body2", children: [t('pages.home.trust.info'), ' ', _jsx(Button, { href: "/guidelines", variant: "text", size: "small", children: t('pages.home.trust.link') })] })] })] }) })] }), _jsxs(Box, { mt: 8, mb: 6, sx: {
                    borderRadius: 3,
                    backgroundColor: (theme) => theme.palette.background.default,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    alignItems: 'center'
                }, children: [_jsxs(Box, { flex: 1, children: [_jsx(Typography, { variant: "h4", children: t('pages.home.ctaBand.title') }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: t('pages.home.ctaBand.body') })] }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 1.5, children: [_jsx(Button, { variant: "contained", component: RouterLink, to: "/register", children: t('pages.home.ctaPrimary') }), _jsx(Button, { variant: "outlined", onClick: () => setDemoOpen(true), children: t('pages.home.ctaSecondary') })] })] }), _jsxs(Dialog, { fullWidth: true, maxWidth: "sm", open: demoOpen, onClose: () => setDemoOpen(false), children: [_jsxs(DialogTitle, { children: [t('pages.home.aiDemoTitle'), _jsx(IconButton, { onClick: () => setDemoOpen(false), "aria-label": t('common.close'), sx: { position: 'absolute', right: 8, top: 8 }, children: _jsx(CloseIcon, {}) })] }), _jsx(DialogContent, { children: _jsx(AISuggestionPanel, { open: true, suggestion: `${t('forms.gig.title')}: ${t('pages.home.aiDemoDraftTitle')}\n${t('forms.gig.description')}: ${t('pages.home.aiDemoDraftDescription')}`, price: 1200, onDismiss: () => setDemoOpen(false) }) })] })] }));
};
export default HomePage;
