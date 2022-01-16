import { VStack, Box, Image, Text, Spinner } from '@chakra-ui/react';
import { Venue } from '../../data/types/Venue.type';

type Props = {
  venues: Venue[],
  selectedVenues: Venue[],
  addRemoveVenue: Function,
  isLoading: boolean
}

const VenueList: React.FC<Props> = ({ venues, addRemoveVenue, isLoading }) => {
  return (
    <VStack maxH="full" overflowY="scroll" >
      {
        isLoading ? <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        /> :
        venues?.map((venue, i) => {
          const altText = `Image for ${venue.name}`;
          return (
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' minH="10rem" onClick={e => addRemoveVenue(venue)} key={i}>
              <Image src={venue.photo?.images.large.url || venue.imgUrl || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={altText} maxW="full" />
              <Text>{venue.name}</Text>
            </Box>
          )
        })
      }
    </VStack>
  )
}

export default VenueList;