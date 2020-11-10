import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <p>
      capital {country.capital}<br/>
      population {country.population}
    </p>
    <h2>languages</h2>
    <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="flag"></img>
  </div>
)

const Countries = ({countries}) => {
  if (countries.length === 1) {
    console.log(countries)
    return (
      <Country country={countries[0]}/>
    )
  } else if (countries.length <= 10) {
  return (
      <ul>
        {countries.map(country => <li key={country.name}>{country.name}</li>)}
      </ul>
  )
  }
  return (
    <div>
      <p>Too many matches, specify more</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  
  const newCountries = newFilter
    ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    : countries
  console.log(newCountries)

  const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange}/>
      <Countries countries={newCountries}/>
    </div>
  );
}

export default App;
