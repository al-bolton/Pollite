import { Venue } from '../../types/Venue.type';

type Props = {
  venues: Venue[],
  selectedVenues: Venue[],
  addRemoveVenue: Function
}

const VenueList: React.FC<Props> = ({ venues, selectedVenues, addRemoveVenue }) => {
  return (
    <div>
      {
        venues?.map((venue) =>
          <h1>{venue.name}</h1>
        )
      }
      {
        selectedVenues.map((venue) =>
          <h1 style={{color: 'green'}}>{venue.name}</h1>
        )
      }

    </div>
  )
}

export default VenueList;