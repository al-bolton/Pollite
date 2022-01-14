import Head from 'next/head';
import { useState } from 'react';
import { FormLabel, Input, Button } from '@chakra-ui/react';

import DateSelector from '../components/DateSelector/DateSelector';
import type { Value } from 'react-multi-date-picker';
import VenueSelector from '../components/VenueSelector/VenueSelector';

import { Venue } from '../data/types/Venue.type';

type Props = {

}

const CreatePoll: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [dates, setDates] = useState<Value>([]);
  const [selectedVenues, setSelectedVenues] = useState<Venue[]>(new Array<Venue>());

  const createPoll = (title: String, dates: Value, venues: Venue[]) => {
    console.log(title, dates, venues);

    const venueData = venues.map(venue => {
      return {
        name: venue.name,
        lat: venue.latitude,
        lng: venue.longitude,
        imgUrl: venue.photo.images.large.url,
        rating: venue.rating,
        num_reviews: venue.num_reviews,
        price_level: venue.price_level,
        ranking: venue.ranking,
        cuisine: venue.cuisine.map(cuisine => cuisine.name)
      }
    })
    const pollBody = {
      title: title,
      dates: dates?.toString().split(','),
      venues: venueData
    }
    console.log(pollBody);

    fetch('/api/polls/create', {
      method: 'POST',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify(pollBody)
    })
    ;
  }

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormLabel>First Name</FormLabel>
      <Input placeholder="Enter your poll title here" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <DateSelector dates={dates} setDates={setDates}/>
      <VenueSelector selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />
      <Button onClick={() => {createPoll(title, dates, selectedVenues)}}>Create Poll</Button>
    </>
  )

}

export default CreatePoll;