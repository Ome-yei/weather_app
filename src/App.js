import { useEffect, useState } from 'react';
import './App.css';

import weatherService from './services/weather';


/*************WeatherHome Component**************/
function WeatherHome({ todaysWeatherInfo, locationName }) {
  return (
    <>
      <SearchForPlaceBtn />
      <MyCurrentLocation />

      <WeatherImage weatherStateAbbr={todaysWeatherInfo.weather_state_abbr} />

      <WeatherTemp
        temp={todaysWeatherInfo.the_temp}
        weatherStateAbbr={todaysWeatherInfo.weather_state_abbr}
        weatherStateName={todaysWeatherInfo.weather_state_name}
      />
      <WeatherInfo
        date={todaysWeatherInfo.applicable_date}
        place={locationName}
      />
    </>
  )
}

function SearchForPlaceBtn() {
  return <button>Search for places</button>;
}

function MyCurrentLocation() {
  return <button>Current Location</button>;
}

function WeatherImage({ weatherStateAbbr, weatherStateName }) {
  return (
    <div>
      <img src={require(`./images/${weatherStateAbbr}.png`)} alt={weatherStateName} />
    </div>
  );
}

function WeatherTemp({ temp, weatherStateName }) {
  return (
    <div>
      <p>{temp}</p>
      <p>{weatherStateName}</p>
    </div>
  );
}
function WeatherInfo({ date, place }) {
  return (
    <div>
      <p>{date}</p>
      <p>{place}</p>
    </div>
  );
}
/******************************************************/

/*************WeatherWeek Component**************/
function WeatherWeek({ upcomingDays }) {
  return (
    <>
      <WeekContainer>
        {
          upcomingDays.map(day => {
            return <WeatherCard
              date={day.applicable_date}
              imgId={day.weather_state_abbr}
              imgDesc={day.weather_state_name}
              maxTemp={day.max_temp}
              minTemp={day.min_temp}
            />
          })
        }
      </WeekContainer>
    </>
  )
}

function WeekContainer({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function WeatherCard({ date, imgId, imgDesc, maxTemp, minTemp }) {
  return (
    <div>
      <p>{date}</p>
      <img
        src={require(`./images/${imgId}.png`)}
        alt={imgDesc}
      />
      <div>
        <p>{maxTemp}</p>
        <p>{minTemp}</p>
      </div>
    </div>
  )
}

/******************************************************/

/*************WeatherHighlights Component**************/
function WeatherHighlights({ todayHighlights }) {
  return (
    <>
      <HighlightsContainer>
        {
          todayHighlights.map(hilight => {
            return <WeatherStatusCard
              name={hilight.name}
              data={hilight.data}
            />
          })
        }
      </HighlightsContainer>
    </>
  )
}

function HighlightsContainer({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function WeatherStatusCard({ name, data }) {
  return (
    <div>
      <p>{name}</p>
      <p>{data}</p>
    </div>
  )
}
/******************************************************/


/*************WeatherNav Component**************/
function WeatherNav({ searchData }) {
  return (
    <div>
      <WeatherSearch />
      <SearchResults>
        {
          searchData.map(data => {
            return <Place name={data.title} />
          })
        }
      </SearchResults>
    </div>
  )
}

function WeatherSearch() {
  return (
    <form>
      <input />
      <button>Search</button>
    </form>
  )
}

function SearchResults({ children }) {
  return (
    <ul>
      {children}
    </ul>
  )
}

function Place({ name }) {
  return <li>{name}</li>
}
/******************************************************/

function App() {
  const [locationWeatherInfo, setLocationWeatherInfo] = useState();
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    setSearchLocation(weatherService.locationSearch());
    setLocationWeatherInfo(weatherService.getWeatherData());
  }, [])

  console.log('locationWeather', locationWeatherInfo);
  console.log('searchLocation', searchLocation);

  const handleInitialLoad = () => {
    if (locationWeatherInfo) {
      const today = locationWeatherInfo.consolidated_weather[0];
      const name = locationWeatherInfo.title;

      const upcomingDays = locationWeatherInfo.consolidated_weather;

      const todayHighlights = [
        { name: 'Wind Status', data: today.wind_speed },
        { name: 'Humidity', data: today.humidity },
        { name: 'Visibility', data: today.visibility },
        { name: 'Air Pressure', data: today.air_pressure }
      ]
      return <>
        <WeatherHome todaysWeatherInfo={today} locationName={name} />
        <WeatherWeek upcomingDays={upcomingDays} />
        <WeatherHighlights todayHighlights={todayHighlights} />
        <WeatherNav searchData={searchLocation} />
      </>
    }
    else { return 'no info to display' }
  }
  return (
    <div className="App">
      {handleInitialLoad()}
    </div>
  );
}

export default App;
