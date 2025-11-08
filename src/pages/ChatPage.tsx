import {
  Alert,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SafetyBanner from '@/components/feedback/SafetyBanner';
import PanicButton from '@/components/chat/PanicButton';
import { containsSensitiveContact, maskPhone, phoneRegex, emailRegex } from '@/utils/validators';
import PageHero from '@/components/layout/PageHero';

type Message = {
  id: string;
  role: 'client' | 'provider';
  content: string;
};

const maskContent = (text: string) =>
  text
    .replace(phoneRegex, (match) => maskPhone(match))
    .replace(emailRegex, '***@***');

const ChatPage = () => {
  const { t, i18n } = useTranslation();
  const defaultMessages = useMemo<Message[]>(
    () => [
      { id: 'm1', role: 'client', content: t('pages.chat.sampleUser') },
      { id: 'm2', role: 'provider', content: t('pages.chat.sampleProvider') }
    ],
    [t, i18n.language]
  );
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  useEffect(() => {
    setMessages(defaultMessages);
  }, [defaultMessages]);
  const [composer, setComposer] = useState('');
  const [warning, setWarning] = useState(false);

  const handleSend = () => {
    if (!composer.trim()) return;
    const sanitized = containsSensitiveContact(composer) ? maskContent(composer) : composer;
    setMessages((prev) => [...prev, { id: `local-${Date.now()}`, role: 'client', content: sanitized }]);
    setComposer('');
    setWarning(false);
  };

  const handleInputChange = (value: string) => {
    setComposer(value);
    setWarning(containsSensitiveContact(value));
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto' }}>
      <SafetyBanner />
      <PageHero
        title={t('pages.chat.title')}
        subtitle={t('ai.companion.welcome')}
        chipLabel={t('ai.companion.label')}
      />
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
            <Typography variant="body2">{t('pages.chat.maskedHint')}</Typography>
            <PanicButton />
          </Stack>
        </CardContent>
      </Card>
      {warning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {t('pages.chat.detection')}
        </Alert>
      )}
      <Card>
        <CardContent>
          <Stack spacing={2} height={400}>
            <Box
              sx={{ flex: 1, overflowY: 'auto', bgcolor: 'background.default', p: 2, borderRadius: 2 }}
              role="log"
              aria-live="polite"
            >
              <Stack spacing={2}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf: message.role === 'client' ? 'flex-end' : 'flex-start',
                      backgroundColor: message.role === 'client' ? 'primary.main' : 'grey.200',
                      color: message.role === 'client' ? 'primary.contrastText' : 'text.primary',
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      maxWidth: '80%'
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {message.content}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                value={composer}
                onChange={(event) => handleInputChange(event.target.value)}
                placeholder={t('pages.chat.composerPlaceholder')}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                aria-label={t('pages.chat.composerPlaceholder')}
                sx={{ minHeight: 56, minWidth: 56 }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatPage;
