import { useState } from 'react';
import { getYelpData } from './services/fetch-utils';
import Spinner from './Spinner';

export default function YelpSearch() {
  // you'll need to track your yelp search results, the loading state, and a form field for location with a default value.
  const [yelpData, setYelpData] = useState([]);
  const [yelpQuery, setYelpQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleYelpSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify yelp function. Be sure to pass the search query as a query param in the URL
    const response = await getYelpData(yelpQuery);

    // put the jsonified data in state and set the loading state to false
    setYelpData(response.data.businesses);
    setIsLoading(false);
  }

  return (
    <section className="yelp">
      {/* make the fetch on submit */}
      <form onSubmit={handleYelpSubmit}>
        <input onChange={(e) => setYelpQuery(e.target.value)} />
        Search yelp for a city
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <button>Search yelp</button>
      </form>
      {/* Make a BusinessesList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {isLoading ? (
        <Spinner />
      ) : (
        yelpData.map(({ name, price, phone, image_url }, i) => (
          <div key={name + i}>
            <h2>{name}</h2>
            <p>${price}</p>
            <p>{phone}</p>
            <img src={image_url} />
          </div>
        ))
      )}
    </section>
  );
}
