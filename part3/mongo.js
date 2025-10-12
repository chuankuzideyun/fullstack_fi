const mongoose = require('mongoose')

const password = process.env.MONGODB_PASSWORD
const url = `mongodb+srv://fullstack:${password}@cluster0.fmfnoiz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters'],
        match: [/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces']
    },
    number: {
        type: String,
        required: [true, 'Number is required'],
        validate: {
            validator: function(v) {
                if (!v || v.length < 8) return false
                // 用 - 分割
                const parts = v.split('-')
                if (parts.length !== 2) return false
                const [part1, part2] = parts
                // 第一部分 2~3 位数字
                if (!/^\d{2,3}$/.test(part1)) return false
                // 第二部分 至少 5 位数字（总长度 ≥ 8 已保证）
                if (!/^\d+$/.test(part2)) return false
                return true
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)