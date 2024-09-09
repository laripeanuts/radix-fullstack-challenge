import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEquipmentsGetAll } from '@/http/queries/equipments';
import { EquipmentTableRow } from './equipment-table-row';

export const TabEquipments = () => {
  const { data: equipments, isLoading } = useEquipmentsGetAll();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Equipments</CardTitle>
        <CardDescription>
          See all the equipments that our system has functionality to track
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="overflow-auto lg:overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Identifier</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-24 rounded-md" />
                ))
              : equipments?.map((equipment) => (
                  <EquipmentTableRow key={equipment.id} equipment={equipment} />
                ))}
            {!equipments?.length && !isLoading && (
              <TableRow>No equipments found</TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{equipments?.length}</strong> of{' '}
          <strong>{equipments?.length}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};
