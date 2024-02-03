import { useState } from "react";

export default function ItemList({ id, title, status, todos, setTodos }) {

    const [editMode, setEditMode] = useState(false);
    const [checked, setChecked] = useState(status);
    const [newTitleValue, setNewTitleValue] = useState(title);
    const classes = ['todo'];

    if (checked) {
        classes.push('status');
    }

    const onUpdateStatus = () => {
        setChecked(!checked);
        const filteredTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.status = !checked;
            }
            return todo;
        })
        setTodos([...filteredTodo]);
    }

    const onRemoveTodo = () => {
        const filteredTodo = todos.filter(todo => todo.id !== id);
        setTodos([...filteredTodo]);
    }

    const onChangeTitleMode = () => {
        setEditMode(true);
    }

    const onChangeTitleValue = () => {
        const filteredTodo = todos.map(item => {
            if (item.id === id) {
                item.title = newTitleValue;
            }
            return item;
        })

        setTodos([...filteredTodo]);
        setEditMode(false);
    }

    return (
        <>
            <li className={classes.join(' ')}>
                {editMode ?
                    <>
                        <input value={newTitleValue} type="text" onChange={(e) => setNewTitleValue(e.target.value)} />
                        <div className="buttons-edit-group ">
                            <button onClick={onChangeTitleValue} className="waves-effect waves-light btn-small" >Save</button>
                            <button onClick={() => setEditMode(false)} className="waves-effect waves-light btn-small" >X</button>
                        </div>
                    </>
                    :
                    <label>
                        <input type="checkbox" checked={checked} onChange={onUpdateStatus} />
                        <span>{title}</span>
                        <button onClick={onChangeTitleMode} className="waves-effect waves-light btn-small edit-btn">Edit</button>
                        <i onClick={onRemoveTodo} className="material-icons red-text" >X</i>
                    </label>
                }
            </li>
        </>
    )
}