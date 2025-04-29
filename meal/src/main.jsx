import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router} from 'react-router-dom'; 
import { CategoriesProvider } from './context/CategoriesContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CategoriesProvider>
      <App />
    </CategoriesProvider>
  </StrictMode>,
)
