'use client';

import { createAction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import 
{ 
  Container, 
  Fieldset, 
  Flex, 
  Button, 
  TextInput, 
  Select, 
  Textarea 
} from '@mantine/core';
import 
{ 
  MonsterName 
} from '@/app/lib/definitions';

// Create form view for action entity
// TODO: Implement client-side form validation

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data
// Description: Form state management and action binding borrowed from source.
export default function Form({ monsterNames }: { monsterNames: MonsterName[] })
{
  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(createAction, initialState);

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
          legend='Action Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <TextInput
              id='action_name'
              name='action_name'
              label='Action Name'
              placeholder='Action Name'
              radius='md'
              aria-label='Action Name'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error=
              {
                state.errors?.action_name ?  
                state.errors.action_name?.join('\n') 
                : ''
              }
            />
            <Select
              id='monster_name'
              name='monster_name'
              label='Monster Name'
              placeholder='Monster Name'
              data={ monsterNames.map((monsterName) => monsterName.monster_name) }
              radius='md'
              aria-label='Monster Name'
              variant='filled'
              checkIconPosition='right'
              withAsterisk
              required
              error=
              {
                state.errors?.monster_name ?  
                state.errors.monster_name?.join('\n') 
                : ''
              }
            />
            <Textarea
              id='description'
              name='description'
              label='Description'
              radius='md'
              aria-label='Monster Name'
              variant='filled'
              autosize
              minRows={2}
              maxRows={4}
              error=
              {
                state.errors?.description ?  
                state.errors.description?.join('\n') 
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
                onClick={() => router.push('/actions')}
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