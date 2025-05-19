import { useContext } from "react"
import { TodoContext } from "../store/store"

const FilterTask = () => {

    const todoContext = useContext(TodoContext)
    
        return <div className="flex justify-around pb-[3%]">
                <button className='w-1/5 h-1/12 rounded-xl border-4 border-red-400 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:scale-105 hover:bg-rose-700 hover:text-white' onClick={todoContext.handleAllButton} >All</button>
                <button className='w-1/5 rounded-xl border-4 border-red-400 hover:scale-105 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:bg-rose-700 hover:text-white' onClick={todoContext.handleActiveButton} >Active</button>
                <button className='w-1/5 rounded-xl border-4 border-red-400 hover:scale-105 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:bg-rose-700 hover:text-white' onClick={todoContext.handleCompleteButton} >Completed</button>
                </div>
        
    }
    export default FilterTask;