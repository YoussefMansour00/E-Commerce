import React, { useContext, useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../../contexts/authContext';

export default function ForgetPassword() {

    const {setIsLoggedIn} = useContext(authContext);
    const [isLoading, setisLoading] = useState(false);
    const [errMsg, seterrMsg] = useState("")
    const navigate = useNavigate();

  const validationSchema = Yup.object({
      email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
    })

    const initialValues = {
        email: '',
       }

    function onSubmit(){ 
        setisLoading(true)
         axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{email:values.email}).then(({data})=>{
          if(data.statusMsg==='success'){
            localStorage.setItem("Token",data.token);
            setIsLoggedIn(false);
            navigate("/verifyCode")
          }
         }).catch((err)=>{
          seterrMsg(err.response.data.message);
         }).finally(()=>{
          setisLoading(false)
         });
       }

        const {handleSubmit, values , handleChange, errors , touched , handleBlur} = useFormik({
           initialValues,
           onSubmit,
           // validate
           validationSchema
         })
  return <>
  <form onSubmit={handleSubmit}>
  <div className=" w-11/12 sm:w-2/3 grid grid-cols-1 md:grid-cols-2 mx-auto gap-5 my-20">
    <div className=' col-span-2'>
    <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} value={values.email} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="Email" type="email" name='email'/>
    </div>
    <Button type='submit' isLoading={isLoading} color="primary" className=' col-span-2 my-4'>
      Verify
    </Button>
    {errMsg && <p className='text-red-500'>{errMsg}</p>}
 
  </div>
</form>
  </>
}
