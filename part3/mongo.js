const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.fmfnoiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(result => {
    console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

app.get('/persons', (request, response) => {
    if (process.argv.length == 3) {
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    } else if (process.argv.length === 5) {
        const name = process.argv[3]
        const number = process.argv[4]

        const person = new Person({
            name: name,
            number: number,
        })

        person.save().then(result => {
            console.log(`add ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
})