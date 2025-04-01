import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FrontPage } from './Pages/FrontPage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { KorisnikMainPage } from './Pages/KorisnikMainPage'
import ProtectedRoute from './Auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/korisnik" element={<ProtectedRoute allowedRoles={["korisnik"]}><KorisnikMainPage/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App
