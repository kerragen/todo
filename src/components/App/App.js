import { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default class App extends Component {
  maxId = 1

  state = {
    tasks: [],
    filter: 'all',
  }

  createTask(title, timeLeft) {
    return {
      id: this.maxId++,
      title,
      completed: false,
      created: new Date(),
      timeLeft,
      isActive: false,
    }
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
      return {
        tasks: newArray,
      }
    })
  }

  addTask = (text, min, sec) => {
    const timeLeft = min * 60 + Number(sec)
    const newTask = this.createTask(text, timeLeft)

    this.setState(({ tasks }) => {
      const newTasks = [...tasks, newTask]
      return {
        tasks: newTasks,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'completed'),
      }
    })
  }

  onClearCompleted = () => {
    this.setState(({ tasks }) => {
      const newArr = [...tasks.filter((task) => !task.completed)]

      return {
        tasks: newArr,
      }
    })
  }

  filter = (items, filter) => {
    if (filter === 'all') {
      return items
    }
    if (filter === 'active') {
      return items.filter((item) => !item.completed)
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed)
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  timer = {}

  onTimerStart = (id) => {
    const { tasks } = this.state
    const idx = tasks.findIndex((el) => el.id === id)
    if (tasks[idx].isActive) {
      return
    }
    this.timer[id] = setInterval(() => this.tick(id), 1000)
  }

  onTimerStop = (id) => {
    clearInterval(this.timer[id])
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = { ...oldItem, isActive: false }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      return {
        tasks: newArr,
      }
    })
  }

  tick(id) {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      if (oldItem === undefined) {
        clearInterval(this.timer[id])
        return
      }
      if (!oldItem.timeLeft) {
        clearInterval(this.timer[id])
        return
      }
      const newItem = { ...oldItem, timeLeft: oldItem.timeLeft - 1, isActive: true }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]

      return {
        tasks: newArr,
      }
    })
  }

  render() {
    const { tasks, filter } = this.state
    const count = tasks.filter((el) => !el.completed).length
    const visibleItems = this.filter(tasks, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleItems}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onTimerStart={this.onTimerStart}
            onTimerStop={this.onTimerStop}
          />
        </section>
        <Footer
          count={count}
          onClearCompleted={this.onClearCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    )
  }
}
