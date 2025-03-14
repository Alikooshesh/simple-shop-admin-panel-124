import { Route, Routes, useNavigate } from 'react-router'
import LoginPage from './pages/login'
import ProductsPage from './pages/dashboard/products'
import { ReactNode, useEffect, useState } from 'react'


export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    let access = localStorage.getItem('access')
    if (access) {
      setHasAccess(true)
    } else {
      setHasAccess(false)
    }
  }, [])

  if (hasAccess === null) {
    return <p>loading ...</p>
  }

  if (hasAccess === false) {
    navigate('/')
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard'>
          <Route path='/dashboard/products' element={<PrivateRoutes><ProductsPage /></PrivateRoutes>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
