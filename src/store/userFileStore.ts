import { create } from 'zustand';
import { AxiosResponse } from 'axios';

import { useAuthStore } from './useAuthStore';

import { IFileData, IFileListResponse, IFileUrlResponse } from '@/apis/file/fileInterface';
import { FILES_BASE_API, FILES_GET_URL_API, FILE_RENAME_API } from '@/constants/apis';

export interface ICreatedFileSocketData {
  action: string;
  data: [
    {
      id: number | null;
      unique_token: string | null;
      name: string | null;
      filename: string | null;
      file_extension: string | null;
      folder_id: number | null;
      created_at: string;
    }
  ];
}

interface IFile {
  files: [IFileData] | [];
  getFileList: (uniqueToken?: string) => void;
  getFileUrl: (uniqueToken: string) => IFileUrlResponse;
  addFileToFileList: (data: unknown) => void;
  uploadFile: {
    folderUniqueToken: string | null;
    request: (files: FileList) => void;
  };
  renameFile: {
    newPathName: string | null;
    folderUniqueToken: string | null;
    setNewPathName: (newPath: string) => void;
    request: (file_token: string) => void;
  };
}

export const useFileStore = create<IFile>((set, getState) => {
  const initialState = {
    files: [],
    getFileList: () => null,
    getFileUrl: () => null,
    addFileToFileList: () => null,
    uploadFile: {
      folderUniqueToken: '',
      setFolderUniqueToken: () => null,
      request: () => null,
    },
    renameFile: {
      newPathName: "",
      folderUniqueToken: "",
      setNewPathName: () => null,
      request: () => null,
    }
  };

  return {
    ...initialState,

    getFileList: async (uniqueToken?: string) => {
      const url = !uniqueToken
        ? FILES_BASE_API
        : FILES_BASE_API + `?folder_unique_token=${uniqueToken}`;

      await useAuthStore.getState().api.getRequest(url);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFileListResponse;
      const files = responseData?.data ?? [];

      set((state) => ({
        ...state,
        files: files,
      }));
    },

    getFileUrl: async (uniqueToken: string) => {
      const url = !uniqueToken
        ? FILES_GET_URL_API
        : FILES_GET_URL_API + `?unique_token=${uniqueToken}`;

      await useAuthStore.getState().api.getRequest(url);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFileListResponse;

      return responseData;
    },

    addFileToFileList: (data: unknown) => {
      const responseData = data as ICreatedFileSocketData;

      set((state) => ({
        ...state,
        files: [responseData?.data[0], ...state.files],
      }));
    },

    uploadFile: {
      setFolderUniqueToken: (token: string | null) =>
        set((state) => ({
          ...state,
          uploadFile: {
            ...state.uploadFile,
            folderUniqueToken: token,
          },
        })),

      request: async (files: FileList) => {
        const formData = new FormData();
        const headerOptions = {
          'Content-Type': 'multipart/form-data',
        };
        const folderToken = getState().uploadFile.folderUniqueToken;

        if (folderToken) {
          formData.append('file_upload[folder_unique_token]', folderToken);
        }

        formData.append('file_upload[file_upload]', files[0]);

        useAuthStore
          .getState()
          .api.postRequest(FILES_BASE_API, formData, headerOptions);
      },
    },

    renameFile: {
      setNewPathName: (newPathName: string) => {
        set((state) => ({
          ...state,
          renameFile: {
            ...state.renameFile,
            newPathName: newPathName,
          },
        }))
      },

      setFolderUniqueToken: (token: string | null) => {
        set((state) => ({
          ...state,
          renameFile: {
            ...state.renameFile,
            folderUniqueToken: token,
          },
        }));
      },

      request: async (file_token: string) => {
        const folderToken = getState().renameFile.folderUniqueToken;
        const bodyData = {
          file_upload: {
            unique_token: file_token,
            new_name: getState().renameFile.newPathName
          },
        };

        if (folderToken !== null) {
          const folderUniqueToken = {
            folder_unique_token: folderToken
          }

          Object.assign(bodyData, folderUniqueToken)
        }

        useAuthStore.getState().api.putRequest(FILE_RENAME_API, bodyData);
      },
    },
  };
});
