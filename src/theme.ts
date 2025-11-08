import { alpha, createTheme, darken } from '@mui/material/styles';
import type { AppThemeName } from './store/useAppStore';

const themeTokens: Record<
  AppThemeName,
  {
    primary: string;
    primary600: string;
    primary700: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    focus: string;
  }
> = {
  sathi: {
    primary: '#2563EB',
    primary600: '#1D4ED8',
    primary700: '#1E40AF',
    background: '#EBF2FF',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#475569',
    border: '#D1D5F8',
    focus: '#60A5FA'
  },
  sokti: {
    primary: '#FF4D6D',
    primary600: '#E63E60',
    primary700: '#C63253',
    background: '#FFF5F8',
    surface: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
    border: '#FBCFE8',
    focus: '#FF93B0'
  },
  client: {
    primary: '#0EA5E9',
    primary600: '#0284C7',
    primary700: '#0369A1',
    background: '#F0F9FF',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#475569',
    border: '#BAE6FD',
    focus: '#38BDF8'
  }
};

const shared = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444'
};

const getButtonState = (color: string, amount: number) => darken(color, amount);

export const getAppTheme = (name: AppThemeName) => {
  const token = themeTokens[name];
  const focusRing = `0 0 0 2px ${alpha(token.focus, 0.8)}`;

  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: token.primary,
        light: token.primary600,
        dark: token.primary700,
        contrastText: '#FFFFFF'
      },
      background: {
        default: token.background,
        paper: token.surface
      },
      text: {
        primary: token.text,
        secondary: token.muted
      },
      divider: token.border,
      success: { main: shared.success },
      warning: { main: shared.warning },
      error: { main: shared.error }
    },
    shape: {
      borderRadius: 12
    },
    typography: {
      fontFamily: "Inter, 'Noto Sans Bengali', 'Segoe UI', sans-serif",
      h1: { fontSize: '2.75rem', fontWeight: 700, lineHeight: 1.1 },
      h2: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.2 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.25 },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.95rem', lineHeight: 1.5 },
      button: { fontWeight: 600 }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': { boxSizing: 'border-box' },
          body: {
            backgroundColor: token.background,
            color: token.text,
            fontFamily: "Inter, 'Noto Sans Bengali', 'Segoe UI', sans-serif",
            letterSpacing: '-0.01em'
          },
          img: {
            maxWidth: '100%',
            display: 'block'
          },
          '::selection': {
            backgroundColor: token.primary,
            color: '#fff'
          },
          '*:focus-visible': {
            outline: 'none',
            boxShadow: focusRing,
            borderRadius: 6
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            minHeight: 44,
            paddingInline: 20,
            fontWeight: 600,
            letterSpacing: 0,
            transition: 'background-color 180ms ease, box-shadow 180ms ease',
            boxShadow: '0 8px 24px rgba(17,24,39,0.08)',
            '&:focus-visible': {
              boxShadow: `${focusRing}, 0 8px 24px rgba(17,24,39,0.08)`
            }
          },
          containedPrimary: {
            backgroundColor: token.primary,
            '&:hover': {
              backgroundColor: getButtonState(token.primary, 0.08)
            },
            '&:active': {
              backgroundColor: getButtonState(token.primary, 0.12)
            },
            '&.Mui-disabled': {
              color: alpha('#FFFFFF', 0.4),
              backgroundColor: alpha(token.primary, 0.4)
            }
          },
          outlined: {
            borderColor: token.border,
            color: token.text,
            '&:hover': {
              borderColor: token.primary,
              backgroundColor: alpha(token.primary, 0.05)
            },
            '&:active': {
              backgroundColor: alpha(token.primary, 0.08)
            }
          },
          text: {
            color: token.primary,
            '&:hover': {
              backgroundColor: alpha(token.primary, 0.08)
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 600,
            paddingInline: 4,
            borderColor: token.border,
            backgroundColor: token.surface
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${token.border}`,
            boxShadow: '0 8px 24px rgba(17,24,39,0.12)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${token.border}`
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(token.surface, 0.95),
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${token.border}`,
            color: token.text,
            boxShadow: 'none'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10
          }
        }
      }
    }
  });
};

const defaultTheme = getAppTheme('sathi');

export default defaultTheme;
