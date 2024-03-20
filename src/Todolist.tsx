import { ChangeEvent, useRef, useState, KeyboardEvent } from "react";
import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus:(taskId: string, newIsDoneValue: boolean)=> void
};

export const Todolist = ({
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus
}: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inputError, setInputError] = useState<boolean>(false)

  // const taskTitleInput = useRef<HTMLInputElement>(null)

  const addNewTaskHandler = () => {
	const trimmedTaskTitle = taskTitle.trim()
	if(trimmedTaskTitle){
		addTask(trimmedTaskTitle);
	}else{
		setInputError(true)
	}
    setTaskTitle("");
    // if(taskTitleInput.current){  // если в input есть то...
    // 	addTask(taskTitleInput.current.value)
    // 	taskTitleInput.current.value =''
    // }
  };

  const onKeyDownAddNewTaskHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && event.ctrlKey && isAddTaskPossible) {
      addNewTaskHandler();
    }
  };

  const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
    return () => changeFilter(filter);
  };

  const setTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>{
	setInputError(false)
    setTaskTitle(event.currentTarget.value);
  }


  const isAddTaskPossible = taskTitle.length > 3 && taskTitle.length <= 15;

  
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
		className={inputError ? "input-error": ''}
          value={taskTitle}
          onKeyDown={onKeyDownAddNewTaskHandler}
          onChange={setTaskTitleHandler}
        />
        {/* <input ref={taskTitleInput}/> */}
        <Button
          title={"+"}
          onClick={addNewTaskHandler}
          isDisabled={!isAddTaskPossible}
        />
        {!taskTitle.length && <div style={{color: inputError? 'red': 'black'}}>введите название таски</div>}
        {taskTitle.length > 15 && <div>не более 15 символов</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => removeTask(task.id);
			const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
				changeTaskStatus(task.id, e.currentTarget.checked)
			}
				return (
              <li key={task.id} >
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span className={task.isDone ? 'task-done': 'task'}>{task.title}</span>
                <Button title={"x"} onClick={removeTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          title={"All"}
          onClick={changeTodoListFilterHandlerCreator("all")}
		  classes={filter==='all'? 'activeButton':''}
        />
        <Button
          title={"Active"}
          onClick={changeTodoListFilterHandlerCreator("active")}
		  classes={filter==='active'? 'activeButton':''}
        />
        <Button
          title={"Completed"}
          onClick={changeTodoListFilterHandlerCreator("completed")}
		  classes={filter==='completed'? 'activeButton':''}
        />
      </div>
    </div>
  );
};
