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
import { SIGNIN_SUCCESS_RESPONSE_MESSAGE, SIGNUP_SUCCESS_RESPONSE_MESSAGE } from "@/constants/reponseMessage";

interface IAuth {
  loading: boolean;
  auth: {
    isAuthenticated: () => boolean;
  };
  signin: {
    errorMessage: string;
    success: boolean;
    successMessage: string;
    initializeState: () => void;
    request: (nil: ISigninRequest) => void;
  };
  signup: {
    error: ISignupErrorResponseData;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    initializeState: () => void;
    request: (nil: ISignupRequest) => void;
  };
}

export const useAuthStore = create<IAuth>((set) => {
  const auth = {
    isAuthenticated: () => false,
  };

  const initialState: IAuth = {
    loading: false,
    auth,
    signin: {
      success: false,
      successMessage: '',
      errorMessage: '',
      initializeState:() => null,
      request: () => null,
    },
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
      initializeState: () => null,
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

    signin: {
      initializeState: () => {
        set((state) => ({
          ...state,
          signin: {
            ...state.signin,
            ...initialState
          },
        }));
      },

      request: async (data: ISigninRequest) => {
        set({ loading: true });

        await signinRequest(data)
          .then((data: AxiosResponse) => {
            const response = data.data;
            const successData = response.data as ISigninResponse;
            const successMessage = SIGNIN_SUCCESS_RESPONSE_MESSAGE;

            handleCookie(successData);

            set((state) => ({
              ...state,
              signin: {
                ...state.signin,
                success: true,
                successMessage: successMessage,
              },
              loading: false,
            }));
          })
          .catch((error: unknown) => {
            const response = error as AxiosError;
            const errorResponse = response.response
              ?.data as ISigninErrorResponse;
            const errorMessage = errorResponse?.error;

            set((state) => ({
              ...state,
              signin: { ...state.signin, errorMessage: errorMessage },
              loading: false,
            }));
          });
      }
    },

    signup: {
      initializeState: () =>
        set((state) => ({
          ...state,
          signup: {
            ...state.signup,
            errorMessage: '',
            error: initialState.signup.error,
            success: false,
            successMessage: '',
          },
        })),

      request: async (data: ISignupRequest) => {
        set({ loading: true });

        await signupRequest(data)
          .then(() => {
            const successMessage = SIGNUP_SUCCESS_RESPONSE_MESSAGE;

            set((state) => ({
              ...state,
              signup: {
                ...state.signup,
                success: true,
                successMessage: successMessage,
              },
              loading: false,
            }));
          })
          .catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            const signupError = errorResponse.response
              ?.data as ISignupErrorResponse;

            if (typeof signupError.error === 'string') {
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
