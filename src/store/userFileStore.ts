import { create } from 'zustand';

import { useAuthStore } from './useAuthStore';

import { IFileData, IFileListResponse } from '@/apis/file/fileInterface';
import { FILE_LIST_API } from '@/constants/apis';
import { AxiosResponse } from 'axios';

interface IFile {
  files: [IFileData] | [];
  getFileList: (uniqueToken?: string) => void;
}

export const useFileStore = create<IFile>((set) => {
  const initialState = {
    files: [],
    getFileList: () => null,
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
  };
});
