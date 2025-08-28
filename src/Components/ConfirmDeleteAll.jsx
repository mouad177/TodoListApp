import React, { useContext } from "react";
import { TaskContext } from "../Contexts/TaskContext";

function ConfirmDeleteAll({ isVisible, setIsVisible }) {
  const { tasks, setTasks } = useContext(TaskContext);
  function handleDeleteAllClick() {
    const newTasks = tasks.filter(() => {
      return null;
    });
    setTasks(newTasks);
    setIsVisible(false)
        localStorage.setItem("task",JSON.stringify(newTasks))

  }
  if (isVisible) {
    return (
      <>
    <div className="bg-black/60 fixed inset-0 z-10 justify-center w-screen h-full shadow-2xl flex flex-col items-center gap-6 text-center p-4 rounded-xl">
              <div className="w-[400px] absolute bg-white shadow-2xl flex flex-col items-center gap-6 text-center p-3 rounded-xl">

          <h2 className="text-2xl">هل انت متاكد من رغبتك بحذف جميع المهام ؟</h2>
          <p className="text-black/60 text-sm">
            لا يمكنك التراجع عن الحذف في حال اختيار حذف
          </p>
<div className="flex items-center gap-4">
              <button
            onClick={handleDeleteAllClick}
            className="text-white p-2 rounded-xl bg-gradient-to-r from-red-400 via-pink-600 to-rose-600 hover:from-red-700 hover:via-pink-700 hover:to-rose-700"
          >
            حذف
          </button>
          <button
            onClick={() => {
              setIsVisible(false);
            }}
            className="text-white p-2 rounded-xl bg-gradient-to-r from-blue-400 via-sky-600 to-sky-500 hover:from-blue-600 hover:via-sky-700 hover:to-sky-800"
          >
            الغاء
          </button>
</div>
</div>
        </div>


      </>
    );
  } else return <></>;
}

export default ConfirmDeleteAll;
