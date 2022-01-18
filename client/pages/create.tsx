import Head from 'next/head';
import { useState } from 'react';
import {
  Flex, Heading, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text, Container, Center,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CheckCircleIcon } from '@chakra-ui/icons';


import DateSelector from 'components/DateCalendarSelector/DateCalendarSelector';
import type { Value } from 'react-multi-date-picker';
import VenueSelector from 'components/VenueSelector/VenueSelector';

import { Venue } from 'data/types/Venue.type';
import Link from 'next/link';
import LogoBar from 'components/LogoBar/LogoBar';

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
        cuisine: venue.cuisine.map(cuisine => cuisine.name),
        phone: venue.phone,
        website: venue.website,
        address: venue.address
      }
    });

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

      <Container maxW="75%" pb="2rem">
        <LogoBar />
        <Flex flexDirection="column" my={10} px={10} bgColor="#001027" >
          <Heading size="2xl" my={3} alignSelf="center">Set out your poll details</Heading>

          <Heading my={3} >Poll title : </Heading>
          <Input py="6" fontSize="2xl" bg="#255fb3" borderLeftRadius={0} borderRightRadius={10} placeholder="Enter your poll title here" value={title} onChange={(e) => setTitle(e.target.value)} />

          <DateSelector dates={dates} setDates={setDates} />

          <VenueSelector selectedVenues={selectedVenues} setSelectedVenues={setSelectedVenues} />

          <Button
            alignSelf="center"
            w="40%"
            py="6"
            fontSize="3xl"
            my="1rem"
            bgColor="#122A48"
            border="1px solid white"
            _hover={{
              background: "#255fb3",
            }}
            onClick={() => { createPoll(title, dates, selectedVenues) }}
          >Create Poll</Button>
        </Flex>
      </Container>

      <Modal motionPreset="slideInBottom" isOpen={!!pollCode} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent bgColor="#122A48">
          <Flex direction="column" alignItems="center">
            <ModalHeader>Poll created!</ModalHeader>
            <CheckCircleIcon boxSize={'50px'} color={'blue.500'} />
            <ModalBody content="center">
              <Text>{'Your poll code is: ' + pollCode}</Text>
            </ModalBody>

            <ModalFooter>
              <Link href={`/${pollCode}/vote`}>
                <Button colorScheme='blue' mr={3}>
                  Go to poll vote page
                </Button>
              </Link>
              <CopyToClipboard text={`/${pollCode}/vote`} onCopy={() => { }}>
                <Button bgColor="#001027" _hover={{
                  background: "#255fb3",
                }}>Copy vote link to clipboard</Button>
              </CopyToClipboard>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePoll;