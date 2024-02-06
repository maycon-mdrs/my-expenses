import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from './pages/privateRoutes';
import { LoginPage } from './pages/Login/LoginPage';
import { HomePage } from './pages/Home/HomePage';
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path='/home' element={<HomePage />}>
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
  )
}

export default App
