import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";

import { DBDate } from 'data/types/db/DBDate.type';
import { DBVenue } from 'data/types/db/DBVenue.type';

type Props = {
  title: string,
  dates: DBDate[],
  venues: DBVenue[],
}

const PollResults: React.FC<Props> = ({ title, dates, venues }) => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <Container>
      <Heading>Poll results for </Heading>
      <Text>Poll title: {title}</Text>
      <Text>Poll code: {code}</Text>
      <VStack>
        {
          dates.map((date, i) => {
            return (
              <Box key={i.toString()}>
                <Text>{date.dateString}</Text>
                <Text>{date.votes}</Text>
              </Box>
            )
          })
        }
      </VStack>
      <VStack>
        {
          venues.map((venue, i) => {
            return (
              <Box key={i.toString()}>
                <Text>{venue.name}</Text>
                <Text>{venue.votes}</Text>
              </Box>
            )
          })
        }
      </VStack>
    </Container>
  )
}

PollResults.propTypes = {
  title: PropTypes.string.isRequired,
  dates: PropTypes.any.isRequired,
  venues: PropTypes.any.isRequired
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/polls/${params?.code}/`);

  const data = await response.json();

  return {
    props: {
      title: data.title,
      dates: data.dates,
      venues: data.venues
    }
  }
}

export default PollResults;
