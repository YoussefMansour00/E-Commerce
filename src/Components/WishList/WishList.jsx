import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WishListProduct from '../WishListProduct/WishListProduct'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function WishList() {

    const [Screen,setScreen] = useState(false)
    const[WistListProducts,setWistListProducts] = useState([])
    useEffect(()=>{GetWishListProducts()},[])
    
    async function GetWishListProducts(){
        setScreen(true)
        const{data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token:localStorage.getItem("Token")
            }
        })
        console.log(data.data);
        setWistListProducts(data.data)
        setScreen(false)
    } 

    if(Screen){
        return <LoadingScreen/>
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">  
    {
        WistListProducts.map((product,index)=>{
        return<>
           <WishListProduct product = {product} index={index} GetWishListProducts={GetWishListProducts}/>
        </>
        })
    }
    </div>
  )

  

  
}
