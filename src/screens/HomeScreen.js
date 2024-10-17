import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
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
      albumType: ''
    });
  });

  useEffect(() => {
    const savedPositions = localStorage.getItem('albumPositions');
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }
  }, []);

  // Função para atualizar o estado ao soltar uma imagem
  const handleDrop = (index, album) => {
    const newPositions = [...positions];
    newPositions[index] = album;
    setPositions(newPositions);
    localStorage.setItem('albumPositions', JSON.stringify(newPositions)); // Salva as posições
  };

  // Método que lida com a mudança de texto no input de pesquisa
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchAlbums = async () => {
    const query = inputValue;
    const url = 'http://127.0.0.1:5000/api/get_album_covers';
    try {
      const response = await axios.get(url, { params: { query: query } });
      console.log("Retorno da API:", response.data);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums from backend:', error);
    }
  };

  // Método que realiza a chamada para a requisição puxando todos os álbuns de acordo com a pesquisa
  const handleButtonClick = () => {
    fetchAlbums();
    console.log(albums);
  };

  // Função para redirecionar ao clicar no botão
  const startSlideShow = () => {
    navigate('/slide-show', { state: { albums: positions } }); // Navega para a página 'about'
  };

  // Funções para aumentar e diminuir o número de frames
  const increaseFrames = () => {
    setPositions((prevPositions) => [
      ...prevPositions,
      {
        imageUrl: null,
        albumUri: '',
        albumName: '',
        artistName: '',
        albumType: ''
      }
    ]);
  };

  const decreaseFrames = () => {
    setPositions((prevPositions) => {
      if (prevPositions.length > 1) {
        return prevPositions.slice(0, -1); // Remove a última posição se houver mais de uma
      }
      return prevPositions; // Não altera se houver apenas uma posição
    });
  };

  // Função para baixar a grade de álbuns como uma imagem
  const downloadGridImage = () => {
    const element = divRef.current;

    // Captura a div usando html2canvas
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'album-grid.png';
      link.click();
    });
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center">
      <div className='bg-black w-[45%] p-4 flex flex-col justify-center align-center'>
        <div className='font-afacad text-4xl text-white'>
          <h1 className='pb-5'>Myrecords</h1>
          <p className='pb-5 font-abel font-thin text-sm'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <div className='pb-5 flex flex-row w-full h-[10%] justify-center'>
            <input
              className='p-2 text-base text-black w-[100%]'
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
              <img className="w-full h-full object-contain" src={Lupa} alt="search icon" />
            </button>
          </div>
          <div className="h-96 w-full overflow-auto border border-gray-300">
            {albums.length > 0 ? (
              albums.map((album, index) => (
                <AlbumFrame
                  key={index}
                  imageUrl={album.albumCover}
                  albumUri={album.albumUri}
                  albumName={album.albumName}
                  artistName={album.artistName}
                  albumType={album.albumType}
                  width={100}
                  height={100}
                />
              ))
            ) : (
              <p className='text-base'>No albums found. Please search again.</p>
            )}
          </div>
          <button 
            className='w-[100%] p-1 text-black text-base bg-white'
            onClick={downloadGridImage}>
            Baixar PDF
          </button>
        </div>
      </div>
      <div className="p-9 flex flex-col justify-center items-center bg-black w-full">
        <div className='flex flex-row gap-10 items-end'>
          {/* Botão para iniciar o show de slides */}
          <button onClick={startSlideShow}> <FaChevronDown color='white'/> </button>
          {/* Botões para aumentar e diminuir o número de frames */}
          <button onClick={increaseFrames} className="text-white">+</button>
          <button onClick={decreaseFrames} className="text-white">-</button>
        </div>
        <div className='h-screen overflow-auto'>
          <div className="bg-black grid grid-cols-5 gap-4 overflow-auto p-6" ref={divRef}>
            {positions.map((position, index) => (
              <AlbumFrame
                key={index}
                imageUrl={position.imageUrl}
                albumUri={position.albumUri}
                albumName={position.albumName}
                artistName={position.artistName}
                albumType={position.albumType}
                width={150}
                height={150}
                onDrop={(album) => handleDrop(index, album)} // Manipula o drop para cada moldura
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
