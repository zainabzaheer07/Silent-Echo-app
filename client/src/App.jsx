// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import HomePage from './pages/HomePage';

// import Login from './components/Login/Login';
import LoginPage from './pages/LoginPage';
import ConversationPage from './pages/ConversationPage';
import Signup from './components/Signup/Signup';
import LearnPage from './pages/LearnPage';
import SignDetailsPage from './pages/SignDetailsPage';
function App() {


  return (
    <Router>
      <div className="app">
        {/* Navbar will appear on every page */}
<Navbar />
        {/* Define Routes */}
        <Routes>
         <Route path="/" element={<HomePage/>} />

         {/* Login route */}

         <Route path="/login" element={<LoginPage />} />
         {/* <Route path="/signup" element={<Signup />} /> */}
         <Route path="/signup" element={<LoginPage />} />
         <Route path="/conversation" element={<ConversationPage />} />

         {/*  */}


         <Route path="/learn" element={<LearnPage />} />
         <Route path="/signs/:signId" element={<SignDetailsPage />} />

         {/*  */}
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;