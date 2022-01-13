import Head from 'next/head';
import { useState } from 'react';

// DatePicker imports
import { Calendar } from 'react-multi-date-picker';
import type { Value } from 'react-multi-date-picker';

import styles from '../styles/CreatePoll.module.css';

type Props = {

}

const CreatePoll: React.FC<Props> = () => {
  const [date, setDate] = useState<Value>([]);

  return (
    <>
      <Head>
        <title>Pollite: Create a Poll</title>
        <meta name="description" content="Create a poll using Pollite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"date-picker"}>
        <h1>Dates:</h1>
        <Calendar value={date} onChange={date => setDate(date)} format={"DD/MM/YYYY"} />
        <div className={styles.dates_selected}>
          {
            date.toString()
              .split(',')
              .sort(function (a, b) {
                // Convert date in format for both "26/06/2016" to 20160626 to sort them
                // First we split
                const aVals = a.split('/');
                const bVals = b.split('/');
                // Then compare
                return Number(aVals[2] + aVals[1] + aVals[0]) - Number(bVals[2] + bVals[1] + bVals[0]);
              })
              .map(date => <h1>{date}</h1>)
          }
        </div>
      </div>
      <div className="venue-picker">
        <h1>Venues:</h1>
      </div>
    </>
  )

}

export default CreatePoll;