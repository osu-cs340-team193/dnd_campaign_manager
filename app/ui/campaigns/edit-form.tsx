'use client';

import { useState, useEffect } from 'react';
import { updateCampaignById } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { Autocomplete, Container, Fieldset, Flex, Button, TextInput } from '@mantine/core';
import { Campaign, CampaignFormSchema, DungeonMaster } from '@/app/lib/definitions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

// Citation for the following function:
// Date: 02/18/2024
// Title: Adapted from [Learn Next.js: Mutating Data]
// Type: Source Code
// Author: Vercel Company
// Code Version: N/A
// Source URL: https://nextjs.org/learn/dashboard-app/mutating-data
// Description: Form state management and action binding borrowed from source.

export default function Form({ campaign, dungeonMasters }: { campaign: Campaign, dungeonMasters: DungeonMaster[] }) {
  const initialState = { message: null, errors: {} };
  const updateCampaignWithId = updateCampaignById.bind(null, campaign?.campaign_id ?? -1);
  //@ts-ignore
  const [state, dispatch] = useFormState(updateCampaignWithId, initialState);

  const router = useRouter();

  const form =useForm({
    initialValues: {

    },
    validate: zodResolver(CampaignFormSchema)
  })

  // State hooks for date inputs to handle null values 
  const [startDate, setStartDate] = useState<Date | null>(campaign.start_date ? new Date(campaign.start_date) : null);
  const [endDate, setEndDate] = useState<Date | null>(campaign.end_date ? new Date(campaign.end_date) : null);

  // UseEffect to update state if campaign prop changes
  useEffect(() => {
    setStartDate(campaign.start_date ? new Date(campaign.start_date) : null);
    setEndDate(campaign.end_date ? new Date(campaign.end_date) : null);
  }, [campaign.start_date, campaign.end_date]);

  return (
    <Container size='md' px='xl'>
      <form action={dispatch}>
        <Fieldset legend='Campaign Info' radius='md'>
          <Flex direction='column' gap='xs'>
            <TextInput
              id='title'
              name='title'
              label='Title'
              placeholder='Title'
              defaultValue={campaign.title}
              radius='md'
              aria-label='Title'
              variant='filled'
              withAsterisk
              required
              autoFocus
              error={state.errors?.title ? state.errors.title?.join('\n') : ''}
            />
            <label htmlFor="date-picker" style={{ fontSize: '13.5px', fontWeight: 550 }}>
              Start Date <span style={{ color: 'red' }}>*</span>
            </label>
            <DatePicker
              id='start_date'
              name='start_date'
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText='Input Start Date Here'
              aria-label='Start Date'
              required
            />
              <label 
              htmlFor="date-picker" style={{ fontSize: '13.5px', fontWeight: 550 }}>End Date
              </label>            
              <DatePicker
              id='end_date'
              name='end_date'
              selected={endDate}
              onChange={date => setEndDate(date)}
              isClearable={true}
              placeholderText='Input End Date Here'
              aria-label='End Date'
            />
            <Autocomplete
              id='dungeon_master'
              name='dungeon_master'
              label='Dungeon Master'
              placeholder='Select or create one'
              defaultValue={campaign.dungeon_master}
              data={dungeonMasters.map((dungeonMaster) => dungeonMaster.dungeon_master)}
              aria-label='Dungeon Master'
              variant='filled'
              withAsterisk
              required
              error={state.errors?.dungeon_master ? state.errors.dungeon_master?.join('\n') : ''}
            />
            <Flex direction='row' justify='flex-end' gap='lg' my='lg'>
              <Button variant='outline' color='red' radius='md' onClick={() => router.push('/campaigns')}>
                Cancel
              </Button>
              <Button type="submit" variant='outline' color='green' radius='md' >
                Submit
              </Button>
            </Flex>
          </Flex>
        </Fieldset>
      </form>
    </Container>
  );
}