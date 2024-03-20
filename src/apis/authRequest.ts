import { SIGNIN_API } from "@/constants/apis";
import axiosConfig from './axiosConfig';

export interface ISigninRequest {
  data: {
    email: string;
    password: string;
  };
}

export const signinRequest = async ({ data }: ISigninRequest) => {
  return await axiosConfig.post(SIGNIN_API, data).then((data) => {
    return data;
  });
};
