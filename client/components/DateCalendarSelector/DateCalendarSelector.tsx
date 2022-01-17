import { Calendar } from 'react-multi-date-picker';
import type { Value } from 'react-multi-date-picker';
import PropTypes from "prop-types";


import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Flex, Heading, Wrap, Box, Center, Text } from '@chakra-ui/react';

type Props = {
  dates: Value,
  setDates: Function
}

const DateSelector: React.FC<Props> = ({ dates, setDates }) => {
  return (
    <>
      <Heading my={3}>Select Dates : </Heading>
      <Flex w="full" bg="#122A48" p={7} borderLeftRadius={0} borderRightRadius={10} border="1px solid white" >
        <Center w="30%" center="true" alignSelf="flex-start">
        <Calendar value={dates} onChange={date => setDates(date)} format={"DD/MM/YYYY"} className="bg-dark" />
        </Center>
        <Box w="70%">

        <Wrap spacing={10}>
          {
            dates?.toString() !== "" && dates?.toString()
              .split(',')
              .sort(function (a, b) {
                // Convert date in format for both "26/06/2016" to 20160626 to sort them
                // First we split
                const aVals = a.split('/');
                const bVals = b.split('/');
                // Then compare
                return Number(aVals[2] + aVals[1] + aVals[0]) - Number(bVals[2] + bVals[1] + bVals[0]);
              })
              .map((date, i) => {
                return (
                  <Box maxW='m' borderWidth='1px' borderRadius='lg' minH="4rem" p={4} bg="#255FB3" border="0" key={i} >
                    <Text fontSize="3xl" m={0} p={0} >{date}</Text>
                  </Box>
                )
              })
          }
        </Wrap>
        </Box>

      </Flex>
    </>
  )
}

DateSelector.propTypes = {
  dates: PropTypes.any.isRequired,
  setDates: PropTypes.func.isRequired
}

export default DateSelector;
