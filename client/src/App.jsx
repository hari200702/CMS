import Navbar from './Components/Navbar'
import Register from './Pages/Register'
import Home from './Pages/Home'
import{createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from './Pages/Dashboard'
import Contacts from './Components/Contacts.jsx'
import AddContact from './Components/AddContact.jsx'
import EditContact from './Components/EditContact.jsx'
import Logout from './Components/Logout.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes.jsx'
import Notfound from './Pages/Notfound.jsx'
import About from './Components/About.jsx'




export const UserContext=createContext(null)



const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>

  },
  {
    path:'/dashboard',
    element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>,
    children:[
      {
        index:true,
        element:<Contacts />
      },
      {
        path: "/dashboard/add-contact",
        element:<AddContact />
      },
      {
        path: "/dashboard/edit-contact/:id",
        element:<EditContact />
      }
    ]
  },
  {
    path:'/logout',
    element:<Logout />

  },
  {
    path:"*",
    element:<Notfound />
  },
  {
    path:"/about",
    element:<About />
  }
])

const App = () => {
  const [user,setUser]=useState()
  useEffect(()=>{
    axios.get('http://localhost:3000/CMS/verify',{
      headers:{
        Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
    .then(res=>{
      if(res.data.user){
        setUser(res.data.user)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{user,setUser}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </>
    
  )
}

export default App
