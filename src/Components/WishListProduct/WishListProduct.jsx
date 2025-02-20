import axios from 'axios'
import React, { useState } from 'react'
import { AddProductToChart } from '../CartServices/CartServices'
import { Link } from 'react-router-dom'
import { Button } from '@heroui/react'
import { Bounce, toast } from "react-toastify";


export default function WishListProduct({product,index,GetWishListProducts}) {

    const [IsLoadin, setIsLoadin] = useState(false)
    const [RemoveIsLoading, setRemoveIsLoading] = useState(false)
    async function RemoveWishlistProduct(producdId){
        setRemoveIsLoading(true)
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${producdId}`,{
            headers:{
                token:localStorage.getItem("Token")
            }
        })
        setRemoveIsLoading(false)
        GetWishListProducts()       
           toast.success(data.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
    }


  return (
    <div key={index} className="relative mx-auto text-center  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <Link to={"/Productdetails/"+product._id} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
      <img className="object-cover mx-auto" src={product.imageCover} alt="product image" />
      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">15% OFF</span>
    </Link>
    <div className="mt-4 px-5 pb-5">
      <Link to={"/Productdetails/"+product._id}>
        <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">{product.title}</h5>
      </Link>
      <div className="mt-2 mb-5 flex-col items-center justify-between">
        <p>
          <span className="text-3xl font-bold text-slate-900">${product.price}</span>
          <span className="text-sm text-slate-900 line-through">${product.price+100}</span>
        </p>
        <div className="flex justify-center mt-2 ">
  
  
        {[1,2,3,4,5].map((rate,index)=>{
          return rate<=product.ratingsAverage?
          <svg key={index} aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          :
          <svg key={index} aria-hidden="true" className="h-5 w-5 text-default-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        }
        )
        }
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratingsAverage}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
      <Button isLoading={IsLoadin} type='button' onPress={()=>AddProductToChart(product._id,setIsLoadin)} className="mx-auto flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to cart</Button>
      <Button isLoading={RemoveIsLoading} type='button' onPress={()=>RemoveWishlistProduct(product._id)} className="mx-auto flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Remove</Button>
      </div>
    </div>
  </div>
  )
}
