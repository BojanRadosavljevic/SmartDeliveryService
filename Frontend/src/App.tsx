import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FrontPage } from './Pages/FrontPage'
import { LoginPage } from './Pages/LoginPage'
import { RegisterPage } from './Pages/RegisterPage'
import { KorisnikMainPage } from './Pages/KorisnikMainPage'
import ProtectedRoute from './Auth/ProtectedRoute'
import { DostavljacMainPage } from './Pages/DostavljacMainPage'
import { CartProvider } from './Providers/CartProvider'
import { KorpaPage } from './Pages/KorpaPage'
import { PodesavanjaPage } from './Pages/PodesavanjaPage'
import { ObavestenjaPage } from './Pages/ObavestenjaPage'
import { PaketiPage } from './Pages/PaketiPage'
import { CanvasPage } from './Pages/CanvasPage'
import { DostavePage } from './Pages/DostavePage'

function App() {
  return (
    <>
    <Routes>
      <Route index element={<ProtectedRoute><FrontPage/></ProtectedRoute>}/>
      <Route path="/login" element={<ProtectedRoute><LoginPage/></ProtectedRoute>}/>
      <Route path="/register" element={<ProtectedRoute><RegisterPage/></ProtectedRoute>}/>
      <Route path="/korisnik" element={ <CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><KorisnikMainPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/podesavanja" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik","dostavljac"]}><PodesavanjaPage/></ProtectedRoute></CartProvider>}/>
      <Route path="/obavestenja" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><ObavestenjaPage/></ProtectedRoute></CartProvider>}/>
      <Route path="/paketi" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><PaketiPage/></ProtectedRoute></CartProvider>}/>
      <Route path="/korpa" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><KorpaPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/canvas" element={<CartProvider><ProtectedRoute allowedRoles={["korisnik"]}><CanvasPage/></ProtectedRoute> </CartProvider>}/>
      <Route path="/dostavljac" element={<ProtectedRoute allowedRoles={["dostavljac"]}><DostavljacMainPage/></ProtectedRoute>}/>
      <Route path="/dostave" element={<ProtectedRoute allowedRoles={["dostavljac"]}><DostavePage/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
