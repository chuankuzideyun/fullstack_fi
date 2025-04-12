import StatisticLine from './StatiscticLine.jsx'

const Statistics = ({ good, neutral, bad }) => {
    return(
        <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
        </tbody>
    )
}

export default Statistics;