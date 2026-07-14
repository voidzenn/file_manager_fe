import mime from 'mime';

export const useFileExtensionCheck = () => {
  const isFileImage = (fileExtension: string) => {
    return mime.getType(fileExtension)?.startsWith('image/');
  };

  const isFileVideo = (fileExtension: string) => {
    return mime.getType(fileExtension)?.startsWith('video/');
  };

  const isFileDocument = (fileExtension: string) => {
    return mime.getType(fileExtension)?.startsWith('application/');
  };

  return {
    isFileImage,
    isFileVideo,
    isFileDocument
  };
};
