import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {
   
  return (
    <>
    
      <Header/>
    
    <main className='main-content'>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App
