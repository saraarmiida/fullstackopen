import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [notificationMsg, setNotificationMsg] = useState(null)
	const [notificationType, setNotificationType] = useState(null)

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
			if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
				const person = persons.find(p => p.name === newName)
				const id = person.id
				const personUpdate = { ...person, number: newNumber }
				
				personService
					.update(id, personUpdate)
					.then(returnedPerson => {
						setNotificationMsg(`Changed number of ${newName}`)
						setNotificationType('notification')
						setTimeout(() => {
							setNotificationMsg(null)
						}, 3000)
						setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
					})
					.catch( error => {
						setNotificationMsg(`Information of ${newName} has already been removed from server`)
						setNotificationType('error')
						setTimeout(() => {
							setNotificationMsg(null)
							setNotificationType(null)
						}, 3000)
						setPersons(persons.filter(p => p.id !== id))
					}
					)
			}
		} else {
			personService
				.create(nameObject)
				.then(returnedPerson => {
					setNotificationMsg(`Added ${newName}`)
					setNotificationType('notification')
					setTimeout(() => {
						setNotificationMsg(null)
					}, 3000)
					setPersons(persons.concat(returnedPerson))
				})
				.catch(error => {
					setNotificationMsg(`Validation error`)
					setNotificationType('error')
					setTimeout(() => {
						setNotificationMsg(null)
						setNotificationType(null)
					}, 3000)
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const deletePerson = (id) => {
		const person = persons.find(p => p.id === id)

		if (window.confirm(`Delete ${person.name}?`)) {
			console.log("delete confirmed")
			personService
				.remove(id)
				.then(returnedPerson => {
					setNotificationMsg(`Deleted ${person.name}`)
					setNotificationType('notification')
					setTimeout(() => {
						setNotificationMsg(null)
					}, 3000)
					setPersons(persons.filter(p => p.id !== id))
				})
				.catch( error => {
					setNotificationMsg(`Information of ${newName} has already been removed from server`)
					setNotificationType('error')
					setTimeout(() => {
						setNotificationMsg(null)
						setNotificationType(null)
					}, 3000)
					setPersons(persons.filter(p => p.id !== id))
				}
				)
		}
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
			<Notification message={notificationMsg} type={notificationType}/>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<h2>Add a new</h2>
			<PersonForm onSubmit={addPerson}
				nameValue={newName}
				nameOnChange={handleNameChange}
				numberValue={newNumber}
				numberOnChange={handleNumberChange} />
			<h2>Numbers</h2>
			<Numbers persons={newPersons} handleClick={deletePerson} />
		</div>
	)
}

export default App
