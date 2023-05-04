import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todos, onToggleCompleted, updateTaskDate, onSubmitChanges, onDeleted }) {
  const el = todos.map((item) => {
    const { id } = item
    return (
      <li key={id}>
        <Task
          item={item}
          id={id}
          onToggleCompleted={() => onToggleCompleted(id)}
          updateTaskDate={updateTaskDate}
          onSubmitChanges={onSubmitChanges}
          onDeleted={() => onDeleted(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{el}</ul>
}

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}

export default TaskList
