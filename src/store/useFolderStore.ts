import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { useAuthStore } from './useAuthStore';
import {
  IFolderData,
  IFolderListResponse
} from '@/apis/folder/folderInterface';
import { FOLDERS_BASE_API, FOLDERS_REMOVE_FOLDER_API, FOLDERS_RENAME_API } from '@/constants/apis';

interface IFolder {
  folders: [IFolderData] | [];
  getFoldersList: (uniqueToken?: string) => void;
  createFolder: {
    pathName: string | null;
    parentFolderToken: string | null;
    setPathName: (pathName: string) => void;
    setParentFolderToken: (parentFolderToken: string | null) => void;
  };
  createFolderRequest: () => void;
  addSingleFolderToList: (data: unknown) => void;
  renameFolder: {
    uniqueToken: string | null;
    parentFolderToken: string | null;
    newPathName: string | null;
    setNewPathName: (newPath: string) => void;
    setUniqueToken: (uniqueToken: string) => void;
    setParentFolderToken: (parentFolderToken: string | null) => void;
  };
  renameFolderRequest: () => void;
  updateFolderPath: (data: unknown) => void;
  removeFolderRequest: (uniqueToken: string) => void;
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

export interface IRenamedFolderSocketData {
  action: string;
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
      uniqueToken: '',
      parentFolderToken: null,
      setPathName: (pathName: string) =>
        set((state) => ({
          ...state,
          createFolder: {
            ...state.createFolder,
            pathName: pathName,
          },
        })),
      setParentFolderToken: (parentFolderToken: string | null) =>
        set((state) => ({
          ...state,
          createFolder: {
            ...state.createFolder,
            parentFolderToken: parentFolderToken,
          },
        })),
      request: () => null,
    },
    createFolderRequest: () => null,
    addSingleFolderToList: () => null,
    renameFolder: {
      newPathName: null,
      parentFolderToken: null,
      setParentFolderToken: (parentFolderToken: string) =>
        set((state) => ({
          ...state,
          renameFolder: {
            ...state.renameFolder,
            parentFolderToken: parentFolderToken,
          },
        })),
      setUniqueToken: (uniqueToken: string) =>
        set((state) => ({
          ...state,
          renameFolder: {
            ...state.renameFolder,
            uniqueToken: uniqueToken,
          },
        })),
      setNewPathName: (newPathName: string) =>
        set((state) => ({
          ...state,
          renameFolder: {
            ...state.renameFolder,
            newPathName: newPathName,
          },
        })),
    },
    renameFolderRequest: () => null,
    updateFolderPath: () => null,
    removeFolderRequesT: () => null
  };

  return {
    ...initialState,

    getFoldersList: async (uniqueToken?: string) => {
      const url = !uniqueToken
        ? FOLDERS_BASE_API
        : FOLDERS_BASE_API + `?unique_token=${uniqueToken}`;

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
          path: getState().createFolder.pathName + "/",
          parent_unique_token: getState().createFolder.parentFolderToken,
        },
      };

      await useAuthStore.getState().api.postRequest(FOLDERS_BASE_API, newData);
    },

    addSingleFolderToList(data: unknown) {
      const responseData = data as ICreatedFolderSocketData;

      set((state) => ({
        ...state,
        folders: [responseData?.data[0], ...state.folders],
      }));
    },

    renameFolderRequest: async () => {
      const bodyData = {
        folder: {
          unique_token: getState().renameFolder.uniqueToken,
          new_path: getState().renameFolder.newPathName + "/",
        },
      };
      const parentFolderToken = getState().renameFolder.parentFolderToken;

      if (parentFolderToken !== '' && parentFolderToken !== null) {
        Object.assign(bodyData, { parent_unique_token: parentFolderToken });
      }

      await useAuthStore
        .getState()
        .api.putRequest(FOLDERS_RENAME_API, bodyData);
    },

    updateFolderPath: async (data: unknown) => {
      const responseData = data as IRenamedFolderSocketData;

      set((state) => ({
        ...state,
        folders: state.folders.map((obj) => {
          if (obj.unique_token === responseData?.data[0].unique_token) {
            obj.path = responseData?.data[0].path;
            return obj;
          }

          return obj;
        }),
      }));
    },

    removeFolder: {
      setUniqueToken: (uniqueToken: string) => set((state) => ({
        ...state,
        removeFolder: {
          ...state.removeFolder,
          uniqueToken: uniqueToken
        }
      }))
    },

    removeFolderRequest: async (unique_token: string) => {
      const url = FOLDERS_REMOVE_FOLDER_API + '?unique_token=' + unique_token;

      await useAuthStore.getState().api.deleteRequest(url);
    }
  };
});
