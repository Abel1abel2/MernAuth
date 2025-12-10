import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Verify from './pages/Verify'
import AuthSucess from './pages/AuthSucess'
function App() {


  return (
    <>
     <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/verify' element={<Verify/>}/>
       <Route path='/auth-success' element={<AuthSucess/>}/>
  
     </Routes>
    </>
  )
}

export default App
