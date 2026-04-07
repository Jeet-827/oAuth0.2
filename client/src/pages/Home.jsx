import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../../redux/slices/tokenSlice'
import { useNavigate } from 'react-router-dom'
import { setUserInfo } from '../../redux/slices/userSlice'

const Home = () => {
    const token = useSelector((state) => state.user.token)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getUserData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data.user)
            dispatch(setUserInfo(res.data.user))
        } catch (error) {
            console.error("Failed to fetch profile", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) {
            return navigate('/login')
        }
        getUserData()
    }, [token])

    const handleLogout = () => {
        import('js-cookie').then(Cookies => Cookies.default.remove('refreshToken'));
        dispatch(setToken(null))
        navigate('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-[#E9F1FF] to-[#FFE9F2]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen  bg-gradient-to-r from-[#E9F1FF] to-[#FFE9F2] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-blue-600 px-6 py-8 text-center">
                    <div className="h-24 w-24 rounded-full bg-white text-blue-600 font-bold text-4xl flex items-center justify-center mx-auto mb-4 tracking-tighter shadow-md">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Welcome, {user?.username || 'User'}
                    </h2>
                    <p className="text-blue-100 mt-1">
                        Here is your account information
                    </p>
                </div>

                <div className="p-8">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Account Details</h3>
                            <div className="mt-4 border-t border-b border-gray-100 divide-y divide-gray-100">
                                <div className="py-4 flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Username</span>
                                    <span className="text-gray-900">{user?.username}</span>
                                </div>
                                <div className="py-4 flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Email</span>
                                    <span className="text-gray-900">{user?.email}</span>
                                </div>
                                <div className="py-4 flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">User ID</span>
                                    <span className="text-gray-900 text-sm">{user?._id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={handleLogout}
                                className="w-full flex justify-center py-3 px-4 border border-red-100 rounded-lg shadow-sm text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home