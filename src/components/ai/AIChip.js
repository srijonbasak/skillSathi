import { jsx as _jsx } from "react/jsx-runtime";
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
const AIChip = ({ labelKey = 'ai.assist', onClick, loading, ariaLabel, pulse = false }) => {
    const { t } = useTranslation();
    return (_jsx(Chip, { icon: _jsx(PsychologyIcon, { fontSize: "small" }), label: loading ? t('common.loading') : t(labelKey), color: "primary", variant: "outlined", clickable: true, onClick: onClick, "aria-label": ariaLabel ?? t(labelKey), sx: {
            borderRadius: 10,
            minHeight: 38,
            fontWeight: 600,
            borderStyle: 'dashed',
            px: 0.5,
            animation: pulse ? 'chipPulse 1400ms ease-in-out forwards' : 'none',
            '@keyframes chipPulse': {
                '0%': { opacity: 0, transform: 'translateY(8px)' },
                '60%': { opacity: 1, transform: 'translateY(0)' },
                '100%': { opacity: 1 }
            }
        } }));
};
export default AIChip;
