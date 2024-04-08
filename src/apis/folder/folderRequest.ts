import { AxiosRequestConfig } from 'axios';

import { FOLDER_LIST_API } from '@/constants/apis';
import axiosConfig from '../axiosConfig';

export const getFolderListRequest = async (options?: AxiosRequestConfig) => {
  return await axiosConfig.get(FOLDER_LIST_API, options);
};
