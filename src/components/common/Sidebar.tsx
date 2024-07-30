import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';

import { APP } from '@/constants/app';

interface ISidebar {
  handleLogout: () => void;
}

const Sidebar = ({ handleLogout }: ISidebar) => {
  return (
    <>
      <div className="w-[280px] min-h-screen border-r p-10">
        <div className="flex justify-between items-center mb-5">
          <Label className="font-bold text-lg">{APP.appName}</Label>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-medium">Home</Label>
        </div>

        <div className="absolute bottom-5 left-8">
          <Button className="text-sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
