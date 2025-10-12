require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const {response} = require("express");

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const count = persons.length
        const currentTime = new Date()
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${currentTime}</p>
        `)
    })
        .catch(next)
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(next)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error:'malformatted id'})
        })
        .catch(next)
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(next)
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (!updatedPerson) return response.status(404).json({ error: 'person not found' })
            response.json(updatedPerson)
        })
        .catch(next)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
