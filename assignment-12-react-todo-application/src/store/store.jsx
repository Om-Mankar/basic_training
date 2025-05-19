import {createContext,useEffect,useRef,useState} from 'react'

export const TodoContext = createContext(null);

export const TodoProvider = (props) => {

      const [list, setList] = useState([]);
      const tasks = useRef("");
      const lastDate = useRef()
      const [theme, setTheme] = useState('light')
      const search = useRef("")

      // to fetch from local storage
      useEffect(() => {
        const fetchList = JSON.parse(localStorage.getItem("todo"))
        fetchList == null ? setList([]):setList(fetchList)
        setTheme(localStorage.getItem('theme'))
      }, []);
    
        const handleAdd = () => {
          const newTask = tasks.current.value
          const newTaskDate = lastDate.current.value
          const newTaskStatus = 'pending'
          if (newTask !== '' && newTaskDate !== '') {
            const newList = [...list,{newTask,newTaskDate,newTaskStatus}];
            setList(newList);
            localStorage.setItem("todo", JSON.stringify(newList));
          }
          tasks.current.value = ''
          lastDate.current.value = ''
          search.current.value=''
        };
    
        const newList = list;
    
        const handleRemove = (i) => {
          const tempList = newList.filter((element) => element !== list.at(i));
          setList(tempList);
          localStorage.setItem("todo", JSON.stringify(tempList));
          search.current.value=''
        }
    
        const handleTaskStatus = (index) =>{
          const tempList = list;
          if(tempList.length===0){
          return;
        }
        switch (tempList[index].newTaskStatus) {
    
          case 'pending':
            tempList[index].newTaskStatus = 'complete'
            setList([...tempList])
            break;
    
          case 'complete':     
            tempList[index].newTaskStatus = 'pending'
            setList([...tempList])
            break;
        
          default:
            break;
        }
        localStorage.setItem("todo", JSON.stringify(list));
        search.current.value=''

        }
    
        const handleTheme = (theme) => {
          localStorage.setItem("theme",{theme});
          setTheme(theme)
          theme === 'light' ? 
          document.documentElement.classList.toggle('dark') :
          document.documentElement.classList.toggle('dark')
          search.current.value=''
        }

        const getList  = JSON.parse(localStorage.getItem("todo"))
          const handleAllButton = () => {
            setList(getList)
            search.current.value=''
          }

          const handleActiveButton = () => {
            const newList = getList.filter(((item) => item.newTaskStatus !== 'complete'))
            setList(newList)
            search.current.value=''
        }

        const handleCompleteButton = () => {
            const newList = getList.filter(((item) => item.newTaskStatus === 'complete'))
            setList(newList)
            search.current.value=''
        }
        
        const handleSearch = (text) =>{
          if(text === ''){
            return
          }
            let newList=[]
            const tempList = JSON.parse(localStorage.getItem("todo"))
            
            tempList.map((item)=>{
              
              const result = item.newTask.includes(text)
              result === true ? newList.push(item):newList;
            })
            setList([...newList])
        search.current.value=''
        }

      
    return (
        <TodoContext.Provider value = {{list, theme,tasks ,lastDate, search, getList, setList, setTheme,handleAdd, handleRemove, handleTaskStatus, handleTheme, handleActiveButton, handleAllButton, handleCompleteButton,handleSearch}}>
            {props.children}
        </TodoContext.Provider>
    )
}
export default TodoProvider