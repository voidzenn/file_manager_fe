import { useEffect } from 'react';

import { useFoldersStore } from '@/store/useFolderStore';
import { Label } from './ui/label';
import { Folder } from 'lucide-react';
import { IFolderData } from '@/apis/folder/folderInterface';

const FolderList = () => {
  const { folders, getFoldersList } = useFoldersStore();

  useEffect(() => {
    getFoldersList();
  }, []);

  useEffect(() => {
    console.log(folders);
  }, [folders]);

  const handleFolderClick = (uniqueToken: string) => {
    alert(uniqueToken);
  }

  return (
    <div className="flex flex-col gap-2 m-10">
      {folders.map(({ unique_token, path, parentFolderId }: IFolderData) => {
        return (
          <div
            className="flex gap-5 px-2 py-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-5"
            key={unique_token}
            onClick={() => handleFolderClick(String(unique_token))}
          >
            <Folder size={'20px'} />
            <Label className="text-md"> {path} </Label>
          </div>
        );
      })}
    </div>
  );
};

export default FolderList;
