const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {Schema} = require("mongoose");

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
        if (deletedBlog) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'blog not found' })
        }
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter