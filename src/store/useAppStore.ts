import { create } from 'zustand';

export type UserRole = 'provider' | 'client';

export type UserProfile = {
  role: UserRole;
  name: string;
} | null;

export type WalletEntry = {
  id: string;
  delta: number;
  type: 'deposit' | 'withdraw';
  method: 'bKash' | 'Nagad' | 'Rocket';
  msisdn: string;
  timestamp: string;
};

type WalletState = {
  balance: number;
  history: WalletEntry[];
};

type FeatureFlags = {
  voice_input: boolean;
  ai_draft: boolean;
  ai_price_suggestion: boolean;
  masked_chat: boolean;
};

export type AppThemeName = 'sathi' | 'sokti' | 'client';

type SettingsState = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  darkMode: boolean;
  privacyProfileVisible: boolean;
  allowDirectMessages: boolean;
};

type AppState = {
  language: 'bn' | 'en';
  user: UserProfile;
  wallet: WalletState;
  featureFlags: FeatureFlags;
  settings: SettingsState;
  setLanguage: (language: 'bn' | 'en') => void;
  setUser: (user: UserProfile) => void;
  withdraw: (amount: number, method: WalletEntry['method'], msisdn: string) => void;
  updateSettings: (settings: Partial<SettingsState>) => void;
};

export const useAppStore = create<AppState>((set) => ({
  language: 'bn',
  user: null,
  wallet: {
    balance: 12500,
    history: [
      {
        id: 'init-credit',
        delta: 12500,
        type: 'deposit',
        method: 'bKash',
        msisdn: '01700000000',
        timestamp: new Date().toISOString()
      }
    ]
  },
  featureFlags: {
    voice_input: true,
    ai_draft: true,
    ai_price_suggestion: true,
    masked_chat: true
  },
  settings: {
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    darkMode: false,
    privacyProfileVisible: true,
    allowDirectMessages: true
  },
  setLanguage: (language) => set({ language }),
  setUser: (user) => set({ user }),
  withdraw: (amount, method, msisdn) =>
    set((state) => {
      if (amount <= 0 || amount > state.wallet.balance) {
        return state;
      }
      const entry: WalletEntry = {
        id: `txn-${Date.now()}`,
        delta: -amount,
        type: 'withdraw',
        method,
        msisdn,
        timestamp: new Date().toISOString()
      };
      return {
        ...state,
        wallet: {
          balance: state.wallet.balance - amount,
          history: [entry, ...state.wallet.history]
        }
      };
    }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }))
}));
