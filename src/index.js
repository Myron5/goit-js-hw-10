const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.status);
      return resp.json();
    })
    .catch(err => console.log(err));
}

fetchCountries('peru').then(data => console.log(data));

console.log('Commit');
