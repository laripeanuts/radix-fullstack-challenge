import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const TabMeasurements = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Measurements</CardTitle>
        <CardDescription>
          See the measurements of your equipments filtered and paginated.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between py-8">
        <span></span>
        <img
          src="/under-construction.png"
          alt="radix logo"
          className="self-center w-48 lg:w-1/3 drop-shadow-md grayscale opacity-80"
        />
        <span></span>
      </CardContent>
    </Card>
  );
};
