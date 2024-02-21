import { fetchMonsters } from '@/app/lib/data';
import Table from '@/app/ui/extensions/table';
import TableHead from '@/app/ui/extensions/thead';
import TableRow from '@/app/ui/extensions/tr';
import TableHeader from '@/app/ui/extensions/th';
import TableBody from '@/app/ui/extensions/tbody';
import TableData from '@/app/ui/extensions/td';

export default async function MonstersTable()
{
  const monsters = await fetchMonsters();

  return (
    <Table
    >
      <TableHead
      >
        <TableRow
        >
          <TableHeader
          >
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody
      >
        <TableRow
        >
          <TableData
          >
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
}