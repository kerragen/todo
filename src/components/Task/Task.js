import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends Component {
  static defaultProps = {
    description: '',
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
  }

  static propTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    time: PropTypes.string,
  }

  state = {
    timer: formatDistanceToNow(this.props.created, { includeSeconds: true }),
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      timer: formatDistanceToNow(this.props.created, { includeSeconds: true }),
    })
  }

  render() {
    const { description, onDeleted, onToggleCompleted, completed } = this.props

    let changeState = ''
    if (completed) {
      changeState += 'completed'
    }

    return (
      <li className={changeState}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed}></input>
          <label>
            <span className="description">{description}</span>
            <span className="created">created {this.state.timer} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}
