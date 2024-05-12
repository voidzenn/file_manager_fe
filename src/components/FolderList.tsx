import { useNavigate, useParams } from 'react-router-dom';

import { Label } from './ui/label';
import { Folder } from 'lucide-react';

import { IFolderData } from '@/apis/folder/folderInterface';
import { ROUTES } from '@/constants/routes';
import { Button } from './ui/button';

interface IProps {
  folders: [IFolderData] | [];
}

const FolderList = ({ folders }: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFolderClick = (uniqueToken: string) => {
    navigate(ROUTES.folders + `/${uniqueToken}`, { state: { uniqueToken: uniqueToken } });
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-10 w-full mt-5">
        {id && (
          <Button
            className="w-full justify-start bg-white hover:bg-black hover:bg-opacity-10"
            onClick={() => navigate(-1)}
          >
            <Label className="text-black">...</Label>
          </Button>
        )}
      </div>

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
