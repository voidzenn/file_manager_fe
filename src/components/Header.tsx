import CreateFolder from "./CreateFolder";
import UploadFile from "./UploadFile";

const Header = () => {
  return (
    <div className="flex gap-5 border-b-2 justify-end px-5 py-5">
      <CreateFolder />
      <UploadFile />
    </div>
  );
};

export default Header;
