import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getVenueData(req: NextApiRequest, res: NextApiResponse) {
  const {sw, ne} = JSON.parse(req.body)

  console.log('Making an API request');

  try {
    const options = {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_TRAVEL_API_KEY
      }
    };

    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      options
    );
    res.json(data);
  } catch (err) {
    console.log('Error in RapidAPI travel advisor API request \n', err);
  }
}