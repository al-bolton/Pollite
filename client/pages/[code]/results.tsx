import { GetServerSideProps } from 'next';

import { Venue } from '../../data/types/Venue.type';

type Props = {
  title: string,
  dates: string[],
  venues: Venue[],
}

const PollVoter: React.FC<Props> = () => {
  return (
    <h1>Hallo</h1>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/polls/${params?.code}/`,{
    method: 'GET',
    headers: { ContentType: 'application/json' },
  });
  const data = await response.json();
  console.log(data);

  return {
    props: {
      title: data.title,
      dates: data.dates,
      venues: data.venues
    }
  }

}

export default PollVoter;