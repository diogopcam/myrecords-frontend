// App.js
import React from 'react';
import AlbumFrame from '../src/components/AlbumFrame'
import './App.css';

function App() {
  return (
    <div className='FullScreen'>
    <div className='Menu'> 
      <div className='MenuContent'>
      <h1> Bem vindo ao myrecords </h1> 
      <text className='Text'> Aqui você pode criar e compartilhar uma colagem seus álbuns favoritos. </text>
      </div>
      </div>
    <div className="App" >
      <div className="album-container">
        {Array.from({ length: 10 }).map((_, idx) => (
          <AlbumFrame imageUrl={'/Users/dpcam/Desktop/myrecords-frontend/myrecords/src/images/my_albums.jpeg'}key={idx} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
