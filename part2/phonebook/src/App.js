import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
	{
		name: 'Arto Hellas',
		number: '040-92948628' 
	}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
	  event.preventDefault()
	  const nameObject = {
		  name: newName,
		  number: newNumber
	  }

	  if(persons.map(person => person.name).indexOf(newName) !== -1){
        alert(`${newName} is already added to phonebook`)
    } else{
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: 
		  <input
			  value={newName}
			  onChange={handleNameChange}
		  />
        </div>
		<div>number:
			<input 
				value={newNumber}
				onChange={handleNumberChange}
			/>
		</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
		  {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
	  </div>
    </div>
  )
}

export default App