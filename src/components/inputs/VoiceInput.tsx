import { Alert, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SpeechRecognitionEventLike = {
  results: Array<{
    0: {
      transcript: string;
    };
  }>;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
};

const VoiceInput = ({ label, value, onChange, placeholder, error, helperText }: Props) => {
  const { t } = useTranslation();
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const latestValueRef = useRef(value);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognitionCtor() as SpeechRecognitionInstance;
    recognition.lang = 'bn-BD';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results[0][0].transcript;
      const nextValue = latestValueRef.current ? `${latestValueRef.current}\n${transcript}` : transcript;
      onChange(nextValue);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
    };
  }, [onChange]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  if (!supported) {
    return (
      <Stack spacing={1}>
        <TextField
          multiline
          minRows={4}
          label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          error={Boolean(error)}
          helperText={error ? t(error) : helperText ?? t('voice.helper')}
          placeholder={placeholder}
        />
        <Alert severity="info">
          <Typography variant="body2">{t('voice.unsupportedTitle')}</Typography>
          <Typography variant="caption">{t('voice.unsupportedCta')}</Typography>
        </Alert>
      </Stack>
    );
  }

  return (
    <TextField
      multiline
      minRows={4}
      fullWidth
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      error={Boolean(error)}
      helperText={error ? t(error) : helperText ?? t('voice.helper')}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={t('voice.tooltip')}>
              <IconButton
                color={listening ? 'secondary' : 'primary'}
                onClick={listening ? stopListening : startListening}
                aria-label={listening ? t('voice.stop') : t('voice.start')}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  transition: 'transform 120ms ease',
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none'
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {listening ? <StopCircleIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
    />
  );
};

export default VoiceInput;
