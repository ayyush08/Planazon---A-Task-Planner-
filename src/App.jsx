import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";

function App() {
  const [todo,setTodo] = useState('')
  const [todos,setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])
  

  const saveTasks = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished = (params) => {
    setShowFinished(!showFinished)
  }
  

  const handleAdd = ()=>{
    setTodos([...todos,{id: uuidv4(),todo,isCompleted:false}])
    setTodo('')
    console.log(todos);
    saveTasks()
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=> {
      return item.id !== id
    })
    setTodos(newTodos)
    saveTasks()
  } 
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=> i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=> {
      return item.id !== id
    })
    setTodos(newTodos)
    saveTasks()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted =!newTodos[index].isCompleted
    setTodos(newTodos)
    saveTasks()
    console.log(newTodos);
  }


  return (
    <>
    <Navbar/>
    <div className="md:container md:mx-auto my-5 rounded-xl bg-orange-300 min-h-[80vh] md:w-1/2 p-10">
    <h1 className='font-bold text-center text-4xl align-middle flex justify-center items-center gap-4'><SiGoogletasks />Planazon - Your goto task planner</h1>
      <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-lg font-bold text-center' >Add a Task</h2>
        <input onChange={handleChange} value={todo} type="text" className='rounded-full w-full px-5 py-1'/>
        <button  onClick={handleAdd} disabled={todo.length<=3} className='bg-orange-800 hover:bg-orange-950 p-2 py-2 text-white rounded-md disabled:bg-orange-700 text-lg font-bold active:scale-75 transition-all duration-50 w-1/4 mx-auto h-14'>Add</button>
      </div>
      <div className="check-container flex gap-2 font-mono font-bold">
      <input type="checkbox" className='dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-10 h-5' onChange={toggleFinished} checked={showFinished} /> <p>Show Finished</p>

      </div>
        <h2 className='text-lg font-bold'>Your Tasks</h2>
        <div className="todos flex flex-col justify-center align-center">
          {todos.length===0 && <div className='m-5 font-mono'> No Tasks to Display</div>}
          {todos.map((item)=>{

            return (showFinished || !item.isCompleted) && <div  key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
            <button className='bg-orange-800 hover:bg-orange-950 p-3 active:scale-75 transition-all duration-50 py-1 text-white rounded-md mx-1 text-sm font-bold'onClick={(e)=>handleEdit(e,item.id)}>
                <FaEdit/>
              </button>
              <button className='bg-orange-800 hover:bg-orange-950 p-3 py-1 active:scale-75 transition-all duration-50 text-white rounded-md mx-1 text-sm font-bold' onClick={(e)=>  handleDelete(e,item.id)}><RiDeleteBin6Fill /></button>
            </div>
          </div>
        })}
        </div>
    </div>
    </>
  )
}

export default App
