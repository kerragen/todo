import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends Component {
  static defaultProps = {
    title: '',
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    created: '',
    onTimerStart: () => {},
    onTimerStop: () => {},
    timeLeft: '',
  }

  static propTypes = {
    title: PropTypes.string,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    created: PropTypes.string,
    onTimerStart: PropTypes.func,
    onTimerStop: PropTypes.func,
    timeLeft: PropTypes.string,
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
    const { title, onDeleted, onToggleCompleted, completed, onTimerStart, onTimerStop, timeLeft } = this.props

    const toPad = (time) => time.toString().padStart(2, '0')
    const min = toPad(Math.floor(timeLeft / 60))
    const sec = toPad(timeLeft - min * 60)

    let classNames = ''
    if (completed) {
      classNames += 'completed'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed}></input>
          <label>
            <span className="title" onClick={onToggleCompleted} aria-hidden="true">
              {title}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={onTimerStart}></button>
              <button className="icon icon-pause" onClick={onTimerStop}></button>
              <span className="description">{`${min}:${sec}`}</span>
            </span>
            <span className="description">created {this.state.timer} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}
