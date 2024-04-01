import { APP } from "@/constants/app";
import { Label } from "@radix-ui/react-label";
import { Menu } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <div className="w-[400px] min-h-screen border-r p-12">
        <div className="flex justify-between items-center mb-5">
          <Label className="font-bold text-lg">{APP.appName}</Label>
          <Menu className="cursor-pointer" size={'30px'} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Home</Label>
          <Label>Folders</Label>
          <Label>Files</Label>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
