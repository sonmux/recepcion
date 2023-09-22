// ProtectedRoute.js
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importa useAuth desde el archivo AuthContext.js

function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación desde el contexto

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de inicio o a donde lo desees
    return <Navigate to="/" replace />
  }

  // Si el usuario está autenticado, renderiza la ruta protegida
  return element;
}

export default ProtectedRoute;
