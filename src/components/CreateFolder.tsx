import { FolderPlus } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFoldersStore } from "@/store/useFolderStore";

const CreateFolder = () => {
  const { createFolder, createFolderRequest } = useFoldersStore();

  const handlePathInput = (e) => {
    createFolder.setPathName(e?.target?.value)
  }

  const handleCreateFolder = () => {
    createFolderRequest();
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full flex justify-end">
        <FolderPlus size={'25px'} />
      </DialogTrigger>
      <DialogContent className="absolute py-8">
        <Label>Folder Name</Label>
        <Input onChange={handlePathInput} />
        <div className="w-full flex justify-end mt-2">
          <DialogClose className="mr-4">Close</DialogClose>
          <Button className="w-20" onClick={handleCreateFolder}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolder;
