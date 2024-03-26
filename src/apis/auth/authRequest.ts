import { SIGNIN_API, SIGNUP_API } from '@/constants/apis';
import axiosConfig from '@/apis/axiosConfig';
import {
  ISigninRequest,
  ISignupRequest,
} from '@/apis/auth/authInterface';

export const signinRequest = async ({ data }: ISigninRequest) => {
  return await axiosConfig.post(SIGNIN_API, data);
};

export const signupRequest = async (data: ISignupRequest) => {
  return await axiosConfig.post(SIGNUP_API, data);
};
