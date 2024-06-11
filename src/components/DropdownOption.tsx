import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useFoldersStore } from "@/store/useFolderStore";

interface IProps {
  object_id: string;
  object_name: string;
}

const DropdownOption = ({ object_id, object_name }: IProps) => {
  const [openRenameDialog, setOpenRenameDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [disableRenameBtn, setDisableRenameBtn] = useState<boolean>(true);
  const { renameFolder, renameFolderRequest } = useFoldersStore();

  const handleInput = (e) => {
    const value = e.target.value;

    renameFolder.setNewPathName(value);
  }

  const handleRename = async () => {
    renameFolder.setUniqueToken(object_id);

    await renameFolderRequest();

    setOpenRenameDialog(false);
  }

  useEffect(() => {
    if (
      renameFolder.newPathName?.length === 0 ||
      renameFolder.newPathName === null ||
      renameFolder.newPathName === object_name
    ) {
      setDisableRenameBtn(true);
    } else {
      setDisableRenameBtn(false);
    }
  }, [
    renameFolder.newPathName,
    setDisableRenameBtn,
    disableRenameBtn,
    object_name,
  ]);

  return (
    <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
      <Dialog open={openRenameDialog} onOpenChange={setOpenRenameDialog}>
        <DialogTrigger className="p-2 hover:bg-black hover:bg-opacity-20">
          <Label>Rename</Label>
        </DialogTrigger>
        <DialogContent>
          <Input
            className="mt-5"
            onChange={handleInput}
            defaultValue={object_name}
          />
          <div className="w-full flex justify-end mt-2">
            <Button
              type="button"
              variant={'ghost'}
              className="mr-4"
              onClick={() => {
                setOpenRenameDialog(false);
              }}
            >
              Close
            </Button>
            <Button
              className="w-20"
              onClick={handleRename}
              disabled={disableRenameBtn}
            >
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="p-2 hover:bg-red-500">
          <Label>Delete</Label>
        </DialogTrigger>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}

export default DropdownOption;
