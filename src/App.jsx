
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import MainLayout from './Layouts/MainLayout'
import Login from './Pages/Login/Login'
import Register from './Pages/Regiser/Register'
import NotFound from './Pages/NotFound/NotFound'
import Catgories from './Pages/Catgories/Catgories'
import Brands from './Pages/Brands/Brands'
import Cart from './Pages/Cart/Cart'
import CounterProvider from './contexts/CounterContexts'
import AuthProvider from './contexts/authContext'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import SignedProtectd from './ProtectedRoutes/signedProtectd'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './Components/Address/Address'
import AllOrders from './Components/AllOrders/AllOrders'
import WishList from './Components/WishList/WishList'
import ForgetPassword from './Components/ForgetPasssword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import Resetpassword from './Components/Resetpassword/resetpassword'

function App() {

  const router = createBrowserRouter([
    {path:"",element:<MainLayout/>, children:[
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"/login" , element:<SignedProtectd><Login/></SignedProtectd>},
      {path:"/register" , element:<SignedProtectd><Register/></SignedProtectd>},
      {path:"/resetpassword" , element:<SignedProtectd><Resetpassword/></SignedProtectd>},
      {path:"/forgetPassword" , element:<SignedProtectd><ForgetPassword/></SignedProtectd>},
      {path:"/verifyCode" , element:<SignedProtectd><VerifyCode/></SignedProtectd>},
      {path:"/brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"/catgories" , element:<ProtectedRoute><Catgories/></ProtectedRoute>},
      {path:"/cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"/Address/:cartId" , element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path:"/allorders" , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'/Productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'/Wishlist' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:"*" , element:<NotFound/>}
    ]}
    
  ])

  return (
    <>
    <AuthProvider>
      <CounterProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    </CounterProvider>
    </AuthProvider>
    
    </>
  )
}

export default App
