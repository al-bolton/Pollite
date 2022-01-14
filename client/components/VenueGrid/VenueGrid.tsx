import { Wrap, Box, Image, Text } from '@chakra-ui/react';
import { Venue } from '../../data/types/Venue.type';

type Props = {
  venues: Venue[],
  addRemoveVenue: Function
}

const VenueGrid: React.FC<Props> = ({ venues, addRemoveVenue }) => {
  return (
    <Wrap width='80%' wrap='wrap' justify-content='center' flex-basis='23%' >
      {
        venues.map((venue: Venue, i) => {
          const altText = `Image for ${venue.name}`;
          return (
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={e => addRemoveVenue(venue)} key={i}>
              <Image src={venue.photo.images.large.url} alt={altText} maxW="full" />
              <Text>{venue.name}</Text>
            </Box>
          )
        })
      }
    </Wrap>
  )
}

export default VenueGrid;