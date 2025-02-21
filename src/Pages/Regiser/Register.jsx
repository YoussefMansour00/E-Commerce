import React, { useState } from 'react'
import {form, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function Register() {

  const [isLoading, setisLoading] = useState(false);
  const [errMsg, seterrMsg] = useState('')
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and contain at least one letter and one number'),
    rePassword: Yup.string().required('Password is required').oneOf([Yup.ref('password')]),
    phone: Yup.string().required('phone is required').matches(/^\d{11}$/, 'Invalid phone number'),
  })

 const initialValues = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
 }
 function onSubmit(){ 
  setisLoading(true)
  seterrMsg('');
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(({data})=>{
    if(data.message==='success'){
      navigate("/login")
    }
     console.log(res);
   }).catch((err)=>{
    console.log(err);
    
    seterrMsg(err.response.data.message);
   }).finally(()=>{
   setisLoading(false)
   })
 }

 const {handleSubmit , values , handleChange, errors , touched , handleBlur} = useFormik({
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
    <Input isInvalid={errors.name && touched.name} errorMessage={errors.name} value={values.name} onChange={handleChange} onBlur={handleBlur} variant='bordered'  label="Name" type="text" name='name'/>
    </div>
    <div className=' col-span-2'>
    <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} value={values.email} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="Email" type="email" name='email'/>
    </div>
    <div className=' col-span-2 md:col-span-1'>
    <Input isInvalid={errors.password && touched.password} errorMessage={errors.password} value={values.password} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="Password" type="password" name='password'/>
    </div>
    <div className=' col-span-2 md:col-span-1'>
    <Input isInvalid={errors.rePassword && touched.rePassword} errorMessage={errors.rePassword} value={values.rePassword} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="repassword" type="password" name='rePassword'/>
    </div>
    <div className='md:col-span-2'>
    <Input isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} value={values.phone} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="phone Number" type="tel" name='phone'/>
    </div>
    <Button type='submit' isLoading={isLoading} color="primary" className=' col-span-2 my-4'>
      Register
    </Button>
    {errMsg&&<p className='text-red-600'>{errMsg}</p>}
  </div>
</form>

  </>
  )
}
