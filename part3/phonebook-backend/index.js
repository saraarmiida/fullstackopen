
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
	{
		"name": "Arto Hellas",
		"number": "1234556",
		"id": 1
	},
	{
		"name": "Lalli Pulkka",
		"number": "123456789",
		"id": 5
	},
	{
		"name": "Artturi kelake",
		"number": "1234",
		"id": 8
	},
	{
		"name": "djksdkj",
		"number": "3472983",
		"id": 9
	}
]

app.get('/info', (request, response) => {
	const phonebook = `Phonebook has info for ${persons.length} people`
	const date = Date()
	const info = phonebook + '<br><br>' + date

	response.send(info)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		response.send(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = (max, min) => {
	const randomId = Math.round(Math.random() * (max - min) + min)
	return randomId
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'the name or number is missing'
		})
	}

	if (persons.find(person => person.name === body.name)) {
		return response.status(400).json({
			error: 'the name already exists in the phonebook'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(0, 100000)
	}

	persons = persons.concat(person)

	response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})