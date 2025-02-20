import React, { useState } from 'react'
import {form, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function Address() {

    const [isLoading, setisLoading] = useState(false);
    const {cartId} = useParams()
    const validationSchema = Yup.object({
      details: Yup.string().required('Details is required'),
      phone: Yup.string().required('Phone is required').matches(/^\d{11}$/, 'Invalid phone number'),
      city: Yup.string().required('City is required'),
    })
  
   const initialValues = {
       details: null,
       phone: null,
       city: null,
   }
  
    async function checkOut(){
        {if((values.details!=null)&&(values.phone!=null)&&(values.city!=null)){
            setisLoading(true)
       const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{
         shippingAddress:values
       },{
         headers:{
           token:localStorage.getItem("Token")
         },
           params:{
             url:"http://localhost:5173"
           }
       })
       setisLoading(false);
       console.log(data.session.url);
       location.href=data.session.url
        }
        }
     }

   const {handleSubmit , values, handleChange , errors ,touched, handleBlur} = useFormik({
      initialValues,
      onSubmit:checkOut,
      validationSchema
    })
    

  return (
    <>
   <form onSubmit={handleSubmit}>
     <div className=" w-11/12 sm:w-2/3 grid grid-cols-1 md:grid-cols-2 mx-auto gap-5 my-20">
       <div className=' col-span-2'>
       <Input value={values.details} isInvalid={errors.details && touched.details} errorMessage={errors.details} onChange={handleChange} onBlur={handleBlur} variant='bordered'  label="Details" type="text" name='details'/>
       </div>
       <div className='md:col-span-2'>
       <Input value={values.phone} isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="phone Number" type="tel" name='phone'/>
       </div>
       <div className=' col-span-2'>
       <Input value={values.city} isInvalid={errors.city && touched.city} errorMessage={errors.city} onChange={handleChange} onBlur={handleBlur} variant='bordered' label="City" type="text" name='city'/>
       </div>
       <Button onPress={()=>checkOut()} type='submit' isLoading={isLoading} color="primary" className=' col-span-2 my-4'>
         Place Order
       </Button>
     </div>
   </form>
    </>
  )
}
