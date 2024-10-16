import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward, FaTimes } from 'react-icons/fa';
import AlbumFrame from './components/AlbumFrame';

function SlideShow() {
  const location = useLocation();
  const albums = location.state?.albums || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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

  const handleGoBack = () => {
    navigate(-1); // Equivalente a navigate.goBack()
  };

  return (
    // Tela Inteira
    <div className="overflow-hidden p-6 bg-black h-screen flex flex-col items-center font-afacad">
      <button className="text-white" onClick={handleGoBack}>
        <FaTimes />
      </button>
      {/* Criar uma div aqui para encapsular todas as informacoes do album */}
      <div className="h-full flex flex-col items-center justify-center">
        {/* Título do álbum */}
        <p className="text-6xl text-white text-center">{albums[currentIndex]?.albumName}</p>
        {albums.length > 0 ? (
          <div className="flex flex-col items-center pt-6">
            {/* Imagem do álbum */}
            <AlbumFrame
              key={currentIndex} // Utilize currentIndex como chave
              imageUrl={albums[currentIndex].imageUrl} // Corrija para o caminho correto da imagem
              albumUri={albums[currentIndex].albumUri}
              albumName={albums[currentIndex].albumName}
              albumType={albums[currentIndex].albumType}
              width={300}
              height={300}
            />
            <p className='text-white text-4xl'> {albums[currentIndex].artistName} </p>
            <div className="flex justify-center gap-4 text-4xl text-white mt-4">
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
                  <FaPlay />
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
