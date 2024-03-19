import { SIGNIN_API } from "@/constants/apis";
import axiosConfig from './axiosConfig';

interface Data {
  email: string,
  password: string
}

interface Request {
  data: Data
}

const signinRequest = async ({ data }: Request) => {
  return await axiosConfig.post(SIGNIN_API, data).then((data) => {
    return data;
  });
};

export { signinRequest };
