import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import AlbumFrame from '../components/AlbumFrame';
import Lupa from '../styles/icons/lupa.png';
import { FaChevronDown } from 'react-icons/fa';

function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [albums, setAlbums] = useState([]);
  const divRef = useRef();
  const navigate = useNavigate();

  const [positions, setPositions] = useState(() => {
    const savedPositions = localStorage.getItem('albumPositions');
    return savedPositions ? JSON.parse(savedPositions) : Array(15).fill({
      imageUrl: null,
      albumUri: '',
      albumName: '',
      artistName: '',
      albumType: '',
      albumId: ''
    });
  });

  useEffect(() => {
    const savedPositions = localStorage.getItem('albumPositions');
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
  }, []);

  const handleDrop = (index, album) => {
    const newPositions = [...positions];
    newPositions[index] = album;
    setPositions(newPositions);
    localStorage.setItem('albumPositions', JSON.stringify(newPositions)); // Salva as posições
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchAlbums = async () => {
    const query = inputValue;
    const url = 'http://127.0.0.1:5000/api/get_album_covers';
    try {
      const response = await axios.get(url, { params: { query: query } });
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums from backend:', error);
    }
  };

  const handleButtonClick = () => {
    fetchAlbums();
  };

  const startSlideShow = () => {
    navigate('/slide-show', { state: { albums: positions } });
  };

  const increaseFrames = () => {
    setPositions((prevPositions) => [
      ...prevPositions,
      {
        imageUrl: null,
        albumUri: '',
        albumName: '',
        artistName: '',
        albumType: '',
        albumId: ''
      }
    ]);
  };

  const decreaseFrames = () => {
    setPositions((prevPositions) => {
      if (prevPositions.length > 1) {
        return prevPositions.slice(0, -1);
      }
      return prevPositions;
    });
  };

  const downloadGridImage = () => {
    const element = divRef.current;

    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'album-grid.png';
      link.click();
    });
  };

  return (
    <div className="w-full flex flex-row justify-center h-screen">
      <div className='bg-black w-[45%] p-4 flex flex-col h-full'>
        <div className='font-afacad text-4xl text-white h-screen'>
          <h1 className='pb-5'>Myrecords</h1>
          <p className='pb-5 font-abel font-thin text-sm'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <div className='pb-5 flex flex-row w-full justify-center'>
            <input
              className='p-2 text-base text-black w-[85%]'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  fetchAlbums();
                }
              }}
              placeholder="Digite o nome do álbum..." />
            <button 
              className='w-[15%] text-base text-black bg-white p-2' 
              onClick={handleButtonClick}>  
              <img className="object-contain" src={Lupa} alt="search icon" />
            </button>
          </div>
          <div className="h-[55%] w-full overflow-auto border border-gray-300">
            {albums.length > 0 ? (
              <div className="flex h-[50%] flex-wrap gap-2">
                {albums.map((album, index) => (
                  <AlbumFrame
                    key={index}
                    imageUrl={album.albumCover}
                    albumUri={album.albumUri}
                    albumName={album.albumName}
                    artistName={album.artistName}
                    albumType={album.albumType}
                    albumId={album.albumId}
                    height={50}
                  />
                ))}
              </div>
            ) : (
              <p className="text-base">No albums found. Please search again.</p>
            )}
          </div>
          <button 
            className='w-[100%] p-1 text-black text-base bg-white'
            onClick={downloadGridImage}>
            Baixar PDF
          </button>
        </div>
      </div>
      <div className="p-9 flex flex-col bg-black w-full h-full overflow-hidden">
        <div className='flex flex-row gap-10 items-end'>
          <button onClick={startSlideShow}> <FaChevronDown color='white'/> </button>
          <button onClick={increaseFrames} className="text-white">+</button>
          <button onClick={decreaseFrames} className="text-white">-</button>
        </div>
        <div className="flex-grow overflow-auto">
          <div className="h-[100%] bg-black grid grid-cols-5 gap-5 overflow-auto p-6" ref={divRef}>
            {positions.map((position, index) => (
              <AlbumFrame
                key={index}
                imageUrl={position.imageUrl}
                albumUri={position.albumUri}
                albumName={position.albumName}
                artistName={position.artistName}
                albumType={position.albumType}
                albumId={position.albumId}
                width={100}
                height={90}
                onDrop={(album) => handleDrop(index, album)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
