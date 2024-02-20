"use server";

import { z } from 'zod';
import { PoolConnection } from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Monster, MonstersEntity } from '@/app/lib/monsters-entity';

import { 
  EntityAttributeFilter, 
} from '@/app/lib/entity';

import {
  equalTo 
} from '@/app/lib/query';

import mysql from '@/app/lib/db';

const MonsterFormSchema = z.object({
  id: z.number(),
  monster_name: z.string({
    required_error: "Please enter a monster name",
  }),
  armor_class: z.coerce.number().gt(0, {
    message: "Please enter an armor class greater than 0."
  }),
  hit_points: z.coerce.number().gt(0, {
    message: "Please enter a hit point value greater than 0."
  }),
  monster_type: z.string({
    required_error: "Please select a monster type."
  }),
});

const CreateMonster = MonsterFormSchema.omit({ id: true });

export type MonsterFormState = {
  errors?: {
    monster_name?: string[];
    armor_class?: string[];
    hit_points?: string[];
    monster_type?: string[];
  };
  message?: string | null;
};

export async function createMonster(prevState: MonsterFormState, formData: FormData)
{
  const validateFields = CreateMonster.safeParse({
    monster_name: formData.get('monster_name'),
    armor_class: formData.get('armor_class'),
    hit_points: formData.get('hit_points'),
    monster_type: formData.get('monster_type'),
  });

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Monster",
    };
  }

  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    await MonstersEntity.insert(connection, monster);

    mysql.releaseConnection(connection);
  }
  catch (err)
  {
    return {
      message: "Database Error: Failed to Create Monster.",
    };
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}

const UpdateMonster = MonsterFormSchema.omit({ id: true });

export async function updateMonster(id: number, prevState: MonsterFormState, formData: FormData)
{
  const validateFields = UpdateMonster.safeParse({
    monster_name: formData.get('monster_name'),
    armor_class: formData.get('armor_class'),
    hit_points: formData.get('hit_points'),
    monster_type: formData.get('monster_type'),
  });

  console.log(formData);

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Monster",
    };
  }

  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  const idFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.id,
    op: equalTo,
    value: id
  };

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    await MonstersEntity.update(
      connection, 
      [MonstersEntity.monster_name, MonstersEntity.armor_class, MonstersEntity.hit_points, MonstersEntity.monster_type],
      [monster.monster_name, monster.armor_class, monster.hit_points, monster.monster_type],
      [idFilter]
    );

    mysql.releaseConnection(connection);
  }
  catch (err)
  {
    return {
      message: "Database Error: Failed to Update Monster.",
    };
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}

export async function deleteMonster(id: number)
{
  console.log(id);

  const idFilter: EntityAttributeFilter =
  {
    attr: MonstersEntity.id,
    op: equalTo,
    value: id
  };

  try
  {
    const connection: PoolConnection = await mysql.createConnection();

    await MonstersEntity.delete(connection, [idFilter]);

    mysql.releaseConnection(connection);
  }
  catch (err)
  {
    return {
      message: "Database Error: Failed to Delete Monster.",
    };
  }

  revalidatePath('/monsters');
  redirect('/monsters');
}