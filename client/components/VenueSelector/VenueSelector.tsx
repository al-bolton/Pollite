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
  const [selectedVenues, setSelectedVenues] = useState<Venue[]>(new Array<Venue>());
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
      const changedVenue = newSet.splice(i,1)[0];

      setSelectedVenues(newSet);
      setVenues([...venues, changedVenue]);
    } else {
      const i = venues.indexOf(venue);
      const newSet = [...venues];
      const changedVenue = newSet.splice(i, 1)[0];

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
      <VenueList
        venues={venues}
        selectedVenues={selectedVenues}
        addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
      />
      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        venues={venues}
        selectedVenues={selectedVenues}
        addRemoveVenue={(venue: Venue) => addRemoveVenue(venue)}
      />
    </div>
  )
}

export default VenueSelector;