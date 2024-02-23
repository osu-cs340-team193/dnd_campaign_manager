import { fetchMonsters } from '@/app/lib/data/monster';
import Table from '@/app/ui/extensions/table';
import TableHead from '@/app/ui/extensions/thead';
import TableRow from '@/app/ui/extensions/tr';
import TableHeader from '@/app/ui/extensions/th';
import TableBody from '@/app/ui/extensions/tbody';
import TableData from '@/app/ui/extensions/td';

import { Monster } from '@/app/lib/entities/monsters-entity';
import { DeleteMonster, UpdateMonster } from './buttons';

export default async function MonstersTable()
{
  const monsters = await fetchMonsters();

  return (
    <Table
      className='table-auto border-separate border-4 border-double border-green-800 border-spacing-[5px]'
    >
      <TableHead
      >
        <TableRow
        >
          <TableHeader
            className='border-2 border-green-600 px-[10px] py-[5px]'
          >
            Monster Name
          </TableHeader>
          <TableHeader
            className='border-2 border-green-600 px-[10px] py-[5px]'
          >
            Armor Class
          </TableHeader>
          <TableHeader
            className='border-2 border-green-600 px-[10px] py-[5px]'
          >
            Hit Points
          </TableHeader>
          <TableHeader
            className='border-2 border-green-600 px-[10px] py-[5px]'
          >
            Monster Type
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody
      >
        {
          monsters?.map((monster) => 
          (
            <TableRow
              key={monster.monster_id}
            >
              <TableData
                className='border border-green-600 px-[10px] py-[5px]'
              >
                {monster.monster_name}
              </TableData>
              <TableData
                className='border border-green-600 px-[10px] py-[5px]'
              >
                {monster.armor_class}
              </TableData>
              <TableData
                className='border border-green-600 px-[10px] py-[5px]'
              >
                {monster.hit_points}
              </TableData>
              <TableData
                className='border border-green-600 px-[10px] py-[5px]'
              >
                {monster.monster_type}
              </TableData>
              <TableData
                className='px-[10px] py-[5px]'
              >
                <div
                  className='flex'
                >
                  <UpdateMonster id={monster.monster_id ?? -1} />
                  <DeleteMonster id={monster.monster_id ?? -1} />
                </div>
              </TableData>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}