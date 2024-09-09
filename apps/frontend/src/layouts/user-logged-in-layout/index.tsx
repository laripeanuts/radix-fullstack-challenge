import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileUp } from 'lucide-react';

import { Header } from './header';
import { TabEquipments } from './tab-equipments';
import { TabMeasurements } from './tab-measurements';
import { TabStats } from './tab-stats';

export const UserLoggedInLayout = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <Header />
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
                    <Button className="gap-1">
                      <FileUp className="w-5 h-5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add measurements
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex flex-col gap-1">
                    <strong>
                      Upload a valid CSV file to import new measurements
                    </strong>
                    <span>Columns must be: equipmentId,timestamp,value</span>
                  </TooltipContent>
                </Tooltip>
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
      </div>
    </div>
  );
};
