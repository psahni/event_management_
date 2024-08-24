import AuthProvider from './provider/authProvider'
import { Routes } from './routes'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <AuthProvider>
        <Routes/>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
