import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UploadCsvFileInput } from '@/pages/users/dashboard/upload-csv-file-input';
import { Info } from 'lucide-react';
import { TabEquipments } from './tab-equipments';
import { TabMeasurements } from './tab-measurements';
import { TabStats } from './tab-stats';

export const DashboardPage = () => {
  return (
    <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="stats">
        <div className="flex items-center gap-4">
          <TabsList>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="equipments">Equipments</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-5 h-5 mt-4" />
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1">
                <strong>
                  Upload a valid CSV file to import new measurements
                </strong>
                <span>Columns must be: equipmentId,timestamp,value</span>
              </TooltipContent>
            </Tooltip>
            <UploadCsvFileInput />
          </div>
        </div>
        <TabsContent value="stats">
          <TabStats />
        </TabsContent>
        <TabsContent value="equipments">
          <TabEquipments />
        </TabsContent>
        <TabsContent value="measurements">
          <TabMeasurements />
        </TabsContent>
      </Tabs>
    </main>
  );
};
