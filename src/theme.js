import { alpha, createTheme, darken } from '@mui/material/styles';
const themeTokens = {
    sathi: {
        primary: '#FF4D6D',
        primary600: '#E63E60',
        primary700: '#C63253',
        background: '#FAFAFB',
        surface: '#FFFFFF',
        text: '#111827',
        muted: '#6B7280',
        border: '#E5E7EB',
        focus: '#FF6F91'
    },
    sokti: {
        primary: '#6B2EE6',
        primary600: '#5B26C6',
        primary700: '#4B20A4',
        background: '#F7F6FC',
        surface: '#FFFFFF',
        text: '#111827',
        muted: '#6B7280',
        border: '#E5E7EB',
        focus: '#8E5BFF'
    }
};
const shared = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
};
const getButtonState = (color, amount) => darken(color, amount);
export const getAppTheme = (name) => {
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
