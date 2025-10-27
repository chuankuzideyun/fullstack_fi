import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import noteReducer from "./reducers/noteReducer.js";
import filterReducer from "./reducers/filterReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        note: noteReducer,
        filter: filterReducer
    }
})

export default store
