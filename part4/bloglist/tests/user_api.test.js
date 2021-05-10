const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('sekret', 10)
	const user = new User({ username: 'root', passwordHash })

	await user.save()
})

describe('creating a user', () => {
	test('succeeds with a valid user', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'spentti',
			name: 'Sara Pentti',
			password: 'salainen'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})
	test('fails with proper status code and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	test('fails with proper status code and message if username is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'ro',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		expect(result.body.error).toContain('is shorter than the minimum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	test('fails with proper status code and message if password is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'rollo',
			name: 'Superuser',
			password: 'sa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		expect(result.body.error).toContain('password is shorter than the minimum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	test('fails with proper status code and message if password is missing', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'rollo',
			name: 'Superuser'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		expect(result.body.error).toContain('password is required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
