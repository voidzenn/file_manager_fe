import { FOLDER_LIST_API } from "@/constants/apis"
import axiosConfig from '../axiosConfig';
import { AxiosRequestConfig } from "axios";

export const getFolderList = async (options?: AxiosRequestConfig) => {
  return await axiosConfig.get(FOLDER_LIST_API, options);
}
