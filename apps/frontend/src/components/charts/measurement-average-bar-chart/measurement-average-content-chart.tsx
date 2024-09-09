import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { MeasurementsAverageByEquipmentsIntervals } from '@/http/services/measurements/get-average-by-equipment';

const chartConfig = {
  value: {
    label: 'Value',
  },
  '1d': {
    label: 'Last day',
    color: 'hsl(var(--chart-1))',
  },
  '2d': {
    label: 'Last two days',
    color: 'hsl(var(--chart-2))',
  },
  '1w': {
    label: 'Last week',
    color: 'hsl(var(--chart-3))',
  },
  '1m': {
    label: 'Last month',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

type MeasurementAverageContentChartProps = {
  data: MeasurementsAverageByEquipmentsIntervals;
};

export const MeasurementAverageContentChart = ({
  data,
}: MeasurementAverageContentChartProps) => {
  const chartData = useMemo(
    () =>
      Object.entries(data).map(([interval, value]) => ({
        interval,
        value,
        fill: `var(--color-${interval})`,
      })),
    [data],
  );

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey="interval"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
};
