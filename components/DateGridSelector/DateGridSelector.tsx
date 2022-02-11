import { Wrap, Flex, Text, Checkbox } from '@chakra-ui/react';
import PropTypes from "prop-types";
import { useState } from 'react';
import styles from './DateGridSelector.module.css'

type Props = {
  dates: any[],
  addRemoveDate: Function
}

const DateGridSelector: React.FC<Props> = ({ dates, addRemoveDate }) => {
  return (
    <Wrap spacing={10} width='80%' wrap='wrap' justify='center' flex-basis='23%' my={10} alignSelf="center">
      {
        dates
          .map(date => date.dateString)
          .sort(function (a, b) {
            const aVals = a.split(' ')[1].split('/');
            const bVals = b.split(' ')[1].split('/');
            return Number(aVals[2] + aVals[1] + aVals[0]) - Number(bVals[2] + bVals[1] + bVals[0]);
          })
          .map((date, i) => {
            return (
              <DateGridItem date={date} addRemoveDate={addRemoveDate} key={i} />
            )
          })
      }
    </Wrap>
  )
}

DateGridSelector.propTypes = {
  dates: PropTypes.any.isRequired,
  addRemoveDate: PropTypes.func.isRequired
}

type DateGridItemProps = {
  date: any,
  addRemoveDate: Function,
}

const DateGridItem: React.FC<DateGridItemProps> = ({ date, addRemoveDate }) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <Flex className={selected ? styles.bounce : ''} direction="column" alignItems="center" gap={3} maxW='m' borderWidth='1px' borderRadius='lg' minH="4rem" p={4} bg={selected ? '#00661b' : "#255FB3"} border="0" >
      <Text fontSize="3xl" m={0} p={0}>{date}</Text>
      <Checkbox size="lg" onChange={e => {
        addRemoveDate(date);
        setSelected(!selected);
        selected
      }} bg={selected ? '#00661b' : "#255FB3"}></Checkbox>
    </Flex>
  )
}

DateGridItem.propTypes = {
  date: PropTypes.any.isRequired,
  addRemoveDate: PropTypes.func.isRequired,
}

export default DateGridSelector;