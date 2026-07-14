export interface IFolderData {
  id: number | null;
  unique_token: string | null;
  path: string | null;
  parentFolderId: number | null;
}

export interface IFolderListResponse {
  data: [IFolderData]
}

export interface ICreateFolderParams {
  parentFolderId: null | number;
  pathName: null | string;
}
