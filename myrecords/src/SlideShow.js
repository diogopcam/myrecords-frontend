import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

function SlideShow() {
  const location = useLocation();
  
  const albums = location.state?.albums || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("SlideShow started with albums:", albums);
  }, [albums]);

  const nextAlbum = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === albums.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAlbum = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? albums.length - 1 : prevIndex - 1
    );
  };


  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextAlbum();
      }, 3000); 
    }
    return () => clearInterval(interval); 
  }, [isPlaying, currentIndex]);

  return (
    // Tela Inteira
    <div className="overflow-hidden p-6 bg-black h-screen flex flex-col items-center font-afacad">
      {/* Criar uma div aqui para encapsular todas as informacoes do album */}
      <div className="h-[100%]">
        {/* Título do álbum */}
        <p className="text-5xl text-white text-center">{albums[currentIndex].albumName}</p>
        {albums.length > 0 ? (
          <div className="h-[100%] pt-6"> {/* Removido o comentário */}
            {/* Imagem do álbum */}
            <div className='h-[65%] m-6'>
              <img
                src={albums[currentIndex].imageUrl}
                alt={albums[currentIndex].albumName}
                className="w-full h-full mb-4 text-white"
              />
            </div>
            {/* Informações textuais do álbum */}
            <div className='flex flex-col text-xl text-gray-600 m-6 text-white text-center'>
              <p>
                {albums[currentIndex].artistName}
              </p>
            </div>
            <div className="flex justify-center gap-4 text-4xl text-white">
              <button onClick={prevAlbum} className="hover:text-yellow-500">
                <FaBackward />
              </button>
              <button className="hover:text-yellow-500">
                <a
                  href={albums[currentIndex].albumUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-white"
                >
                  <FaPlay/>
                </a>
              </button>
              <button onClick={nextAlbum} className="hover:text-yellow-500">
                <FaForward />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg text-white">No albums available.</p>
        )}
      </div>
    </div>
  );
}

export default SlideShow;
