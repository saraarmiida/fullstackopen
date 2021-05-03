const personsRouter = require('express').Router()
const Person = require('../models/person')

// app.get('/info', (request, response) => {
// 	const phonebook = `Phonebook has info for ${Person.length} people`
// 	const date = Date()
// 	const info = phonebook + '<br><br>' + date

// 	response.send(info)
// })

personsRouter.get('/', async (request, response) => {
	const people = await Person.find({})
	response.json(people)
})

personsRouter.get('/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedContact => {
			response.json(savedContact)
		})
		.catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedContact => {
			response.json(updatedContact)
		})
		.catch(error => next(error))
})

module.exports = personsRouter
