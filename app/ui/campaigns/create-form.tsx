'use client';

import { createCampaign } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import 
{ 
  Autocomplete, 
  Container, 
  Fieldset, 
  Flex, 
  Button, 
  TextInput 
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { DungeonMaster } from '@/app/lib/definitions';

// Create form view for campaign entity
// TODO: Implement client-side form validation

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data
// Description: Form state management and action binding borrowed from source.
export default function Form({ dungeonMasters }: { dungeonMasters : DungeonMaster[] })
{
  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(createCampaign, initialState);

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
          legend='Campaign Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <TextInput
              id='title'
              name='title'
              label='Title'
              placeholder='Title'
              radius='md'
              aria-label='Title'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error=
              {
                state.errors?.title ?  
                state.errors.title?.join('\n') 
                : ''
              }
            />
            <DatePickerInput
              id='start_date'
              name='start_date'
              label='Start Date'
              radius='md'
              aria-label='Start Date'
              variant='filled'
              withAsterisk
              error=
              {
                state.errors?.start_date ?  
                state.errors.start_date?.join('\n') 
                : ''
              }
            />
            <DatePickerInput
              id='end_date'
              name='end_date'
              label='End Date'
              radius='md'
              aria-label='End Date'
              variant='filled'
              withAsterisk
              error=
              {
                state.errors?.end_date ?  
                state.errors.end_date?.join('\n') 
                : ''
              }
            />
            <Autocomplete
              id='dungeon_master'
              name='dungeon_master'
              label='Dungeon Master'
              placeholder='Select or create one'
              data={dungeonMasters.map((dungeonMaster) => dungeonMaster.dungeon_master)}
              aria-label='Type'
              variant='filled'
              withAsterisk
              required
              error=
              {
                state.errors?.dungeon_master?  
                state.errors.dungeon_master?.join('\n') 
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
                onClick={() => router.push('/campaigns')}
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