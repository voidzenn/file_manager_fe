import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Label } from '../ui/label';
import { Folder, LucideMoreVertical } from 'lucide-react';

import { IFolderData } from '@/apis/folder/folderInterface';
import { ROUTES } from '@/constants/routes';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import DropdownOption from '../common/DropdownOption';

import { useAuthStore } from '@/store/useAuthStore';
import { IRenamedFolderSocketData, useFoldersStore } from '@/store/useFolderStore';
import { useSocketStore } from '@/store/useSocketStore';
import { FOLDER_REMOVED, FOLDER_RENAMED } from '@/constants/socketActions';
import { API_RESPONSE_CODE } from '@/constants/apiResponseCode';

interface IProps {
  folders: [IFolderData] | [];
}

const FolderList = ({ folders }: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useAuthStore();
  const { renameFolder, updateFolderPath, removeFolderPath } = useFoldersStore();
  const { receivedData } = useSocketStore();

  const handleFolderClick = (uniqueToken: string) => {
    navigate(ROUTES.folders + `/${uniqueToken}`, {
      state: { uniqueToken: uniqueToken },
    });
  };

  useEffect(() => {
    const responseData = receivedData as IRenamedFolderSocketData;
    const isFolderRenamedAction =
      responseData && responseData.action === FOLDER_RENAMED;
    const isFolderRemovedAction =
      responseData && responseData.action === FOLDER_REMOVED;

    if (isFolderRenamedAction) {
      updateFolderPath(responseData);
    }

    if (isFolderRemovedAction) {
      removeFolderPath(responseData);
    }
  }, [
    receivedData,
    updateFolderPath,
    id,
    renameFolder.parentFolderToken,
    removeFolderPath,
  ]);

  useEffect(() => {
    if (
      folders.length === 0 &&
      api.status == String(API_RESPONSE_CODE.notFound)
    ) {
      navigate(-1);
    }
  }, [api.status, folders, navigate]);

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
            className="flex gap-5 px-2 py-3 hover:bg-black hover:bg-opacity-5 hover:cursor-pointer"
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
                  object_parent_id={id}
                  object_id={String(unique_token)}
                  object_name={String(path)}
                  object_type="folder"
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
