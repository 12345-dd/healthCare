import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import DoctorProfile from './components/DoctorProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/doctor/:id' element={<DoctorProfile />}/>
      </Routes>
    </>
  )
}

export default App
