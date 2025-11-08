import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTranslation } from 'react-i18next';
const PanicButton = ({ onConfirm }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const handleConfirm = () => {
        setOpen(false);
        onConfirm?.();
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "contained", color: "error", startIcon: _jsx(WarningAmberIcon, {}), onClick: () => setOpen(true), sx: { minHeight: 44 }, children: t('pages.chat.panic') }), _jsxs(Dialog, { open: open, onClose: () => setOpen(false), "aria-labelledby": "panic-dialog-title", children: [_jsx(DialogTitle, { id: "panic-dialog-title", children: t('pages.chat.panicConfirmTitle') }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: t('pages.chat.panicConfirmBody') }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpen(false), children: t('common.cancel') }), _jsx(Button, { onClick: handleConfirm, color: "error", variant: "contained", children: t('pages.chat.panicConfirm') })] })] })] }));
};
export default PanicButton;
