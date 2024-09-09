import { api } from '../../infra/api';

export interface MeasurementUploadRequest {
  file: File;
}

export const measurementsUploadCsv = async ({
  file,
}: MeasurementUploadRequest) => {
  const response = await api.post(
    '/measurements/upload/csv',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
