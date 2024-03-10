import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const [message, setMessage] = useState()
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const getDashboard = async () => {
  
    try {
      const response = await axios.get('http://localhost:3000/dashboard');
      if(response.data.valid) {
        setMessage(response.data.message)
      } else {
        navigate('/')
      }
    } catch(err) {
      console.log("Error in dasboard component")
    }
  }
  
  useEffect(()=>{
    getDashboard()
  },[])

  return (
    <h2>Dashboard {message} </h2>
  )
}

export default Dashboard