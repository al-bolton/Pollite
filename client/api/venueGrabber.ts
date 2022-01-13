import axios from 'axios';
import { Coord } from '../types/Coord.type';
import _ from 'lodash';

export const getVenueData = _.throttle(async (sw: Coord, ne: Coord) => {
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
        'x-rapidapi-key': '94d67729d7msh00494b31a3e4928p1dce75jsnb6d31c6c267a'
      }
    };
    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
      options
    );
    return data;
  } catch (err) {
    console.log('Error in RapidAPI travel advisor API request \n', err);
  }
}, 3000);