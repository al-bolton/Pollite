import { Wrap, Box, Image, Text, Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';

type Props = {
  dates: any[],
  addRemoveDate: Function
}

const DateGridSelector: React.FC<Props> = ({ dates, addRemoveDate }) => {
  return (
    <Wrap width='80%' wrap='wrap' justify-content='center' flex-basis='23%' >
      {
        dates
          .map(date => date.dateString)
          .sort(function (a, b) {
            const aVals = a.split('/');
            const bVals = b.split('/');
            return Number(aVals[2] + aVals[1] + aVals[0]) - Number(bVals[2] + bVals[1] + bVals[0]);
          })
          .map((date, i) => {
            return (
              <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={e => addRemoveDate(date)} key={i}>
                <Text>{date}</Text>
                <Checkbox></Checkbox>
              </Box>
            )
          })
      }
    </Wrap>
  )
}

export default DateGridSelector;