import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Notification from './components/Notification'
import Filter from "./components/Filter.jsx";


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}

export default App
