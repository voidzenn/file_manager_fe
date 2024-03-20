import { create } from "zustand";

import { ISigninRequest, signinRequest } from '@/apis/authRequest';
import { getAuthTokenCookie, getAuthUserCookie, setAuthTokenCookie, setAuthUserCookie } from "@/lib/cookie";

interface IAuth {
  data: [] | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  initializeErrorMessage: () => void;
  auth: {
    isAuthenticated: () => boolean;
  };
  signin: (nil: ISigninRequest) => void;
  signup: () => void;
}

interface IToken {
  token: string;
}

interface ISigninResponse {
  email: string | null;
  fname: string | null;
  lname: string | null;
  meta: IToken;
}

interface ISigninErrorResponse {
  response: {
    data: {
      error: string | null;
      success: boolean;
    };
  };
}

export const useAuthStore = create<IAuth>((set) => {
  const auth = {
    isAuthenticated: () => false,
  };

  const initialState: IAuth = {
    data: null,
    loading: false,
    error: false,
    errorMessage: '',
    initializeErrorMessage: () => set({ errorMessage: '' }),
    auth,
    signin: () => null,
    signup: () => null,
  };

  const handleCookie = ({ email, fname, lname, meta }: ISigninResponse) => {
    const userData = {
      email: email,
      fname: fname,
      lname: lname,
    };

    setAuthTokenCookie(meta.token);
    setAuthUserCookie(userData);
  };

  return {
    ...initialState,

    auth: {
      isAuthenticated: () => {
        return getAuthTokenCookie() && getAuthUserCookie();
      },
    },

    signin: async (data: ISigninRequest) => {
      try {
        set({ loading: true });

        const request = await signinRequest(data);

        handleCookie(request.data.data);

        set({ loading: false });
      } catch (error: unknown) {
        const errorResponse = error as ISigninErrorResponse;
        const responseData = errorResponse.response.data;

        set({ errorMessage: responseData.error, loading: false });
      }
    },

    signupRequest: async () => {
      return 'test';
    },
  };
});
