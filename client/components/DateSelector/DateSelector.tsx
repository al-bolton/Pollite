import { Calendar } from 'react-multi-date-picker';
import type { Value } from 'react-multi-date-picker';

import styles from './DateSelector.module.css';

type Props = {
  dates: Value,
  setDates: Function
}

const DateSelector: React.FC<Props> = ({ dates, setDates }) => {
  return (
    <div>
      <h1>Select Dates: </h1>
      <Calendar value={dates} onChange={date => setDates(date)} format={"DD/MM/YYYY"} />
      <div className={styles.dates_selected}>
        {
          dates?.toString()
            .split(',')
            .sort(function (a, b) {
              // Convert date in format for both "26/06/2016" to 20160626 to sort them
              // First we split
              const aVals = a.split('/');
              const bVals = b.split('/');
              // Then compare
              return Number(aVals[2] + aVals[1] + aVals[0]) - Number(bVals[2] + bVals[1] + bVals[0]);
            })
            .map((date, i) => <h1 key={i}>{date}</h1>)
        }
      </div>
    </div>)
}

export default DateSelector;
