import Link from "next/link";
import MonstersTable from '@/app/ui/monsters/table';

import { IoIosAddCircleOutline } from 'react-icons/io';

export default async function Page()
{ 
  return (
    <div
      className='mt-[40px] flex-column'
    >
      <MonstersTable />
      <Link
        href={"/monsters/create"}
      >
        <IoIosAddCircleOutline
          className='border-2 border-blue-800 mt-[20px] w-[100px] h-[30px] bg-green-200'
        />
      </Link>
    </div>
  );
}