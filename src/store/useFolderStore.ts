import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { useAuthStore } from './useAuthStore';
import {
  IFolderData,
  IFolderListResponse,
} from '@/apis/folder/folderInterface';
import { FOLDER_LIST_API } from '@/constants/apis';

interface IFolder {
  folders: [IFolderData] | [];
  getFoldersList: () => void;
}

export const useFoldersStore = create<IFolder>((set) => {
  const initialState = {
    folders: [],
    getFolderList: () => null
  };

  return {
    ...initialState,

    getFoldersList: async () => {
      await useAuthStore.getState().api.getRequest(FOLDER_LIST_API);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFolderListResponse
      const folders = responseData.data;

      set((state) => ({
        ...state,
        folders: folders,
      }));
    },
  };
});
