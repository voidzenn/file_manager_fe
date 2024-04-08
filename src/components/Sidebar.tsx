import { useNavigate } from 'react-router-dom';

import { Label } from '@radix-ui/react-label';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

import { removeAllCookie } from '@/lib/cookie';
import { APP } from '@/constants/app';
import { ROUTES } from '@/constants/routes';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAllCookie();
    navigate(ROUTES.signin);
  };

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

        <div className="absolute bottom-5 left-12">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
