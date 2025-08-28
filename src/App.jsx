import { useState } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { TaskContext } from "./Contexts/TaskContext";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks,setTasks] = useState([
    {
    id:uuidv4(),
    title:'عنوان المهمة',
    details:'هنا وصف أو تفاصيل المهمة',
    isCompleted:false
  }]
)  

  return (
    <>
      <TaskContext.Provider value={{tasks,setTasks}}>
        <div className="w-full min-h-screen flex items-center justify-center scrollbar-hidden ">
          <TodoList />
        </div>
      </TaskContext.Provider>
    </>
  );
}

export default App;
