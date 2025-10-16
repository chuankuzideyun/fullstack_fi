const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const assert = require('node:assert')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a specific blog title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    response.body.forEach(blog => {
        assert(blog.id, 'Blog should have id property')
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Async/Await simplifies async calls',
        author: 'John Doe',
        url: 'http://example.com/async-await',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Async/Await simplifies async calls'))
})

//?????
test('blog without title or url is not added', async () => {
    const newBlog = { author: 'Jane Doe', likes: 5 }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})