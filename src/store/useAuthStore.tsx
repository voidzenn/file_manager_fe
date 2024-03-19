import { create } from "zustand";

import { signinRequest } from '@/apis/authRequest';
import { getAuthTokenCookie, getAuthUserCookie, setAuthTokenCookie, setAuthUserCookie } from "@/lib/cookie";

interface ISignin {
  email: string | '';
  password: string | '';
  data: [] | null;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  signin: {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setErrorMessage: (message: string | null) => void;
  };
  auth: {
    isAuthenticated: () => boolean;
  }
  signinRequest: () => void;
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

export const useAuthStore = create<ISignin>((set, getState) => {

  const signin = {
    setEmail: (email: string) => set({ email: email }),
    setPassword: (password: string) => set({ password: password }),
    setErrorMessage: (message: string | null) => set({ errorMessage: message }),
  };

  const auth = {
    isAuthenticated: () => false,
  };

  const initialState: ISignin = {
    email: '',
    password: '',
    data: null,
    loading: false,
    error: false,
    errorMessage: '',
    signin,
    auth,
    signinRequest: () => null,
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
      }
    },

    signinRequest: async () => {
      const email = getState().email;
      const password = getState().password;

      try {
        set({ loading: true });

        const request = await signinRequest({
          data: {
            email: email,
            password: password,
          },
        });

        handleCookie(request.data.data);

        set({ loading: false });
      } catch (error: unknown) {
        const errorResponse = error as ISigninErrorResponse;
        const responseData = errorResponse.response.data;

        set({ errorMessage: responseData.error, loading: false });
      }
    },
  };
});
