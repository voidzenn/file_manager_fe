import { ReactNode, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

import { ROUTES } from '@/constants/routes';
import Sidebar from "@/components/Sidebar";

interface IProp {
  children: ReactNode;
}

const DefaultLayout = ({ children }: IProp) => {
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate(ROUTES.home);
    }
  }, [auth, navigate]);

  return (
    <div className="flex justify-between">
      {auth.isAuthenticated() && <Sidebar />}

      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default DefaultLayout;
