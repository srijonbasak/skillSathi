import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Box, Card, CardContent, IconButton, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SafetyBanner from '@/components/feedback/SafetyBanner';
import PanicButton from '@/components/chat/PanicButton';
import { containsSensitiveContact, maskPhone, phoneRegex, emailRegex } from '@/utils/validators';
import PageHero from '@/components/layout/PageHero';
const maskContent = (text) => text
    .replace(phoneRegex, (match) => maskPhone(match))
    .replace(emailRegex, '***@***');
const ChatPage = () => {
    const { t, i18n } = useTranslation();
    const defaultMessages = useMemo(() => [
        { id: 'm1', role: 'client', content: t('pages.chat.sampleUser') },
        { id: 'm2', role: 'provider', content: t('pages.chat.sampleProvider') }
    ], [t, i18n.language]);
    const [messages, setMessages] = useState(defaultMessages);
    useEffect(() => {
        setMessages(defaultMessages);
    }, [defaultMessages]);
    const [composer, setComposer] = useState('');
    const [warning, setWarning] = useState(false);
    const handleSend = () => {
        if (!composer.trim())
            return;
        const sanitized = containsSensitiveContact(composer) ? maskContent(composer) : composer;
        setMessages((prev) => [...prev, { id: `local-${Date.now()}`, role: 'client', content: sanitized }]);
        setComposer('');
        setWarning(false);
    };
    const handleInputChange = (value) => {
        setComposer(value);
        setWarning(containsSensitiveContact(value));
    };
    return (_jsxs(Box, { sx: { maxWidth: 960, mx: 'auto' }, children: [_jsx(SafetyBanner, {}), _jsx(PageHero, { title: t('pages.chat.title'), subtitle: t('ai.companion.welcome'), chipLabel: t('ai.companion.label') }), _jsx(Card, { sx: { mb: 2 }, children: _jsx(CardContent, { children: _jsxs(Stack, { direction: { xs: 'column', md: 'row' }, spacing: 2, justifyContent: "space-between", children: [_jsx(Typography, { variant: "body2", children: t('pages.chat.maskedHint') }), _jsx(PanicButton, {})] }) }) }), warning && (_jsx(Alert, { severity: "warning", sx: { mb: 2 }, children: t('pages.chat.detection') })), _jsx(Card, { children: _jsx(CardContent, { children: _jsxs(Stack, { spacing: 2, height: 400, children: [_jsx(Box, { sx: { flex: 1, overflowY: 'auto', bgcolor: 'background.default', p: 2, borderRadius: 2 }, role: "log", "aria-live": "polite", children: _jsx(Stack, { spacing: 2, children: messages.map((message) => (_jsx(Box, { sx: {
                                            alignSelf: message.role === 'client' ? 'flex-end' : 'flex-start',
                                            backgroundColor: message.role === 'client' ? 'primary.main' : 'grey.200',
                                            color: message.role === 'client' ? 'primary.contrastText' : 'text.primary',
                                            px: 2,
                                            py: 1.5,
                                            borderRadius: 2,
                                            maxWidth: '80%'
                                        }, children: _jsx(Typography, { variant: "body2", sx: { whiteSpace: 'pre-line' }, children: message.content }) }, message.id))) }) }), _jsxs(Stack, { direction: "row", spacing: 1, children: [_jsx(TextField, { fullWidth: true, multiline: true, minRows: 2, value: composer, onChange: (event) => handleInputChange(event.target.value), placeholder: t('pages.chat.composerPlaceholder') }), _jsx(IconButton, { color: "primary", onClick: handleSend, "aria-label": t('pages.chat.composerPlaceholder'), sx: { minHeight: 56, minWidth: 56 }, children: _jsx(SendIcon, {}) })] })] }) }) })] }));
};
export default ChatPage;
