import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { phoneRegex } from '@/utils/validators';
const PhoneInputBD = ({ control, name, labelKey = 'forms.provider.phone', textFieldProps }) => {
    const { t } = useTranslation();
    return (_jsx(Controller, { control: control, name: name, render: ({ field, fieldState }) => (_jsx(TextField, { ...field, ...textFieldProps, fullWidth: true, type: "tel", label: t(labelKey), inputMode: "tel", error: Boolean(fieldState.error), helperText: fieldState.error ? t(fieldState.error.message ?? 'validation.phone') : t('phone.helper'), inputProps: {
                pattern: phoneRegex.source,
                maxLength: 14
            } })) }));
};
export default PhoneInputBD;
