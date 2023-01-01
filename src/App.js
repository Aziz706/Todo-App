import React, { useEffect } from 'react'
import "./App.css";
import {useForm} from "react-hook-form";
import ReactPaginate from 'react-paginate';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddTask } from './Component/AddTask';
import { UsersDraw } from './Component/UsersDraw';

export const App = () => {
  const [users, setUsers] = React.useState([
  {id: 1, name: 'Johnbsbdcvvvvvvvvvvvvvv ', completed: false},
  ].slice(0,3)); 
  const [name, setName] = React.useState('')
  const [loader, setLoader] = React.useState([true])
  const [currentItem, setCurrentItem] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [pageNumber, setPageNumber] = React.useState(0);
  const [visibility, setVisibility] = React.useState(false);
  let {handleSubmit, register, reset} = useForm()

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

 
  useEffect(() => {
    let newData = localStorage.getItem('data')
    setUsers(newData? JSON.parse(newData) : [])
}, [])
  
  
  useEffect(() => {
    setLoader(true)
      setTimeout(() => {
        // setUsers(users)
        setLoader(false)
      }, 1000)
    
  }, [])

 

  

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  

 
  function saveToLocalStorage(params) {
    localStorage.setItem('data', JSON.stringify(users))

 }

  return (
    <div className='container my-5 '>
      
      {/* <Rodal animation={"flip"} height={150} onClose={Close} visible={visibility}>
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
      </Rodal> */}

<AddTask search={search} setVisibility={setVisibility} visibility={visibility} users={users} name={name} currentItem={currentItem} setCurrentItem={setCurrentItem} setName={setName} setUsers={setUsers} saveToLocalStorage={saveToLocalStorage}/>

<UsersDraw search={search} setVisibility={setVisibility} setCurrentItem={setCurrentItem} setName={setName} users={users} saveToLocalStorage={saveToLocalStorage} loader={loader} setUsers={setUsers} pagesVisited={pagesVisited} usersPerPage={usersPerPage} /> 
 { users.length < 4 ? null : <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />}
      
      
      <ToastContainer />
    </div>
  )
}
