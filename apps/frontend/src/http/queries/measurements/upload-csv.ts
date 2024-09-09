import { useMutation } from '@tanstack/react-query';
import { measurementsUploadCsv } from './../../services/measurements/upload-csv';

export const useMeasurementsUploadCsv = () =>
  useMutation({
    mutationKey: ['measurements-upload-csv'],
    mutationFn: measurementsUploadCsv,
  });
