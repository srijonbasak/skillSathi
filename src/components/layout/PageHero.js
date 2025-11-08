import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
const PageHero = ({ title, subtitle, helper, chipLabel, actions, adornment, sx }) => {
    return (_jsxs(Box, { sx: {
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
        }, children: [_jsxs(Stack, { spacing: 1.5, flex: 1, children: [chipLabel && (_jsxs(Box, { sx: {
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
                        }, children: [_jsx(PsychologyIcon, { fontSize: "small" }), chipLabel] })), _jsx(Typography, { variant: "h2", children: title }), subtitle && (_jsx(Typography, { variant: "body1", color: "text.secondary", sx: { maxWidth: 640 }, children: subtitle })), helper && (_jsx(Typography, { variant: "body2", color: "text.secondary", children: helper })), actions && (_jsx(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 1.5, mt: 1, children: actions }))] }), adornment && (_jsx(Box, { sx: {
                    borderRadius: 16,
                    border: (theme) => `1px dashed ${theme.palette.divider}`,
                    backgroundColor: (theme) => theme.palette.background.default,
                    flexBasis: { md: 260 },
                    flexShrink: 0,
                    p: { xs: 2, md: 3 }
                }, children: adornment }))] }));
};
export default PageHero;
