import { useState } from 'react'
import Statistics from './components/Statistics.jsx'
import StatisticLine from "./components/StatiscticLine.jsx";

const App = () => {
    const title = "give feedback"
    const next_title = "statistics"
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad
    const average = total === 0 ? 0: good - bad
    const positive = total === 0 ? 0: (good / total) * 100
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => setGood(good + 1)}>Good</button>
            <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Statistics good = {good} neutral = {neutral} bad = {bad}/>

            <h1>{next_title}</h1>
            {total === 0 ?
                (<p>No feedback given</p>) : (
                <table>
                    <tbody>
                    <StatisticLine text="All" value={total} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine text="Positive" value={`${positive} %`} />
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default App