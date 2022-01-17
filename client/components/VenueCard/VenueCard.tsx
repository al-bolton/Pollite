import { Box, Image, Flex, Badge } from '@chakra-ui/react';
import { Venue } from '../../data/types/Venue.type';
import PropTypes from "prop-types";


type Props = {
  venue: Venue,
  addRemoveVenue: Function,
}

const VenueCard: React.FC<Props> = ({ venue, addRemoveVenue }) => {
  const altText = `Image for ${venue.name}`;

  return (
    <Flex w="sm" alignItems="center" justifyContent="center" >
      <Box
        w="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        bgColor="#255fb3">

        <Image
          src={venue.photo?.images.large.url || venue.imgUrl || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          alt={altText}
          roundedTop="lg"
          w="100%"
          h="12rem"
          objectFit="cover"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              4.3
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {venue.name}
            </Box>
            {/* <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}>
              <chakra.a href={'#'} display={'flex'}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
              </chakra.a>
            </Tooltip> */}
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            {/* <Rating rating={venue.rating} numReviews={venue.num_reviews} /> */}
            {
              venue.price_level &&
              <Box fontSize="l" >
                <Box as="span" fontSize="l">
                  Price:
                </Box>
                {' ' + venue.price_level}
              </Box>
            }
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired,
}


export default VenueCard;