import { MeasurementsAverageByEquipmentsIntervals } from '@/http/services/measurements/get-average-by-equipment';

export const apiDataToChartDataMeasurementAvgChart = (
  data: MeasurementsAverageByEquipmentsIntervals,
) => {
  return Object.entries(data).map(([interval, value]) => ({
    interval,
    value,
    fill: `var(--color-${interval})`,
  }));
};
