import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ tasks, onDeleted, onToggleCompleted, onTimerStart, onTimerStop }) => {
  const el = tasks.map((item) => {
    const { id, title, completed, created, timeLeft } = item

    return (
      <Task
        key={id}
        title={title}
        completed={completed}
        created={created}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onTimerStart={() => onTimerStart(id)}
        onTimerStop={() => onTimerStop(id)}
        timeLeft={timeLeft}
      />
    )
  })

  return <ul className="todo-list">{el}</ul>
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onTimerStart: () => {},
  onTimerStop: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onTimerStart: PropTypes.func,
  onTimerStop: PropTypes.func,
}

export default TaskList
