import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

function SlideShow() {
  const location = useLocation();
  
  // Recupere o array de álbuns que foi passado como parâmetro
  const albums = location.state?.albums || [];

  // Use efeito para logar os dados recebidos quando o componente for montado
  useEffect(() => {
    console.log('Received albums:', albums);
  }, [albums]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-screen flex flex-col justify-center items-center">
      {/* Título */}
      <h1 className="text-5xl text-white font-bold mb-8">Album SlideShow</h1>

      {/* Se houver álbuns, mostre-os, caso contrário, mostre uma mensagem */}
      {albums.length > 0 ? (
        albums.map((album, index) => (
          <div key={index} className="bg-white shadow-lg p-4 rounded-lg mb-8 w-[400px]">
            {/* Imagem do álbum */}
            <img
              src={album.imageUrl}
              alt={album.albumName}
              className="w-full h-full object-cover rounded-lg mb-4"
            />
            
            {/* Informações do álbum */}
            <h2 className="text-xl font-bold text-gray-800">{album.albumName}</h2>
            <p className="text-sm text-gray-600 mb-2">Artist: {album.artistName}</p>
            <p className="text-sm text-gray-600 mb-2">Album Type: {album.albumType}</p>
            
            {/* Link para abrir o álbum */}
            <a
              href={album.albumUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              Listen to Album
            </a>
          </div>
        ))
      ) : (
        <p className="text-lg text-white">No albums available.</p>
      )}

      {/* Controle de Slideshow */}
      <div className="flex justify-center gap-4 text-2xl text-white mb-8">
        <button className="hover:text-yellow-400">
          <FaBackward />
        </button>
        <button className="hover:text-yellow-400">
          <FaPause />
        </button>
        <button className="hover:text-yellow-400">
          <FaPlay />
        </button>
        <button className="hover:text-yellow-400">
          <FaForward />
        </button>
      </div>
    </div>
  );
}

export default SlideShow;