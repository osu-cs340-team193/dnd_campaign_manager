"use client";

import { createMonster } from "@/app/lib/actions/monster-actions";
import { useFormState } from "react-dom";

import Form from '@/app/ui/extensions/form';
import { IMonsterType } from "@/app/lib/entities/monsters-entity";
import { useRouter } from 'next/navigation';
import { Autocomplete, Container, Fieldset, Flex, NumberInput, Button, TextInput } from '@mantine/core';

export default function CreateMonsterForm({ monsterTypes } : { monsterTypes : IMonsterType[] })
{
  const initialState = { message: null, errors: {}};
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(createMonster, initialState);

  const router = useRouter();

  return (
    <Container
      size='md'
      px='xl'
    >
      <Form 
        action={dispatch} 
        aria-describedby='monsterFormError'
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
      </Form>
    </Container>
  );
}