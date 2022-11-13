import './css/styles.css';
import fetchCountries from './fetchcountries';
import { Notify } from 'notiflix';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const body = document.querySelector('body');

input.style.cssText +=
  'font-size:16px; border-style:outset; border-width:3px; border-radius:0px; border-color:#30bf8f; padding:10px; font-family:serif; font-weight:normal; font-style:none; box-shadow: 10px 9px 7px 0px rgba(64,97,72,.70);';
body.style.cssText +=
  'background-color: #8EC5FC; background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);';

function fetch(country) {
  clearOutput();
  if (country.target.value.trim() != '') {
    fetchCountries(country.target.value.trim())
      .then(countriesMarkup)
      .catch(error => {
        Notify.failure('Oops, there is no country with that name', error);
      });
  }
}

function clearOutput() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function countriesMarkup(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (country.length >= 2 && country.length <= 10) {
    countriesList(country);
  } else if (country.length === 1) {
    countryShow(country);
  } else if (!response.ok) {
    Notify.failure('Oops, there is no country with that name');
  }
}

function countriesList(list) {
  const markup = list
    .map(({ flags, name }) => {
      return `<li>
          <img src="${flags.svg}" width="100px">
          <p>${name.official}</p>
          </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);
}

function countryShow(response) {
  const markup = response
    .map(el => {
      return `<div><img class="img" src="${el.flags.svg}" width=100 alt="flag">
          <h1>${el.name.official}</h1></div>
          <ul>
          <li ><span >Capital:
            </span>${el.capital}</li>
          <li ><span>Population:
            </span>${el.population}</li>
          <li ><span>Languages:
            </span>${Object.values(el.languages)}</li>
        </ul>`;
    })
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

input.addEventListener('input', debounce(fetch, DEBOUNCE_DELAY));
