import {useEffect, useState} from 'react'
import React from 'react'
import personService from '../services/persons.jsx'
import Notification from './Notification.jsx'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')
    const [newFilter, setnewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState('success')


    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons)
        })
    }, []);

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const existing = persons.find(person => person.name === newName)
        if (existing) {
            const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (confirmUpdate) {
                personService
                    .update(existing.id, { ...existing, number: newNumber })
                    .then(show => {
                        setPersons(persons.map(p => p.id !== existing.id ? p : show))
                        setNewName('')
                        setnewNumber('')
                        setNotificationMessage(`Updated ${show.name}'s number`)
                        setNotificationType('success')
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
            }
        } else {
            const newPerson = { name: newName, number: newNumber }
            personService
                .create(newPerson)
                .then(show => {
                    setPersons(persons.concat(show))
                    setNewName('')
                    setnewNumber('')
                    setNotificationMessage(`Added ${show.name}`)
                    setNotificationType('success')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                .catch(error => {
                    setNotificationMessage(`${newName} could not be added.`)
                    setNotificationType('error')
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        }
    }

    const handleChangeNum = (event) => {
        setnewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setnewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes((newFilter.toLowerCase())))

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).then(()=>setPersons((persons.filter(p=>p.id !== id))))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} type={notificationType} />
            <div>
                filer shown with <input value={newFilter} onChange={handleFilter}/>
            </div>
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange ={handleChangeName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange ={handleChangeNum}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person, index) =>
                    <li key={index}>
                        {person.name}:{person.number}
                        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default App