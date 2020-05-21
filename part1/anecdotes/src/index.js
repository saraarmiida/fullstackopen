import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function mostVotes(votes) {
  var max = votes[0];
  var maxIndex = 0;

  for (var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
          maxIndex = i;
          max = votes[i];
      }
  }

  return maxIndex;
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor((Math.random()*anecdotes.length)))
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  
  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {props.anecdotes[selected]}<br/>
        has {votes[selected]} votes<br/>
        <Button handleClick={handleVoteClick} text="vote"/>
        <Button handleClick={() => setSelected(Math.floor((Math.random()*anecdotes.length)))} text='next anecdote'/>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {props.anecdotes[mostVotes(votes)]}<br/>
        has {votes[mostVotes(votes)]} votes<br/>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)