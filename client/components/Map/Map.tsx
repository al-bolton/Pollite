import GoogleMapReact, { Coords } from 'google-map-react';
import { Venue } from '../../types/Venue.type';
import styles from './Map.module.css';

type Props = {
  coordinates: Coords,
  setCoordinates: Function,
  setBounds: Function,
  venues: Venue[],
  selectedVenues: Venue[],
  addRemoveVenue: Function
}

const Map: React.FC<Props> = ({ coordinates, setCoordinates, setBounds, venues, selectedVenues, addRemoveVenue}) => {

  return (
    <div className={styles.map_container}>
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

    </div>
  )
}

type VenueMarkerProps = {
  lat: Number,
  lng: Number,
  venue: Venue,
  addRemoveVenue: Function,
  selected: boolean
}

const VenueMarker: React.FC<VenueMarkerProps> = ({ venue, addRemoveVenue, selected }) => {
  const cardBG = selected ? 'green': 'red';

  return (
    <div className={styles.card} style={{backgroundColor: cardBG}} onClick={(e) => {
      console.log('clicked me');
      addRemoveVenue(venue);
    }}>
      <p>{venue.name}</p>
      <img src={venue.photo ? venue.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}></img>
    </div>
  )
}

export default Map;