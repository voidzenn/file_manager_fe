import { SIGNIN_API, SIGNUP_API } from '@/constants/apis';
import axiosConfig from '@/apis/axiosConfig';
import {
  ISigninRequest,
  ISigninResponse,
  ISignupRequest,
} from '@/apis/auth/authInterface';

export const signinRequest = async ({ data }: ISigninRequest) => {
  return await axiosConfig.post(SIGNIN_API, data).then(({ data }) => {
    return data.data as ISigninResponse;
  });
};

export const signupRequest = async (userData: ISignupRequest) => {
  return await axiosConfig.post(SIGNUP_API, userData);
};
