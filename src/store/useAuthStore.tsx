import { create } from "zustand";

import {
  ISigninErrorResponse,
  ISigninRequest,
  ISigninResponse,
  ISignupErrorResponse,
  ISignupRequest,
} from '@/apis/auth/authInterface';
import { signinRequest, signupRequest } from "@/apis/auth/authRequest";
import {
  getAuthTokenCookie,
  getAuthUserCookie,
  setAuthTokenCookie,
  setAuthUserCookie,
} from '@/lib/cookie';


interface IAuth {
  data: [] | null;
  loading: boolean;
  success: boolean;
  successMessage: string;
  error: boolean;
  errorMessage: string | Array<unknown>;
  initializeErrorMessage: () => void;
  auth: {
    isAuthenticated: () => boolean;
  };
  signin: (nil: ISigninRequest) => void;
  signup: (nil: ISignupRequest) => void;
}

export const useAuthStore = create<IAuth>((set) => {
  const auth = {
    isAuthenticated: () => false,
  };

  const initialState: IAuth = {
    data: null,
    loading: false,
    success: false,
    successMessage: '',
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

        const requestData = await signinRequest(data);

        handleCookie(requestData);

        set({ loading: false });
      } catch (error: unknown) {
        const errorResponse = error as ISigninErrorResponse;
        const errorMessage = errorResponse.response.data.error as Array<unknown>;

        set({ errorMessage: errorMessage, loading: false });
      }
    },

    signup: async (data: ISignupRequest) => {
      try {
        set({ loading: true });

        const requestData = await signupRequest(data);

        set({ loading: false });
        set({ successMessage: requestData.response.data.message })
      } catch (error: unknown) {
        const errorResponse = error as ISignupErrorResponse;
        const errorMessage = errorResponse.response.data.error as Array<unknown>;

        set({ errorMessage: errorMessage, loading: false });
      }
    },
  };
});
