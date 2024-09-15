import React from 'react';

function AlbumFrame({ imageUrl }) {  // Adicionando prop imageUrl
  return (
    <div className="album-frame">
      {imageUrl ? (
        <img src={imageUrl} alt="Album Cover" className="album-image" />
      ) : (
        <div className="placeholder">Add your album here</div>
      )}
    </div>
  );
}

export default AlbumFrame;