import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCart from '../../Components/ProductCart/ProductCart'
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen'
import {Button} from "@heroui/react";
import { Link } from 'react-router-dom';


export default function Cart() {
  const [cartId, setcartId] = useState(null)
  const [cartData, setCartData] = useState(null)
  const [numOfCartItems, setnumOfCartItems] = useState(0)
  const [IsLoadingCart, setIsLoadingCart] = useState(true)
  const [IsLoadingClear, setIsLoadingClear] = useState(false)

  useEffect(() => {
    GetCartProducts()
  },[])
  async function GetCartProducts(){
    setIsLoadingCart(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers: {
        token:localStorage.getItem("Token")
      }  
    })
    setIsLoadingCart(false)
    setCartData(data.data)
    setnumOfCartItems(data.numOfCartItems)
    setcartId(data.cartId)
    console.log(data.data);    
    console.log(data.data.products);    
  }

  async function clearCartProducts(){
    setIsLoadingClear(true)
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers: {
        token:localStorage.getItem("Token")
      }
    })
    setIsLoadingClear(false)
    console.log(data);
    setCartData(data.data)
    setnumOfCartItems(0)
    setcartId(data.cartId)
  }

 


  if(IsLoadingCart) return <LoadingScreen/>


  return <>
  
 <div className='flex justify-around'>
 <h1 className="mb-10 text-center text-2xl font-bold">Cart Items({numOfCartItems})</h1>


 {
  !!numOfCartItems&&
  <Button isLoading={IsLoadingClear} onPress={clearCartProducts} className='text-red-500 bg-transparent'>Clear</Button>
  }
 </div>

  {
    numOfCartItems?
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="  rounded-lg md:w-2/3">
    {
       cartData?.products?.map((product,index)=>(
        <ProductCart
         key={index} 
        product={product} 
        setCartData={setCartData}
        setnumOfCartItems={setnumOfCartItems}
        setcartId={setcartId}
        setIsLoadingCart={setIsLoadingCart}
        IsLoadingCart={IsLoadingCart}/>
      ))
    }
      
    </div>
    {/* Sub total */}
    <div className=" mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">${cartData?.totalCartPrice}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className>
          <p className="mb-1 text-lg font-bold">${cartData?.totalCartPrice+4.99}</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <Link to={"/Address/"+cartId} className="block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      
    </div>
  </div>
  :
  <h1 className='text-center text-2xl font-bold'>Your Cart is Empty</h1>
  }
  </>
}
