import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward, FaTimes } from 'react-icons/fa';
import AlbumFrame from '../components/AlbumFrame';

function SlideShow() {
  const location = useLocation();
  const albums = location.state?.albums || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Albums data:", albums); // Verifique a estrutura dos dados
    console.log(`Esse é o ID do álbum: ${albums[currentIndex]?.albumId}`);
  }, [albums, currentIndex]);

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
    <div className="overflow-hidden p-3 bg-black h-screen flex flex-col items-center font-afacad">
      <button className="text-white" onClick={handleGoBack}>
        <FaTimes />
      </button>
      {/* Criar uma div aqui para encapsular todas as informacoes do album */}
      <div className="h-full flex flex-col items-center justify-center gap-3">
        {/* Título do álbum */}
        <p className="text-8xl text-white text-center">{albums[currentIndex]?.albumName}</p>
        <p className='text-white text-4xl font-abel font-thin'> {albums[currentIndex]?.artistName} </p>
        {albums.length > 0 ? (
          <div className="flex flex-row items-center">
            <button onClick={prevAlbum} className="text-white">
              <FaBackward />
            </button>
            {/* Imagem do álbum */}
            <AlbumFrame
              key={currentIndex} // Utilize currentIndex como chave
              artistName={albums[currentIndex].artistName}
              imageUrl={albums[currentIndex].imageUrl} // Corrija para o caminho correto da imagem
              albumUri={albums[currentIndex].albumUri}
              albumName={albums[currentIndex].albumName}
              albumType={albums[currentIndex].albumType}
              albumId={albums[currentIndex].albumId}
              width={350}
              height={350}
            />
          <iframe
            title="Spotify Embed: Recommendation Playlist "
            src={`https://open.spotify.com/embed/album/${albums[currentIndex].albumId}`}
            // https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
            <div className="flex justify-center gap-4 text-4xl text-white mt-4">
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
