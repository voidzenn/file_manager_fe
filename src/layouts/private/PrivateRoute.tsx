import { ReactNode } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

import ActionCableSocket from '@/components/common/ActionCableSocket';

interface IProp {
  children: ReactNode;
}

const PrivateLayout = ({ children }: IProp) => {
  const { enableLoader } = useAuthStore();

  return (
    <>
      {!enableLoader && children}
      <ActionCableSocket />
    </>
  );
};

export default PrivateLayout;
