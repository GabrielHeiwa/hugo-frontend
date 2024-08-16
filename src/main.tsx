import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import App from './App.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SessionsPage from './pages/sessions/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/session",
    element: <SessionsPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
