import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { divisions } from '@/data/locations';
const LocationSelector = ({ control, divisionName, districtName, upazilaName, disabled, idPrefix }) => {
    const { t } = useTranslation();
    const selectedDivision = useWatch({ control, name: divisionName });
    const selectedDistrict = useWatch({ control, name: districtName });
    const divisionOptions = divisions;
    const districtOptions = divisionOptions.find((division) => division.name === selectedDivision)?.districts ?? [];
    const upazilaOptions = districtOptions.find((district) => district.name === selectedDistrict)?.upazilas ?? [];
    return (_jsxs(Stack, { spacing: 2, children: [_jsx(Controller, { control: control, name: divisionName, render: ({ field, fieldState }) => (_jsxs(FormControl, { id: idPrefix ? `${idPrefix}-division` : undefined, fullWidth: true, error: Boolean(fieldState.error), disabled: disabled, children: [_jsx(InputLabel, { children: t('forms.location.division') }), _jsx(Select, { ...field, label: t('forms.location.division'), children: divisionOptions.map((division) => (_jsx(MenuItem, { value: division.name, children: division.name }, division.name))) }), _jsx(FormHelperText, { children: fieldState.error ? t(fieldState.error.message ?? 'validation.division') : t('forms.location.placeholder') })] })) }), _jsx(Controller, { control: control, name: districtName, render: ({ field, fieldState }) => (_jsxs(FormControl, { id: idPrefix ? `${idPrefix}-district` : undefined, fullWidth: true, error: Boolean(fieldState.error), disabled: disabled || !selectedDivision, children: [_jsx(InputLabel, { children: t('forms.location.district') }), _jsx(Select, { ...field, label: t('forms.location.district'), children: districtOptions.map((district) => (_jsx(MenuItem, { value: district.name, children: district.name }, district.name))) }), _jsx(FormHelperText, { children: fieldState.error ? t(fieldState.error.message ?? 'validation.district') : t('forms.location.placeholder') })] })) }), _jsx(Controller, { control: control, name: upazilaName, render: ({ field, fieldState }) => (_jsxs(FormControl, { id: idPrefix ? `${idPrefix}-upazila` : undefined, fullWidth: true, error: Boolean(fieldState.error), disabled: disabled || !selectedDistrict, children: [_jsx(InputLabel, { children: t('forms.location.upazila') }), _jsx(Select, { ...field, label: t('forms.location.upazila'), children: upazilaOptions.map((upazila) => (_jsx(MenuItem, { value: upazila.name, children: upazila.name }, upazila.name))) }), _jsx(FormHelperText, { children: fieldState.error ? t(fieldState.error.message ?? 'validation.upazila') : t('forms.location.placeholder') })] })) })] }));
};
export default LocationSelector;
