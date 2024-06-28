import React from "react";
import '../assets/css/form.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from "react";
import Vaildation from "../Components/Validation";
import axios from 'axios'
import {toast} from 'react-toastify'


const Register = () => {
  const[values,setValues]=useState({
    name:'',
    email:'',
    password:''
  })
  const[errors,setErrors]=useState({})
  const[serverErrors,setServerErrors]=useState([])
  const navigate=useNavigate()

  const handleInput=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const errs=Vaildation(values)
    setErrors(errs)
    if(errs.email==="" && errs.password===""){
      axios.post('http://localhost:3000/CMS/register',values)
      .then(res=>{
        if(res.data.success){
        toast.success("Account created succesfully",{
          position: "top-right",
          autoClose: 5000
        })
        navigate('/login')
      }
      }).catch(err=>{
        if(err.response.data.errors){
          setServerErrors(err.response.data.errors)
        }else{
          console.log(err)
        }
        })
 
    }
  }
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter "
            className="form-control"
            name="name"
            onChange={handleInput}
          />
          {
            errors.name && <span className="error">{errors.name}</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            name="email"
            autoComplete="off"
            onChange={handleInput}
          />
          {
            errors.email && <span className="error">{errors.email}</span>
          }
          </div>
          <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            placeholder="********"
            className="form-control"
            name="password"
            onChange={handleInput}
          />
          {
            errors.password && <span className="error">{errors.password}</span>
          }
        </div>
        {
          serverErrors.length>0 && (
            serverErrors.map((error,index)=>(
              <p className="error" key={index}>{error.msg}</p>
            ))
          )
        }
        <button className="form-btn">Register</button>
        <p>Already A member <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
