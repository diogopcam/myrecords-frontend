import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';

function AlbumFrame({ imageUrl, albumUri, width, height, onDrop, albumName, artistName, albumType }) {

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
      albumUri,
      albumName,
      artistName,
      albumType
    });
    e.dataTransfer.setData("text/plain", album);
  };

  const handlePlayClick = () => {
    console.log(albumUri);
  }

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
          <div className="absolute inset-0 flex flex-col overflow-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 text-white text-xs p-2 justify-between">
            <div>
              <p className="text-2xl">{albumName}</p>
              <p className="text-sm">{artistName}</p>
            </div>
            <button onClick={handlePlayClick}>
              <a href={`${albumUri}`} target="_blank" rel="noreferrer"> 
               <FaPlayCircle size={32}/> 
              </a>
            </button>
            {/* <p className="text-sm">{albumType}</p> */}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-xs text-center flex items-center justify-center h-full">Add your album here</div>
      )}
    </div>
  );
}

export default AlbumFrame;