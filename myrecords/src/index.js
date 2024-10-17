import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SlideShow from './screens/SlideShow';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/slide-show" element={<SlideShow />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();