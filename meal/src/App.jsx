// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CategoriesScreen from './pages/CategoriesScreen';
import MealsScreen from './pages/MealsScreen';
import MealDetailsScreen from './pages/MealDetailsScreen';
import ChatScreen from './pages/ChatScreen';
import FormScreen from './pages/FormScreen';
import FavoritesScreen from './pages/FavoriteScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (<>
  <Router>  
      <Routes>
        {/* Initial screen: Login */}
        <Route path="/" element={<Login />} />
        
        {/* Auth Screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Screens */}
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/meals" element={<MealsScreen />} />
        <Route path="/meal/:id" element={<MealDetailsScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/form" element={<FormScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
  );
};

export default App;
