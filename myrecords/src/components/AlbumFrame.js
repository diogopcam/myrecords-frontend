import React from 'react';

function AlbumFrame({ imageUrl, width, height, onDrop, albumName, artistName, albumType }) {

  const handleDrop = (e) => {
    e.preventDefault();
    const album = JSON.parse(e.dataTransfer.getData("text/plain"));
    onDrop(album);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    const album = JSON.stringify({
      imageUrl,
      albumName,
      artistName,
      albumType
    });
    e.dataTransfer.setData("text/plain", album);
  };

  return (
    <div
      draggable={imageUrl !== null}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative border-2 border-black m-2 inline-block bg-gray-200 cursor-pointer group"
    >
      {imageUrl ? (
        <div className="relative w-full h-full">
          <img 
            src={imageUrl} 
            alt="Album Cover" 
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50" 
          />
          <div className="absolute inset-0 flex flex-col overflow-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 text-white text-xs p-1">
            <p>Album name: {albumName}</p>
            <p>Artist: {artistName}</p>
            <p>Album Type: {albumType}</p>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center flex items-center justify-center h-full">Add your album here</div>
      )}
    </div>
  );
}

export default AlbumFrame;