// POST API endpoints for all entities.
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Type validation utilities for form data.
import { z } from 'zod';

import { PoolConnection } from 'mysql2/promise';

import 
{ 
  Monster, 
  MonstersEntity 
} from '@/app/lib/entities/monsters-entity';

import 
{ 
  EntityAttributeFilter, 
} from '@/app/lib/entities/entity';

import 
{
  equalTo 
} from '@/app/lib/database/query';

import mysql from '@/app/lib/database/db';