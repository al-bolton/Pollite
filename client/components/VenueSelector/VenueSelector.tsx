import { Flex, Heading, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { Bounds } from '../../data/types/Bounds.type';
import { Venue } from '../../data/types/Venue.type';

import Map from '../Map/Map';
import VenueGrid from '../VenueGrid/VenueGrid';
import VenueList from '../VenueList/VenueList';

type Props = {
  selectedVenues: Venue[],
  setSelectedVenues: Function
}

const VenueSelector: React.FC<Props> = ({ selectedVenues, setSelectedVenues }) => {
  const [venues, setVenues] = useState<Venue[]>(new Array<Venue>());
  const [bounds, setBounds] = useState<null | Bounds>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Have map default to London
  const [coordinates, setCoordinates] = useState({
    lat: 51.50664715370115,
    lng: -0.12668398689018545
  });

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      try {
        fetch('/api/getVenues', {
          method: 'POST',
          body: JSON.stringify({
            sw: bounds.sw,
            ne: bounds.ne
          })
        }).then(response => response.json())
          .then((data: Venue[]) => {
            setVenues(data?.filter((venue: Venue) => venue.name && venue.num_reviews > 0));
            setIsLoading(false);
          });
      } catch (e) {
        console.log('Error in venue request', e);
      }
    }
  }, [bounds]);


  return (
    <VStack>
      <Heading>Select Venue options </Heading>
      <Flex className="venue-picker" maxH="40rem">
        <VenueList
          venues={venues}
          selectedVenues={selectedVenues}
          addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
          isLoading={isLoading}
        />
        <Map
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          setBounds={setBounds}
          venues={venues}
          selectedVenues={selectedVenues}
          addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
        />
      </Flex>
      <VenueGrid
        venues={selectedVenues}
        addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
      />
    </VStack>
  )
}

export default VenueSelector;