import Cookies from 'universal-cookie';
import _isString from 'lodash/isString';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { AUTH_TOKEN, AUTH_USER } from '@/constants/cookies';

const CRYPTO_KEY = 'THIS SHOULD BE IN AN ENV FILE';
const encrypData = (str: string) => AES.encrypt(str, CRYPTO_KEY).toString();
const decryptData = (str: string) =>
  str && AES.decrypt(str, CRYPTO_KEY).toString(encUtf8);

const cookies = new Cookies();

const setCookie = (key: string, value: string | object) => {
  const newValue = _isString(value) ? value : JSON.stringify(value);
  cookies.set(key, encrypData(newValue), { path: '/' });
};
const getCookie = (key: string) => {
  let value;
  try {
    value = decryptData(cookies.get(key));
    return JSON.parse(value);
  } catch {
    return value;
  }
};
const removeCookie = (key: string) => {
  cookies.remove(key, { path: '/' });
};

const customCookie = {
  set: setCookie,
  get: getCookie,
  remove: removeCookie,
};
// Token
const setAuthTokenCookie = (value: string) => {
  customCookie.set(AUTH_TOKEN, value);
};
const getAuthTokenCookie = () => {
  return customCookie.get(AUTH_TOKEN);
};
const removeAuthTokenCookie = () => {
  customCookie.remove(AUTH_TOKEN);
};
// User Auth
const setAuthUserCookie = (value: string | object) => {
  customCookie.set(AUTH_USER, value);
};
const getAuthUserCookie = () => {
  return customCookie.get(AUTH_USER);
};
const removeAuthUserCookie = () => {
  customCookie.remove(AUTH_USER);
};

export {
  setAuthTokenCookie,
  getAuthTokenCookie,
  removeAuthTokenCookie,
  setAuthUserCookie,
  getAuthUserCookie,
  removeAuthUserCookie,
};
