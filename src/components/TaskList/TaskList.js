import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ tasks, onDeleted, onToggleCompleted }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onDeleted={() => onDeleted(task.id)}
          onToggleCompleted={() => onToggleCompleted(task.id)}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
}

export default TaskList
