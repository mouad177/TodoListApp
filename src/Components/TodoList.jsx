import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import ConfirmDeleteAll from "./ConfirmDeleteAll";

function TodoList() {
  const [taskInput, setTaskInput] = useState({ title: "", details: "" });
  const [ShowDeleteAllModal, setShowDeleteAllModal] = useState(false);
  let isDisabled = taskInput.title == "";
  const { tasks, setTasks } = useContext(TaskContext);
  const [selectBtnType, setSelectBtnType] = useState("all");
  const textAreaRef = useRef(null);
  useEffect(() => {
    const TaskStorage = JSON.parse(localStorage.getItem("task")) || tasks;
    setTasks(TaskStorage);
  }, []);
  useEffect(() => {
    if (textAreaRef.current) {
      let maxHeight = 120;
      textAreaRef.current.style.height = "auto";
      if (textAreaRef.current.scrollHeight > maxHeight) {
        textAreaRef.current.style.height = maxHeight + "px";
        textAreaRef.current.style.overflowY = "scroll";
      } else {
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight +'px';
      }
    }
  }, [taskInput.details]);
  function handleAddClick() {
    const newTasks = [
      ...tasks,
      { id: uuidv4(), title: taskInput.title, details: taskInput.details },
    ];
    setTasks(newTasks);
    setTaskInput({ title: "", details: "" });
    setSelectBtnType("all");
    localStorage.setItem("task", JSON.stringify(newTasks));
  }

  const completedTasks = tasks.filter((t) => {
    return t.isCompleted;
  });
  const noneCompletedTasks = tasks.filter((t) => {
    return !t.isCompleted;
  });
  let TasksToBeRenedering = tasks;
  if (selectBtnType == "completed") {
    TasksToBeRenedering = completedTasks;
  } else if (selectBtnType == "non-completed") {
    TasksToBeRenedering = noneCompletedTasks;
  }
  let TaskList = TasksToBeRenedering.map((t) => {
    return <Task key={t.id} task={t} />;
  });

  return (
    <>
      <div className="bg-white relative p-5 rounded-xl w-full md:w-[50%] gap-6 flex flex-col items-center justify-center   ">
        <h1 style={{ fontWeight: 900 }} className="text-4xl md:text-5xl">
          قائمة المهام
        </h1>
        <ul className="text-gray-600 flex flex-row-reverse items-center gap-[25px] cursor-default">
          <li
            onClick={() => {
              setSelectBtnType("all");
            }}
            className={`border ${
              selectBtnType == "all"
                ? "bg-blue-400 text-white"
                : "hover:bg-gray-200 duration-200"
            } border-1 border-gray-300 rounded-lg p-1 font-medium`}
          >
            الكل
          </li>
          <li
            onClick={() => {
              setSelectBtnType("non-completed");
            }}
            className={`border ${
              selectBtnType == "non-completed"
                ? "bg-blue-400 text-white"
                : "hover:bg-gray-200 duration-200"
            } border-1 border-gray-300 rounded-lg p-1 font-medium`}
          >
            غير منجز
          </li>
          <li
            onClick={() => {
              setSelectBtnType("completed");
            }}
            className={`border ${
              selectBtnType == "completed"
                ? "bg-blue-400 text-white"
                : "hover:bg-gray-200 duration-200"
            } border-1 border-gray-300 rounded-lg  p-1 font-medium`}
          >
            منجز
          </li>
        </ul>
        <div className="h-2 flex items-center ">
          <button
            onClick={() => {
              setShowDeleteAllModal(true);
            }}
            className={`left-8 ${
              tasks.length > 1 ? "flex" : "hidden"
            }  m-3 gap-2 top-28  items-center bg-red-500 hover:bg-red-700 duration-200 hover:scale-105 focus:scale-95 text-xs  text-white p-1 rounded-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 56 56"
            >
              <path
                fill="currentColor"
                d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m5.906-11.203c-1.148 0-2.109-.937-2.109-2.086c0-.539.234-1.054.656-1.476l6.797-6.844l-6.797-6.82c-.422-.422-.656-.938-.656-1.477c0-1.172.96-2.133 2.11-2.133c.562 0 1.054.211 1.476.633l6.844 6.844l6.843-6.844a1.973 1.973 0 0 1 1.454-.633a2.14 2.14 0 0 1 2.132 2.133c0 .54-.234 1.055-.656 1.477l-6.82 6.82l6.82 6.844c.422.422.656.937.656 1.476c0 1.149-.96 2.086-2.133 2.086c-.538 0-1.054-.21-1.43-.586l-6.866-6.89l-6.868 6.89a2.036 2.036 0 0 1-1.453.586"
              />
            </svg>
            حذف الكل
          </button>
        </div>
        <div
          className={`max-h-[50vh] p-2 w-full overflow-y-auto flex gap-2 flex-col`}
        >
          {TaskList}
        </div>

        <div className="w-full flex flex-row-reverse items-center justify-between ">
          <div dir="rtl" className="w-3/4 flex flex-col items-start gap-2">
            <input
              dir="rtl"
              onKeyDown={(e) => {
                e.key == "Enter" && !isDisabled ? handleAddClick() : "";
              }}
              value={taskInput.title}
              onChange={(e) => {
                setTaskInput({ ...taskInput, title: e.target.value });
              }}
              className="p-2 w-2/3 placeholder-gray-500/65 outline-0 border-2 rounded border-black"
              type="text"
              placeholder="عنوان المهمة"
            />
            <textarea
              ref={textAreaRef}
              dir="rtl"
              onKeyDown={(e) => {
                e.key == "Enter" && !isDisabled ? handleAddClick() : null;
              }}
              value={taskInput.details}
              onChange={(e) => {
                setTaskInput({ ...taskInput, details: e.target.value });
              }}
              className="p-2 w-full outline-0 resize-none placeholder-gray-500/65 border-2 rounded border-black"
              placeholder="تفاصيل المهمة"
            ></textarea>
          </div>
          <button
            disabled={isDisabled}
            onClick={handleAddClick}
            className={` text-sm -ml-2 border-2 border-gray-700 placeholder-gray-500/65 text-white  p-3 rounded-sm w-1/4 ${
              isDisabled
                ? "bg-gray-400"
                : "hover:border-blue-00 hover:bg-sky-600 bg-sky-400 duration-200 border-2 border-sky-900"
            }`}
          >
            اضافة
          </button>
        </div>
      </div>
      <ConfirmDeleteAll
        isVisible={ShowDeleteAllModal}
        setIsVisible={setShowDeleteAllModal}
      />
    </>
  );
}

export default TodoList;
