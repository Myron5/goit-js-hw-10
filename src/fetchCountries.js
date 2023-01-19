const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  const options = `${name}?fields=name,capital,population,flags,languages`;
  return fetch(`${BASE_URL}/${options}`).then(resp => {
    if (!resp.ok) throw new Error(resp.status);
    return resp.json();
  });
}
