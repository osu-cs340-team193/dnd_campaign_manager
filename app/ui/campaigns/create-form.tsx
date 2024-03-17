'use client';

import { createCampaign } from '@/app/lib/actions';
import { useState, useEffect } from 'react';
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
import { Campaign, DungeonMaster } from '@/app/lib/definitions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
export default function Form({ campaign, dungeonMasters }: { campaign: Campaign, dungeonMasters: DungeonMaster[] }) {
  // Form initially has no errors
  const initialState = { message: null, errors: {}};

  // Action to be called when form is submitted
  // @ts-ignore
  const [state, dispatch] = useFormState(createCampaign, initialState);

  const router = useRouter();

  // State hooks for date inputs to handle null values 
  const [startDate, setStartDate] = useState<Date | null>(campaign?.start_date ? new Date(campaign.start_date) : null);
  const [endDate, setEndDate] = useState<Date | null>(campaign?.end_date ? new Date(campaign.end_date) : null);

  // UseEffect to update state if campaign prop changes
  useEffect(() => {
    if (campaign) {
      setStartDate(campaign.start_date ? new Date(campaign.start_date) : null);
      setEndDate(campaign.end_date ? new Date(campaign.end_date) : null);
    }
  }, [campaign?.start_date, campaign?.end_date]);


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
                onClick={() => router.push('/campaigns')}
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