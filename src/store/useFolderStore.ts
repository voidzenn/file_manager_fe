import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { useAuthStore } from './useAuthStore';
import {
  IFolderData,
  IFolderListResponse
} from '@/apis/folder/folderInterface';
import { FOLDER_CREATE_API, FOLDER_LIST_API } from '@/constants/apis';

interface IFolder {
  folders: [IFolderData] | [];
  getFoldersList: (uniqueToken?: string) => void;
  createFolder: {
    pathName: string | null;
    parentFolderToken: string | null;
    setPathName: (pathName: string) => void;
    setParentFolderToken: (parentFolderToken: string) => void;
  };
  createFolderRequest: () => void;
  addSingleFolderToList: (data: unknown) => void;
}

export interface ICreatedFolderSocketData {
  action: string,
  data: [
    {
      id: number;
      unique_token: string;
      path: string;
      parent_folder_id: number;
      created_at: string;
    }
  ];
}

export const useFoldersStore = create<IFolder>((set, getState) => {
  const initialState = {
    folders: [],
    getFolderList: () => null,
    createFolder: {
      pathName: '',
      parentFolderToken: null,
      setPathName: (pathName: string) =>
        set((state) => ({
          ...state,
          createFolder: {
            ...state.createFolder,
            pathName: pathName,
          },
        })),
      setParentFolderToken: (parentFolderToken: string) =>
        set((state) => ({
          ...state,
          createFolder: {
            ...state.createFolder,
            parentFolderToken: parentFolderToken
          },
        })),
      request: () => null,
    },
    createFolderRequest: () => null,
    addSingleFolderToList: () => null,
  };

  return {
    ...initialState,

    getFoldersList: async (uniqueToken?: string) => {
      const url = !uniqueToken
        ? FOLDER_LIST_API
        : FOLDER_LIST_API + `?unique_token=${uniqueToken}`;

      await useAuthStore.getState().api.getRequest(url);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFolderListResponse;
      const folders = responseData?.data ?? [];

      set((state) => ({
        ...state,
        folders: folders,
      }));
    },

    createFolderRequest: async () => {
      const newData = {
        folder: {
          path: getState().createFolder.pathName + '/',
          parent_unique_token: getState().createFolder.parentFolderToken
        },
      };

      await useAuthStore.getState().api.postRequest(FOLDER_CREATE_API, newData);
    },

    addSingleFolderToList(data: unknown) {
      const responseData = data as ICreatedFolderSocketData;

      set((state) => ({
        ...state,
        folders: [responseData?.data[0], ...state.folders]
      }));
    }
  };
});
