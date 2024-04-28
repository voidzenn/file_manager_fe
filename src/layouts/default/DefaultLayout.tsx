import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ROUTES } from '@/constants/routes';

interface IProp {
  children: ReactNode;
}

const DefaultLayout = ({ children }: IProp) => {
  const { auth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname

    if (
      (currentPath === ROUTES.signin || currentPath === ROUTES.signup) &&
      auth.isAuthenticated()
    ) {
      navigate(ROUTES.folders);
    }
  }, [auth, location, navigate]);

  return (
    <div className="flex justify-between">
      {auth.isAuthenticated() && <Sidebar />}

      <main className="w-full h-full">
        {auth.isAuthenticated() && <Header />}
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
