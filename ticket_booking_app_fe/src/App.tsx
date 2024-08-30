import { AuthProvider } from './provider/authProvider'
import { Routes } from './routes'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <h2>Event App</h2>
      <AuthProvider>
        <Routes/>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
