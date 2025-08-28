import React, { useContext, useState } from "react";
import { TaskContext } from "../Contexts/TaskContext";

function ConfirmEdit({ task, isVisible, setIsVisible }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [updateInput,setUpdateInput] = useState({title:task.title,details:task.details})
let isDisabled = updateInput.title=='' && updateInput.details == ''
function handleEditClick(){
    const updateTasks = tasks.map((t)=>{
        if(t.id==task.id){
            return {...t,title:updateInput.title,details:updateInput.details}
        }else return t
    })
    setTasks(updateTasks)
    setIsVisible(false)
        localStorage.setItem("task",JSON.stringify(updateTasks))

}
  if (isVisible) {
    return (
      <>
    <div className="bg-black/60 fixed inset-0 z-10  w-screen h-screen flex items-center justify-center">
              <div className="w-[400px] absolute bg-white shadow-2xl flex flex-col items-center gap-6 text-center p-3 rounded-xl">
          <h2 className="text-2xl">تعـديل المهــمة</h2>
<div className="flex flex-col items-center gap-4 w-full">
    <input value={updateInput.title} onChange={(e)=>{setUpdateInput({...updateInput,title:e.target.value})}} className="w-3/4 p-3 outline-black/50 rounded-xl text-sm border-2 border-black/50 text-center" placeholder="عنوان المهمة" type="text" />
<textarea value={updateInput.details} onChange={(e)=>{setUpdateInput({...updateInput,details:e.target.value})}} className="w-3/4 p-3 outline-black/50 rounded-xl text-sm border-2 border-black/50 text-end" placeholder="التفاصيل" />
</div>
<div className="flex items-center gap-4">
              <button disabled={isDisabled}
             
            onClick={handleEditClick}
            className={` text-white p-2 rounded-xl ${isDisabled?'bg-gray-400':' bg-green-500 hover:bg-green-600 duration-200'}`}
          >
            تأكيد
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

export default ConfirmEdit;
