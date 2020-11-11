import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

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
      <Countries countries={newCountries} setFilter={setNewFilter}/>
    </div>
  );
}

export default App;
