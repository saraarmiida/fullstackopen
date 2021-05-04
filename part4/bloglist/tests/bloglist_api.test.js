const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
	{
	  _id: "5a422a851b54a676234d17f7",
	  title: "React patterns",
	  author: "Michael Chan",
	  url: "https://reactpatterns.com/",
	  likes: 7,
	  __v: 0
	},
	{
	  _id: "5a422aa71b54a676234d17f8",
	  title: "Go To Statement Considered Harmful",
	  author: "Edsger W. Dijkstra",
	  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
	  likes: 5,
	  __v: 0
	},
	{
	  _id: "5a422b3a1b54a676234d17f9",
	  title: "Canonical string reduction",
	  author: "Edsger W. Dijkstra",
	  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	  likes: 12,
	  __v: 0
	},
	{
	  _id: "5a422b891b54a676234d17fa",
	  title: "First class tests",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
	  likes: 10,
	  __v: 0
	},
	{
	  _id: "5a422ba71b54a676234d17fb",
	  title: "TDD harms architecture",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
	  likes: 0,
	  __v: 0
	},
	{
	  _id: "5a422bc61b54a676234d17fc",
	  title: "Type wars",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	  likes: 2,
	  __v: 0
	}  
  ]

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('correct amount of blogs returned as JSON', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifier property of blog is named id', async () => {
	const response = await api.get('/api/blogs')
	
	response.body.forEach(blog => {
		expect(blog.id.toBeDefined)
	})
})

test('http post successfull creates a new blog post', async () => {
	const newBlog = {
		title: 'HTTP POST test',
		author: 'Sara Pentti',
		url: 'www.mikamikamaa.com',
		likes: 0
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length + 1)

	const blogs = response.body.map(p => p.title)
	expect(blogs).toContain('HTTP POST test')
})

test('likes property will default to 0 if it is missing from the request', async () => {
	const newBlog = {
		title: 'likes default test',
		author: 'Sara Pentti',
		url: 'www.mikamikamaa.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const response = await api.get('/api/blogs')
	const blogToCheck = response.body[response.body.length - 1]
	
	expect(blogToCheck.likes).toBe(0)
})

test('posting a new blog without title and url is not allowed', async () => {
	const newBlog = {
		author: 'Sara Pentti',
		likes: 7
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('deleting a blog succeeds with status code 204 if id is valid', async () => {
	const rawBlogs = await Blog.find({})
	const blogsAtStart = rawBlogs.map(blog => blog.toJSON())

	const blogToDelete = blogsAtStart[0]
	
	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const rawBlogsAtEnd = await Blog.find({})
	const blogsAtEnd = rawBlogsAtEnd.map(blog => blog.toJSON())

	expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
	
	const contents = blogsAtEnd.map(r => r.title)
	
	expect(contents).not.toContain(blogToDelete.title)
})

test('updating a blog succeeds', async () => {
	const blog = {
		title: 'updating a blog',
		author: 'Sara Pentti',
		url: 'www.mikamikamaa.com'
	}

	const blogUpdate = {
		title: 'updating a blog',
		author: 'Sara Pentti',
		url: 'www.mikamikamaa.com',
		likes: 10
	}

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	
	const rawBlogs = await Blog.find({})
	const blogsAtStart = rawBlogs.map(blog => blog.toJSON())
	const blogToUpdate = blogsAtStart[blogsAtStart.length - 1]

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(blogUpdate)
		.expect(200)

	const rawBlogsAtEnd = await Blog.find({})
	const blogsAtEnd = rawBlogsAtEnd.map(blog => blog.toJSON())
	const updatedBlog = blogsAtEnd[blogsAtEnd.length - 1]

	console.log(updatedBlog)

	expect(updatedBlog.likes).toBe(10)
})

afterAll(() => {
	mongoose.connection.close()
})
