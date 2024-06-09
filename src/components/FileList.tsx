import { useState } from 'react';

import FileView from './FileView';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { File, FileX, Image, Video } from 'lucide-react';

import { useFileStore } from '@/store/userFileStore';
import { useFileExtensionCheck } from '@/hooks/useFileExtensionCheck';

import { IFileData, IFileUrlResponse } from '@/apis/file/fileInterface';

interface IProps {
  files: [IFileData] | [];
}

interface FileLogoProp {
  file_extension: string | null;
}

const FileList = ({ files }: IProps) => {
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');
  const { getFileUrl } = useFileStore();
  const { isFileImage, isFileVideo, isFileDocument } = useFileExtensionCheck();

  const FileLogo = ({ file_extension }: FileLogoProp) => {
    const logoSize = '20px';
    const ext = String(file_extension);

    if (isFileImage(ext)) {
      return <Image size={logoSize} />;
    } else if (isFileVideo(ext)) {
      return <Video size={logoSize} />;
    } else if (isFileDocument(ext)) {
      return <File size={logoSize} />;
    } else {
      return <FileX size={logoSize} />;
    }
  };

  const handleFileClick = async (uniqueToken: string) => {
    const response = await getFileUrl(uniqueToken) as IFileUrlResponse;

    setSourceUrl(response.data.file_url);
    setFileName(response.data.file_name);
    setFileExtension(response.data.file_extension);
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
          <FileView
            sourceUrl={sourceUrl}
            fileExtension={fileExtension}
            fileName={fileName}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileList;
