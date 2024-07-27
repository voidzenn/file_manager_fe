import { useLocation, useNavigate } from 'react-router-dom';

import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';

import { removeAllCookie } from '@/lib/cookie';
import { APP } from '@/constants/app';
import { ROUTES } from '@/constants/routes';

import { useAuthStore } from '@/store/useAuthStore';

const Sidebar = () => {
  const { setEnableLoader } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setEnableLoader(true);

    setTimeout(() => {
      setEnableLoader(false);
      removeAllCookie();
      location.pathname = ROUTES.signin;
      navigate(ROUTES.signin);
    }, 1500);
  };

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
