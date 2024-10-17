import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SlideShow from './screens/SlideShow';
import reportWebVitals from './reportWebVitals';
import {AlbumProvider} from './AlbumContext';
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlbumProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/slide-show" element={<SlideShow />} />
      </Routes>
    </BrowserRouter>
  </AlbumProvider>
);

reportWebVitals();