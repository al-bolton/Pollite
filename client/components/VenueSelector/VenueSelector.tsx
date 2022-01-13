import { useState, useEffect } from 'react';
import { getVenueData } from '../../api/venueGrabber';

import { Bounds } from '../../types/Bounds.type';
import { Venue } from '../../types/Venue.type';

import Map from '../Map/Map';
import VenueList from '../VenueList/VenueList';

type Props = {

}

const VenueSelector: React.FC<Props> = () => {
  const [venues, setVenues] = useState<Venue[]>(new Array<Venue>());
  const [bounds, setBounds] = useState<null | Bounds>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Have map default to London
  const [coordinates, setCoordinates] = useState({
    lat: 51.50664715370115,
    lng: -0.12668398689018545
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);      

      getVenueData(bounds.sw, bounds.ne)
        ?.then((data: Venue[]) => {
          console.log(data);

          setVenues(data?.filter((venue: Venue) => venue.name && venue.num_reviews > 0));
          setIsLoading(false);
        });
    }
  }, [bounds]);


  return (
    <div className="venue-picker">
      <VenueList venues={venues} />
      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        venues={venues}
      />
    </div>
  )
}

export default VenueSelector;