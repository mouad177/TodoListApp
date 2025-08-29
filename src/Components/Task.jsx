import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import ConfirmEdit from "./ConfirmEdit";
import { TaskContext } from "../Contexts/TaskContext";

function Task({ task }) {
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const { tasks, setTasks } = useContext(TaskContext);
 const [isReadMore,setIsReadMore]= useState(false)
 const [isReadMoreVisible,setIsReadMoreVisible]= useState()

  function handleCheckClick() {
    const updateTask = tasks.map((t) => {
      if (t.id == task.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTasks(updateTask);
    localStorage.setItem("task",JSON.stringify(updateTask))
  }
const ref = useRef(null)
useEffect(()=>{
  if(ref.current){
    setIsReadMoreVisible(ref.current.clientHeight!==ref.current.scrollHeight)
    
  }

},[task])


  return (
    <>
      <div  className="w-full flex flex-row-reverse gap-5 items-center p-3 rounded-xl justify-between bg-linear-to-r from-blue-800 to-blue-400">
        <div className="flex flex-row-reverse items-center gap-3 max-w-3/4  ">
          <button
            className={`text-gray-50 bg-gray-50 relative overflow-hidden w-10 h-10 shrink-0 rounded-2xl appearance-none hover:rotate-12 duration-200 active:scale-90 hover:scale-110 ${
              task.isCompleted
                ? "bg-green-400 text-white"
                : " hover:text-black "
            }`}
            onClick={handleCheckClick}
          >
            <input
              className="w-8 h-8 appearance-none pointer-events-none"
              type="checkbox"
            />
            <svg
              className="absolute top-1 left-1  "
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M7.3 14.2L.2 9l1.7-2.4l4.8 3.5l6.6-8.5l2.3 1.8z"
              />
            </svg>
          </button>
          <div
            className='flex flex-col items-end gap-3'
          >
            <h2 className={`${task.isCompleted ? "line-through opacity-85 text-gray-300" : "" } text-white text-right text-lg md:text-2xl ${task.details.split('').length>0?'wrap-anywhere':'break-words'}`} >{task.title}</h2>

          
              <p  ref={ref} dir="rtl" className={`text-white ${isReadMore?'line-clamp-none ':'line-clamp-2 '} text-right text-xs md:text-sm  ${task.isCompleted ? "line-through opacity-85 text-gray-300 " : "" }
               ${task.details.split('').length>0?'wrap-anywhere':'break-words'}`}> 
               {task.details}
                 
                 </p>
{isReadMoreVisible? <button className="bg-sky-400 p-1 font-medium rounded-2xl text-xs text-white hover:bg-sky-600 duration-200" onClick={()=>{setIsReadMore(!isReadMore)}}>{!isReadMore ?'اقرأ اكثر':'اقرأ أقل'}</button>
              :null
}
          </div>
        </div>



        <div className="flex shrink-0 items-center gap-3 ml-4">
          <button
            onClick={() => {
              setShowDeleteModal(true);
            }}
            className="bg-red-500 text-white  hover:scale-110 active:scale-90 hover:rotate-12 rounded-full p-[8px] hover:text-red-500 hover:bg-white duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 1408 1536"
            >
              <path
                fill="currentColor"
                d="M512 1248V544q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0V544q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0V544q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zM480 256h448l-48-117q-7-9-17-11H546q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5H288q-66 0-113-58.5T128 1336V384H32q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              setShowEditModal(true);
            }}
            className="bg-blue-400  text-white hover:scale-110 active:scale-90 hover:rotate-12 rounded-full p-[8px] hover:text-blue-500 hover:bg-white duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 384 384"
            >
              <path
                fill="currentColor"
                d="M0 304L236 68l80 80L80 384H0v-80zM378 86l-39 39l-80-80l39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15z"
              />
            </svg>
          </button>
        </div>
      </div>
      <ConfirmDelete
        task={task}
        isVisible={ShowDeleteModal}
        setIsVisible={setShowDeleteModal}
      />
      <ConfirmEdit
        task={task}
        isVisible={ShowEditModal}
        setIsVisible={setShowEditModal}
      />
    </>
  );
}

export default Task;
