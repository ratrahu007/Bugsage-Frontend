import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <Home />
      <Footer />
    </>
  );
}

export default App;
