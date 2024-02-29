'use client';

import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createItem } from '@/app/lib/actions';
import 
{ 
  Container, 
  Fieldset, 
  Flex, 
  Button, 
  TextInput, 
  NumberInput, 
  MultiSelect 
} from '@mantine/core';
import 
{ 
  LocationName 
} from '@/app/lib/definitions';

// Create form view for item entity
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
  { locationNames }: 
  { locationNames: LocationName[] })
{
  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(createItem, initialState);

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
          legend='Item Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <TextInput
              id='item_name'
              name='item_name'
              label='Item Name'
              placeholder='Item Name'
              radius='md'
              aria-label='Item Name'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error=
              {
                state.errors?.item_name ?  
                state.errors.item_name ?.join('\n') 
                : ''
              }
            />
            <NumberInput
              id='value'
              name='value'
              label='Value'
              radius='md'
              aria-label='Value'
              variant='filled'
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={100}
              withAsterisk
              required
              error=
              {
                state.errors?.value?  
                state.errors.value?.join('\n') 
                : ''
              }
            />
            <NumberInput
              id='weight'
              name='weight'
              label='Weight'
              radius='md'
              aria-label='Value'
              variant='filled'
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={100}
              withAsterisk
              required
              error=
              {
                state.errors?.weight?  
                state.errors.weight?.join('\n') 
                : ''
              }
            />
            <MultiSelect
              id='item_locations'
              name='item_locations'
              label='Locations'
              data={ locationNames.map((locationName) => locationName.location_name ?? '') }
              radius='md'
              aria-label='Locations'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.item_locations?  
                state.errors.item_locations?.join('\n') 
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
                onClick={() => router.push('/items')}
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