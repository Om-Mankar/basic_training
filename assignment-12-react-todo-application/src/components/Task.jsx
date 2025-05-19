import { useContext } from "react"
import { TodoContext } from "../store/store"


const Task =({item,i}) => {

  const todoContext = useContext(TodoContext)
  
    return <div className="flex ml-[2%] mr-[2%] mt-[1%] text-center border-4 border-red-400 rounded-2xl bg-[#F8C794] dark:bg-gray-900 p-4 font-semibold hover:scale-105 hover:shadow-2xl hover:border-red-500 hover:bg-rose-700 hover:text-white" key={i}>
            <div className="w-1/4 mx-[1%] text-center ">{item.newTask}</div>
            <div className="w-1/4 mx-[1%] text-center">{item.newTaskDate}</div>
            <div
              className="w-1/4 mx-[1%] text-center border-b-blue-200 border-2 cursor-pointer hover:bg-gray-400"
              onClick={() => todoContext.handleTaskStatus(i)}
           >
              {item.newTaskStatus}
            </div>
            <button
              onClick={() => todoContext.handleRemove(i)}
              className="w-1/4 mx-[1%] text-center border-b-blue-200 border-2 cursor-pointer hover:bg-gray-400"
          >
              Remove Todo
            </button>
          </div>
}
export default Task