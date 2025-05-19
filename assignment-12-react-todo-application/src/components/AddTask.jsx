import { useContext } from "react";
import { TodoContext } from "../store/store";

const AddTask = () => {

    const date = new Date()
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    const  day = date.getDate();

    if(month<10){
        month = '0' + month
    }
    
    const currentDate = year+'-'+month+'-'+day
    const todoContext = useContext(TodoContext)
    
    return (<div className='flex fixed bottom-[2%] left-0 w-[80%] ml-[10%] p-4 justify-around border-[#bd9f7c] rounded-xl border-4 bg-[#D8AE7E] dark:bg-gray-900'>
        <input type="text" name="task" placeholder='Enter the task !!!' ref = {todoContext.tasks} className='w-1/3 ml-[2%] px-[0.5%]border border-gray-300  text-sm rounded-lg placeholder:text-white font-semibold ' />
        <input type="date" name="date" min={currentDate} ref = {todoContext.lastDate} className='w-1/5 text-center  border-[#bd9f7c] rounded-xl border-4 font-semibold' />
        <input type="submit" value="Add Task"  onClick={todoContext.handleAdd} className='w-1/5 ml-[2%] text-center border-[#bd9f7c] rounded-xl border-4 font-semibold hover:cursor-pointer hover:bg-rose-900 hover:text-white' />
      </div>)
}
export default AddTask