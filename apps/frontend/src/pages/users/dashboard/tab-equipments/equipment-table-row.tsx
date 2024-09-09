import { Equipment } from '@/@types/entities/equipment';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatIsoDateString } from '@/lib/utils/date';

interface EquipmentTableRowProps {
  equipment: Equipment;
}

export const EquipmentTableRow = ({
  equipment: { name, status, id, description, createdAt },
}: EquipmentTableRowProps) => (
  <TableRow>
    <TableCell>{id}</TableCell>
    <TableCell className="flex flex-col">
      <span className="font-semibold">{name}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </TableCell>
    <TableCell>
      <Badge variant="outline">{status}</Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">
      {createdAt ? formatIsoDateString(createdAt) : '-'}
    </TableCell>
    <TableCell></TableCell>
  </TableRow>
);
