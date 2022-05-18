import { useState } from 'react';
import { getWeatherData } from './services/fetch-utils';
import Spinner from './Spinner';

export default function WeatherSearch() {
  // you'll need to track your weather search results, the loading state, and a form field for location with a default value.
  const [weatherData, setWeatherData] = useState([]);
  const [weatherQuery, setWeatherQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleWeatherSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify weather function. Be sure to pass the location as a query param in the URL
    const response = await getWeatherData(weatherQuery);

    // put the jsonified data in state and set the loading state to false
    setWeatherData(response.weatherData.daily);
    setIsLoading(false);
  }

  return (
    <section className="weather">
      {/* make the fetch on submit */}
      <form onSubmit={handleWeatherSubmit}>
        <input onChange={(e) => setWeatherQuery(e.target.value)} />
        Search weather for a city
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <button>Get weather</button>
      </form>
      {/* Make a ForecastList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {isLoading ? (
        <Spinner />
      ) : (
        weatherData.map(({ temp, clouds, dt }, i) => (
          <div key={temp + clouds + dt + i}>
            <h2>{temp.day} degrees</h2>
            <p>{clouds}% cloud cover</p>
            <p>{String(new Date(dt * 1000))}</p>
          </div>
        ))
      )}
    </section>
  );
}
