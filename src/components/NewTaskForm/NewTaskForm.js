import PropTypes from 'prop-types'
import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func,
  }
  state = {
    description: '',
    min: '',
    sec: '',
  }

  onMinChange = (e) => {
    if (!/[^0-9]/.test(e.target.value)) {
      this.setState({
        min: e.target.value,
      })
    }
  }

  onSecChange = (e) => {
    if (!/[^0-9]/.test(e.target.value)) {
      this.setState({
        sec: e.target.value,
      })
    }
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.description.trim()) {
      this.props.addTask(this.state.description, this.state.min, this.state.sec)
      this.setState({
        description: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          required
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          value={this.state.min}
          maxLength="2"
          required
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={this.state.sec}
          maxLength="2"
          required
        ></input>
        <button type="submit"></button>
      </form>
    )
  }
}
