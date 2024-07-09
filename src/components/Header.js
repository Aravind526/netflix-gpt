import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const showGptSearch =useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        navigate("/error")
      });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
        navigate("/browse")
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/")
      }
    });
    // unsubscribe when component unmounts
      return () => unsubscribe();
  },[]);
  const handleGptSearchClick =() =>{
     // Toggle GPT Search button
     dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    
    <div className='absolute w-screen  px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className="w-44" src={LOGO} alt="Logo" />
      {user && (<div className='flex p-2'>
        {showGptSearch&&<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>
          {showGptSearch?"HomePage": "GPT Search"}
        </button>
        <img className="w-12 h-12" alt="usericon" src={user.photoURL}></img>
        <button onClick={handleSignOut} className='font-bold text-white'>(sign out)</button>
      </div>
      )}
    </div>
  )
}

export default Header
