import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
const VoiceInput = ({ label, value, onChange, placeholder, error, helperText }) => {
    const { t } = useTranslation();
    const [supported, setSupported] = useState(true);
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);
    const latestValueRef = useRef(value);
    useEffect(() => {
        latestValueRef.current = value;
    }, [value]);
    useEffect(() => {
        const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionCtor) {
            setSupported(false);
            return;
        }
        const recognition = new SpeechRecognitionCtor();
        recognition.lang = 'bn-BD';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.onresult = (event) => {
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
        if (!recognitionRef.current)
            return;
        recognitionRef.current.start();
        setListening(true);
    };
    const stopListening = () => {
        recognitionRef.current?.stop();
    };
    if (!supported) {
        return (_jsxs(Stack, { spacing: 1, children: [_jsx(TextField, { multiline: true, minRows: 4, label: label, value: value, onChange: (event) => onChange(event.target.value), error: Boolean(error), helperText: error ? t(error) : helperText ?? t('voice.helper'), placeholder: placeholder }), _jsxs(Alert, { severity: "info", children: [_jsx(Typography, { variant: "body2", children: t('voice.unsupportedTitle') }), _jsx(Typography, { variant: "caption", children: t('voice.unsupportedCta') })] })] }));
    }
    return (_jsx(TextField, { multiline: true, minRows: 4, fullWidth: true, label: label, value: value, placeholder: placeholder, onChange: (event) => onChange(event.target.value), error: Boolean(error), helperText: error ? t(error) : helperText ?? t('voice.helper'), InputProps: {
            endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(Tooltip, { title: t('voice.tooltip'), children: _jsx(IconButton, { color: listening ? 'secondary' : 'primary', onClick: listening ? stopListening : startListening, "aria-label": listening ? t('voice.stop') : t('voice.start'), sx: {
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
                        }, children: listening ? _jsx(StopCircleIcon, {}) : _jsx(MicIcon, {}) }) }) }))
        } }));
};
export default VoiceInput;
