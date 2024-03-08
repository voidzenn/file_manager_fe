import { SIGNIN } from "@/constants/apis";

const baseUrl = '/api/v1';

const apiUrl = (url: string) => {
  return baseUrl + url;
}

const signin: = apiUrl(SIGNIN);

export default {
  signin
};
