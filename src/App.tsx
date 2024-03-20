import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from 'uuid'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	console.log(v1())
	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'Redux', isDone: false},
		{id: v1(), title: 'Typescript', isDone: false},
		{id: v1(), title: 'RTK query', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	//tasks
	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const addTask = (title: string)=>{
		const newTask: TaskType ={
			id: v1(),
			title,
			isDone: false, 
		}
		const updatedState = [newTask, ...tasks]
		setTasks(updatedState)
	}

	const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
		// const task = tasks.find(t => t.id === taskId)
		// if(task) {
		// 	task.isDone === !task.isDone // мутируем таску - так не делать 
		// 	setTasks([...tasks])
		// }

		const updatedState = tasks.map(task => task.id === taskId ? {...task, isDone: newIsDoneValue}: task)
		setTasks(updatedState)
	}

	//filter
	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}


	return (
		<div className="App">
			<Todolist title="What to learn"
			          tasks={tasksForTodolist}
			          removeTask={removeTask}
			          changeFilter={changeFilter}
					  addTask={addTask}
					  changeTaskStatus={changeTaskStatus}
					  filter={filter}/>
		</div>
	);
}

export default App;
