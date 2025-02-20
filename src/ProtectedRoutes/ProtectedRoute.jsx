import React, { useContext } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {IsLoggedIn} = useContext(authContext);
  return (<>
    {
        IsLoggedIn?children:<Navigate to="/login"/>
    }
    </>
)
}
