import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Button, Card, CardContent, Grid, List, ListItemButton, MenuItem, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@mui/material';
import { providerSchema, clientSchema } from '@/utils/formSchemas';
import PhoneInputBD from '@/components/inputs/PhoneInputBD';
import LocationSelector from '@/components/inputs/LocationSelector';
import { skills } from '@/data/skills';
import PageHero from '@/components/layout/PageHero';
const renderErrors = (errors, t, prefix) => {
    const entries = Object.entries(errors)
        .map(([field, detail]) => {
        if (!detail)
            return null;
        if ('message' in detail && detail.message) {
            return { field, message: detail.message };
        }
        return null;
    })
        .filter(Boolean);
    if (!entries.length)
        return null;
    return (_jsxs(Alert, { severity: "error", sx: { mt: 2 }, children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 600, children: t('forms.errorSummaryTitle') }), _jsx(Typography, { variant: "body2", mb: 1, children: t('forms.errorSummaryIntro') }), _jsx(List, { dense: true, children: entries.map((entry) => (_jsx(ListItemButton, { component: "a", href: `#${prefix}-${entry.field}`, children: t(entry.message) }, entry.field))) })] }));
};
const RegisterPage = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('provider');
    const providerForm = useForm({
        resolver: yupResolver(providerSchema),
        defaultValues: {
            nameBn: '',
            nameEn: '',
            phone: '',
            division: '',
            district: '',
            upazila: '',
            area: '',
            skills: [],
            wallet: '',
            email: '',
            nid: ''
        }
    });
    const clientForm = useForm({
        resolver: yupResolver(clientSchema),
        defaultValues: {
            name: '',
            orgType: '',
            phone: '',
            division: '',
            district: '',
            upazila: '',
            area: ''
        }
    });
    const [providerSuccess, setProviderSuccess] = useState(false);
    const [clientSuccess, setClientSuccess] = useState(false);
    const skillOptions = useMemo(() => skills.map((skill) => ({
        ...skill,
        label: i18n.language === 'bn' ? skill.nameBn : skill.nameEn
    })), [i18n.language]);
    const handleProviderSubmit = providerForm.handleSubmit(() => {
        setProviderSuccess(true);
    });
    const handleClientSubmit = clientForm.handleSubmit(() => {
        setClientSuccess(true);
    });
    const orgTypes = ['individual', 'sme', 'ngo', 'company'];
    return (_jsxs(Box, { sx: { maxWidth: 1100, mx: 'auto' }, children: [_jsx(PageHero, { title: t('pages.register.title'), subtitle: t('ai.helper'), chipLabel: t('ai.companion.label'), helper: t('forms.errorSummaryIntro') }), _jsxs(Card, { children: [_jsxs(Tabs, { value: activeTab, onChange: (_, value) => setActiveTab(value), variant: "fullWidth", "aria-label": t('pages.register.title'), children: [_jsx(Tab, { label: t('pages.register.providerTab'), value: "provider" }), _jsx(Tab, { label: t('pages.register.clientTab'), value: "client" })] }), _jsxs(CardContent, { children: [activeTab === 'provider' && (_jsxs(Box, { component: "form", noValidate: true, onSubmit: handleProviderSubmit, children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-nameBn", children: _jsx(Controller, { name: "nameBn", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.provider.nameBn'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-nameEn", children: _jsx(Controller, { name: "nameEn", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.provider.nameEn'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-phone", children: _jsx(PhoneInputBD, { control: providerForm.control, name: "phone" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-area", children: _jsx(Controller, { name: "area", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.provider.area'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, id: "provider-location", children: _jsx(LocationSelector, { control: providerForm.control, divisionName: "division", districtName: "district", upazilaName: "upazila", idPrefix: "provider" }) }), _jsx(Grid, { item: true, xs: 12, id: "provider-skills", children: _jsx(Controller, { name: "skills", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(Autocomplete, { multiple: true, options: skillOptions, value: skillOptions.filter((option) => field.value?.includes(option.id)), onChange: (_, value) => field.onChange(value.map((item) => item.id)), getOptionLabel: (option) => option.label, renderInput: (params) => (_jsx(TextField, { ...params, label: t('forms.provider.skills'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.skills') : undefined })) })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-wallet", children: _jsx(PhoneInputBD, { control: providerForm.control, name: "wallet", labelKey: "forms.provider.wallet" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-email", children: _jsx(Controller, { name: "email", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, type: "email", label: t('forms.provider.email'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.email') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "provider-nid", children: _jsx(Controller, { name: "nid", control: providerForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.provider.nid'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.nid') : '' })) }) })] }), _jsx(Box, { mt: 3, display: "flex", justifyContent: "flex-end", children: _jsx(Button, { type: "submit", variant: "contained", size: "large", children: t('pages.register.submit') }) }), providerSuccess && (_jsx(Alert, { severity: "success", sx: { mt: 2 }, children: t('pages.register.success') })), providerForm.formState.isSubmitted && !providerForm.formState.isSubmitSuccessful
                                        ? renderErrors(providerForm.formState.errors, t, 'provider')
                                        : null] })), activeTab === 'client' && (_jsxs(Box, { component: "form", noValidate: true, onSubmit: handleClientSubmit, children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, id: "client-name", children: _jsx(Controller, { name: "name", control: clientForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.client.name'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "client-orgType", children: _jsx(Controller, { name: "orgType", control: clientForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, select: true, fullWidth: true, label: t('forms.client.orgType'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '', children: orgTypes.map((type) => (_jsx(MenuItem, { value: type, children: t(`forms.clientOrgTypes.${type}`) }, type))) })) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "client-phone", children: _jsx(PhoneInputBD, { control: clientForm.control, name: "phone", labelKey: "forms.client.phone" }) }), _jsx(Grid, { item: true, xs: 12, md: 6, id: "client-area", children: _jsx(Controller, { name: "area", control: clientForm.control, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, fullWidth: true, label: t('forms.provider.area'), error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.required') : '' })) }) }), _jsx(Grid, { item: true, xs: 12, id: "client-location", children: _jsx(LocationSelector, { control: clientForm.control, divisionName: "division", districtName: "district", upazilaName: "upazila", idPrefix: "client" }) })] }), _jsx(Box, { mt: 3, display: "flex", justifyContent: "flex-end", children: _jsx(Button, { type: "submit", variant: "contained", size: "large", children: t('pages.register.submit') }) }), clientSuccess && (_jsx(Alert, { severity: "success", sx: { mt: 2 }, children: t('pages.register.success') })), clientForm.formState.isSubmitted && !clientForm.formState.isSubmitSuccessful
                                        ? renderErrors(clientForm.formState.errors, t, 'client')
                                        : null] }))] })] })] }));
};
export default RegisterPage;
