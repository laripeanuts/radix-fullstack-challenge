import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const chartMockData = [
  { interval: '1d', value: 100, fill: 'var(--color-1d)' },
  { interval: '2d', value: 100, fill: 'var(--color-2d)' },
  { interval: '1w', value: 100, fill: 'var(--color-1w)' },
  { interval: '1m', value: 100, fill: 'var(--color-1m)' },
];

const chartConfig = {
  value: {
    label: 'Select an equipment ',
  },
  '1d': {
    label: 'Last day',
    color: 'hsl(var(--muted))',
  },
  '2d': {
    label: 'Last two days',
    color: 'hsl(var(--muted))',
  },
  '1w': {
    label: 'Last week',
    color: 'hsl(var(--muted))',
  },
  '1m': {
    label: 'Last month',
    color: 'hsl(var(--muted))',
  },
} satisfies ChartConfig;

export const MeasurementAverageEmptyChart = () => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartMockData}
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
        <XAxis dataKey="value" type="number" hide className="!hidden" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          radius={5}
          className="animate-pulse"
        />
      </BarChart>
    </ChartContainer>
  );
};
