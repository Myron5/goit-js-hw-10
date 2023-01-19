import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inpotBoxRef = document.querySelector('#search-box');
const countryInfoRef = document.querySelector('.country-info');

inpotBoxRef.addEventListener(
  'input',
  debounce(() => {
    const val = inpotBoxRef.value.trim();
    if (val)
      fetchCountries(val)
        .then(data => displayData(data))
        .catch(err => {
          if (err.message == 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            countryInfoRef.innerHTML = '';
          } else console.log(err.message);
        });
    else countryInfoRef.innerHTML = '';
  }, DEBOUNCE_DELAY)
);

function displayData(data) {
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfoRef.innerHTML = '';
  } else if (data.length == 1) {
    createOnceMarkup(data[0]);
  } else {
    createListMarkup(data);
  }
}

function createOnceMarkup(country) {
  const markup = `
    <div class="card">
      <div class="card-img-thumb">
        <img
          src="${country.flags.svg}"
          class="card-img"
        />
      </div>
      <h2 class="card-title">${country.name.official}</h2>
      <p class="card-text"><span class="card-text-bold">Capital:</span> ${
        country.capital
      }</p>
      <p class="card-text"><span class="card-text-bold">Population:</span> ${
        country.population
      }</p>
      <p class="card-text"><span class="card-text-bold">Languages:</span> ${Object.values(
        country.languages
      ).join(', ')}</p>
    </div>
  `;
  countryInfoRef.innerHTML = markup;
}

function createListMarkup(data) {
  const markup =
    '<ul class="list">' +
    data
      .map(
        country => ` 
        <li class="item">
          <div class="item-img-thumb">
            <img
              src="${country.flags.svg}"
              class="item-img"
            />
          </div>
          <p class="item-title">${country.name.official}</p>
        </li>`
      )
      .join('') +
    ' </ul>';
  countryInfoRef.innerHTML = markup;
}
