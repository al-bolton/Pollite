import NavBar from 'components/NavBar/NavBar';
import Head from 'next/head';
import CallToAction from 'components/indexPage/CallToAction/CallToAction';

export default function Home() {
  return (
    <>
      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABfK13VJIVVrl_98sPKMt0nldl5HRM6uM"></script>
      </Head>
      <NavBar />
      <CallToAction />
    </>
  )
}
