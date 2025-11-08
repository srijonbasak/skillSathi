import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Chip, Drawer, IconButton, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutline';
import BoltIcon from '@mui/icons-material/Bolt';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/SendRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import LockIcon from '@mui/icons-material/LockOutlined';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { mockDraftGig, mockSuggestPrice } from '@/services/mockAi';
const dockConfigs = {
    sathi: {
        labelKey: 'chatbots.sathi.title',
        subtitleKey: 'chatbots.sathi.subtitle',
        buttonLabel: 'Sathi (চ্যাট)',
        quickReplies: ['chatbots.sathi.quick.cleaning', 'chatbots.sathi.quick.tailor', 'chatbots.sathi.quick.babysit', 'chatbots.sathi.quick.data'],
        icon: _jsx(ChatBubbleIcon, { fontSize: "small" }),
        color: '#FF4D6D',
        welcomeKey: 'chatbots.sathi.welcome',
        responseKey: 'chatbots.sathi.response'
    },
    sokti: {
        labelKey: 'chatbots.sokti.title',
        subtitleKey: 'chatbots.sokti.subtitle',
        buttonLabel: 'Sokti (সহায়তা)',
        quickReplies: ['chatbots.sokti.quick.tailoring', 'chatbots.sokti.quick.cooking', 'chatbots.sokti.quick.beauty', 'chatbots.sokti.quick.tuition'],
        icon: _jsx(BoltIcon, { fontSize: "small" }),
        color: '#6B2EE6',
        welcomeKey: 'chatbots.sokti.welcome'
    }
};
const createWelcome = (t) => ({
    sathi: [
        {
            id: 'sathi-hello',
            role: 'bot',
            text: t(dockConfigs.sathi.welcomeKey),
            timestamp: new Date().toLocaleTimeString()
        }
    ],
    sokti: [
        {
            id: 'sokti-hello',
            role: 'bot',
            text: t(dockConfigs.sokti.welcomeKey),
            timestamp: new Date().toLocaleTimeString()
        }
    ]
});
const AICompanion = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeBot, setActiveBot] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState(() => createWelcome(t));
    const [listening, setListening] = useState(false);
    const [voiceSupported, setVoiceSupported] = useState(true);
    const recognitionRef = useRef(null);
    const quickReplyMap = useMemo(() => {
        const map = {};
        Object.entries(dockConfigs).forEach(([bot, config]) => {
            config.quickReplies.forEach((key) => {
                map[key] = t(key);
            });
        });
        return map;
    }, [t]);
    useEffect(() => {
        setMessages(createWelcome(t));
    }, [t]);
    useEffect(() => {
        const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionCtor) {
            setVoiceSupported(false);
            return;
        }
        const recognition = new SpeechRecognitionCtor();
        recognition.lang = 'bn-BD';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        };
        recognition.onend = () => setListening(false);
        recognition.onerror = () => setListening(false);
        recognitionRef.current = recognition;
        return () => recognition.stop();
    }, []);
    useEffect(() => {
        setInputValue('');
    }, [activeBot]);
    const appendMessage = (bot, role, text) => {
        setMessages((prev) => ({
            ...prev,
            [bot]: [
                ...prev[bot],
                {
                    id: `${bot}-${role}-${Date.now()}`,
                    role,
                    text,
                    timestamp: new Date().toLocaleTimeString()
                }
            ]
        }));
    };
    const handleSend = async (prefill) => {
        if (!activeBot)
            return;
        const trimmed = (prefill ?? inputValue).trim();
        if (!trimmed)
            return;
        appendMessage(activeBot, 'user', trimmed);
        setInputValue('');
        if (activeBot === 'sathi') {
            appendMessage(activeBot, 'bot', t(dockConfigs.sathi.responseKey, { topic: trimmed }));
            return;
        }
        try {
            const draft = await mockDraftGig({ skill: trimmed, hint: t('chatbots.sokti.hint') });
            const price = await mockSuggestPrice({ skill: trimmed });
            appendMessage(activeBot, 'bot', `${t('forms.gig.title')}: ${draft.title}\n${t('forms.gig.description')}: ${draft.description}\n${t('ai.suggestedPrice')}: ৳${price.toLocaleString()}`);
        }
        catch {
            appendMessage(activeBot, 'bot', t('ai.error'));
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };
    const toggleListening = () => {
        if (!voiceSupported || !recognitionRef.current)
            return;
        if (listening) {
            recognitionRef.current.stop();
            return;
        }
        recognitionRef.current.start();
        setListening(true);
    };
    const dockButtons = (_jsx(Stack, { spacing: 1, sx: {
            position: 'fixed',
            bottom: { xs: 92, md: 32 },
            right: { xs: 16, md: 32 },
            zIndex: (muiTheme) => muiTheme.zIndex.drawer - 1
        }, children: Object.keys(dockConfigs).map((bot) => {
            const config = dockConfigs[bot];
            return (_jsx(Button, { variant: "contained", onClick: () => setActiveBot(bot), startIcon: config.icon, sx: {
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    minWidth: 220,
                    backgroundColor: config.color,
                    '&:hover': { backgroundColor: config.color }
                }, children: config.buttonLabel }, bot));
        }) }));
    const drawerContent = activeBot && (_jsx(Drawer, { anchor: "right", open: true, onClose: () => setActiveBot(null), PaperProps: {
            sx: {
                width: isMobile ? '100%' : 380,
                p: 3,
                borderRadius: 0
            }
        }, children: _jsxs(Stack, { spacing: 1.5, height: "100%", children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "flex-start", children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h6", children: t(dockConfigs[activeBot].labelKey) }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: t(dockConfigs[activeBot].subtitleKey) })] }), _jsx(IconButton, { onClick: () => setActiveBot(null), "aria-label": t('common.close'), children: _jsx(CloseIcon, {}) })] }), _jsx(Chip, { label: t('chatbots.safety'), icon: _jsx(LockIcon, {}), sx: { alignSelf: 'flex-start', borderRadius: 2, borderStyle: 'dashed' } }), _jsx(Box, { sx: { flex: 1, overflowY: 'auto', pr: 1 }, children: _jsx(Stack, { spacing: 1.5, children: messages[activeBot].map((message) => (_jsxs(Box, { sx: {
                                alignSelf: message.role === 'bot' ? 'flex-start' : 'flex-end',
                                maxWidth: '90%'
                            }, children: [_jsx(Typography, { variant: "caption", color: "text.secondary", children: message.timestamp }), _jsx(Box, { sx: {
                                        mt: 0.5,
                                        p: 1.5,
                                        borderRadius: 2,
                                        border: (muiTheme) => message.role === 'bot' ? `1px solid ${muiTheme.palette.divider}` : '1px solid transparent',
                                        backgroundColor: message.role === 'bot' ? 'background.default' : dockConfigs[activeBot].color,
                                        color: message.role === 'bot' ? 'text.primary' : '#FFFFFF',
                                        whiteSpace: 'pre-line'
                                    }, children: message.text })] }, message.id))) }) }), _jsx(Stack, { direction: "row", spacing: 1, flexWrap: "wrap", children: dockConfigs[activeBot].quickReplies.map((key) => (_jsx(Chip, { label: quickReplyMap[key], onClick: () => handleSend(quickReplyMap[key]), sx: { borderRadius: 2 } }, key))) }), _jsxs(Stack, { direction: "row", spacing: 1, children: [_jsx(TextField, { value: inputValue, onChange: (event) => setInputValue(event.target.value), placeholder: t('chatbots.placeholder'), fullWidth: true, onKeyDown: handleKeyDown }), _jsx(Tooltip, { title: t('voice.tooltip'), children: _jsx("span", { children: _jsx(IconButton, { color: listening ? 'secondary' : 'primary', onClick: toggleListening, disabled: !voiceSupported, "aria-label": t('voice.tooltip'), sx: {
                                        borderRadius: 2,
                                        border: (muiTheme) => `1px solid ${muiTheme.palette.divider}`
                                    }, children: _jsx(MicIcon, {}) }) }) }), _jsx(IconButton, { color: "primary", onClick: () => handleSend(), sx: { borderRadius: 2 }, children: _jsx(SendIcon, {}) })] })] }) }));
    return (_jsxs(_Fragment, { children: [dockButtons, drawerContent] }));
};
export default AICompanion;
