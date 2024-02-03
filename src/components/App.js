import { useEffect, useState } from "react";
import { v4 as uuidv4, } from 'uuid';
import List from "./List";

function App() {

  const [todoTitle, setTodoTitle] = useState('');
  const [visibleLable, setVisibleLabel] = useState(true);

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    if (!storedTodos) {
      return [];
    } else {
      return JSON.parse(storedTodos);
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify([...todos]));
  }, [todos])


  const addTodo = (e) => {

    if (e.key === 'Enter' && e.target.value !== '') {
      setTodos([...todos, {
        id: uuidv4(), title: todoTitle, status: false,
      }]);

      setTodoTitle('');
      setVisibleLabel(true);
    }
  }

  const onChangeValue = (e) => {
    setTodoTitle(e.target.value);

    if (e.target.value !== '') {
      setVisibleLabel(false);
    } else {
      setVisibleLabel(true);
    }
  }

  return (
    <div className="container">
      <h1 className="title-1">Note your todo</h1>

      <div className="input-field">
        <input value={todoTitle} onChange={onChangeValue} onKeyDown={addTodo} />
        {visibleLable && <label>Todo Name</label>}
      </div>

      <List todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
