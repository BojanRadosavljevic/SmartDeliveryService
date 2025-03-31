import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FrontPage } from './Pages/FrontPage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  )
}

export default App
