'use client';

import { updateActionById } from '@/app/lib/actions';
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
  Action, 
  MonsterName 
} from '@/app/lib/definitions';

// Edit form view for action entity
// TODO: Implement client-side form validation

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data
// Description: Form state management and action binding borrowed from source.
export default function Form({ action, monsterNames }: { action: Action, monsterNames: MonsterName[] })
{
  // Bind the current action_id to the update action
  const updateActionWithId = updateActionById.bind(null, action?.action_id ?? -1);

  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(updateActionWithId, initialState);

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
              defaultValue={action.action_name}
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
              data={ monsterNames.map((monsterName) => monsterName.monster_name) }
              defaultValue={action.monster_name}
              radius='md'
              aria-label='Monster Name'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              // TODO: Should the monster name be required or optional?
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
              defaultValue={action.description ?? ''}
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