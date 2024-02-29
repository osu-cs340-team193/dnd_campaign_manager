'use client';

import { updateLocationMonsterById } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import 
{ 
  Container, 
  Fieldset, 
  Flex, 
  Button, 
  Select 
} from '@mantine/core';
import 
{ 
  LocationMonster, 
  LocationName, 
  MonsterName 
} from '@/app/lib/definitions';

// Edit form view for location monsters intersection table 
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
  { locationMonster, locationNames, monsterNames }: 
  { locationMonster: LocationMonster, locationNames: LocationName[], monsterNames: MonsterName[] })
{
  // Bind the current location_monster_id to the update action
  const updateLocationMonsterWithId = updateLocationMonsterById.bind(null, locationMonster?.location_monster_id ?? -1);

  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(updateLocationMonsterWithId, initialState);

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
          legend='Location-Monster Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <Select
              id='location_name'
              name='location_name'
              label='Location Name'
              data={ locationNames.map((locationName) => locationName.location_name ?? '') }
              defaultValue={locationMonster.location_name}
              radius='md'
              aria-label='Location Name'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.location_name ?  
                state.errors.location_name?.join('\n') 
                : ''
              }
            />
            <Select
              id='monster_name'
              name='monster_name'
              label='Monster Name'
              data={ monsterNames.map((monsterName) => monsterName.monster_name) }
              defaultValue={locationMonster.monster_name}
              radius='md'
              aria-label='Monster Name'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.monster_name ?  
                state.errors.monster_name?.join('\n') 
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
                onClick={() => router.push('/locations-monsters')}
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