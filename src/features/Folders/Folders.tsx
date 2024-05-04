import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FolderList from '@/components/FolderList';
import { useFoldersStore } from '@/store/useFolderStore';

const Folders = () => {
  const { folders, getFoldersList } = useFoldersStore();
  const { id } = useParams();

  useEffect(() => {
    getFoldersList(id);
  }, [id, getFoldersList]);

  return (
    <>
      <FolderList folders={folders} />
    </>
  );
};

export default Folders;
