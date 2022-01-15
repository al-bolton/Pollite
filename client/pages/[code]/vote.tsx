import { GetServerSideProps } from 'next';

import { Venue } from '../../data/types/Venue.type';

type Props = {
  title: string,
  dates: string[],
  venues: Venue[],
}

const PollVoter: React.FC<Props> = ({ title, dates, venues}) => {
  return (
    <>
    <h1>{title}</h1>
    </>
  )
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

export default PollVoter;