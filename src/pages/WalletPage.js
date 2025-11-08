import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Button, Card, CardContent, Divider, List, ListItem, ListItemText, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { walletSchema } from '@/utils/formSchemas';
import { useAppStore } from '@/store/useAppStore';
import PhoneInputBD from '@/components/inputs/PhoneInputBD';
import { useState } from 'react';
import PageHero from '@/components/layout/PageHero';
const WalletPage = () => {
    const { t } = useTranslation();
    const wallet = useAppStore((state) => state.wallet);
    const withdrawAction = useAppStore((state) => state.withdraw);
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(walletSchema),
        defaultValues: {
            amount: 500,
            method: 'bKash',
            msisdn: ''
        }
    });
    const [status, setStatus] = useState('idle');
    const onSubmit = handleSubmit((values) => {
        if (values.amount > wallet.balance) {
            setStatus('error');
            return;
        }
        withdrawAction(values.amount, values.method, values.msisdn);
        setStatus('success');
        reset();
    });
    return (_jsxs(Box, { sx: { maxWidth: 900, mx: 'auto' }, children: [_jsx(PageHero, { title: t('pages.wallet.title'), subtitle: t('ai.companion.subtitle'), chipLabel: t('ai.companion.label') }), _jsx(Card, { sx: { mb: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "overline", children: t('pages.wallet.balance') }), _jsxs(Typography, { variant: "h4", children: ["\u09F3", wallet.balance.toLocaleString()] })] }) }), _jsx(Card, { sx: { mb: 4 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h5", mb: 2, children: t('pages.wallet.withdraw') }), _jsx(Box, { component: "form", onSubmit: onSubmit, children: _jsxs(Stack, { spacing: 2, children: [_jsx(Controller, { name: "amount", control: control, render: ({ field }) => (_jsx(TextField, { ...field, type: "number", label: t('forms.wallet.amount'), error: Boolean(errors.amount), helperText: errors.amount ? t(errors.amount.message ?? 'validation.required') : '' })) }), _jsx(Controller, { name: "method", control: control, render: ({ field }) => (_jsx(TextField, { ...field, select: true, label: t('forms.wallet.method'), error: Boolean(errors.method), helperText: errors.method ? t(errors.method.message ?? 'validation.required') : '', children: ['bKash', 'Nagad', 'Rocket'].map((method) => (_jsx(MenuItem, { value: method, children: method }, method))) })) }), _jsx(PhoneInputBD, { control: control, name: "msisdn", labelKey: "forms.provider.wallet" }), _jsx(Button, { type: "submit", variant: "contained", children: t('pages.wallet.withdraw') })] }) }), status === 'success' && (_jsx(Alert, { severity: "success", sx: { mt: 2 }, children: t('pages.wallet.withdrawSuccess') })), status === 'error' && (_jsx(Alert, { severity: "error", sx: { mt: 2 }, children: t('pages.wallet.withdrawError') }))] }) }), _jsx(Typography, { variant: "h5", mb: 2, children: t('pages.wallet.historyTitle') }), wallet.history.length ? (_jsx(Card, { children: _jsx(List, { children: wallet.history.map((entry) => (_jsxs("div", { children: [_jsx(ListItem, { children: _jsx(ListItemText, { primary: `${entry.method} • ${entry.msisdn}`, secondary: `${entry.type === 'withdraw' ? '-' : '+'}৳${Math.abs(entry.delta).toLocaleString()}` }) }), _jsx(Divider, {})] }, entry.id))) }) })) : (_jsx(Typography, { color: "text.secondary", children: t('pages.wallet.empty') }))] }));
};
export default WalletPage;
