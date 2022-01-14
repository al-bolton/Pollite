import { VStack, Box, Image, Text } from '@chakra-ui/react';
import { Venue } from '../../types/Venue.type';

type Props = {
  venues: Venue[],
  selectedVenues: Venue[],
  addRemoveVenue: Function
}

const VenueList: React.FC<Props> = ({ venues, addRemoveVenue }) => {
  return (
    <VStack maxH="full" overflowY="scroll" >
      {
        venues?.map((venue) => {
          const altText = `Image for ${venue.name}`;
          return (
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' minH="10rem" onClick={e => addRemoveVenue(venue)}>
              <Image src={venue.photo.images.large.url} alt={altText} maxW="full" />
              <Text>{venue.name}</Text>
            </Box>
          )
        })
      }
    </VStack>
  )
}

export default VenueList;