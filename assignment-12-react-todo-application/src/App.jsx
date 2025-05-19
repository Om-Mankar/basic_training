import { useContext} from "react";
import "./App.css";
import Tasks from "./components/Tasks.jsx";
import Heading from "./components/Heading.jsx";
import AddTask from "./components/AddTask.jsx";
import FilterTask from "./components/FilterTask.jsx";
import Theme from "./components/Theme.jsx";
import { TodoContext } from "./store/store.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  const todoContext = useContext(TodoContext)
  return (
    <div className=" bg-cover bg-[#FFF2D7] dark:bg-gray-900 min-h-screen pb-[5%] font-semibold text-rose-800 dark:text-white">
      <div className= 'text-2xl text-center py-[3%] font-bold'>Todo Application</div>
      <div className="flex justify-center my-[2%]">
      <SearchBar></SearchBar>
      <Theme ></Theme>
      </div>
      <FilterTask></FilterTask>
      <Heading></Heading>
      <div>
        {todoContext.list.length !== 0 && <Tasks ></Tasks>}
        {todoContext.list.length ===0 && <div className="text-center m-[10%] text-amber-800 text-4xl">The journey of a thousand miles begins with one step!!!</div>}
        <AddTask ></AddTask>
      </div>
    </div>
  );
}
export default App;