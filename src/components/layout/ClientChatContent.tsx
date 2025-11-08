import {
  Alert,
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PanicButton from '@/components/chat/PanicButton';
import { containsSensitiveContact, maskPhone, phoneRegex, emailRegex } from '@/utils/validators';

type Message = {
  id: string;
  role: 'client' | 'provider';
  content: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  providerName: string;
  providerAvatar: string;
  gig: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isActive: boolean;
  messages: Message[];
};

const maskContent = (text: string) =>
  text
    .replace(phoneRegex, (match) => maskPhone(match))
    .replace(emailRegex, '***@***');

const ClientChatContent = () => {
  const { t, i18n } = useTranslation();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      providerName: 'রুনা আক্তার',
      providerAvatar: 'রা',
      gig: 'ব্লাউজ প্যাটার্ন ও ফিটিং',
      lastMessage: 'আমি শুক্রবার বিকালে আসতে পারি',
      lastMessageTime: '11:30 AM',
      unreadCount: 1,
      isActive: true,
      messages: [
        { id: 'm1', role: 'client', content: 'হ্যালো, আপনার সেলাই সেবা সম্পর্কে জানতে চাই', timestamp: '10:15 AM' },
        { id: 'm2', role: 'provider', content: 'হ্যালো! অবশ্যই, আমি কীভাবে সাহায্য করতে পারি?', timestamp: '10:20 AM' },
        { id: 'm3', role: 'client', content: 'আমি শুক্রবার বিকালে আসতে পারি', timestamp: '11:30 AM' }
      ]
    },
    {
      id: '2',
      providerName: 'ফাতেমা খাতুন',
      providerAvatar: 'ফা',
      gig: 'হোম ক্যাটারিং',
      lastMessage: 'ধন্যবাদ, আমি শীঘ্রই জানাব',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isActive: false,
      messages: [
        { id: 'm4', role: 'client', content: 'বুকিং নিশ্চিত করতে চাই', timestamp: 'Yesterday 3:00 PM' },
        { id: 'm5', role: 'provider', content: 'অবশ্যই, আমি প্রস্তুত আছি', timestamp: 'Yesterday 3:15 PM' },
        { id: 'm6', role: 'provider', content: 'ধন্যবাদ, আমি শীঘ্রই জানাব', timestamp: 'Yesterday 4:00 PM' }
      ]
    },
    {
      id: '3',
      providerName: 'আয়েশা বেগম',
      providerAvatar: 'আ',
      gig: 'বেবিসিটিং',
      lastMessage: 'আপনার রেটিং দেখে খুবই আগ্রহী',
      lastMessageTime: '2 days ago',
      unreadCount: 2,
      isActive: false,
      messages: [
        { id: 'm7', role: 'provider', content: 'আপনার রেটিং দেখে খুবই আগ্রহী', timestamp: '2 days ago' }
      ]
    }
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [composer, setComposer] = useState('');
  const [warning, setWarning] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const filteredConversations = useMemo(() => {
    if (!searchQuery) return conversations;
    return conversations.filter(c =>
      c.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gig.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const handleSend = () => {
    if (!composer.trim() || !activeConversation) return;
    const sanitized = containsSensitiveContact(composer) ? maskContent(composer) : composer;
    
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: `msg-${Date.now()}`,
                  role: 'client',
                  content: sanitized,
                  timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
                }
              ],
              lastMessage: sanitized,
              lastMessageTime: 'Just now'
            }
          : conv
      )
    );
    setComposer('');
    setWarning(false);
  };

  const handleInputChange = (value: string) => {
    setComposer(value);
    setWarning(containsSensitiveContact(value));
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, unreadCount: 0, isActive: true } : { ...conv, isActive: false }
      )
    );
  };

  useEffect(() => {
    const messagesEnd = document.getElementById('messages-end');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            {t('pages.clientDashboard.sidebar.menu.3.label') || 'Chat'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('pages.clientDashboard.sidebar.menu.3.hint') || 'Messages'}
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container sx={{ height: { xs: 'auto', md: 600 }, minHeight: { xs: 500, md: 600 } }}>
              {/* Conversations List */}
              <Grid item xs={12} md={4} sx={{ borderRight: { md: 1 }, borderColor: 'divider', height: { xs: 300, md: '100%' }, display: { xs: activeConversationId ? 'none' : 'block', md: 'block' } }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="সেবা প্রদানকারী খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <List sx={{ p: 0, overflowY: 'auto', height: 'calc(100% - 73px)' }}>
                  {filteredConversations.map((conversation) => (
                    <ListItem key={conversation.id} disablePadding>
                      <ListItemButton
                        selected={conversation.id === activeConversationId}
                        onClick={() => handleConversationSelect(conversation.id)}
                        sx={{
                          borderBottom: 1,
                          borderColor: 'divider',
                          '&.Mui-selected': {
                            backgroundColor: 'primary.50',
                            '&:hover': {
                              backgroundColor: 'primary.100'
                            }
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Badge
                            badgeContent={conversation.unreadCount}
                            color="error"
                            invisible={conversation.unreadCount === 0}
                          >
                            <Avatar
                              sx={{
                                bgcolor: conversation.isActive ? 'primary.main' : 'grey.400',
                                width: 48,
                                height: 48
                              }}
                            >
                              {conversation.providerAvatar}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1" fontWeight={conversation.unreadCount > 0 ? 600 : 400}>
                                {conversation.providerName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {conversation.lastMessageTime}
                              </Typography>
                            </Stack>
                          }
                          secondary={
                            <>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mb: 0.5 }}
                              >
                                {conversation.gig}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  fontWeight: conversation.unreadCount > 0 ? 500 : 400
                                }}
                              >
                                {conversation.lastMessage}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Chat Area */}
              <Grid item xs={12} md={8} sx={{ display: { xs: activeConversationId ? 'block' : 'none', md: 'block' }, height: { xs: 500, md: '100%' } }}>
                {activeConversation ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Chat Header */}
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper'
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                          {activeConversation.providerAvatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {activeConversation.providerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activeConversation.gig}
                          </Typography>
                        </Box>
                        <PanicButton />
                      </Stack>
                    </Box>

                    {/* Messages Area */}
                    <Box
                      sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        bgcolor: 'background.default',
                        '&::-webkit-scrollbar': {
                          width: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          borderRadius: '3px'
                        }
                      }}
                    >
                      <Stack spacing={2}>
                        {activeConversation.messages.map((message) => (
                          <Box
                            key={message.id}
                            sx={{
                              display: 'flex',
                              justifyContent: message.role === 'client' ? 'flex-end' : 'flex-start'
                            }}
                          >
                            <Box
                              sx={{
                                maxWidth: '70%',
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: message.role === 'client' ? 'primary.main' : 'background.paper',
                                color: message.role === 'client' ? 'primary.contrastText' : 'text.primary',
                                boxShadow: 1
                              }}
                            >
                              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                {message.content}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'block',
                                  mt: 0.5,
                                  opacity: 0.7,
                                  textAlign: message.role === 'client' ? 'right' : 'left'
                                }}
                              >
                                {message.timestamp}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                        <div id="messages-end" />
                      </Stack>
                    </Box>

                    {/* Warning Alert */}
                    {warning && (
                      <Box sx={{ px: 2, pt: 1 }}>
                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                          {t('pages.chat.detection')}
                        </Alert>
                      </Box>
                    )}

                    {/* Input Area */}
                    <Box
                      sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper'
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="flex-end">
                        <TextField
                          fullWidth
                          multiline
                          minRows={2}
                          maxRows={4}
                          value={composer}
                          onChange={(event) => handleInputChange(event.target.value)}
                          placeholder={t('pages.chat.composerPlaceholder')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={handleSend}
                          disabled={!composer.trim()}
                          sx={{
                            minHeight: 56,
                            minWidth: 56,
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'primary.dark'
                            },
                            '&.Mui-disabled': {
                              bgcolor: 'action.disabledBackground'
                            }
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        {t('pages.chat.maskedHint')}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.default'
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      একটি কনভারসেশন নির্বাচন করুন
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ClientChatContent;

