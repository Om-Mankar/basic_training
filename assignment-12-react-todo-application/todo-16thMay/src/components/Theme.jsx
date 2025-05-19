import { useContext } from "react"
import { TodoContext } from "../store/store"

const Theme = () => {

        const todoContext = useContext(TodoContext)
        
    return<>
    <div className="flex justify-center">
        {todoContext.theme === 'dark'  && <button className="px-[2%] rounded-xl border-4 border-red-400 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:scale-105 hover:bg-rose-700 hover:text-white " onClick={()=>{todoContext.handleTheme('light')}}>
            Dark
        </button>}
        {todoContext.theme !== 'dark'  && <button className="px-[2%] rounded-xl border-4 border-red-400 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:scale-105 hover:bg-rose-700 hover:text-white " onClick={()=>{todoContext.handleTheme('dark')}}>
            Light
        </button>}
        
    </div>
        </> 
}
export default Theme