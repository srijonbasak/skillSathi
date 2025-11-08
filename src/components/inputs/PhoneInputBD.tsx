import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { phoneRegex } from '@/utils/validators';

type PhoneInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  labelKey?: string;
  textFieldProps?: Partial<TextFieldProps>;
};

const PhoneInputBD = <T extends FieldValues>({
  control,
  name,
  labelKey = 'forms.provider.phone',
  textFieldProps
}: PhoneInputProps<T>) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          fullWidth
          type="tel"
          label={t(labelKey)}
          inputMode="tel"
          error={Boolean(fieldState.error)}
          helperText={fieldState.error ? t(fieldState.error.message ?? 'validation.phone') : t('phone.helper')}
          inputProps={{
            pattern: phoneRegex.source,
            maxLength: 14
          }}
        />
      )}
    />
  );
};

export default PhoneInputBD;
