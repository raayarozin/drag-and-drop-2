import './App.css';
import TodoList from './components/TodoList';
import Button from './components/Button';
import { useState } from 'react';
import useInput from './hooks/use-input';

const App = () => {
  const initialList = [
    { todo: 'Give Raaya the job', done: false },
    { todo: 'Hire Raaya', done: false },
  ];
  const [currentList, setCurrentList] = useState(initialList);
  const [todos, setTodos] = useState(initialList.map((todo) => todo.todo));
  const isInputValid = (value) => value.trim() !== '' && !todos.includes(value);
  const {
    value: Input,
    valueChangeHandler: InputChangeHandler,
    reset: resetInput,
  } = useInput(isInputValid);

  //ADD TODO
  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = document.getElementById('to-do-add-input');

    if (isInputValid(newTodo.value)) {
      updateTodoStates(
        [...todos, newTodo.value],
        [...currentList, { todo: newTodo.value, done: false }]
      );
      resetInput();
    }
  };

  //EDIT TODO
  const editExistingTodo = (e, oldValue, newValue) => {
    e.preventDefault();
    const editedItemIndex = todos.indexOf(oldValue);

    const updatedTodos = [...todos];
    updatedTodos[editedItemIndex] = newValue;

    const updateCurrentList = [...currentList];
    updateCurrentList[editedItemIndex].todo = newValue;
    updateCurrentList[editedItemIndex].done = false;

    if (isInputValid(newValue)) {
      updateTodoStates(updatedTodos, updateCurrentList);
    }
  };

  //DELETE TODO
  const deleteTodo = (e, value) => {
    e.preventDefault();
    const item = todos.indexOf(value);
    todos.splice(item, 1);
    currentList.splice(item, 1);
    updateTodoStates([...todos], [...currentList]);
  };

  //HANDLE "DONE" TODO
  const handleIsTodoDone = (e, value) => {
    e.preventDefault();
    const updatedTodoList = currentList
      .map((item) => {
        if (item.todo === value) {
          item.done ? (item.done = false) : (item.done = true);
        }
        return item;
      })
      .sort((x, y) => x.done - y.done);

    updateTodoStates(
      updatedTodoList.map((todo) => todo.todo),
      updatedTodoList
    );
  };

  //UPDATE TODOS STATES
  const updateTodoStates = (newTodos, newCurrentList) => {
    setCurrentList(newCurrentList);
    setTodos(newTodos);
  };

  return (
    <div className='App'>
      <div className='form-wrapper'>
        <form className='form-container'>
          <div className='input-wrapper'>
            <input
              id='to-do-add-input'
              className='add-input'
              type='text'
              onChange={InputChangeHandler}
              value={Input}
            />
            <Button
              className='add-btn'
              btnValue='→'
              type='submit'
              onClick={(e) => {
                addTodo(e);
              }}
            />
          </div>

          <TodoList
            todos={todos}
            currentList={currentList}
            updateTodoStates={updateTodoStates}
            deleteTodo={deleteTodo}
            editExistingTodo={editExistingTodo}
            handleIsTodoDone={handleIsTodoDone}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
