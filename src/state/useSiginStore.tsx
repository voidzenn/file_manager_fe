import axios from "axios";
import { create } from "zustand";

interface SigninState {
  email: string | "";
  password: string | null;
  data: [] | null;
  loading: boolean;
  error: [] | null;
  actions?: {
    setEmail?: (value: string) => void;
  }
}

export const useSigninStore = create<SigninState>((set) => {
  const initialState: SigninState = {
    email: "",
    password: null,
    data: null,
    loading: false,
    error: null,
  };

  return {
    ...initialState,

    actions: {
      setEmail: (email : string) => set((state) => ({ ...state, email })),
    },

    fetchData: async () => {
      try {
        set({ loading: true });
      } catch (error) {
        set({ error: error.message, loading: false })
      }
    }
  }
});
