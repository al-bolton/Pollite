import { Venue } from '../../types/Venue.type';

type Props = {
  venues: Venue[]
}

const VenueList: React.FC<Props> = ({ venues }) => {
  return (
    <div>
    {
      venues.map((venue) =>
        <h1>{venue.name}</h1>
      )
    }
    </div>
  )
}

export default VenueList;