const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe('favorite blog', () => {
    const listWithMultipleBlogs = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
    ]

    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog, equals that blog', () => {
        const listWithOneBlog = [listWithMultipleBlogs[0]]
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result,{
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
        })
    })

    test('of a bigger list is the one with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})