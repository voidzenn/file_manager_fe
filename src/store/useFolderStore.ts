import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { useAuthStore } from './useAuthStore';
import {
  IFolderData,
  IFolderListResponse,
  ICreateFolderParams
} from '@/apis/folder/folderInterface';
import { FOLDER_CREATE_API, FOLDER_LIST_API } from '@/constants/apis';

interface IFolder {
  folders: [IFolderData] | [];
  getFoldersList: () => void;
  createFolder: {
    pathName: string | null;
    setPathName: (pathName: string) => void;
  };
  createFolderRequest: (data?: ICreateFolderParams) => void;
}

export const useFoldersStore = create<IFolder>((set, getState) => {
  const initialState = {
    folders: [],
    getFolderList: () => null,
    createFolder: {
      pathName: '',
      setPathName: (pathName: string) => set((state) => ({
        ...state,
        createFolder: {
          ...state.createFolder,
          pathName: pathName
        }
      })),
      request: () => null,
    },
    createFolderRequest: () => null
   };

  return {
    ...initialState,

    getFoldersList: async () => {
      await useAuthStore.getState().api.getRequest(FOLDER_LIST_API);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFolderListResponse;
      const folders = responseData.data;

      set((state) => ({
        ...state,
        folders: folders,
      }));
    },

    createFolderRequest: async () => {
      const newData = {
        folder: {
          path: getState().createFolder.pathName + '/'
        }
      }

      await useAuthStore.getState().api.postRequest(FOLDER_CREATE_API, newData);
    },
  };
});
