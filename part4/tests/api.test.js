const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        title: "aaaaa",
        author: "Anna",
        likes: 2,
    },
    {
        title: "bbbbb",
        author: "Joy",
        likes: 1,
    },
]

test.only('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are two notes', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

after(async () => {
    await mongoose.connection.close()
})