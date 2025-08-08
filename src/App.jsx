import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {

let location = useLocation();
  return (
    <>

      {
        (!location.pathname.includes('/admin')) && <Header />
      }

      <main className='main-content'>
        <Outlet />
      </main>
      {
        (!location.pathname.includes('/admin')) && <Footer />
      }
      
    </>
  )
}

export default App
