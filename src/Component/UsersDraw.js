import React from 'react'
import CircularStatic from './Loader';
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UsersDraw = ({loader, users, saveToLocalStorage, setUsers, setVisibility, setCurrentItem, setName, search, pagesVisited, usersPerPage}) => {
    let {handleSubmit, register, reset} = useForm()


    function Edit(item, index) {
        setName(item.name)
        setCurrentItem(item)
        setVisibility(prevState => !prevState)
        reset({name: ''})
      }
      function Delete(id) {
        setUsers(users.filter(user => user.id!== id))
        localStorage.removeItem("data")
       
          toast.success('Task deleted !', {
              position: toast.POSITION.TOP_RIGHT
          });
      
      }
      function handleChange(id) {
    
        users.forEach(user => {
          if (user.id === id) {
            user.completed =!user.completed
            setUsers([...users])
          }
        })
        saveToLocalStorage()
      
    }
  return (
    <div>
        { loader ? <CircularStatic /> : <>

      
<table className='table table my-4'>
      <tbody>
        {users.slice(pagesVisited, pagesVisited + usersPerPage).filter(item => {
          if (users === ""){
            return item
          } else if (item.name.toLowerCase().includes(search.toLowerCase())){
            return item
        }}).map((item, index) => <tr key={item.id}>
        
            <td>< input type={'checkbox'} checked={item.completed} onChange={() => handleChange(item.id) } item = {"check/" + item.id} /></td>
            <td><label className={item.completed ? saveToLocalStorage() || 'line' : '' && saveToLocalStorage()} htmlFor={'check/' + item.id}>{index + 1}</label></td>
            <td><label className={item.completed ? saveToLocalStorage() || 'line': '' && saveToLocalStorage()} htmlFor={'check/' + item.id}>{item.name}</label></td>
      
          <td ><span className='d-flex gap-5'><button onClick={() => Delete(item.id)} className='btn btn-danger'>delete</button><button onClick={() => Edit(item, index)} className='btn btn-warning'>edit</button></span></td>
   </tr>
          )}
      </tbody>
</table>
</>}
    </div>
  )
}
