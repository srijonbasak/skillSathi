import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, Typography } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import { useTranslation } from 'react-i18next';
const SafetyBanner = () => {
    const { t } = useTranslation();
    return (_jsx(Box, { sx: {
            borderRadius: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
            px: 2.5,
            py: 2,
            mb: 2,
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '12%',
                bottom: '12%',
                width: 4,
                borderRadius: 999,
                backgroundColor: 'primary.dark'
            }
        }, children: _jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", children: [_jsx(ShieldIcon, { color: "primary" }), _jsxs(Stack, { spacing: 0.25, children: [_jsx(Typography, { variant: "subtitle2", children: t('banner.phoneHidden') }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: t('banner.safeTrade') })] })] }) }));
};
export default SafetyBanner;
