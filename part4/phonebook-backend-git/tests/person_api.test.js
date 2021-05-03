const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Person = require('../models/person')

const initialContacts = [
	{
		name: 'Anne Frank',
		number: '5382046739'
	},
	{
		name: 'Ava Lovelace',
		number: '3759375028'
	}
]

beforeEach(async () => {
	await Person.deleteMany({})
	let personObject = new Person(initialContacts[0])
	await personObject.save()
	personObject = new Person(initialContacts[1])
	await personObject.save()
})


test('contacts are returned as json', async () => {
	await api
		.get('/api/persons')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('there are two contacts', async () => {
	const response = await api.get('/api/persons')

	expect(response.body).toHaveLength(initialContacts.length)
})

test('the first person is Anne Frank', async () => {
	const response = await api.get('/api/persons')

	const contents = response.body.map(r => r.name)
	expect(contents).toContain('Anne Frank')
})

test('a valid note can be added', async () => {
	const newPerson = {
		name: 'Async Await',
		number: '12345678'
	}

	await api
		.post('/api/persons')
		.send(newPerson)
		.expect(200)
		.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/persons')

		const contents = response.body.map(r => r.name)

		expect(response.body).toHaveLength(initialContacts.length + 1)
		expect(contents).toContain('Async Await')
})

test('note without content is not added', async () => {
	const newPerson = {
		number: '12345678'
	}

	await api
		.post('/api/persons')
		.send(newPerson)
		.expect(400)

		const response = await api.get('/api/persons')

		expect(response.body).toHaveLength(initialContacts.length)
})

afterAll(() => {
	mongoose.connection.close()
})