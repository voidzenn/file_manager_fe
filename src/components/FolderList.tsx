import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Label } from './ui/label';
import { Folder, LucideMoreVertical } from 'lucide-react';

import { IFolderData } from '@/apis/folder/folderInterface';
import { ROUTES } from '@/constants/routes';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import DropdownOption from './DropdownOption';

import { IRenamedFolderSocketData, useFoldersStore } from '@/store/useFolderStore';
import { useActionCable } from '@/hooks/useActionCable';
import { getAuthTokenCookie } from '@/lib/cookie';
import { FOLDER_RENAMED } from '@/constants/socketActions';

interface IProps {
  folders: [IFolderData] | [];
}

const FolderList = ({ folders }: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { renameFolder, updateFolderPath } = useFoldersStore();
  const { subscription, receivedData } = useActionCable(
    'FolderChannel',
    String(getAuthTokenCookie())
  );

  const handleFolderClick = (uniqueToken: string) => {
    navigate(ROUTES.folders + `/${uniqueToken}`, {
      state: { uniqueToken: uniqueToken },
    });
  };

  useEffect(() => {
    subscription;
  }, []);

  useEffect(() => {
    const responseData = receivedData as IRenamedFolderSocketData;
    const isFolderRenamedAction =
      responseData && responseData.action === FOLDER_RENAMED;

    if (isFolderRenamedAction) {
      const parentFolderId = responseData.data[0]?.parent_folder_id || null;

      if (renameFolder.parentFolderToken === id && parentFolderId !== null) {
        updateFolderPath(responseData);
      } else if (
        renameFolder.parentFolderToken === null &&
        parentFolderId === null
      ) {
        console.log("test");
        updateFolderPath(responseData);
      }
    }
  }, [receivedData, updateFolderPath, id, renameFolder.parentFolderToken]);

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
            className="flex gap-5 px-2 py-3 hover:bg-black hover:bg-opacity-5"
            key={unique_token}
            onClick={() => handleFolderClick(String(unique_token))}
          >
            <Folder size={'20px'} />
            <Label className="text-md">{path}</Label>
            <Popover>
              <PopoverTrigger
                asChild
                onClick={(e) => {
                  e.stopPropagation();
                  renameFolder.setUniqueToken(String(unique_token));
                }}
              >
                <LucideMoreVertical
                  className="absolute right-16 mt-[-2px] hover:bg-black hover:bg-opacity-10"
                  size={'20px'}
                  width={'25px'}
                  height={'30px'}
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="left"
                className="w-full m-0 p-0 bg-white border-2 border-black border-opacity-15 border-rounded z-10"
              >
                <DropdownOption
                  object_id={String(unique_token)}
                  object_name={String(path)}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

export default FolderList;
