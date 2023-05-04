import { useState, useEffect } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import Timer from '../Timer/Timer'

function Task({ onToggleCompleted, id, onDeleted, item }) {
  const { title, timerMin, timerSec, created, completed, hide } = item

  const [createdAgo, updateCreatedAgo] = useState(formatDistanceToNow(created, { includeSeconds: true }))

  useEffect(() => {
    const createdAgoID = setInterval(
      () => updateCreatedAgo(formatDistanceToNow(created, { includeSeconds: true })),
      1000
    )
    return () => {
      clearInterval(createdAgoID)
    }
  }, [created])

  let classNames = ''
  if (completed) classNames = 'completed'
  if (hide) classNames = 'hidden'

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed}></input>
        <label htmlFor={id}>
          <span className="title" onClick={onToggleCompleted} aria-hidden="true">
            {title}
          </span>
          <span className="description">
            <Timer timerMin={timerMin} timerSec={timerSec} />
          </span>
          <span className="description">created {createdAgo} ago</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit"></button>
        <button className="icon icon-destroy" type="button" aria-label="Delete" onClick={onDeleted}></button>
      </div>
    </li>
  )
}

Task.defaultProps = {
  updateInterval: 60000,
  updateTaskDate: () => {},
  onSubmitChanges: () => {},
  onToggleCompleted: () => {},
  onDeleted: () => {},
  onEdit: () => {},
}

Task.propTypes = {
  updateInterval: PropTypes.number,
  updateTaskDate: PropTypes.func,
  onSubmitChanges: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
}

export default Task
