import { useEffect, useState } from "react";
import ItemList from "./ItemList";

export default function List({ todos, setTodos }) {
    const [filteredTodo, setFilteredTodo] = useState([...todos]);

    useEffect(() => {
        setFilteredTodo(todos)
    }, [todos])

    const todoFilter = (status) => {
        if (status === 'all') {
            setFilteredTodo(todos);
        } else if (!status) {
            setFilteredTodo([...todos.filter(item => item.status === status)]);
        } else {
            setFilteredTodo([...todos.filter(item => item.status === status)]);
        }
    }

    return (
        <>
            <div className="container__buttons">
                <button onClick={() => todoFilter('all')} className="waves-effect waves-light btn-small">Show all todos</button>
                <button onClick={() => todoFilter(false)} className="waves-effect waves-light btn-small">Show not completed todos</button>
                <button onClick={() => todoFilter(true)} className="waves-effect waves-light btn-small">Show completed todos</button>
            </div>
            <ul >
                {filteredTodo.map(todo => <ItemList key={todo.id} {...todo} setTodos={setTodos} todos={todos} />)}
            </ul>
        </>

    )
}