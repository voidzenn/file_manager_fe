import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';

import { ROUTES } from '@/constants/routes';

interface IProp {
  children: ReactNode;
}

const PrivateLayout = ({ children }: IProp) => {
  const { auth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate(ROUTES.signin);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default PrivateLayout;
