import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'

function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/*common component*/}
      <h1>Header component</h1>

      <Routes>
        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route/>
          <Route/>  
        </Route>
      </Routes>
    </div>
  )
}

export default App
