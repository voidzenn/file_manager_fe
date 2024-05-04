import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FolderPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

import { ICreatedFolderSocketData, useFoldersStore } from '@/store/useFolderStore';
import { useActionCable } from '@/hooks/useActionCable';
import { FOLDER_CREATED } from '@/constants/socketActions';

const CreateFolder = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { id } = useParams();
  const { createFolder, createFolderRequest, addSingleFolderToList } = useFoldersStore();
  const { subscription, receivedData } = useActionCable('FolderChannel');

  useEffect(() => {
    subscription;
  }, []);

  useEffect(() => {
    // Set token same as in URL params token
    id && useFoldersStore.getState().createFolder.setParentFolderToken(id);
  }, [id]);

  useEffect(() => {
    const responseData = receivedData as ICreatedFolderSocketData;
    const isFolderCreateAction =
      responseData && responseData.action === FOLDER_CREATED;

    if (isFolderCreateAction && createFolder.parentFolderToken === id) {
      addSingleFolderToList(responseData);
    }
  }, [receivedData, addSingleFolderToList, id, createFolder.parentFolderToken]);

  const handlePathInput = (e) => {
    createFolder.setPathName(e?.target?.value);
  };

  const handleCreateFolder = () => {
    createFolderRequest();

    // Note: Use success message to handle closing of dialog
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="w-full flex justify-end">
        <DialogTrigger className="p-2 bg-white hover:bg-black hover:bg-opacity-10">
          <FolderPlus color={'black'} size={'25px'} />
        </DialogTrigger>
      </div>
      <DialogContent className="absolute py-8">
        <Label>Folder Name</Label>
        <Input onChange={handlePathInput} />
        <div className="w-full flex justify-end mt-2">
          <Button
            className="mr-4"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Close
          </Button>
          <Button
            className="w-20"
            disabled={!createFolder.pathName}
            onClick={handleCreateFolder}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolder;
