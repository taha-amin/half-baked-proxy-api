export async function getPokemons(searchFilter) {
  const rawResponse = await fetch(`/.netlify/functions/pokemon?searchFilter=${searchFilter}`);
  const data = await rawResponse.json();

  return data;
}

export async function getYelData(searchFilter) {
  const rawResponse = await fetch(`/.netlify/functions/yelp?searchFilter=${searchFilter}`);
  const data = await rawResponse.json();

  return data;
}

export async function getWeatherData(searchFilter) {
  const rawResponse = await fetch(`/.netlify/functions/weather?searchFilter=${searchFilter}`);
  const data = await rawResponse.json();

  return data;
}
