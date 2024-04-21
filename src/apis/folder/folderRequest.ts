import { AxiosRequestConfig } from 'axios';

import { FOLDER_LIST_API, FOLDER_CREATE_API } from '@/constants/apis';
import { ICreateFolderParams } from './folderInterface';
import axiosConfig from '../axiosConfig';

export const getFolderListRequest = async (options?: AxiosRequestConfig) => {
  return await axiosConfig.get(FOLDER_LIST_API, options);
};

export const createFolderRequest = async (options?: AxiosRequestConfig, data?: ICreateFolderParams) => {
  return await axiosConfig.post(FOLDER_CREATE_API, data, options);
};
