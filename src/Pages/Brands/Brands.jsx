import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

export default function Brands() {


  const [Brands, setBrands] = useState([])
  const [IsLoading, setIsLoading] = useState(true)
  async function GetAllBrands(){
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands") ;
    // console.log(data.data);
    setBrands(data.data)
    setIsLoading(false)
  }
  useEffect(()=>{GetAllBrands()},[])
  if(IsLoading){
    return <LoadingScreen/>
  }

  return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {
    Brands.map((brand,index)=>{
      return   <div key={index} className="relative mx-auto text-center  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover mx-auto" src={brand.image} alt="Brand image" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <div>
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">{brand.name}</h5>
        </div>
      </div>
    </div>
    })
  }
  </div>
  </>
}
