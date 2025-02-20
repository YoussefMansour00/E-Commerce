import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function AddProductToChart(productId,setIsLoadin) {
    setIsLoadin(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {productId}
      ,{
        headers:{
          token: localStorage.getItem("Token")
        }
      }
    )
    setIsLoadin(false)
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
    console.log(data);
  }
export async function AddProductToWishList(productId,setWishListIsLoading) {
  setWishListIsLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {productId}
      ,{
        headers:{
          token: localStorage.getItem("Token")
        }
      }
    )
    setWishListIsLoading(false)
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
    console.log(data);
  }
  