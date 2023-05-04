import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({
  itemsLeft,
  onClearCompleted,
  onSelectedCompletedFilter,
  onSelectedActiveFilter,
  onSelectedAllFilter,
}) {
  return (
    <div className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter
        onSelectedCompletedFilter={onSelectedCompletedFilter}
        onSelectedActiveFilter={onSelectedActiveFilter}
        onSelectedAllFilter={onSelectedAllFilter}
      />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  )
}

Footer.defaultProps = {
  itemsLeft: 0,
  onClearCompleted: () => {},
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  onClearCompleted: PropTypes.func,
}

export default Footer
