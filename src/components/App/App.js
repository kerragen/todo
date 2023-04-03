import { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import './App.css'






export default class App extends Component {

    maxId = 1;

    state = { 
        tasks: [],
        filter: 'all'
        
    }

    createTask(description) {
        return {
            id: this.maxId++,
            description,
            completed: false,
            created: new Date()
        }
    }

    deleteTask = (id) => {
        this.setState(({tasks}) => {
            const idx = tasks.findIndex((el) => el.id === id);
            const newArray = [
                ...tasks.slice(0, idx),
                ...tasks.slice(idx + 1)
            ];
            return {
                tasks: newArray
            }

        })

    }

    addTask = (text) => {
        const newTask = this.createTask(text)

        this.setState(({tasks}) => {
            const newTasks = [
                ...tasks, 
                newTask
            ]
            return {
                tasks: newTasks
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

            const oldTask = arr[idx]
            const newTask = {...oldTask, [propName]: !oldTask[propName]}

            return [
                ...arr.slice(0, idx),
                newTask,
                ...arr.slice(idx + 1)
            ]
    }
    
    onToggleCompleted = (id) => {
        this.setState(({ tasks }) => {
            return {
                tasks: this.toggleProperty(tasks, id, 'completed')
            }
        })
    }

    onClearCompleted = () => {
        this.setState(({tasks}) => {
            const newArr = [...tasks.filter((task) => !task.completed)]

            return {
                tasks: newArr
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


    render() {
        const { tasks, filter } = this.state;
        const count = tasks.filter((el) => !el.completed).length;
        const visibleItems = this.filter(tasks, filter)

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <NewTaskForm addTask={this.addTask} />
                </header>
                <section className="main">
                    <TaskList tasks={visibleItems} onDeleted={this.deleteTask} onToggleCompleted={this.onToggleCompleted} />
                </section>
                <Footer count={count} 
                onClearCompleted={this.onClearCompleted}
                filter={filter}
                onFilterChange={this.onFilterChange} />
            </section>
        )
    }
}
