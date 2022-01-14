import Head from 'next/head';
import { useState, useEffect } from 'react';

import DateSelector from '../components/DateSelector/DateSelector';
import type { Value } from 'react-multi-date-picker';
import VenueSelector from '../components/VenueSelector/VenueSelector';

import { Venue } from '../types/Venue.type';

type Props = {

}

const CreatePoll: React.FC<Props> = () => {
  const [dates, setDates] = useState<Value>([]);
  const [selectedVenues, setSelectedVenues] = useState<Venue[]>(new Array<Venue>());

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DateSelector dates={dates} setDates={setDates}/>
      <VenueSelector selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />
    </>
  )

}

export default CreatePoll;