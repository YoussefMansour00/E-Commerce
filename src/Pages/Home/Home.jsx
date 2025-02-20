import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Product from "../../Components/Product/Product";

export default function Home() {
  const [IsLoading, setIsLoading] = useState(true)
  const [products,setProducts] = useState([])
  useEffect(() => {
    GetAllProducts()
  },[])
  async function GetAllProducts(){
    setIsLoading(true)
  const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  setProducts(data.data);
  setIsLoading(false);
  }

  if(IsLoading){
    return <LoadingScreen/>
  }

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {
    products.map((product,index)=>{ 
      return<>
        <Product product={product} index={index}/>
      </>
    })
    }
   </div> 
  )
  
}
