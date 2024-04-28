import { useEffect } from 'react';
import { useLocation, } from 'react-router-dom';

import FolderList from '@/components/FolderList';
import { useFoldersStore } from '@/store/useFolderStore';

const Folders = () => {
  const { folders, getFoldersList } = useFoldersStore();
  const location = useLocation();

  useEffect(() => {
    return () => {
      getFoldersList();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (location?.state?.uniqueToken) {
        getFoldersList(location?.state?.uniqueToken);
      }else {
        getFoldersList();
      }
    }
  }, [location, getFoldersList]);

  return (
    <>
      <FolderList folders={folders} />
    </>
  );
};

export default Folders;
