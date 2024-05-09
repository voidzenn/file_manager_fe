import { Label } from "@radix-ui/react-label";
import { File, Image } from "lucide-react";

import { IFileData } from '@/apis/file/fileInterface';

interface IProps {
  files: [IFileData] | [];
}

interface FileLogoProp {
  file_extension: string | null;
}

const FileLogo = ({ file_extension }: FileLogoProp) => {
  const logoSize = '20px';

  switch (file_extension) {
    case 'jpg':
      return <Image size={logoSize} />;
    default:
      return <File size={logoSize} />;
  }
};

const FileList = ({ files }: IProps) => {
  return (
    <div className="flex flex-col">
      {files.map(({ unique_token, filename, file_extension }: IFileData) => {
        return (
          <div
            className="flex gap-5 px-2 py-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-5"
            key={unique_token}
            // onClick={() => handleFolderClick(String(unique_token))}
          >
            <FileLogo file_extension={file_extension} />
            <Label className="text-md"> {filename} </Label>
          </div>
        );
      })}
    </div>
  );
}

export default FileList;
