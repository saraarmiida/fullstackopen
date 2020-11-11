import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import { useEffect } from 'react'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const newPersons = newFilter
		? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
		: persons

	const addPerson = (event) => {
		event.preventDefault()
		const nameObject = {
			name: newName,
			number: newNumber
		}

		if (persons.map(person => person.name).indexOf(newName) !== -1) {
			alert(`${newName} is already added to phonebook`)
		} else {
			personService
				.create(nameObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<h2>Add a new</h2>
			<PersonForm onSubmit={addPerson}
				nameValue={newName}
				nameOnChange={handleNameChange}
				numberValue={newNumber}
				numberOnChange={handleNumberChange} />
			<h2>Numbers</h2>
			<Numbers persons={newPersons} handleClick={handlePersonDelete} />
		</div>
	)
}

export default App
