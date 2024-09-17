import React from 'react';

function AlbumFrame({ imageUrl, width, height }) {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }} // Definindo tamanho com estilos inline
      className="border-2 border-black m-2 inline-block bg-gray-200 relative overflow-hidden transform perspective-[600px] rotate-x-[10deg] transition-transform duration-300 ease-in-out"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="Album Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="text-gray-500 text-center flex items-center justify-center h-full">Add your album here</div>
      )}
    </div>
  );
}

export default AlbumFrame;