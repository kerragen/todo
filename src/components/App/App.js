import { useState, useEffect } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [maxId, setMaxId] = useState(1)

  const itemsLeft = tasks.filter((el) => !el.completed).length
  useEffect(() => {
    setMaxId((id) => id + 1)
  }, [tasks])

  const toggleHideDefault = (arr, defaultArr = []) => {
    arr.forEach((el) => {
      const newItem = { ...el, hide: false }
      defaultArr.push(newItem)
    })

    return defaultArr
  }

  const toggleProperty = (arr, id, propertyName, label = null) => {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]

    if (label === null) label = oldItem.label
    const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName], label }

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
  }

  const toggleHideOnActive = (arr, propName) => {
    const defaultArr = []
    const newArr = []

    toggleHideDefault(arr, defaultArr)

    defaultArr.forEach((el) => {
      let newItem = {}
      if (!el.completed) {
        newItem = { ...el, [propName]: true }
        newArr.push(newItem)
      } else {
        newItem = el
        newArr.push(el)
      }
    })

    return newArr
  }

  const toggleHideOnCompleted = (arr, propName) => {
    const defaultArr = []
    const newArr = []

    toggleHideDefault(arr, defaultArr)

    defaultArr.forEach((el) => {
      let newItem = {}
      if (el.completed) {
        newItem = { ...el, [propName]: true }
        newArr.push(newItem)
      } else {
        newItem = el
        newArr.push(el)
      }
    })

    return newArr
  }

  function createTask(title, timerMin, timerSec) {
    return {
      title,
      timerMin,
      timerSec,
      created: new Date(),
      completed: false,
      hide: false,
      id: maxId,
    }
  }

  const updateTaskDate = () => {
    setTasks((data) => {
      const newArr = []
      data.forEach((el) => newArr.push(el))
      return newArr
    })
  }

  const deleteTask = (id) => {
    setTasks((data) => {
      const index = data.findIndex((el) => el.id === id)
      const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
      return newArr
    })
  }

  const addTask = (text, timerMin, timerSec) => {
    const newItem = createTask(text, timerMin, timerSec)

    setTasks((data) => {
      const newArr = [...data, newItem]
      return newArr
    })
  }

  const onToggleCompleted = (id) => {
    setTasks((data) => {
      return toggleProperty(data, id, 'completed')
    })
  }

  const onClearCompleted = () => {
    const newArr = []
    tasks.forEach((el) => (el.completed ? newArr.push(el.id) : el))
    newArr.forEach((el) => deleteTask(el))
  }

  const onSelectedAllFilter = () => {
    setTasks((data) => {
      return toggleHideDefault(data)
    })
  }

  const onSelectedActiveFilter = () => {
    setTasks((data) => {
      return toggleHideOnCompleted(data, 'hide')
    })
  }

  const onSelectedCompletedFilter = () => {
    setTasks((data) => {
      return toggleHideOnActive(data, 'hide')
    })
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onAddedTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          todos={tasks}
          onToggleCompleted={onToggleCompleted}
          updateTaskDate={updateTaskDate}
          onDeleted={deleteTask}
        />
      </section>
      <Footer
        itemsLeft={itemsLeft}
        onSelectedAllFilter={onSelectedAllFilter}
        onSelectedActiveFilter={onSelectedActiveFilter}
        onSelectedCompletedFilter={onSelectedCompletedFilter}
        onClearCompleted={onClearCompleted}
      />
    </section>
  )
}

export default App
