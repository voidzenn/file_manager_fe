import { FOLDER_LIST_API } from "@/constants/apis"
import axiosConfig from "../axiosConfig"

export const getFolderList = async () => {
  const authorization = {
    'Authorization':
      'Bearer ',
  };

  return await axiosConfig.get(FOLDER_LIST_API, { headers: authorization });
}
