import { useContext } from "react";
import Task from "./Task";
import { TodoContext } from "../store/store";

const Tasks = () => {

const todoContext = useContext(TodoContext)

  return(
    <>
      {todoContext.list.map((item, i) => (
        <Task item={item} i={i} />
      ))}
    </>
  );
};
export default Tasks;