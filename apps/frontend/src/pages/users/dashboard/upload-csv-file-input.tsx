import { FileUp, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useMeasurementsUploadCsv } from '@/http/queries/measurements';

export const UploadCsvFileInput = () => {
  const { mutate: uploadCsvMutation, isPending } = useMeasurementsUploadCsv();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]!);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      uploadCsvMutation(
        { file },
        {
          onSuccess: () => {
            toast({
              title: 'Success!',
              description: 'Your CSV file was uploaded successfully',
              variant: 'success',
            });
          },
          onError: (error) => {
            let description = 'An error occurred';

            if (error.message.includes('400')) {
              description =
                'Invalid file format, please upload a valid CSV file';
            }

            toast({
              title: 'Error uploading CSV file',
              description,
              variant: 'destructive',
            });
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-1.5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Upload CSV</Label>
        <Input
          id="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <Button
        className="flex items-center justify-center w-32 h-10 gap-1 p-0 rounded-md"
        variant="link"
        type="submit"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Uploading</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <FileUp className="w-5 h-5" />
            <span>Upload</span>
          </div>
        )}
      </Button>
    </form>
  );
};
