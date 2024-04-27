import FolderList from "@/components/FolderList";
import { useFoldersStore } from "@/store/useFolderStore";
import { useEffect } from "react";

const Folders = () => {
  const { folders, getFoldersList } = useFoldersStore();

  useEffect(() => {
    return () => {
      getFoldersList();
    }
  },[]);

  return(<>
    <FolderList folders={folders} />
  </>)
};

export default Folders;
