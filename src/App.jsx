import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Counter from './components/Counter'

const App = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged In");
        console.log(user)
        navigate('/home',{ state: { email: user.email} })
      }else{
        console.log("Logged Out");
        navigate('/')
      }
    })
  },[])

  return (
    <div>

      {/* <ToastContainer theme='dark'/>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>   */}
    <Counter/>
    </div>
    
  )
}

export default App
