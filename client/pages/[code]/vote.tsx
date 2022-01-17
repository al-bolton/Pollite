import { Container, Flex, Heading, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import GoogleMapReact, { Coords } from 'google-map-react';
import { VenueMarker } from 'components/Map/Map';
import PropTypes from "prop-types";
import LogoBar from 'components/LogoBar/LogoBar';
import VenueGrid from 'components/VenueGrid/VenueGrid';

import { Venue } from 'data/types/Venue.type';
import { useEffect, useState } from 'react';
import DateGridSelector from 'components/DateGridSelector/DateGridSelector';
import { useRouter } from 'next/router';
import Link from 'next/link';
import darkMapStyles from 'components/Map/mapStyles';

type Props = {
  title: string,
  dates: string[],
  initVenues: Venue[],
}

const PollVoter: React.FC<Props> = ({ title, dates, initVenues }) => {
  const [venues, setVenues] = useState<Venue[]>([...initVenues]);
  const [selectedVenues, setSelectedVenues] = useState<Venue[]>(new Array<Venue>());

  const [selectedDates, setSelectedDates] = useState<String[]>([]);
  const [voteSent, setVoteSent] = useState<boolean>(false);
  const [initCenter, setInitCenter] = useState<Coords>({
    lat: 51.50664715370115,
    lng: -0.12668398689018545
  });

  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    let minLat = 180;
    let maxLat = -180;
    let minLng = 180;
    let maxLng = -180;

    initVenues.forEach((venue: any) => {
      minLat = Math.min(venue.latitude, minLat);
      maxLat = Math.max(venue.latitude, maxLat);
      minLng = Math.min(venue.longitude, minLng);
      maxLng = Math.max(venue.longitude, maxLng);
    });

    setInitCenter({
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2
    })
  }, [])

  const addRemoveVenue = (venue: Venue) => {
    if (selectedVenues.includes(venue)) {
      const i = selectedVenues.indexOf(venue);
      const newSet = [...selectedVenues];
      const changedVenue = newSet.splice(i, 1)[0];

      setSelectedVenues(newSet);
      setVenues([...venues, changedVenue]);
    } else {
      const i = venues.indexOf(venue);
      const newSet = [...venues];
      newSet.splice(i, 1)[0];

      setVenues(newSet);
      setSelectedVenues([...selectedVenues, venue]);
    }
  }

  const addRemoveDate = (date: string) => {
    if (selectedDates.includes(date)) {
      const i = selectedDates.indexOf(date);
      const newSet = [...selectedDates];
      newSet.splice(i, 1);
      setSelectedDates(newSet);
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  }

  const voteOnPoll = (dates: String[], venues: Venue[]) => {
    const reqBody = {
      dates,
      venues: venues.map(venue => venue.name),
    };

    fetch(`/api/polls/${code}/vote`, {
      method: 'PUT',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify(reqBody)
    })
  }

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="75%" pb="2rem">
        <LogoBar />
        <Flex flexDirection="column" my={10} px={10} bgColor="#001027" >
          <Heading size="2xl" my={3} alignSelf="center">{title}</Heading>
          <Link href={`/${code}/results`}>
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
            >Go to poll results page</Button>
          </Link>
          <DateGridSelector dates={dates} addRemoveDate={addRemoveDate}></DateGridSelector>
          <Box h="70rem" w="95%" alignSelf="center" pb="1rem">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
              defaultCenter={initCenter}
              defaultZoom={16}
              margin={[50, 50, 50, 50]}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: darkMapStyles
              }}
            >
              {venues?.map((venue, i) => (
                <VenueMarker
                  lat={Number(venue.latitude)}
                  lng={Number(venue.longitude)}
                  key={i}
                  venue={venue}
                  addRemoveVenue={addRemoveVenue}
                  selected={false}
                />
              ))}
              {selectedVenues?.map((venue, i) => (
                <VenueMarker
                  lat={Number(venue.latitude)}
                  lng={Number(venue.longitude)}
                  key={i}
                  venue={venue}
                  addRemoveVenue={addRemoveVenue}
                  selected={true}
                />
              ))}
            </GoogleMapReact>
          </Box>
          <VenueGrid
            venues={selectedVenues}
            addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
          />
          <Button
            onClick={() => {
              voteOnPoll(selectedDates, selectedVenues);
              setVoteSent(true);
            }}
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
          >Submit vote</Button>
        </Flex>
      </Container>

      <Modal isOpen={voteSent} onClose={() => { }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for voting!</ModalHeader>
          <ModalBody>
            <Link href={`/${code}/results`}>
              <Button colorScheme='blue' mr={3}>
                Go to poll results page
              </Button>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

PollVoter.propTypes = {
  title: PropTypes.string.isRequired,
  dates: PropTypes.any.isRequired,
  initVenues: PropTypes.any.isRequired,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/polls/${params?.code}/`);

  const data = await response.json();

  return {
    props: {
      title: data.title,
      dates: data.dates,
      initVenues: data.venues
    }
  }
}

export default PollVoter;