import { Box, Container, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NavBar from 'components/NavBar/NavBar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import 'animate.css';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

import { DBDate } from 'data/types/db/DBDate.type';
import { DBVenue } from 'data/types/db/DBVenue.type';
import EventPresenter from 'components/EventPresenter/EventPresenter';

type Props = {
  title: string,
  dates: DBDate[],
  venues: DBVenue[],
}

const PollResults: React.FC<Props> = ({ title, dates, venues }) => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <NavBar />
      <Container maxW="75%" pb="2rem">
        <Flex flexDirection="column" my={10} px={10} bgColor="#001027" justify="center" >
          <Heading size="2xl" my={3} alignSelf="center">Poll results for poll: {'"' + title + '"'} </Heading>
          <EventPresenter date={dates[0]} venue={venues[0]} />
          <Flex justify="space-around" w="full">
            <Flex w="40%" direction="column">
              <Text alignSelf="center" fontSize="2xl">Top date results: </Text>
              <Table variant='simple' mb={10} mt={5}>
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Date</Th>
                    <Th>No. votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    dates.slice(0, 5).map((date, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{`${i + 1}. `}</Td>
                          <Td>{date.dateString}</Td>
                          <Td>{date.votes}</Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>

            </Flex>
            <Flex w="40%" direction="column">
              <Text alignSelf="center" fontSize="2xl">Top venue results: </Text>
              <Table variant='simple' mb={10} mt={5}>
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Date</Th>
                    <Th>No. votes</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    venues.slice(0, 5).map((venue, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{`${i + 1}. `}</Td>
                          <Td>{venue.name}</Td>
                          <Td>{venue.votes}</Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
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
