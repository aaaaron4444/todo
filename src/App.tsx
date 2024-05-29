import React, { useState, useRef, useEffect } from 'react';
import uniqid from 'uniqid';
import Header from './components/Header';
import ListItem from './components/ListItem';
import ToggleCompleted from './components/ToggleCompleted';


type Filter = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputChecked, setInputChecked] = useState(false);
  const [inputFilter, setInputFilter] = useState<Filter>('all');


  useEffect(() => {
    const prevTodosString = localStorage.getItem('todos');
    if (prevTodosString === null) return;

    const prevTodos = JSON.parse(prevTodosString) as Todo[];
    setTodos(prevTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedTodos = todos.filter(todo => todo.isCompleted);
  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const displayTodos = inputFilter === 'all' ? todos : inputFilter === 'active' ? activeTodos : completedTodos;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const newTodo: Todo = { id: uniqid(), title: inputTitle, isCompleted: inputChecked };
    setTodos([...todos, newTodo]);
  };


  const handleTodoCheck: (id: string) => React.FormEventHandler<HTMLInputElement> = id => {
    return e => {
      const checked = e.currentTarget.checked;
      const nextTodos = todos.map(todo => {
        if (todo.id === id) return { ...todo, isCompleted: checked };

        return todo;
      });
      setTodos(nextTodos);
    };
  };

  const handleTodoDelete: (id: string) => React.MouseEventHandler<HTMLButtonElement> = id => {
    return () => {
      const nextTodos = todos.filter(todo => todo.id !== id);
      setTodos(nextTodos);
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="py-12 px-6 md:mx-auto md:w-[40rem] md:px-0 md:pt-16 lg:pt-20">
        <Header />

        <form
          className="mt-6 mb-4 flex items-center rounded-md bg-white px-4 py-3 dark:bg-dark-blue lg:mt-12 lg:mb-6 lg:px-6 lg:py-4"
          onSubmit={handleSubmit}
        >
          <ToggleCompleted isCompleted={inputChecked} onClick={e => setInputChecked(e.currentTarget.checked)} />
          <input
            className="mt-1 ml-4 flex-1 text-sm outline-none dark:bg-dark-blue dark:text-gray-300 md:text-base"
            placeholder="Create a new todos..."
            required
            pattern="[^\s]+(\s+[^\s]+)*"
            value={inputTitle}
            onChange={e => setInputTitle(e.currentTarget.value)}
          />
        </form>

        <ul className="rounded-md bg-white shadow-xl dark:bg-dark-blue">
          {displayTodos.map((todo, index) => {
            return (
              <ListItem
                key={todo.id}
                data={todo}
                onClickToggle={handleTodoCheck(todo.id)}
                onClickDelete={handleTodoDelete(todo.id)} 
              />
            );
          })}

          <li className="relative flex items-center justify-between px-4 py-3 text-xs text-slate-400 sm:text-sm">
            <span>
              {activeTodos.length} item{activeTodos.length > 1 && 's'} left
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;