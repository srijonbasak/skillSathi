import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { divisions } from '@/data/locations';

type Props<T extends FieldValues> = {
  control: Control<T>;
  divisionName: FieldPath<T>;
  districtName: FieldPath<T>;
  upazilaName: FieldPath<T>;
  disabled?: boolean;
  idPrefix?: string;
};

const LocationSelector = <T extends FieldValues>({
  control,
  divisionName,
  districtName,
  upazilaName,
  disabled,
  idPrefix
}: Props<T>) => {
  const { t } = useTranslation();
  const selectedDivision = useWatch({ control, name: divisionName });
  const selectedDistrict = useWatch({ control, name: districtName });

  const divisionOptions = divisions;
  const districtOptions = divisionOptions.find((division) => division.name === selectedDivision)?.districts ?? [];
  const upazilaOptions = districtOptions.find((district) => district.name === selectedDistrict)?.upazilas ?? [];

  return (
    <Stack spacing={2}>
      <Controller
        control={control}
        name={divisionName}
        render={({ field, fieldState }) => (
          <FormControl
            id={idPrefix ? `${idPrefix}-division` : undefined}
            fullWidth
            error={Boolean(fieldState.error)}
            disabled={disabled}
          >
            <InputLabel>{t('forms.location.division')}</InputLabel>
            <Select {...field} label={t('forms.location.division')}>
              {divisionOptions.map((division) => (
                <MenuItem key={division.name} value={division.name}>
                  {division.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {fieldState.error ? t(fieldState.error.message ?? 'validation.division') : t('forms.location.placeholder')}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name={districtName}
        render={({ field, fieldState }) => (
          <FormControl
            id={idPrefix ? `${idPrefix}-district` : undefined}
            fullWidth
            error={Boolean(fieldState.error)}
            disabled={disabled || !selectedDivision}
          >
            <InputLabel>{t('forms.location.district')}</InputLabel>
            <Select {...field} label={t('forms.location.district')}>
              {districtOptions.map((district) => (
                <MenuItem key={district.name} value={district.name}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {fieldState.error ? t(fieldState.error.message ?? 'validation.district') : t('forms.location.placeholder')}
            </FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name={upazilaName}
        render={({ field, fieldState }) => (
          <FormControl
            id={idPrefix ? `${idPrefix}-upazila` : undefined}
            fullWidth
            error={Boolean(fieldState.error)}
            disabled={disabled || !selectedDistrict}
          >
            <InputLabel>{t('forms.location.upazila')}</InputLabel>
            <Select {...field} label={t('forms.location.upazila')}>
              {upazilaOptions.map((upazila) => (
                <MenuItem key={upazila.name} value={upazila.name}>
                  {upazila.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {fieldState.error ? t(fieldState.error.message ?? 'validation.upazila') : t('forms.location.placeholder')}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Stack>
  );
};

export default LocationSelector;
