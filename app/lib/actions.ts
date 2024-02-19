"use server";

import { z } from 'zod';
import mysql, { Connection, PoolOptions } from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const access: PoolOptions = {
  host: process.env.MYSQL_HOST, 
  port: parseInt(process.env.MYSQL_PORT ?? "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
};

const client: Connection = mysql.createPool(access);

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

  const { monster_name, armor_class, hit_points, monster_type } = validateFields.data;

  try
  {
    await client.query(
      `INSERT INTO monsters (monster_name, armor_class, hit_points, monster_type)
      VALUES ('${monster_name}', ${armor_class}, ${hit_points}, '${monster_type}')
      `
    );
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

  const { monster_name, armor_class, hit_points, monster_type } = validateFields.data;

  try
  {
    await client.query(
      `UPDATE monsters 
      SET monster_name = '${monster_name}', armor_class = ${armor_class}, hit_points = ${hit_points}, monster_type = '${monster_type}'
      WHERE id = ${id}
      `
    );
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

  try
  {
    await client.query(
      `DELETE FROM monsters
       WHERE id = ${id}
      `
    );
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