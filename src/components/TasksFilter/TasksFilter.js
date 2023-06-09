import PropTypes from 'prop-types'
import { Component } from 'react'
import './TasksFilter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  }
  buttons = [
    { name: 'all', description: 'All' },
    { name: 'active', description: 'Active' },
    { name: 'completed', description: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, description }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : ''

      return (
        <li key={name}>
          <button className={clazz} onClick={() => onFilterChange(name)}>
            {description}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
