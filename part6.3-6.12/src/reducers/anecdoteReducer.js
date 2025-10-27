const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = [
  asObject('If it hurts, do it more often'),
  asObject('Adding manpower to a late software project makes it later!'),
  asObject('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')
]

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      { const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote) }

    case 'CREATE':
      { const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote] }

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: content
  }
}

export default anecdoteReducer
