import { Box, Stack, Text, Image, Center, Heading } from '@chakra-ui/react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Venue } from '../../data/types/Venue.type';
import styles from './Map.module.css';
import PropTypes from "prop-types";

import darkMapStyles from './mapStyles';


type Props = {
  coordinates: Coords,
  setCoordinates: Function,
  setBounds: Function,
  venues: Venue[],
  selectedVenues: Venue[],
  addRemoveVenue: Function
}

const Map: React.FC<Props> = ({ coordinates, setCoordinates, setBounds, venues, selectedVenues, addRemoveVenue }) => {

  return (
    <Box w="full" className={styles.map_container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 51.50664715370115,
          lng: -0.12668398689018545
        }}
        center={coordinates}
        defaultZoom={18}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: darkMapStyles
        }}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng
          });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw
          })
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
  )
}

Map.propTypes = {
  coordinates: PropTypes.any.isRequired,
  setCoordinates: PropTypes.func.isRequired,
  setBounds: PropTypes.func.isRequired,
  venues: PropTypes.any.isRequired,
  selectedVenues: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired
}

export type VenueMarkerProps = {
  lat: Number,
  lng: Number,
  venue: Venue,
  addRemoveVenue: Function,
  selected: boolean
}

export const VenueMarker: React.FC<VenueMarkerProps> = ({ venue, addRemoveVenue, selected }) => {
  const cardBG = selected ? '#99ffbe' : 'white';
  const imgString = venue.photo?.images.large.url || venue.imgUrl || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';

  return (
    <Center py={2} onClick={e => addRemoveVenue(venue)} w={40} overflow="hidden" h="8rem">
      <Box
        role={'group'}
        p={3}
        h='full'
        bg={cardBG}
        boxShadow={'xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        w={40}>
          <Image
            rounded={'lg'}
            height="70%"
            width={'100%'}
            objectFit={'cover'}
            src={imgString}
          />
          <Text pt={2} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'} isTruncated>
            {venue.name}
          </Text>
      </Box>
    </Center>
  );
}

VenueMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  venue: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Map;