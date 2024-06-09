import ReactPlayer from 'react-player';

import { useFileExtensionCheck } from '@/hooks/useFileExtensionCheck';

interface IProp {
  sourceUrl: string;
  fileName :string;
  fileExtension: string;
}

const FileView = ({ sourceUrl, fileExtension, fileName }: IProp) => {
  const { isFileImage, isFileVideo, isFileDocument } =
    useFileExtensionCheck();

  const File = () => {
    if (isFileImage(fileExtension)) {
      return <img src={sourceUrl} alt="file" />;
    } else if (isFileVideo(fileExtension)) {
      return (
        <>
          <ReactPlayer
            src={sourceUrl}
            height={'100%'}
            width={'100%'}
            controls
          />
          <video src={sourceUrl} controls></video>
        </>
      );
    } else if (isFileDocument(fileExtension)) {
      return (
        <a href={sourceUrl}>
          Download Document <b>{fileName}</b>
        </a>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="m-5 flex flex-col">
      <File />
    </div>
  );
};

export default FileView;
