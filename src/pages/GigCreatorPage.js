import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gigSchema } from '@/utils/formSchemas';
import { skills } from '@/data/skills';
import AIChip from '@/components/ai/AIChip';
import AISuggestionPanel from '@/components/ai/AISuggestionPanel';
import PageHero from '@/components/layout/PageHero';
import { mockDraftGig, mockSuggestPrice } from '@/services/mockAi';
const GigCreatorPage = () => {
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, formState, reset, setValue, watch } = useForm({
        resolver: yupResolver(gigSchema),
        defaultValues: {
            skill: '',
            title: '',
            description: '',
            price: 100
        }
    });
    const [draftSuggestion, setDraftSuggestion] = useState(null);
    const [priceSuggestion, setPriceSuggestion] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [priceLoading, setPriceLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const selectedSkill = watch('skill');
    const descriptionValue = watch('description');
    const onSubmit = handleSubmit(() => {
        setSuccess(true);
    });
    const fetchDraft = async () => {
        setAiLoading(true);
        try {
            const response = await mockDraftGig({ skill: selectedSkill, hint: descriptionValue });
            setDraftSuggestion(response);
        }
        finally {
            setAiLoading(false);
        }
    };
    const fetchPrice = async () => {
        setPriceLoading(true);
        try {
            const response = await mockSuggestPrice({ skill: selectedSkill });
            setPriceSuggestion(response);
        }
        finally {
            setPriceLoading(false);
        }
    };
    const applyDraft = () => {
        if (!draftSuggestion)
            return;
        setValue('title', draftSuggestion.title);
        setValue('description', draftSuggestion.description);
        setDraftSuggestion(null);
        setDialogOpen(false);
    };
    const skillOptions = skills.map((skill) => ({
        id: skill.id,
        label: i18n.language === 'bn' ? skill.nameBn : skill.nameEn
    }));
    return (_jsxs(Box, { sx: { maxWidth: 960, mx: 'auto' }, children: [_jsx(PageHero, { title: t('pages.gigCreator.title'), subtitle: t('pages.gigCreator.helper'), chipLabel: t('ai.companion.label') }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { component: "form", onSubmit: onSubmit, children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", mb: 1, children: _jsx(Typography, { variant: "subtitle1", children: t('forms.gig.skill') }) }), _jsx(Controller, { name: "skill", control: control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, select: true, fullWidth: true, label: t('forms.gig.skill'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '', children: skillOptions.map((option) => (_jsx(MenuItem, { value: option.id, children: option.label }, option.id))) })) })] }), _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", mb: 1, children: [_jsx(Typography, { variant: "subtitle1", children: t('forms.gig.title') }), _jsx(AIChip, { onClick: fetchDraft, loading: aiLoading })] }), _jsx(Controller, { name: "title", control: control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.gig.title'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "description", control: control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, multiline: true, minRows: 4, fullWidth: true, label: t('forms.gig.description'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", mb: 1, children: [_jsx(Typography, { variant: "subtitle1", children: t('forms.gig.price') }), _jsx(AIChip, { onClick: fetchPrice, loading: priceLoading, labelKey: "forms.gig.priceSuggest" })] }), _jsx(Controller, { name: "price", control: control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, type: "number", fullWidth: true, label: t('forms.gig.price'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : t('ai.priceHint') })) })] })] }), _jsxs(Box, { mt: 3, display: "flex", justifyContent: "flex-end", gap: 2, children: [_jsx(Button, { variant: "outlined", onClick: () => reset(), children: t('common.cancel') }), _jsx(Button, { type: "submit", variant: "contained", children: t('forms.gig.publish') })] })] }), formState.isSubmitSuccessful && success && (_jsx(Alert, { severity: "success", sx: { mt: 2 }, children: t('pages.gigCreator.publishSuccess') })), _jsx(AISuggestionPanel, { open: Boolean(draftSuggestion), suggestion: draftSuggestion ? `${draftSuggestion.title}\n\n${draftSuggestion.description}` : undefined, onApply: () => setDialogOpen(true), onRegenerate: fetchDraft }), _jsx(AISuggestionPanel, { open: Boolean(priceSuggestion), titleKey: "ai.priceHint", price: priceSuggestion ?? undefined, onApply: () => {
                                if (!priceSuggestion)
                                    return;
                                setValue('price', priceSuggestion);
                                setPriceSuggestion(null);
                            }, onRegenerate: fetchPrice })] }) }), _jsxs(Dialog, { open: dialogOpen, onClose: () => setDialogOpen(false), children: [_jsx(DialogTitle, { children: t('ai.confirmApplyTitle') }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: t('ai.confirmApplyBody') }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setDialogOpen(false), children: t('common.cancel') }), _jsx(Button, { onClick: applyDraft, variant: "contained", children: t('common.apply') })] })] })] }));
};
export default GigCreatorPage;
