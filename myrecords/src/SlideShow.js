import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward} from 'react-icons/fa';

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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
    <div className="p-6 bg-black h-screen flex flex-col items-center">
      <p className="text-5xl text-white mb-8">{albums[currentIndex].albumName}</p>
      {albums.length > 0 ? (
        <div className="bg-black shadow-lg border border-white mb-8 h-[60%] w-[35%]">
          <div>
          <img
            src={albums[currentIndex].imageUrl}
            alt={albums[currentIndex].albumName}
            className="w-full h-full mb-4 text-white"
          />
          </div>
          <p className="flex flex-col text-sm text-gray-600 mb-2 text-white text-center">
            {albums[currentIndex].artistName}
            <a
            href={albums[currentIndex].albumUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm text-white"
          >
            Listen to Album
          </a>
          </p>
        <div className="flex justify-center gap-4 text-4xl text-white mb-8">
          <button onClick={prevAlbum} className="hover:text-yellow-500">
            <FaBackward />
          </button>
          <button onClick={togglePlayPause} className="hover:text-yellow-500">
            {isPlaying ? <FaPause /> : <FaPlay />}
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
  );
}

export default SlideShow;
