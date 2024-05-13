export interface IFileData {
  id: number | null;
  unique_token: string | null;
  name: string | null;
  filename: string | null;
  file_extension: string | null;
  folder_id: number | null;
}

export interface IFileListResponse {
  data: [IFileData];
}
