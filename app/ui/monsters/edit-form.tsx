'use client';

import { updateMonsterById } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { MonsterType, Monster } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import 
{ 
  Autocomplete, 
  Container, 
  Fieldset, 
  Flex, 
  NumberInput, 
  TextInput, 
  Button 
} from '@mantine/core';

// Edit form view for monster entity
// TODO: Implement client-side form validation

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data
// Description: Form state management and action binding borrowed from source.
export default function Form(
  { monster, monsterTypes }: 
  { monster: Monster, monsterTypes: MonsterType[] })
{
  // Bind the current monster_id to the update action
  const updateMonsterWithId = updateMonsterById.bind(null, monster?.monster_id ?? -1);

  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(updateMonsterWithId, initialState);

  const router = useRouter();

  return (
    <Container
      size='md'
      px='xl'
    >
      <form
        action={dispatch} 
      >
        <Fieldset
          legend='Monster Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <TextInput
              id='monster_name'
              name='monster_name'
              label='Name'
              placeholder='Name'
              defaultValue={monster.monster_name}
              radius='md'
              aria-label='Name'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error=
              {
                state.errors?.monster_name ?  
                state.errors.monster_name?.join('\n') 
                : ''
              }
            />
            <NumberInput
              id='armor_class'
              name='armor_class'
              label='Armor Class'
              defaultValue={monster.armor_class}
              radius='md'
              aria-label='Armor Class'
              variant='filled'
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={100}
              withAsterisk
              required
              error=
              {
                state.errors?.armor_class ?  
                state.errors.armor_class?.join('\n') 
                : ''
              }
            />
            <NumberInput
              id='hit_points'
              name='hit_points'
              label='Hit Points'
              defaultValue={monster.hit_points}
              radius='md'
              aria-label='Hit Points'
              variant='filled'
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={100}
              withAsterisk
              required
              error=
              {
                state.errors?.hit_points ?  
                state.errors.hit_points?.join('\n') 
                : ''
              }
            />
            <Autocomplete
              id='monster_type'
              name='monster_type'
              label='Type'
              placeholder='Select or create one'
              data={monsterTypes.map((monsterType) => monsterType.monster_type)}
              defaultValue={monster.monster_type}
              aria-label='Type'
              variant='filled'
              withAsterisk
              required
              error=
              {
                state.errors?.monster_type?  
                state.errors.monster_type?.join('\n') 
                : ''
              }
            />
            <Flex
              direction='row'
              justify='flex-end'
              gap='lg'
              my='lg'
            >
              <Button
                variant='outline'
                color='red'
                radius='md'
                onClick={() => router.push('/monsters')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant='outline'
                color='green'
                radius='md'
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Fieldset>
      </form>
    </Container>
  );
}