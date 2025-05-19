import { useContext } from "react"
import { TodoContext } from "../store/store"

const SearchBar = () => {
    
    const todoContext = useContext(TodoContext)

    return <div className="w-[50%]">
            <input type="text" ref={todoContext.search} className="border-4 border-red-400 w-[80%] mx-[3%]"/>
            <button className="px-[2%] rounded-xl border-4 border-red-400 bg-[#FFE0B5] dark:bg-gray-900 shadow-xl/30 hover:scale-105 hover:bg-rose-700 hover:text-white" onClick={() => {todoContext.handleSearch(todoContext.search.current.value)}}>Search</button>
            </div>
}
export default SearchBar