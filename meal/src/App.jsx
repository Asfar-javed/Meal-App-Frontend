// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesScreen from './pages/CategoriesScreen';
import MealsScreen from './pages/MealsScreen';
import MealDetailsScreen from './pages/MealDetailsScreen';
import ChatScreen from './pages/ChatScreen';
import FormScreen from './pages/FormScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (<>
  <Router>  
      <Routes>
        <Route path="/" element={<CategoriesScreen />} />
        <Route path="/meals" element={<MealsScreen />} />
        <Route path="/meal/:id" element={<MealDetailsScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/form" element={<FormScreen />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
  );
};

export default App;
