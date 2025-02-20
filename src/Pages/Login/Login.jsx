import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { use } from 'react';
import { authContext } from '../../contexts/authContext';

export default function Register() {
 const {setIsLoggedIn} = useContext(authContext);
  const [isLoading, setisLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("")
  const navigate = useNavigate();
    const validationSchema = Yup.object({
      email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
      password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number'),
    })
 const initialValues = {
  email: '', //koki12@gmail.com
  password: '', //1234567a
 }
  function onSubmit(){ 
  setisLoading(true)
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(({data})=>{
    if(data.message==='success'){
      localStorage.setItem("Token",data.token);
      setIsLoggedIn(true);
      navigate("/")
    }
   }).catch((err)=>{
    seterrMsg(err.response.data.message);
   }).finally(()=>{
    setisLoading(false)
   });
   console.log(data);
 }
// function validate(){
//   const errors = {};
//   if(values.email ==''){
//     errors.email = 'Email is required';
//   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
//     errors.email = 'Invalid email address';
//   }
//   if(values.password ==''){
//     errors.password = 'Password is required';
//   }
//   return errors;
// }
 const {handleSubmit, values , handleChange, errors , touched , handleBlur} = useFormik({
    initialValues,
    onSubmit,
    // validate
    validationSchema
  })
  

  return (
  <>
<form onSubmit={handleSubmit}>
  <div className=" w-11/12 sm:w-2/3 grid grid-cols-1 md:grid-cols-2 mx-auto gap-5 my-20">
    <div className=' col-span-2'>
    <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} value={values.email} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="Email" type="email" name='email'/>
    </div>
    <div className=' col-span-2'>
    <Input isInvalid={errors.password && touched.password} errorMessage={errors.password} value={values.password} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="Password" type="password" name='password'/>
    </div>
    <Button type='submit' isLoading={isLoading} color="primary" className=' col-span-2 my-4'>
      Login
    </Button>
    <div className="grid grid-cols-1 gap-4">
    {errMsg && <p className='text-red-500'>{errMsg}</p>}
    <Link to="/forgetPassword" className='text-blue-700'>Forget Your Password</Link>
    </div>
  </div>
</form>
  </>
  )
}
