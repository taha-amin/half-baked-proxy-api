import { useState } from 'react';
import { getPokemons } from './services/fetch-utils';
import Spinner from './Spinner';

export default function PokemonSearch() {
  // you'll need to track your pokemon search results, the loading state, and one form field: name. For this form field, set a real initial values (like 'pikachu') so the form populates with a default value.
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('pikachu');
  const [isLoading, setIsLoading] = useState(false);

  async function handlePokemonSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify pokemon function. Be sure to pass the pokemon name as a query param in the URL
    const {
      data: { results },
    } = await getPokemons(query);

    // put the jsonified data in state and set the loading state to false
    setIsLoading(false);

    setPokemons(results);
  }

  return (
    <section className="pokemon">
      {/* make the fetch on submit */}
      <form onSubmit={handlePokemonSubmit}>
        <input onChange={(e) => setQuery(e.target.value)} />
        {/* add inputs/labels for the pokemon name, using all the things we need with react forms. Don't forget to use the value property to sync this up with the default value in react state */}
        <button>Search</button>
      </form>
      {/* Make a PokemonList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {isLoading ? (
        <Spinner />
      ) : (
        pokemons.map(({ pokemon, height, weight, url_image }, i) => (
          <div key={pokemon + i}>
            <h2>Name: {pokemon}</h2>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <img src={url_image} />
          </div>
        ))
      )}
    </section>
  );
}
