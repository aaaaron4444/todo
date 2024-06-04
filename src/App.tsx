import React, { useState } from 'react';
import uniqid from 'uniqid';
import Header from './components/Header';
import ListItem from './components/ListItem';

type Filter = 'all' | 'active' | 'completed';

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputFilter, setInputFilter] = useState<Filter>('all');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputTitle.trim() || todos.some(todo => todo.title === inputTitle.trim())) return; // Check for duplicate title
    const newTodo: Todo = { id: uniqid(), title: inputTitle.trim(), isCompleted: false };
    setTodos([...todos, newTodo]);
    setInputTitle('');
  };

  const handleToggle = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = inputFilter === 'all' ? todos : inputFilter === 'active' ? todos.filter(todo => !todo.isCompleted) : todos.filter(todo => todo.isCompleted);

  return (
    <div className="min-h-screen bg-black">
      <div className="py-12 px-6 md:mx-auto md:w-[40rem] md:px-0 md:pt-16 lg:pt-20">
        <Header />

        <div className="mb-4 text-white">
          <p>Completed tasks: {todos.filter(todo => todo.isCompleted).length}</p>
        </div>

        <ul className="rounded-md shadow-xl dark:bg-dark-blue">
          {filteredTodos.map(todo => (
            <ListItem
              key={todo.id}
              data={todo}
              onClickToggle={() => handleToggle(todo.id)}
              onClickDelete={() => handleDelete(todo.id)} 
            />
          ))}
        </ul>

        <form
          className="flex items-center rounded-0 bg-white px-4 py-3 dark:bg-dark-blue "
          onSubmit={handleSubmit}
        >
          <input
            className="flex-1 text-sm outline-none dark:bg-dark-blue dark:text-gray-300 md:text-base"
            placeholder="Create a new todo..."
            value={inputTitle}
            onChange={e => setInputTitle(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white font-medium transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
