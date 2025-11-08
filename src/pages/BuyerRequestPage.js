import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { requestSchema } from '@/utils/formSchemas';
import VoiceInput from '@/components/inputs/VoiceInput';
import AIChip from '@/components/ai/AIChip';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';
import PageHero from '@/components/layout/PageHero';
import { mockDraftGig } from '@/services/mockAi';
const BuyerRequestPage = () => {
    const { t } = useTranslation();
    const { control, handleSubmit, setValue, watch, formState } = useForm({
        resolver: yupResolver(requestSchema),
        defaultValues: {
            details: '',
            priceRange: undefined
        }
    });
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const details = watch('details');
    const onSubmit = handleSubmit(() => {
        setConfirmOpen(true);
    });
    const confirmRequest = () => {
        setConfirmOpen(false);
        setSubmitted(true);
    };
    const fetchAiSuggestion = async () => {
        setAiLoading(true);
        try {
            const result = await mockDraftGig({ hint: details });
            setAiSuggestion(`${result.title}\n\n${result.description}`);
        }
        finally {
            setAiLoading(false);
        }
    };
    return (_jsxs(Box, { sx: { maxWidth: 800, mx: 'auto' }, children: [_jsx(PageHero, { title: t('pages.buyerRequest.title'), subtitle: t('pages.buyerRequest.helper'), chipLabel: t('ai.companion.label') }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { component: "form", noValidate: true, onSubmit: onSubmit, children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(AIChip, { onClick: fetchAiSuggestion, loading: aiLoading }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "details", control: control, render: ({ field, fieldState }) => (_jsx(VoiceInput, { label: t('forms.request.details'), value: field.value, onChange: (value) => field.onChange(value), error: fieldState.error?.message })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Controller, { name: "priceRange", control: control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, type: "number", fullWidth: true, label: t('forms.request.priceRange'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) })] }), _jsx(Box, { mt: 3, display: "flex", justifyContent: "flex-end", children: _jsx(Button, { type: "submit", variant: "contained", children: t('forms.request.submit') }) })] }), submitted && (_jsx(Alert, { severity: "success", sx: { mt: 2 }, children: t('pages.register.success') })), _jsx(AISuggestionPanel, { open: Boolean(aiSuggestion), suggestion: aiSuggestion ?? undefined, onApply: () => {
                                if (aiSuggestion) {
                                    setValue('details', `${details}\n${aiSuggestion}`);
                                }
                                setAiSuggestion(null);
                            }, onRegenerate: fetchAiSuggestion })] }) }), _jsxs(Dialog, { open: confirmOpen, onClose: () => setConfirmOpen(false), children: [_jsx(DialogTitle, { children: t('pages.buyerRequest.confirmTitle') }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: t('pages.buyerRequest.confirmBody') }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setConfirmOpen(false), children: t('common.cancel') }), _jsx(Button, { onClick: confirmRequest, variant: "contained", children: t('pages.buyerRequest.confirmAction') })] })] })] }));
};
export default BuyerRequestPage;
