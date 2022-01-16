import Head from 'next/head';
import { useState } from 'react';
import {
  FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


import DateSelector from 'components/DateCalendarSelector/DateCalendarSelector';
import type { Value } from 'react-multi-date-picker';
import VenueSelector from 'components/VenueSelector/VenueSelector';

import { Venue } from 'data/types/Venue.type';
import Link from 'next/link';

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
        latitude: venue.latitude,
        longitude: venue.longitude,
        imgUrl: venue.photo?.images.large.url,
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
      });
  }

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABfK13VJIVVrl_98sPKMt0nldl5HRM6uM"></script>

      </Head>
      <FormLabel>First Name</FormLabel>
      <Input placeholder="Enter your poll title here" value={title} onChange={(e) => setTitle(e.target.value)} />
      <DateSelector dates={dates} setDates={setDates} />
      <VenueSelector selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />
      <Button onClick={() => { createPoll(title, dates, selectedVenues) }}>Create Poll</Button>

      <Modal isOpen={!!pollCode} onClose={() => console.log('Normally this would do something')}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Poll created</ModalHeader>
          <ModalBody>
            <Text>{'Your poll code is: ' + pollCode}</Text>
            <Text>{`Voting page can be found at: /${pollCode}/vote`}</Text>
            <Text>{`Results page can be found at: /${pollCode}/results`}</Text>
          </ModalBody>

          <ModalFooter>
            <Link href={`/${pollCode}/vote`}>
              <Button colorScheme='blue' mr={3}>
                Go to poll vote page
              </Button>
            </Link>
            <CopyToClipboard text={`/${pollCode}/vote`} onCopy={() => { }}>
              <Button>Copy vote link to clipboard</Button>
            </CopyToClipboard>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePoll;