import { useState } from 'react'
import './NewTaskForm.css'

function NewTaskForm({ onAddedTask }) {
  const [title, setTitle] = useState('')
  const [timerMin, setTimerMin] = useState('')
  const [timerSec, setTimerSec] = useState('')

  const onLabelChange = (e) => {
    setTitle(e.target.value)
  }

  const onMinChange = (e) => {
    if (!/[^0-9]/.test(e.target.value)) {
      setTimerMin(e.target.value)
    }
  }

  const onSecChange = (e) => {
    if (!/[^0-9]/.test(e.target.value)) {
      setTimerSec(e.target.value)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (title.trim() !== '') {
      onAddedTask(title, timerMin, timerSec)
      setTitle('')
      setTimerMin('')
      setTimerSec('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <button type="submit" aria-label="Submit new task" />
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={title}
        required
      ></input>
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Min"
        onChange={onMinChange}
        value={timerMin}
        maxLength="2"
        required
      ></input>
      <input
        className="new-todo-form__timer"
        type="text"
        placeholder="Sec"
        onChange={onSecChange}
        value={timerSec}
        maxLength="2"
        required
      ></input>
    </form>
  )
}

export default NewTaskForm
