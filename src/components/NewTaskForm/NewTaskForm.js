import PropTypes from 'prop-types'
import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static PropTypes = {
    addTask: PropTypes.func,
  }
  state = {
    description: '',
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.description.trim() !== '') {
      this.props.addTask(this.state.description)
      this.setState({
        description: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        ></input>
      </form>
    )
  }
}
