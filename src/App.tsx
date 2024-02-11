import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '@/pages/privateRoutes';
import { LoginPage } from '@/pages/Login/LoginPage';
import { HomePage } from '@/pages/Home/HomePage';
import { ThemeProvider } from "@/components/theme-provider"
import { DataProvider } from '@/context/DataProvider';

function App() {
  return (
    <DataProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<PrivateRoutes />} >
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path='/home' element={<HomePage />}>
            </Route>
          </Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </ThemeProvider>
    </DataProvider>
  )
}

export default App
