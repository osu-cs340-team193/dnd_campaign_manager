'use client';

import { updateLocationItemById, updateLocationMonsterById } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

import { useRouter } from 'next/navigation';
import { Container, Fieldset, Flex, Button, Select } from '@mantine/core';
import { ItemName, LocationItem, LocationName } from '@/app/lib/definitions';

export default function Form(
  { locationItem, locationNames, itemNames }: 
  { locationItem: LocationItem, locationNames: LocationName[], itemNames: ItemName[] })
{
  const initialState = { message: null, errors: {}};
  // Use bind to pass additional arguments to a server action.
  const updateLocationItemWithId = updateLocationItemById.bind(null, locationItem?.location_item_id ?? -1);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(updateLocationItemWithId, initialState);

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
          legend='Location-Item Info'
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
              defaultValue={locationItem.location_name}
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
              id='item_name'
              name='item_name'
              label='Item Name'
              data={ itemNames.map((itemName) => itemName.item_name) }
              defaultValue={locationItem.item_name}
              radius='md'
              aria-label='Item Name'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.item_name ?  
                state.errors.item_name?.join('\n') 
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
                onClick={() => router.push('/locations-items')}
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