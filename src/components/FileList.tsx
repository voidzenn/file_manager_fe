import { useState } from 'react';

import FileView from './FileView';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { File, Image, Video } from 'lucide-react';

import { useFileStore } from '@/store/userFileStore';

import { IFileData, IFileUrlResponse } from '@/apis/file/fileInterface';

interface IProps {
  files: [IFileData] | [];
}

interface FileLogoProp {
  file_extension: string | null;
}

const FileLogo = ({ file_extension }: FileLogoProp) => {
  const logoSize = '20px';
  const imageFormat = ['jpg', 'png'];
  const videoFormat = ['mp4'];

  if (!file_extension) {
    return <File size={logoSize} />;
  }

  if (imageFormat.includes(file_extension)) {
    return <Image size={logoSize} />;
  } else if (videoFormat.includes(file_extension)) {
    return <Video size={logoSize} />;
  }
};

const FileList = ({ files }: IProps) => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const { getFileUrl } = useFileStore();

  const handleFileClick = async (uniqueToken: string) => {
    const response = await getFileUrl(uniqueToken) as IFileUrlResponse;

    setImgUrl(response.data.file_url);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          {files.map(
            ({ unique_token, filename, file_extension }: IFileData) => {
              return (
                <div
                  className="flex gap-5 px-2 py-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-5"
                  key={unique_token}
                  title="Preview file"
                  onClick={() => handleFileClick(String(unique_token))}
                >
                  <FileLogo file_extension={file_extension} />
                  <Label className="text-md">
                    {filename + '.' + file_extension}
                  </Label>
                </div>
              );
            }
          )}
        </DialogTrigger>
        <DialogContent>
          <FileView imgUrl={imgUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileList;
