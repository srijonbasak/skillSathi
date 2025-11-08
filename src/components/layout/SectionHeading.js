import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, Typography } from '@mui/material';
const SectionHeading = ({ title, subtitle, action, sx }) => {
    return (_jsxs(Stack, { direction: { xs: 'column', md: 'row' }, justifyContent: "space-between", alignItems: { xs: 'flex-start', md: 'center' }, spacing: 2, sx: {
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            pb: 2,
            mb: 2,
            ...sx
        }, children: [_jsxs(Stack, { spacing: 1, children: [_jsxs(Stack, { direction: "row", spacing: 1.5, alignItems: "center", children: [_jsx(Box, { sx: { width: 28, height: 4, borderRadius: 2, backgroundColor: 'primary.main' } }), subtitle && (_jsx(Typography, { variant: "overline", color: "text.secondary", letterSpacing: 0.5, children: subtitle }))] }), _jsx(Typography, { variant: "h4", children: title })] }), action] }));
};
export default SectionHeading;
