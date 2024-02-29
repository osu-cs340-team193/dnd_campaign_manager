'use client';

import { updateLocationItemById } from '@/app/lib/actions';
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
  ItemName, 
  LocationItem, 
  LocationName 
} from '@/app/lib/definitions';

// Edit form view for location items intersection table
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
  { locationItem, locationNames, itemNames }: 
  { locationItem: LocationItem, locationNames: LocationName[], itemNames: ItemName[] })
{
  // Bind the current location_item_id to the update action
  const updateLocationItemWithId = updateLocationItemById.bind(null, locationItem?.location_item_id ?? -1);

  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
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