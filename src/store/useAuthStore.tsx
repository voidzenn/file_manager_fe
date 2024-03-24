import { create } from "zustand";
import { AxiosError, AxiosResponse } from 'axios';

import {
  ISigninErrorResponse,
  ISigninRequest,
  ISigninResponse,
  ISignupErrorResponse,
  ISignupErrorResponseData,
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
  loading: boolean;
  success: boolean;
  successMessage: string;
  error: unknown;
  errorMessage: string;
  initializeErrorMessage: () => void;
  auth: {
    isAuthenticated: () => boolean;
  };
  signin: (nil: ISigninRequest) => void;
  signup: {
    error: ISignupErrorResponseData;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    initializeErrorMessage: () => void;
    request: (nil: ISignupRequest) => void;
  };
}

export const useAuthStore = create<IAuth>((set) => {
  const auth = {
    isAuthenticated: () => false,
  };

  const initialState: IAuth = {
    loading: false,
    success: false,
    successMessage: '',
    error: [],
    errorMessage: '',
    initializeErrorMessage: () =>
      set((state) => ({ ...state, signup: { ...state.signup, errorMessage: '' } })),
    auth,
    signin: () => null,
    signup: {
      success: false,
      successMessage: '',
      error: {
        fname: '',
        lname: '',
        email: '',
        password: '',
      },
      errorMessage: '',
      initializeErrorMessage: () => null,
      request: () => null,
    },
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
        const errorMessage = errorResponse.response.data
          .error as Array<unknown>;

        set({ errorMessage: errorMessage, loading: false });
      }
    },

    signup: {
      initializeErrorMessage: () =>
        set((state) => ({
          ...state,
          signup: { ...state.signup, errorMessage: '' },
        })),

      request: async (data: ISignupRequest) => {
        const requestData = await signupRequest(data)
          .then(() => {
            set({ loading: true });
            set({ loading: false });
            set({ successMessage: requestData.response.data.message });
          })
          .catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            const signupError = errorResponse.response
              ?.data as ISignupErrorResponse;

            if (new String(signupError.error) instanceof String) {
              console.log(signupError.error);

              set((state) => ({
                ...state,
                signup: {
                  ...state.signup,
                  errorMessage: String(signupError.error),
                  loading: false,
                },
              }));
            } else {
              const errorData = signupError
                .error[0] as ISignupErrorResponseData;

              set((state) => ({
                ...state,
                signup: {
                  ...state.signup,
                  error: errorData,
                },
                loading: false,
              }));
            }
          });
      },
    },
  };
});
