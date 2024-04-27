import { useEffect, useState } from 'react';

import { FolderPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';

import { useFoldersStore } from '@/store/useFolderStore';
import { useActionCable } from '@/hooks/useActionCable';
import { FOLDER_CREATED } from '@/constants/socketActions';

const CreateFolder = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { createFolder, createFolderRequest, addSingleFolderToList } = useFoldersStore();
  const { subscription, receivedData } = useActionCable('FolderChannel');

  useEffect(() => {
    subscription;
  }, []);

  useEffect(() => {
    receivedData &&
      receivedData?.action === FOLDER_CREATED &&
      addSingleFolderToList(receivedData);
  }, [receivedData, addSingleFolderToList]);

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
        <DialogTrigger>
          <Button className="white bg-white hover:bg-black hover:bg-opacity-10">
            <FolderPlus color={"black"} size={'25px'} />
          </Button>
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
