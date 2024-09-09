import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

import { useMeasurementsGetAverageByEquipment } from '@/http/queries/measurements/get-average-by-equipment';
import { MeasurementAverageContentChart } from './measurement-average-content-chart';
import { MeasurementAverageEmptyChart } from './measurement-average-empty-chart';

type MeasurementAverageChartProps = {
  equipmentId?: string | null;
};

export const MeasurementAverageChart = ({
  equipmentId,
}: MeasurementAverageChartProps) => {
  const { data } = useMeasurementsGetAverageByEquipment(equipmentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Measurements by equipment</CardTitle>
        <CardDescription>
          Last update: {new Date().toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data ? (
          <MeasurementAverageContentChart data={data} />
        ) : (
          <MeasurementAverageEmptyChart />
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The sensors are working properly <CheckCircle size={16} />
        </div>
        <div className="leading-none text-muted-foreground">
          Average values of a equipment in the recent intervals.
        </div>
      </CardFooter>
    </Card>
  );
};
