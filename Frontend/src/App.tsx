import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FrontPage } from './Pages/FrontPage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { KorisnikMainPage } from './Pages/KorisnikMainPage'
import ProtectedRoute from './Auth/ProtectedRoute'
import { DostavljacMainPage } from './Pages/DostavljacMainPage'
import { CartProvider } from './Providers/CartProvider'

function App() {
  return (
    <>
    <Routes>
      <Route index element={<ProtectedRoute><FrontPage/></ProtectedRoute>}/>
      <Route path="/login" element={<ProtectedRoute><LoginPage/></ProtectedRoute>}/>
      <Route path="/register" element={<ProtectedRoute><RegisterPage/></ProtectedRoute>}/>
      <Route path="/korisnik" element={ <CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><KorisnikMainPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/dostavljac" element={<ProtectedRoute allowedRoles={["dostavljac"]}><DostavljacMainPage/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
