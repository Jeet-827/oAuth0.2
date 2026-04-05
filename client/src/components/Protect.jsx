import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Protect = ({ children }) => {
    const token = useSelector((state) => state.user.token)
    const refreshToken = Cookies.get("refreshToken")

    if (!token && refreshToken) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!token && !refreshToken) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default Protect
