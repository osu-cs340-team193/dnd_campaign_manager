// POST API endpoints for monster entity.
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

// Citation for the following variable:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Variable structure adapted from source.
// Defines what a valid monster form submission looks like. POST API endpoints
// for the monster entity then use this for form validation.
const MonsterFormSchema = z.object({
  id: z.number(),

  monster_name: z
    .string({
      required_error: 'Please enter a valid monster name',
    })
    .trim()
    .min(2, {
      message: 'Monster name should be at least 2 characters long'
    }),

  armor_class: z
    .coerce
    .number()
    .gt(0, {
      message: 'Please enter an armor class greater than 0.'
    }),

  hit_points: z
    .coerce
    .number()
    .gt(0, {
      message: 'Please enter a hit point value greater than 0.'
    }),

  // Regex refine: https://stackoverflow.com/a/75516346
  // chars regex: https://stackoverflow.com/a/12778207
  monster_type: z
    .string({
      required_error: 'Please select a monster type.'
    })
    .trim()
    .min(2, {
      message: 'Monster type should be at least 2 characters long'
    })
    .refine((value) => 
      /^[a-zA-Z\s]*$/.test(value), {
        message: 'Monster type should contain only characters and whitespace' 
    })
});

// Since the user won't submit ID with the form, we can omit it from the validation step.
const CreateMonster = MonsterFormSchema.omit({ id: true });
const UpdateMonster = MonsterFormSchema.omit({ id: true });

export type MonsterFormState = {
  errors?: {
    monster_name?: string[];
    armor_class?: string[];
    hit_points?: string[];
    monster_type?: string[];
  };
  message?: string | null;
};

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for creating a new monster.
export async function createMonster(prevState: MonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
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
      message: 'Missing Fields. Failed to Create Monster',
    };
  }

  // Convert form values into a valid type before sending to backend.
  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  // Attempt to send form data to backend.
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();
    await MonstersEntity.insert(connection, monster);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Create Monster.',
    };
  }
  finally
  {
    // Always release connection at end of transaction.
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  // Since we added a new monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when submitting a form for updating an existing monster.
export async function updateMonster(id: number, prevState: MonsterFormState, formData: FormData)
{
  // Perform server-side form validation before submitting data to backend.
  const validateFields = UpdateMonster.safeParse({
    monster_name: formData.get('monster_name'),
    armor_class: formData.get('armor_class'),
    hit_points: formData.get('hit_points'),
    monster_type: formData.get('monster_type'),
  });

  console.info(formData);

  if (!validateFields.success)
  {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Monster',
    };
  }

  // Convert form values into a valid type before sending to backend.
  const monster: Monster =
  {
    monster_name: validateFields.data.monster_name,
    armor_class: validateFields.data.armor_class,
    hit_points: validateFields.data.hit_points,
    monster_type: validateFields.data.monster_type
  };

  // Attempt to send form data to backend.
  let connection: PoolConnection | null = null;
  try
  {
    connection = await mysql.createConnection();

    const idFilter: EntityAttributeFilter =
    {
      attr: MonstersEntity.monster_id,
      op: equalTo,
      value: id
    };

    await MonstersEntity.update(
      connection, 
      [MonstersEntity.monster_name, MonstersEntity.armor_class, MonstersEntity.hit_points, MonstersEntity.monster_type],
      [monster.monster_name, monster.armor_class, monster.hit_points, monster.monster_type],
      [idFilter]
    );
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Update Monster.',
    };
  }
  finally
  {
    // Always release connection at end of transaction.
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  // Since we updated an existing monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data 
// Description: Function adapted from source.
// POST API endpoint when deleting an existing monster.
export async function deleteMonster(id: number)
{
  console.info(id);

  let connection: PoolConnection | null = null;

  // Attempt to delete monster from backend.
  try
  {
    connection = await mysql.createConnection();

    const idFilter: EntityAttributeFilter =
    {
      attr: MonstersEntity.monster_id,
      op: equalTo,
      value: id
    };

    await MonstersEntity.delete(connection, [idFilter]);
  }
  catch (err)
  {
    return {
      message: 'Database Error: Failed to Delete Monster.',
    };
  }
  finally
  {
    // Always release connection at end of transaction.
    if (connection)
    {
      mysql.releaseConnection(connection);
    }
  }

  // Since we deleted an existing monster, we want to force the monsters page to update
  // its state to display it.
  revalidatePath('/monsters');

  // Send user back to monsters page.
  redirect('/monsters');
}