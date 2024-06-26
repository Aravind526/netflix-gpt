import React from 'react'
import Header from './Header'
import { useState } from 'react'
const Login = () => {
    const [isSigninForm, setInSigninForm] = useState(true)

    const toggleSignInForm = () =>{
        setInSigninForm(!isSigninForm);
    } 
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/9a0b3e37-2f17-459f-b90b-15e96c2085ee/US-en-20240617-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="logo"/>
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className="font-bold text-3xl py-4" >{isSigninForm?'Sign In':'Sign Up'}</h1>
        {!isSigninForm&&<input type="text" placeholder='Full Name' className='p-4 my-2 w-full bg-gray-700'/>}
        <input type="text" placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700'/>
        <input type="password" placeholder='Password' className='p-4 my-2 w-full bg-gray-700'/>
        <button className='p-4 my-4 bg-red-700 w-full rounded-lg'>{isSigninForm?'Sign In':'Sign Up'}</button> 
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSigninForm?'New to Netflix? Sign up now':'Already registered sign in now'}</p>
      </form>
    </div>
  )
}

export default Login
