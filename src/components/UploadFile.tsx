import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FileUp } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

import { useFileStore } from '@/store/userFileStore';
import { useActionCable } from '@/hooks/useActionCable';
import { IFileListResponse } from '@/apis/file/fileInterface';
import { FILE_CREATED } from '@/constants/socketActions';
import { TOAST_VARIANT_GHOST } from '@/constants/components/ui/toastConstant';
import { getAuthTokenCookie } from '@/lib/cookie';

const UploadFileSchema = z.object({
  files: z
    .any()
    .refine((file) => file?.length == 1, 'File is required.')
    // .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
    // .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`),
});

const UploadFile = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [disableUpload, setDisableUpload] = useState<boolean>(true);
  const { id } = useParams();
  const { uploadFile, addFileToFileList } = useFileStore();
  const { subscription, receivedData } = useActionCable('FileChannel', String(getAuthTokenCookie()));

  const form = useForm<z.infer<typeof UploadFileSchema>>({
    resolver: zodResolver(UploadFileSchema),
    defaultValues: {
      files: undefined,
    },
  });
  const filesRef = form.register('files', { required: true });

  useEffect(() => {
    subscription;
  }, []);

  useEffect(() => {
    useFileStore.getState().uploadFile.setFolderUniqueToken(id ?? null);
  }, [id]);

  useEffect(() => {
    const responseData = receivedData as IFileListResponse;
    const isFileCreation = responseData && responseData.action === FILE_CREATED;

    if (isFileCreation) {
      const folderId = responseData.data[0].folder_id;

      if (uploadFile.folderUniqueToken === id && folderId !== null) {
        addFileToFileList(responseData);
      } else if (uploadFile.folderUniqueToken === null && folderId === null) {
        addFileToFileList(responseData);
      }
    }
  }, [id, receivedData, uploadFile.folderUniqueToken , addFileToFileList]);

  const onSubmit = async (values: z.infer<typeof UploadFileSchema>) => {
    await uploadFile.request(values.files);

    // Use success on later improvements to close dialog
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <div className="w-10">
        <DialogTrigger
          className="p-2 bg-white hover:bg-black hover:bg-opacity-10"
          title="Upload File"
        >
          <FileUp color={'black'} size={'25px'} />
        </DialogTrigger>
      </div>
      <DialogContent className="absolute py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      {...filesRef}
                      className="h-18 leading-5"
                      type="file"
                      onChange={() => setDisableUpload(false)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-5">
              <Button
                type="button"
                variant={TOAST_VARIANT_GHOST}
                className="mr-4"
                onClick={() => {
                  setOpenDialog(false);
                  setDisableUpload(true);
                }}
              >
                Close
              </Button>
              <Button type="submit" disabled={disableUpload}>
                Upload
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
