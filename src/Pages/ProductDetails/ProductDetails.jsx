import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen.jsx';
import Slider from "react-slick";
import { Bounce, toast } from 'react-toastify';
import {Button} from "@heroui/react";
import {AddProductToChart} from "../../Components/CartServices/CartServices.js"


export default function ProductDetails() {
  
  const [IsLoadin, setIsLoadin] = useState(false)
  
    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const[IsLoading,setIsLoading] = useState(true);
    const {id} = useParams()
    const [ProductDetails,setProductDetails] = useState(null)
        // console.log(id)
    async function GetProductDetails() {
        setIsLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+ id)
        // console.log(data.data);
        setProductDetails(data.data);
        setIsLoading(false)
    }
    useEffect(() => {
        GetProductDetails()
    },[])
    if(IsLoading){
      return <LoadingScreen/>
    }
    
  return (
    <div className="bg-gray-100">
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-wrap items-center">
      {/* Product Images */}
      <div className="w-full md:w-1/3 px-4 mb-8">
        <Slider {...settings}> {/* Use Slider from react-slick */}
      {
        ProductDetails?.images.map((image,index)=>{
        return <img key={index} src={image} alt="Product" className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
        })
      }
    </Slider>
      </div>
      {/* Product Details */}
      <div className="w-full md:w-2/3 px-4">
        <h2 className="text-3xl font-bold mb-2">{ProductDetails?.title}</h2>
        <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">${ProductDetails?.price}</span>
          <span className="text-gray-500 line-through">${ProductDetails?.price+100}</span>
        </div>
        <div className="flex items-center mb-4">

           {[1,2,3,4,5].map((rate)=>{
            return rate<=ProductDetails?.ratingsAverage?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>:
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-default-300">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
           })} 
          <span className="ml-2 text-gray-600">{ProductDetails?.ratingsAverage} ({ProductDetails?.ratingsQuantity})</span>
        </div>
        <p className="text-gray-700 mb-6">{ProductDetails?.description}</p>
        <div className="flex space-x-4 mb-6">
          <Button isLoading={IsLoadin} onPress={() => AddProductToChart(ProductDetails?._id,setIsLoadin) } className="w-full bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </Button>
          <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
