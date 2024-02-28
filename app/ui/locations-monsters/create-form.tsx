'use client';

import { createLocationMonster } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

import { useRouter } from 'next/navigation';
import { Container, Fieldset, Flex, Button, Select } from '@mantine/core';
import { LocationName, MonsterName } from '@/app/lib/definitions';

export default function Form(
  { locationNames, monsterNames }: 
  { locationNames: LocationName[], monsterNames: MonsterName[] })
{
  const initialState = { message: null, errors: {}};
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(createLocationMonster, initialState);

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