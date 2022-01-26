import { Box, Image, Flex, Badge, Wrap } from '@chakra-ui/react';
import { Venue } from '../../data/types/Venue.type';
import PropTypes from "prop-types";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { DBVenue } from 'data/types/db/DBVenue.type';

interface RatingProps {
  rating: number;
  numReviews: Number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center" color="#e2e82c">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" fontSize="sm" color="white">
        from {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

type Props = {
  venue: Venue | DBVenue,
  addRemoveVenue: Function,
}

const VenueCard: React.FC<Props> = ({ venue, addRemoveVenue }) => {
  const altText = `Image for ${venue.name}`;
  const venuePure = venue as Venue;

  return (
    <Flex w="sm" alignItems="center" justifyContent="center" onClick={e => addRemoveVenue(venue)} >
      <Box
        w="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        bgColor="#255fb3">

        <Image
          src={venuePure.photo?.images.large.url || venue.imgUrl || 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          alt={altText}
          roundedTop="lg"
          w="100%"
          h="12rem"
          objectFit="cover"
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {venue.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center" flexDirection="column">
            <Rating rating={Number(venue.rating)} numReviews={venue.num_reviews} />
            {
              venue.price_level &&
              <Box fontSize="l" >
                <Box as="span" fontSize="l">
                  Price:
                </Box>
                {' ' + venue.price_level}
              </Box>
            }
            <Wrap py="1rem">
            {
              venuePure.cuisine.map((cuisine, i) =>
              <Badge rounded="full" px="2" fontSize="0.8em" key={i}>
                  {cuisine.name}
                </Badge>
              )
            }
            </Wrap>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.any.isRequired,
  addRemoveVenue: PropTypes.func.isRequired,
}


export default VenueCard;