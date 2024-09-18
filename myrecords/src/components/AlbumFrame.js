import React from 'react';

function AlbumFrame({ imageUrl, width, height, onDrop }) {

  const handleDrop = (e) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData("text/plain");
    onDrop(imageUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", imageUrl);
  };

  return (
    <div
      draggable={imageUrl !== null} // Só é arrastável se houver uma imagem
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="border-2 border-black m-2 inline-block bg-gray-200 hover:text-white hover:bg-black hover: cursor-pointer"
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