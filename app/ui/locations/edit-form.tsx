'use client';

import { updateLocationById } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

import { useRouter } from 'next/navigation';
import { Container, Fieldset, Flex, Button, TextInput, Select, Textarea, MultiSelect } from '@mantine/core';
import { Location, MonsterName, CampaignTitle, ItemName } from '@/app/lib/definitions';

export default function Form(
  { 
    location, 
    campaignTitles, 
    monsterNames, 
    itemNames, 
    locationMonsterNames, 
    locationItemNames
  }: 
  { 
    location: Location, 
    campaignTitles: CampaignTitle[], 
    monsterNames: MonsterName[], 
    itemNames: ItemName[],
    locationMonsterNames: MonsterName[],
    locationItemNames: ItemName[]
  })
{
  const initialState = { message: null, errors: {}};
  // Use bind to pass additional arguments to a server action.
  const updateLocationWithId = updateLocationById.bind(null, location?.location_id ?? -1);
  // TS does not like. Throws error for some reason.
  //@ts-ignore
  const [state, dispatch] = useFormState(updateLocationWithId, initialState);

  console.log(JSON.stringify(location));

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
          legend='Location Info'
          radius='md'
        >
          <Flex
            direction='column'
            gap='xs'
          >
            <TextInput
              id='location_name'
              name='location_name'
              label='Location Name'
              placeholder='Location Name'
              defaultValue={location.location_name}
              radius='md'
              aria-label='Location Name'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error=
              {
                state.errors?.location_name ?  
                state.errors.location_name?.join('\n') 
                : ''
              }
            />
            <Select
              id='campaign_name'
              name='campaign_name'
              label='Campaign Name'
              data={ campaignTitles.map((campaignTitle) => campaignTitle.campaign_title) }
              defaultValue={location.campaign_name}
              radius='md'
              aria-label='Campaign Name'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.campaign_name?  
                state.errors.campaign_name?.join('\n') 
                : ''
              }
            />
            <Textarea
              id='location_description'
              name='location_description'
              label='Location Description'
              defaultValue={location.location_description ?? ''}
              radius='md'
              aria-label='Location Description'
              variant='filled'
              autosize
              minRows={2}
              maxRows={4}
              error=
              {
                state.errors?.location_description ?  
                state.errors.location_description?.join('\n') 
                : ''
              }
            />
            <MultiSelect
              id='location_monsters'
              name='location_monsters'
              label='Location Monsters'
              data={ monsterNames.map((monsterNames) => monsterNames.monster_name) }
              defaultValue={ locationMonsterNames.map((locationMonsterName) => locationMonsterName.monster_name) }
              radius='md'
              aria-label='Location Monsters'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.location_monsters?  
                state.errors.location_monsters?.join('\n') 
                : ''
              }
            />
            <MultiSelect
              id='location_items'
              name='location_items'
              label='Location Items'
              data={ itemNames.map((itemName) => itemName.item_name) }
              defaultValue={ locationItemNames.map((locationItemName) => locationItemName.item_name) }
              radius='md'
              aria-label='Location Items'
              variant='filled'
              checkIconPosition='right'
              searchable
              withAsterisk
              required
              error=
              {
                state.errors?.location_items?  
                state.errors.location_items?.join('\n') 
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
                onClick={() => router.push('/locations')}
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