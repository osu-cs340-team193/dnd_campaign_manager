import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { FieldPacket, PoolConnection } from 'mysql2/promise';

import { Monster, MonstersEntity, IMonster, IMonsterType } from '@/app/lib/entities/monsters-entity';

import 
{ 
  EntityAttributeFilter, 
} from '@/app/lib/entities/entity';

import 
{
  equalTo 
} from '@/app/lib/database/query';

import mysql from '@/app/lib/database/db';