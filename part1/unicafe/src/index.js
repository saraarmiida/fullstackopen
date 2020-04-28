import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.text}</h1>
  )

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Average = ({text, good, neutral, bad}) => {
  const sum = good + neutral + bad
  const num = good * 1 + bad * -1
  const average = num / sum

  return (
      <p>{text} {average}</p>
  )
}

const Positive = ({good, sum}) => {
  const percentage = (good / sum) * 100

  return (
    <p>positive {percentage} %</p>
  )
}

const Statistics = ({good, bad, neutral}) => {
  return (
    <div>
        <Header text='statistics' />
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {bad + neutral + good}</p>
        <Average text='average' good={good} neutral={neutral} bad={bad} />
        <Positive good={good} sum={good + neutral + bad} />
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)