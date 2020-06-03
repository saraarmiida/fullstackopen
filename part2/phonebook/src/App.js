import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

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
			setPersons(persons.concat(nameObject))
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
			<Numbers persons={newPersons} />
		</div>
	)
}

export default App

// import React, { useState } from 'react'

// const Box = (props) => {
// 	return (
// 		<div>{props.text}<input
// 			value={props.value}
// 			onChange={props.onChange} />
// 		</div>
// 	)
// }

// const PersonForm = (props) => {
// 	return (
// 		<form onSubmit={props.addPerson}>
// 			<Box text='name:' value={props.newName} onChange={props.handleNameChange} />
// 			<Box text='number:' value={props.newNumber} onChange={props.handleNumberChange} />
// 			<div>
// 				<button type="submit">add</button>
// 			</div>
// 		</form>
// 	)
// }

// const App = () => {
// 	const [persons, setPersons] = useState([
// 		{ name: 'Arto Hellas', number: '040-123456' },
// 		{ name: 'Ada Lovelace', number: '39-44-5323523' },
// 		{ name: 'Dan Abramov', number: '12-43-234345' },
// 		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
// 	])
// 	const [newName, setNewName] = useState('')
// 	const [newNumber, setNewNumber] = useState('')
// 	const [newFilter, setNewFilter] = useState('')


// 	const newPersons = newFilter
// 		? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
// 		: persons

// 	const addPerson = (event) => {
// 		event.preventDefault()
// 		const nameObject = {
// 			name: newName,
// 			number: newNumber
// 		}

// 		if (persons.map(person => person.name).indexOf(newName) !== -1) {
// 			alert(`${newName} is already added to phonebook`)
// 		} else {
// 			setPersons(persons.concat(nameObject))
// 		}
// 		setNewName('')
// 		setNewNumber('')
// 	}

// 	const handleNameChange = (event) => {
// 		setNewName(event.target.value)
// 	}

// 	const handleNumberChange = (event) => {
// 		setNewNumber(event.target.value)
// 	}

// 	const handleFilterChange = (event) => {
// 		setNewFilter(event.target.value)
// 	}

// 	return (
// 		<div>
// 			<h2>Phonebook</h2>
// 			<div>filter shown with
// 			  <input
// 					value={newFilter}
// 					onChange={handleFilterChange}
// 				/>
// 			</div>
// 			<h3>Add a new</h3>
// 			<PersonForm name={newName}
// 				number={newNumber}
// 				onChange={addPerson}
// 				handleNameChange={handleNameChange}
// 				handleNumberChange={handleNumberChange} />
// 			<h3>Numbers</h3>
// 			<div>
// 				{newPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
// 			</div>
// 		</div>
// 	)
// }

// export default App