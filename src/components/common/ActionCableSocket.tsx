import { useEffect } from 'react';

import { useSocketStore } from '@/store/useSocketStore';

import { useActionCable } from '@/hooks/useActionCable';
import { getAuthTokenCookie } from '@/lib/cookie';

const ActionCableSocket = () => {
  const { subscription: folderSubscribe, receivedData: folderReceivedData } =
    useActionCable('FolderChannel', String(getAuthTokenCookie()));
  const { subscription: fileSubscribe, receivedData: fileReceivedData } =
    useActionCable('FileChannel', String(getAuthTokenCookie()));
  const { setReceivedData } = useSocketStore();

  useEffect(() => {
    return () => {
      folderSubscribe;
      fileSubscribe;
    }
  }, []);

  useEffect(() => {
    folderReceivedData && setReceivedData(folderReceivedData);

    fileReceivedData && setReceivedData(fileReceivedData);
  }, [folderReceivedData, fileReceivedData, setReceivedData]);

  return <></>;
};

export default ActionCableSocket;
