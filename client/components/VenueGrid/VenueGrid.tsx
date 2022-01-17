import { Wrap } from '@chakra-ui/react';
import VenueCard from 'components/VenueCard/VenueCard'
import { Venue } from '../../data/types/Venue.type';
import PropTypes from "prop-types";

type Props = {
  venues: Venue[],
  addRemoveVenue: Function
}

const VenueGrid: React.FC<Props> = ({ venues, addRemoveVenue }) => {
  return (
    <Wrap width='100%' spacing="3.6%" wrap='wrap' justifyContent='center' flex-basis='23%' alignSelf="center">
      {
        venues?.map((venue, i) => <VenueCard venue={venue} addRemoveVenue={addRemoveVenue} key={i} />)
      }
    </Wrap>
  )
};

VenueGrid.propTypes = {
  venues: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired
}

export default VenueGrid;