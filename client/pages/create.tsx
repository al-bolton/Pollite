import Head from 'next/head';
import { useState, useEffect } from 'react';

import DateSelector from '../components/DateSelector/DateSelector';
import type { Value } from 'react-multi-date-picker';
import VenueSelector from '../components/VenueSelector/VenueSelector';


type Props = {

}

const CreatePoll: React.FC<Props> = () => {
  const [dates, setDates] = useState<Value>([]);

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DateSelector dates={dates} setDates={setDates}/>
      <VenueSelector />
    </>
  )

}

export default CreatePoll;