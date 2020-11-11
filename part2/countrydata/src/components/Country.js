import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
	const [weather, setWeather] = useState([])

	console.log(capital)

	useEffect(() => {
		axios
		.get(`http://api.weatherstack.com/current?access_key=118e64011be8452701e1ba682f5ac160&query=${capital}`)
		.then(response => {
		  setWeather(response.data)
		})
	  }, [capital])

	console.log('weather: ', weather.current)
	if (weather.current) {
		return (
			<div>
				<h2>Weather in {capital}</h2>
				<div><b>temperature:</b> {weather.current.temperature} Celsius</div>
				<img src={weather.current.weather_icons} alt="weather icon" width={100}></img>
				<div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
			</div>
		)
	}
	return (
		<div></div>
	)
}

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
	  <img src={country.flag} alt="flag" width={200}></img>
	  <Weather capital={country.capital}/>
	</div>
)

export default Country