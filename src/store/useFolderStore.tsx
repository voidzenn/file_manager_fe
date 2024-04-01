import { create } from 'zustand';

import { IFolderData, IFolderListResponse } from '@/apis/folder/folderInterface';
import { getFolderList } from '@/apis/folder/folderRequest';
import { AxiosResponse } from 'axios';

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
      await getFolderList().then((data: AxiosResponse) => {
        const response = data?.data as IFolderListResponse;
        const responseData = response.data;

        set({ folders: responseData });
      });
    },
  };
});
