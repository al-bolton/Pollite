import { VStack, Box, Spinner } from '@chakra-ui/react';
import VenueCard from 'components/VenueCard/VenueCard';
import { Venue } from 'data/types/Venue.type';
import PropTypes from "prop-types";


type Props = {
  venues: Venue[],
  addRemoveVenue: Function,
  isLoading: boolean
}

const VenueList: React.FC<Props> = ({ venues, addRemoveVenue, isLoading }) => {
  return (
    <VStack maxH="full" overflowY="scroll" w="full" >
      {
        isLoading ? <Box py="73.5%">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            data-testid="loading-spinner"
          />
        </Box> :
          venues?.map((venue, i) =>
            // <Box key={i} data-testid={`venue-card-${i}`}>
              <VenueCard venue={venue} addRemoveVenue={addRemoveVenue} key={i} />
            )

      }
    </VStack>
  )
};

VenueList.propTypes = {
  venues: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default VenueList;