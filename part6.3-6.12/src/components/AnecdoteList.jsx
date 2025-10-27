import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {clearNotification, setNotification} from "../reducers/noteReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const filtered = anecdotes.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase())
        )
        return [...filtered].sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
