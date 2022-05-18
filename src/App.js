import PokemonSearch from './PokemonSearch';
import YelpSearch from './YelpSearch';
import WeatherSearch from './WeatherSearch';
import { getPokemons, getYelpData, getWeatherData } from './services/fetch-utils';
import './App.css';
import Spinner from './Spinner';

function App() {
  return (
    <div className="App">
      <PokemonSearch />
      <YelpSearch />
      {/* stretch goal: <WeatherSearch /> */}
    </div>
  );
}

export default App;
