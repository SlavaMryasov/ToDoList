import { useRef } from "react";
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


	const taskTitleInput = useRef<HTMLInputElement>(null)

	const addNewTask = ()=> {
		if(taskTitleInput.current){  // если в input есть то...
			addTask(taskTitleInput.current.value)
			taskTitleInput.current.value =''
		}
	}
	

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input ref={taskTitleInput}/>
				<Button title={'+'} onClick={addNewTask}/>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map(task => {
							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'x'} onClick={() => removeTask(task.id)}/>
								</li>
							)
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={()=> changeFilter('all')}/>
				<Button title={'Active'} onClick={()=> changeFilter('active')}/>
				<Button title={'Completed'} onClick={()=> changeFilter('completed')}/>
			</div>
		</div>
	)
}
