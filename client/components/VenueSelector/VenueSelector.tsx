import { Flex, Heading, Input, Box, Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Autocomplete } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

import { Bounds } from '../../data/types/Bounds.type';
import { Venue } from '../../data/types/Venue.type';

import Map from '../Map/Map';
import VenueGrid from '../VenueGrid/VenueGrid';
import VenueList from '../VenueList/VenueList';

import PropTypes from "prop-types";

type Props = {
  selectedVenues: Venue[],
  setSelectedVenues: Function
}

const VenueSelector: React.FC<Props> = ({ selectedVenues, setSelectedVenues }) => {
  const [venues, setVenues] = useState<Venue[]>(new Array<Venue>());
  const [bounds, setBounds] = useState<null | Bounds>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState<null | any>(null);
  const [mapDark, setMapDark] = useState<boolean>(true);

  const onLoad = (autocomplete: any) => setAutocomplete(autocomplete);

  // Have map default to London
  const [coordinates, setCoordinates] = useState({
    lat: 51.50664715370115,
    lng: -0.12668398689018545
  });

  const onPlaceChanged = () => {
    if (autocomplete) {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  }

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
    <>
      <Heading my={3}>Select Venues : </Heading>
      <Flex direction="column" justifyContent="center" w="full" bg="#122A48" p={7} borderLeftRadius={0} borderRightRadius={10} border="1px solid white">
        <Flex>
          <Box w="80%">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input fontSize="2xl" py="6" placeholder="Search for a location" bgColor="#255fb3" w="95%" />
            </Autocomplete>
          </Box>
        </Flex>
        <Flex className="venue-picker" maxH="40rem" my={5} >
          <Box w="26rem" flexShrink="0" >
            <VenueList
              venues={venues}
              selectedVenues={selectedVenues}
              addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
              isLoading={isLoading}
            />
          </Box>
          <Box flexGrow="1">
            <Map
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              setBounds={setBounds}
              venues={venues}
              selectedVenues={selectedVenues}
              addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
            />
          </Box>
        </Flex>
        <VenueGrid
          venues={selectedVenues}
          addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
        />
      </Flex>
    </>
  )
}

VenueSelector.propTypes = {
  selectedVenues: PropTypes.any.isRequired,
  setSelectedVenues: PropTypes.func.isRequired
}

export default VenueSelector;