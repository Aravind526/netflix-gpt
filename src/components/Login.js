import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react'
import { checkValidData } from '../utils/Validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import {updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSigninForm, setInSigninForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    //validate form data
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    if (message) return;

    // sign in sign up logic


    if (!isSigninForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName:name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/68600400?s=48&v=4"
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}))
            navigate("/browse")
          }).catch((error) => {
            setErrorMessage(error.message)
          });
          
          console.log(user)
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    }
  }
  const toggleSignInForm = () => {
    setInSigninForm(!isSigninForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/9a0b3e37-2f17-459f-b90b-15e96c2085ee/US-en-20240617-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="logo" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className="font-bold text-3xl py-4" >{isSigninForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSigninForm && <input ref={name} type="text" placeholder='Full Name' className='p-4 my-2 w-full bg-gray-700' />}
        <input ref={email} type="text" placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700' />
        <input ref={password} type="password" placeholder='Password' className='p-4 my-2 w-full bg-gray-700' />
        <p class="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSigninForm ? 'Sign In' : 'Sign Up'}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSigninForm ? 'New to Netflix? Sign up now' : 'Already registered sign in now'}</p>
      </form>
    </div>
  )
}

export default Login
