import React from 'react'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import {useForm} from "react-hook-form";

export const AddTask = ({setVisibility, visibility, users, name, currentItem, setCurrentItem, setName, setUsers, saveToLocalStorage}) => {
  let {handleSubmit, register, reset} = useForm()
  const [search, setSearch] = React.useState('')

  function Search(e) {
    // setUsers(e.target.value? users.filter(user => user.name.toLowerCase().includes())
    setSearch(e.target.value)
  }
  function Close(params) {
    setVisibility(prevState => !prevState)
    reset({name: ''})
    setName('')
    
  }
  return (
    <div>
        <div className='d-flex justify-content-center align-items-center justify-content-between'>
        <button onClick={Close} className='btn btn-success p-2'>Add Task</button>
      <input onChange={Search} placeholder='search' type={"text"} className={'form-control w-75 p-2'} />
      </div>
        <Rodal animation={"flip"} height={150} onClose={Close} visible={visibility}>
        <form onSubmit={
        event => {
          event.preventDefault()
          let obj = {
            id: users.length + 1,
            name,
            completed: users.completed
          }
          if (currentItem === "") {
            users.push(obj)
          } else {
            users.forEach(user => {
              if (user.id === parseInt(currentItem.id)) {
                user.name = name
                user.completed = users.completed
              }
            })
            setCurrentItem('')
            users.name = ''
          }
          // setUsers(
          //   users.concat({
          //     id: users.length + 1,
          //     name,
          //     completed: users.every(user => user.completed),
          //   })) 
          setUsers([...users])
          saveToLocalStorage()

          Close()
          reset()
            setName('')
  }}>
<input value={name} onChange={(e) => setName(e.target.value)} placeholder='enter your task...' type={"text"} className={'form-control my-4'} />
      </form>
      </Rodal>
    </div>
  )
}
