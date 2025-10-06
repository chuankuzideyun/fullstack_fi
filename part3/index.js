import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

morgan.token('body', (req)=>{
    return req.method === 'POST'? JSON.stringify(req.body): '';
})

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

const persons = [
    {
        id: "1",
        name: "Imola Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const personCount = persons.length;
    const currentTime = new Date();

    res.send(`
    <p>Phonebook has info for ${personCount} people</p>
    <p>${currentTime}</p>
  `);
});

app.get('/api/persons/:id', (req, res)=>{
    const id = req.params.id;
    const person = persons.find(p=>p.id === id);
    if(person){
        res.json(person);
    } else {
        res.status(404).send({error:'Person not found'});
    }
});

app.delete('/api/person/:id', (req, res)=>{
    const id = req.params.id;
    const index = persons.findIndex(p=> p.id === id);
    if(index !== -1){
        persons.splice(index,1);
        res.status(204).end();
    } else {
        res.status(404).send({error: 'Person not found'});
    }
});

app.post('/api/persons', (req, res)=>{
    const body = req.body;
    if(!body.name || !body.number){
        return res.status(400).json({error:'Name or number is missing'});
    }
    if(persons.find(p=>p.name === body.name)){
        return  res.status(400).json({error:'Name must be unique'});
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
