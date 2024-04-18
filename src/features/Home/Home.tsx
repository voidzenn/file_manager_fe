import { useEffect } from 'react';

import { useFoldersStore } from '@/store/useFolderStore';
import { IFolderData } from '@/apis/folder/folderInterface';
import { Folder } from 'lucide-react';
import { Label } from '@/components/ui/label';

const FolderList = () => {
  const { folders, getFoldersList } = useFoldersStore();

  useEffect(() => {
    return () => {
      getFoldersList();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 m-10">
        {folders.map(({ id, path, parentFolderId }: IFolderData) => {
          return (
            <div className="flex gap-5" key={id}>
              <Folder size={'20px'} />
              <Label className="text-md"> {path} </Label>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <FolderList />
    </>
  );
};

export default Home;
