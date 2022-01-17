import { Box, VStack, Text, Image } from '@chakra-ui/react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Venue } from '../../data/types/Venue.type';
import styles from './Map.module.css';
import PropTypes from "prop-types";


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
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true
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
  addRemoveVenue: PropTypes.func.isRequired,
}

export type VenueMarkerProps = {
  lat: Number,
  lng: Number,
  venue: Venue,
  addRemoveVenue: Function,
  selected: boolean
}

export const VenueMarker: React.FC<VenueMarkerProps> = ({ venue, addRemoveVenue, selected }) => {
  const cardBG = selected ? '#5ad186' : 'white';

  return (
    <Box className={styles.card} style={{ backgroundColor: cardBG }} onClick={e => addRemoveVenue(venue)}>
      <VStack>
        <Text>{venue.name}</Text>
        <Image src={venue.photo?.images.large.url || venue.imgUrl || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} maxW="full"></Image>
      </VStack>
    </Box>
  )
}

VenueMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  venue: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Map;