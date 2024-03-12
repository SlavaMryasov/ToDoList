import { ChangeEvent, useRef, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";


type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
}



export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {

	const [taskTitle, setTaskTitle] = useState('')

	// const taskTitleInput = useRef<HTMLInputElement>(null)

	const addNewTask = ()=> {
		addTask(taskTitle)
		setTaskTitle('')
		// if(taskTitleInput.current){  // если в input есть то...
		// 	addTask(taskTitleInput.current.value)
		// 	taskTitleInput.current.value =''
		// }
	}

	const onKeyDownAddNewTaskHandler =(event: KeyboardEvent<HTMLInputElement>) => {
		if(event.key === "Enter" && event.ctrlKey && isAddTaskPossible){
			addNewTask()
		}
	}
	
	const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
		return ()=>changeFilter(filter)
	}

	const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)
	
	const isAddTaskPossible = taskTitle.length >3 && taskTitle.length <= 15

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={taskTitle}
				onKeyDown={onKeyDownAddNewTaskHandler}
				 onChange={setTaskTitleHandler}/>
				 {/* <input ref={taskTitleInput}/> */}
				<Button title={'+'} onClick={addNewTask} isDisabled={!isAddTaskPossible}/>
				{!taskTitle.length && <div>введите название таски</div>}
				{taskTitle.length > 15 && <div>не более 15 символов</div>}
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map(task => {
							const removeTaskHandler = () => removeTask(task.id)
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'x'} onClick={removeTaskHandler}/>
								</li>
							)
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={changeTodoListFilterHandlerCreator('all')}/>
				<Button title={'Active'} onClick={changeTodoListFilterHandlerCreator('active')}/>
				<Button title={'Completed'} onClick={changeTodoListFilterHandlerCreator('completed')}/>
			</div>
		</div>
	)
}
