import React from 'react'

const Numbers = ({ persons, handleClick }) => {
	return (
		<div>
			{persons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => handleClick(person.id)}>delete</button></div>)}
		</div>
	)
}

export default Numbers