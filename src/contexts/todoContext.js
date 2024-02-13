import { createContext, useEffect, useState } from 'react';

export const TodoContext = createContext('light');

const TodoContextProvider = ({children}) => {
    const [userTodoList, setUserTodoList] = useState(null);
    useEffect(() => {
        fetchData();
      }, []);
      const fetchData = async () => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setUserTodoList(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    return (
        <TodoContext.Provider value={{ userTodoList, setUserTodoList }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;