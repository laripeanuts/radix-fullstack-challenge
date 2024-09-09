import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Combobox, ComboboxSelectOption } from '@/components/ui/combobox';
import { useEquipmentsGetAll } from '@/http/queries/equipments';
import { MeasurementAverageChart } from '../../../../components/charts/measurement-average-bar-chart';

export const TabStats = () => {
  const [equipmentId, setEquipmentId] = useState<string | null>(null);
  const { data: equipments } = useEquipmentsGetAll();

  const options: ComboboxSelectOption[] = useMemo(
    () =>
      equipments?.map((equipment) => ({
        label: `${equipment.id} - ${equipment.name}`,
        value: `${equipment.id} - ${equipment.name}`,
      })) || [],
    [equipments],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>
          Follow up the stats of our equipments and their measurements.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col w-full gap-4">
          <Combobox
            placeholder="Select an equipment"
            options={options}
            value={equipmentId}
            setValue={(value) => setEquipmentId(value.split(' - ')[0] || null)}
            autoFocus={true}
          />
          <MeasurementAverageChart equipmentId={equipmentId} />
        </div>
      </CardContent>
    </Card>
  );
};
