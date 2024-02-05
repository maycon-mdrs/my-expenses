import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente que define rotas privadas baseadas na autenticação do usuário.
 * Se o usuário estiver autenticado (possuir um email), permite o acesso às rotas aninhadas (Outlet),
 * caso contrário, redireciona para a página de login.
 */
export function PrivateRoutes () {
    
    return true ? <Navigate to='/login'/> : <Outlet/>; 
}

/* https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c */