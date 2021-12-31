import { sanFranciscoWeatherInfo, searchData } from '../weatherInfo';
// import axios from 'axios';
// const baseUrl = 'https://www.metaweather.com/api/';


// Data will be static for now

const locationSearch =  (searchParam) => {
  try {
    // console.log('Inside locationSearch', searchData)
    return searchData;
  } catch (error) {
    console.log(error);
  }
}

const getWeatherData =  (woeid) => {
  try {
    // make a request to get data for a specific id
    // console.log('Inside getWeatherData', sanFranciscoWeatherInfo)
    return sanFranciscoWeatherInfo;
  } catch (error) {
    console.log(error);
  }
}


export default {
  locationSearch,
  getWeatherData,
}