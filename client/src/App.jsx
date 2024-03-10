
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './Registration'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Registration />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
