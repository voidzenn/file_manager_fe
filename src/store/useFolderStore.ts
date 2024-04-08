import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { getFolderList } from '@/apis/folder/folderRequest';
import { useAuthStore } from './useAuthStore';
import {
  IFolderData,
  IFolderListResponse,
} from '@/apis/folder/folderInterface';

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
      await getFolderList({
        headers: useAuthStore.getState().auth.getHeaderToken(),
      }).then((data: AxiosResponse) => {
        const response = data?.data as IFolderListResponse;
        const responseData = response.data;

        set({ folders: responseData });
      });
    },
  };
});
