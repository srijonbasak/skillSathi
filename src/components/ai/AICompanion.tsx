import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Fab,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Slide,
  Fade
} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SendIcon from '@mui/icons-material/SendRounded';
import MicIcon from '@mui/icons-material/Mic';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LockIcon from '@mui/icons-material/LockOutlined';
import { useTheme, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { mockDraftGig, mockSuggestPrice } from '@/services/mockAi';

type BotId = 'sathi' | 'sokti';

type AICompanionProps = {
  allowedBots?: BotId[];
};

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  timestamp: string;
};

type SpeechRecognitionEventLike = {
  results: Array<{
    0: { transcript: string };
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

const dockConfigs: Record<
  BotId,
  {
    labelKey: string;
    subtitleKey: string;
    quickReplies: string[];
    color: string;
    gradient: string;
    welcomeKey: string;
    responseKey?: string;
  }
> = {
  sathi: {
    labelKey: 'chatbots.sathi.title',
    subtitleKey: 'chatbots.sathi.subtitle',
    quickReplies: [
      'chatbots.sathi.quick.cleaning',
      'chatbots.sathi.quick.tailor',
      'chatbots.sathi.quick.babysit',
      'chatbots.sathi.quick.data'
    ],
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    welcomeKey: 'chatbots.sathi.welcome',
    responseKey: 'chatbots.sathi.response'
  },
  sokti: {
    labelKey: 'chatbots.sokti.title',
    subtitleKey: 'chatbots.sokti.subtitle',
    quickReplies: [
      'chatbots.sokti.quick.tailoring',
      'chatbots.sokti.quick.cooking',
      'chatbots.sokti.quick.beauty',
      'chatbots.sokti.quick.tuition'
    ],
    color: '#FF4D6D',
    gradient: 'linear-gradient(135deg, #FF4D6D 0%, #E63E60 100%)',
    welcomeKey: 'chatbots.sokti.welcome'
  }
};

const createWelcome = (t: (key: string) => string, bot: BotId) => [
  {
    id: `${bot}-hello`,
    role: 'bot' as const,
    text: t(dockConfigs[bot].welcomeKey),
    timestamp: new Date().toLocaleTimeString()
  }
];

const defaultBots: BotId[] = ['sathi', 'sokti'];

const AICompanion = ({ allowedBots }: AICompanionProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false);
  const [activeBot, setActiveBot] = useState<BotId>(() => {
    // Default to Sokti for providers, Sathi for clients
    if (allowedBots && allowedBots.includes('sokti')) {
      return 'sokti';
    }
    return 'sathi';
  });
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Default to Sokti for providers, Sathi for clients
    const defaultBot = allowedBots && allowedBots.includes('sokti') ? 'sokti' : 'sathi';
    return createWelcome(t, defaultBot);
  });
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botsToRender = useMemo<BotId[]>(() => {
    if (allowedBots && allowedBots.length > 0) {
      return allowedBots;
    }
    return defaultBots;
  }, [allowedBots]);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const quickReplyMap = useMemo(() => {
    const map: Record<string, string> = {};
    botsToRender.forEach((bot) => {
      dockConfigs[bot].quickReplies.forEach((key) => {
        map[key] = t(key as any);
      });
    });
    return map;
  }, [t, botsToRender]);

  useEffect(() => {
    // Update active bot when allowedBots change - prefer Sokti for providers
    if (botsToRender.length > 0 && !botsToRender.includes(activeBot)) {
      // Always prefer Sokti if available (for providers), otherwise use first available bot
      const preferredBot = botsToRender.includes('sokti') ? 'sokti' : (botsToRender[0] || 'sathi');
      setActiveBot(preferredBot);
      if (isOpen) {
        setMessages(createWelcome(t, preferredBot));
      }
    }
    // If Sokti becomes available and we're on Sathi, switch to Sokti
    else if (botsToRender.includes('sokti') && activeBot === 'sathi') {
      setActiveBot('sokti');
      if (isOpen) {
        setMessages(createWelcome(t, 'sokti'));
      }
    }
  }, [activeBot, botsToRender, t, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setMessages(createWelcome(t, activeBot));
    }
  }, [t, activeBot, isOpen]);

  useEffect(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceSupported(false);
      return;
    }
    const recognition = new SpeechRecognitionCtor() as SpeechRecognitionInstance;
    recognition.lang = 'bn-BD';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: SpeechRecognitionEventLike) => {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const appendMessage = (role: ChatMessage['role'], text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}`,
        role,
        text,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleSend = async (prefill?: string) => {
    const trimmed = (prefill ?? inputValue).trim();
    if (!trimmed) return;
    appendMessage('user', trimmed);
    setInputValue('');

    if (activeBot === 'sathi') {
      appendMessage('bot', t(dockConfigs.sathi.responseKey!, { topic: trimmed }));
      return;
    }

    try {
      const draft = await mockDraftGig({ skill: trimmed, hint: t('chatbots.sokti.hint') });
      const price = await mockSuggestPrice({ skill: trimmed });
      appendMessage(
        'bot',
        `${t('forms.gig.title')}: ${draft.title}\n${t('forms.gig.description')}: ${draft.description}\n${t(
          'ai.suggestedPrice'
        )}: ৳${price.toLocaleString()}`
      );
    } catch {
      appendMessage('bot', t('ai.error'));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (!voiceSupported || !recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      return;
    }
    recognitionRef.current.start();
    setListening(true);
  };

  const currentConfig = dockConfigs[activeBot];

  return (
    <>
      {/* Floating Action Button */}
      <Fade in={!isOpen}>
        <Fab
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 100, md: 32 },
            right: { xs: 16, md: 32 },
            zIndex: (muiTheme) => muiTheme.zIndex.speedDial,
            width: 64,
            height: 64,
            backgroundImage: currentConfig.gradient,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
            },
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <ChatBubbleIcon sx={{ color: '#fff', fontSize: 32 }} />
        </Fab>
      </Fade>

      {/* Assistant Panel */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={24}
          sx={{
            position: 'fixed',
            bottom: { xs: 100, md: 32 },
            right: { xs: 16, md: 32 },
            width: { xs: 'calc(100% - 32px)', sm: 420, md: 480 },
            height: { xs: 'calc(100vh - 120px)', sm: 600, md: 680 },
            maxHeight: { xs: 'calc(100vh - 120px)', sm: 600, md: 680 },
            zIndex: (muiTheme) => muiTheme.zIndex.modal,
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: `1px solid ${alpha(currentConfig.color, 0.2)}`,
            boxShadow: `0 20px 60px ${alpha(currentConfig.color, 0.3)}`
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundImage: currentConfig.gradient,
              color: '#fff',
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 2,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <PsychologyIcon sx={{ fontSize: 28, color: '#fff' }} />
              </Box>
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  {t(currentConfig.labelKey)}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  {t(currentConfig.subtitleKey)}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {/* Bot Selector */}
            {botsToRender.length > 1 && (
              <Stack direction="row" spacing={1} mt={2} sx={{ position: 'relative', zIndex: 1 }}>
                {botsToRender.map((bot) => {
                  const config = dockConfigs[bot];
                  const isActive = activeBot === bot;
                  return (
                    <Chip
                      key={bot}
                      label={t(config.labelKey)}
                      onClick={() => {
                        setActiveBot(bot);
                        setMessages(createWelcome(t, bot));
                      }}
                      sx={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        border: isActive ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.25)'
                        },
                        transition: 'all 200ms ease'
                      }}
                    />
                  );
                })}
              </Stack>
            )}

            {/* Safety Badge */}
            <Box mt={2} sx={{ position: 'relative', zIndex: 1 }}>
              <Chip
                icon={<LockIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />}
                label={t('chatbots.safety')}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px dashed rgba(255,255,255,0.3)'
                }}
              />
            </Box>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 3,
              backgroundColor: 'background.default',
              '&::-webkit-scrollbar': {
                width: '6px'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha(theme.palette.text.secondary, 0.2),
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.text.secondary, 0.3)
                }
              }
            }}
          >
            <Stack spacing={2}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    alignSelf: message.role === 'bot' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    animation: message.role === 'bot' ? 'fadeIn 300ms ease' : 'none'
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ px: 1, display: 'block', mb: 0.5 }}>
                    {message.timestamp}
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: (muiTheme) =>
                        message.role === 'bot'
                          ? `1px solid ${muiTheme.palette.divider}`
                          : '1px solid transparent',
                      backgroundColor:
                        message.role === 'bot'
                          ? 'background.paper'
                          : currentConfig.color,
                      color: message.role === 'bot' ? 'text.primary' : '#FFFFFF',
                      whiteSpace: 'pre-line',
                      boxShadow:
                        message.role === 'bot'
                          ? '0 2px 8px rgba(0,0,0,0.05)'
                          : `0 4px 12px ${alpha(currentConfig.color, 0.3)}`,
                      position: 'relative',
                      '&::before':
                        message.role === 'bot'
                          ? {}
                          : {
                              content: '""',
                              position: 'absolute',
                              bottom: -6,
                              right: 12,
                              width: 0,
                              height: 0,
                              borderLeft: '6px solid transparent',
                              borderRight: '6px solid transparent',
                              borderTop: `6px solid ${currentConfig.color}`
                            }
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {message.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <Box sx={{ px: 3, pt: 2, pb: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Quick suggestions:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {currentConfig.quickReplies.map((key) => (
                  <Chip
                    key={key}
                    label={quickReplyMap[key]}
                    onClick={() => handleSend(quickReplyMap[key])}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      cursor: 'pointer',
                      backgroundColor: alpha(currentConfig.color, 0.1),
                      color: currentConfig.color,
                      border: `1px solid ${alpha(currentConfig.color, 0.2)}`,
                      '&:hover': {
                        backgroundColor: alpha(currentConfig.color, 0.15),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 200ms ease'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              backgroundColor: 'background.paper'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <TextField
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder={t('chatbots.placeholder')}
                fullWidth
                multiline
                maxRows={4}
                onKeyDown={handleKeyDown}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'background.default'
                  }
                }}
              />
              <IconButton
                onClick={toggleListening}
                disabled={!voiceSupported}
                sx={{
                  backgroundColor: listening ? 'error.main' : 'primary.main',
                  color: '#fff',
                  borderRadius: 2,
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: listening ? 'error.dark' : 'primary.dark'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'action.disabledBackground'
                  }
                }}
              >
                <MicIcon />
              </IconButton>
              <IconButton
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                sx={{
                  backgroundImage: currentConfig.gradient,
                  color: '#fff',
                  borderRadius: 2,
                  width: 48,
                  height: 48,
                  '&:hover': {
                    opacity: 0.9,
                    transform: 'scale(1.05)'
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5
                  },
                  transition: 'all 200ms ease'
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default AICompanion;
