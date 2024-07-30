import { ReactNode } from 'react';

import ActionCableSocket from '@/components/common/ActionCableSocket';

interface IProp {
  children: ReactNode;
}

const PrivateLayout = ({ children }: IProp) => {
  return (
    <>
      {children}
      <ActionCableSocket />
    </>
  );
};

export default PrivateLayout;
