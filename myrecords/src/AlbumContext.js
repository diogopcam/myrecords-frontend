// AlbumContext.js
import React, { createContext, useContext, useState } from 'react';

const AlbumContext = createContext();

export const useAlbumContext = () => {
  return useContext(AlbumContext);
};

export const AlbumProvider = ({ children }) => {
  const [positions, setPositions] = useState(
    Array(15).fill({
      imageUrl: null,
      albumUri: '',
      albumName: '',
      artistName: '',
      albumType: ''
    })
  );

  return (
    <AlbumContext.Provider value={{ positions, setPositions }}>
      {children}
    </AlbumContext.Provider>
  );
};