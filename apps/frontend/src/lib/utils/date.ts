import { format } from 'date-fns';

export function formatIsoDateString(isoDateString: string): string {
  const date = new Date(isoDateString);
  return format(date, 'yyyy-MM-dd hh:mm a');
}
