import { useState } from "react";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface IProps {
  object_id: string;
  object_name: string;
}

const DropdownOption = ({ object_id, object_name }: IProps) => {
  const [openRenameDialog, setOpenRenameDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleInput = () => {
  }

  return (
    <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger className="p-2 hover:bg-black hover:bg-opacity-20">
          <Label>Rename</Label>
        </DialogTrigger>
        <DialogContent>
          <Input className="mt-5" onChange={handleInput} defaultValue={object_name} />
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
