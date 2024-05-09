import { create } from 'zustand';

import { useAuthStore } from './useAuthStore';

import { IFileData, IFileListResponse } from '@/apis/file/fileInterface';
import { FILE_LIST_API, UPLOAD_FILE_API } from '@/constants/apis';
import { AxiosResponse } from 'axios';

interface IFile {
  files: [IFileData] | [];
  getFileList: (uniqueToken?: string) => void;
  uploadFile: {
    request: (files: FileList) => void;
  };
}

export const useFileStore = create<IFile>((set, getState) => {
  const initialState = {
    files: [],
    getFileList: () => null,
    uploadFile: {
      request: () => null
    }
  }

  return {
    ...initialState,

    getFileList: async (uniqueToken?: string) => {
      const url = !uniqueToken
        ? FILE_LIST_API
        : FILE_LIST_API + `?unique_token=${uniqueToken}`;

      await useAuthStore.getState().api.getRequest(url);

      const response = useAuthStore.getState().api.data as AxiosResponse;
      const responseData = response.data as IFileListResponse;
      const files = responseData?.data ?? [];

      set((state) => ({
        ...state,
        files: files,
      }));
    },

    uploadFile: {
      request: async (files: FileList) => {
        const formData = new FormData();
        const headerOptions = {
          'Content-Type': 'multipart/form-data',
        };

        formData.append('data[file_upload]', files[0]);

        useAuthStore
          .getState()
          .api.postRequest(UPLOAD_FILE_API, formData, headerOptions);
      },
    },
  };
});
