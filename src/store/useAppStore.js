import { create } from 'zustand';
export const useAppStore = create((set) => ({
    language: 'bn',
    theme: 'sathi',
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
    setLanguage: (language) => set({ language }),
    setTheme: (theme) => set({ theme }),
    setUser: (user) => set({ user }),
    withdraw: (amount, method, msisdn) => set((state) => {
        if (amount <= 0 || amount > state.wallet.balance) {
            return state;
        }
        const entry = {
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
    })
}));
