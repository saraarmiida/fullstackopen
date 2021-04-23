require('dotenv').config()
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

app.use(express.static('build'))

app.get('/info', (request, response) => {
	const phonebook = `Phonebook has info for ${persons.length} people`
	const date = Date()
	const info = phonebook + '<br><br>' + date

	response.send(info)
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		response.json(person)
	})
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'the name or number is missing'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedContact => {
		response.json(savedContact)
	})
})

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
