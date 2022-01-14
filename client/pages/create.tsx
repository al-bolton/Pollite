import Head from 'next/head';
import { useState } from 'react';
import {
  FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text,
} from '@chakra-ui/react';


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

  const [pollCode, setPollCode] = useState<string>('');

  const createPoll = (title: String, dates: Value, venues: Venue[]) => {
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

    fetch('/api/polls/create', {
      method: 'POST',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify(pollBody)
    })
      .then(response => response.json())
      .then(response => {
        setPollCode(response.code);
        console.log(response.code)
      });
  }

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormLabel>First Name</FormLabel>
      <Input placeholder="Enter your poll title here" value={title} onChange={(e) => setTitle(e.target.value)} />
      <DateSelector dates={dates} setDates={setDates} />
      <VenueSelector selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />
      <Button onClick={() => { createPoll(title, dates, selectedVenues) }}>Create Poll</Button>

      <Modal isOpen={!!pollCode} onClose={() => console.log('Normally this would do something')}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Text>{pollCode}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => console.log('Normally this would do something')}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}

export default CreatePoll;