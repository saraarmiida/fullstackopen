import React from 'react'
import Country from './Country'

const PreviewCountry = ({country, setFilter}) => {
	
	const handleShowClick = () => {
		setFilter(country.name)
	}

	return (
		<p>{country.name} <button onClick={handleShowClick}>show</button></p>
	)
}

const Countries = ({countries, setFilter}) => {
	let showcountry = (null)

	if (countries.length === 1) {
		showcountry = countries[0]
	} else if (countries.length <= 10) {
	return (
		<div>
		  {countries.map(country => <PreviewCountry key={country.name} country={country} setFilter={setFilter}/>)}
		</div>
	)
	}
	if (showcountry !== (null)) {
		return (
			<Country country={showcountry}/>
		)
	}
	return (
	  <div>
		<p>Too many matches, specify more</p>
	  </div>
	)
}

export default Countries