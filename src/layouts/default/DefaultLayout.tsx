import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import { ROUTES } from '@/constants/routes';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface IProp {
  children: ReactNode;
}

const DefaultLayout = ({ children }: IProp) => {
  const { auth, enableLoader, setEnableLoader, signingIn, setSigningIn } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;

    if (
      !enableLoader && !signingIn &&
      (currentPath === ROUTES.signin || currentPath === ROUTES.signup) &&
      auth.isAuthenticated()
    ) {
      setEnableLoader(true);
      setSigningIn(true);

      setTimeout(() => {
        location.pathname = ROUTES.folders;
        navigate(ROUTES.folders);
        setEnableLoader(false);
        setSigningIn(false);
      }, 2000);
    }
  }, [
    auth,
    location,
    enableLoader,
    setEnableLoader,
    signingIn,
    setSigningIn,
    navigate
  ]);

  return (
    <div className="flex justify-between">
      <Dialog open={enableLoader} onOpenChange={setEnableLoader}>
        <DialogContent className="flex justify-center items-center h-screen max-w-screen">
          <Loader2
            className="animate-spin"
            size={'200px'}
            strokeWidth={'1px'}
          />
        </DialogContent>
      </Dialog>

      {!enableLoader && auth.isAuthenticated() && <Sidebar />}

      <main className="w-full h-full">
        {!enableLoader && auth.isAuthenticated() && <Header />}

        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
