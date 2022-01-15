import { Wrap, Box, Image, Text, Checkbox } from '@chakra-ui/react';

type Props = {
  dates: any[],
  addRemoveDate: Function
}

const DateGridSelector: React.FC<Props> = ({ dates, addRemoveDate }) => {
  return (
    <Wrap width='80%' wrap='wrap' justify-content='center' flex-basis='23%' >
      {
        dates.map((date, i) => {
          return (
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={e => addRemoveDate(date)} key={i}>
              <Text>{date.dateString}</Text>
              <Checkbox></Checkbox>
            </Box>
          )
        })
      }
    </Wrap>
  )
}

export default DateGridSelector;