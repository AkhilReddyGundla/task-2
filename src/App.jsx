import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Protection from './Components/Protection'
import { Suspense, lazy } from 'react'
import Loading from './Components/Loding'

const Login = lazy(()=>import('./Pages/Login'))
const Register = lazy(()=>import('./Pages/Register'))
const Dashboard = lazy(()=>import('./Pages/Dashboard'))

function App() {

  return (
    <>
     <BrowserRouter >
      <Routes>
          <Route path="/" element={<Suspense fallback={<Loading/>}><Register/></Suspense>}/>
          <Route path = "/login" element = {<Suspense fallback={<Loading/>}><Login/></Suspense>}/>
          <Route path="/dashboard" element={ <Protection><Suspense fallback={<Loading/>}><Dashboard /></Suspense></Protection>} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
