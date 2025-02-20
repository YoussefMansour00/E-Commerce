import axios from 'axios'
import { h1 } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

export default function Catgories() {

  const [catgories,setCatgories] = useState([]);
  const [IsLoading,setIsLoading] = useState(true);

  async function GetAllCatgories(){
    setIsLoading(true)
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    // console.log(data.data);
    setCatgories(data.data);
    setIsLoading(false);
  };

  useEffect(()=>{GetAllCatgories()},[])
  if(IsLoading){return <LoadingScreen/>}
  return <>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {
    catgories.map((catgory,index)=>{
      return   <div key={index} className="relative mx-auto text-center  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link to={"/"} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover mx-auto" src={catgory.image} alt="catgory image" />
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={"/"}>
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">{catgory.name}</h5>
        </Link>
      </div>
    </div>
      
    })
  }
  </div>

  </>
}
