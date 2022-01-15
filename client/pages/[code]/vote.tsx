import { Container, Heading, Box, Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import GoogleMapReact from 'google-map-react';
import { VenueMarker } from 'components/Map/Map';

import { Venue } from 'data/types/Venue.type';
import { useState } from 'react';
import DateGridSelector from 'components/DateGridSelector/DateGridSelector';
import { useRouter } from 'next/router';

type Props = {
  title: string,
  dates: string[],
  initVenues: Venue[],
}

const PollVoter: React.FC<Props> = ({ title, dates, initVenues }) => {
  const [venues, setVenues] = useState<Venue[]>([...initVenues]);
  const [selectedVenues, setSelectedVenues] = useState<Venue[]>(new Array<Venue>());

  const [selectedDates, setSelectedDates] = useState<String[]>([]);

  const router = useRouter();
  const { code } = router.query;

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
    <Container>
      <Heading>{title}</Heading>
      <DateGridSelector dates={dates} addRemoveDate={addRemoveDate}></DateGridSelector>
      <Box h="70rem">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{
            lat: 51.50664715370115,
            lng: -0.12668398689018545
          }}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{
            disableDefaultUI: true,
            zoomControl: true
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
      <Button onClick={() => voteOnPoll(selectedDates, selectedVenues)}>Submit vote</Button>
    </Container>
  )
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