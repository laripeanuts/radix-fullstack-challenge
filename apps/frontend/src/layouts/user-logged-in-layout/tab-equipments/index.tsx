import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Equipments</CardTitle>
        <CardDescription>
          See all the equipments that our system has functionality to track
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
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
            {isLoading ? (
              <span>Loading</span>
            ) : (
              equipments?.map((equipment) => (
                <EquipmentTableRow key={equipment.id} equipment={equipment} />
              ))
            )}
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
