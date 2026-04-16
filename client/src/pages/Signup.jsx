import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Fromdata = { username, email, password }


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post(import.meta.env.VITE_SIGNUP_ROUTE, Fromdata)
      console.log(res.data)
      console.log("somthing good")

    } catch (error) {
      console.log(error.message)
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/api/auth/google";

    const perams = new useSearchParams(window.location.search)
    const token = perams.get("accesstoken")
    localStorage.setItem("token", token )
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-[440px] bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.1),0_20px_25px_-5px_rgba(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out">
        <h1 className="text-3xl font-extrabold text-slate-900 text-center mb-2 tracking-tight">Create account</h1>
        <p className="text-slate-500 text-center mb-8 text-[0.95rem]">Join us and start your journey today</p>

        <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:translate-y-[1px] mb-6" onClick={handleGoogleSignup}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium my-6 before:content-[''] before:h-[1px] before:flex-1 before:bg-slate-100 after:content-[''] after:h-[1px] after:flex-1 after:bg-slate-100">OR</div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2 mb-5">
            <label className="block text-sm font-semibold text-slate-700 ml-1" htmlFor="name">Full name</label>
            <input
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 placeholder:text-slate-400"
              type="text"
              id="name"
              placeholder="John Doe"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2 mb-5">
            <label className="block text-sm font-semibold text-slate-700 ml-1" htmlFor="email">Email address</label>
            <input
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 placeholder:text-slate-400"
              type="email"
              id="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          <div className="space-y-2 mb-5">
            <label className="block text-sm font-semibold text-slate-700 ml-1" htmlFor="password">Password</label>
            <input
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 transition-all focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 placeholder:text-slate-400"
              type="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}

            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none text-sm">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" required />
              <span>I agree to the <a href="#" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">Terms</a> and <a href="#" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-bold transition-all hover:bg-blue-700 hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.35)] hover:-translate-y-px active:translate-y-[1px] mt-2">
            Create account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">Sign in</Link>
        </div>
      </div>
    </div >
  );
};

export default Signup;
