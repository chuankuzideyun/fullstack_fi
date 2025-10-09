import { useEffect, useState } from 'react'
import React from 'react'
import personService from '../services/persons.jsx'
import Notification from './Notification.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState('success')

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                const personsArray = Array.isArray(initialPersons)
                    ? initialPersons
                    : initialPersons.persons || []
                setPersons(personsArray)
            })
            .catch(error => {
                console.error('Error fetching persons:', error)
                setPersons([])
            })
    }, [])

    const handleChangeName = (event) => setNewName(event.target.value)
    const handleChangeNum = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setNewFilter(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()

        const existing = persons.find(person => person.name === newName)
        if (existing) {
            const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )
            if (confirmUpdate) {
                personService
                    .update(existing.id, { ...existing, number: newNumber })
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== existing.id ? p : updatedPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotificationMessage(`Updated ${updatedPerson.name}'s number`)
                        setNotificationType('success')
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
                    .catch(error => {
                        console.error('Update failed:', error)
                        setNotificationMessage(`Failed to update ${existing.name}`)
                        setNotificationType('error')
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
            }
        } else {
            const newPerson = { name: newName, number: newNumber }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage(`Added ${returnedPerson.name}`)
                    setNotificationType('success')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                .catch(error => {
                    console.error('Create failed:', error)
                    setNotificationMessage(`${newName} could not be added.`)
                    setNotificationType('error')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        }
    }

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(error => {
                    console.error('Delete failed:', error)
                    setNotificationMessage(`Failed to delete ${name}`)
                    setNotificationType('error')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        }
    }

    const personsToShow = Array.isArray(persons)
        ? persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        : []

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} type={notificationType} />

            <Filter value={newFilter} onChange={handleFilter} />

            <h3>Add a new</h3>
            <PersonForm
                onSubmit={handleSubmit}
                newName={newName}
                handleNameChange={handleChangeName}
                newNumber={newNumber}
                handleNumberChange={handleChangeNum}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App
