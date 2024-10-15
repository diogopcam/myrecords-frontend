// Bibliotecas 
import React, { useRef, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// Telas
import AlbumFrame from './components/AlbumFrame';
import AlbumCollage from './components/AlbumCollage';

// Componentes de imagem
import Lupa from './styles/icons/lupa.png';
import {FaChevronDown, FaPlay}  from 'react-icons/fa';

function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [albums, setAlbums] = useState([]);
  const divRef = useRef();
  const navigate = useNavigate();

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

  // Método que realiza o download da colagem
  const downloadCollage = () => {
    const element = divRef.current;

    // Captura a div usando html2canvas
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // Calcula a largura e altura da div em mm
      const widthInMm = element.offsetWidth / 3.779527; // Converte pixels para mm
      const heightInMm = element.offsetHeight / 3.779527; // Converte pixels para mm
      // Cria o PDF na orientação landscape
      const pdf = new jsPDF('landscape', 'mm', [widthInMm, heightInMm]);
      pdf.addImage(imgData, 'PNG', 0, 0, widthInMm, heightInMm);
      pdf.save('album-collage.pdf');
    });
  };

  /// Função chamada no clique do botão de baixar a colagem
  const handleDownloadButton = () => {
    downloadCollage();
  };

  // Função para redirecionar ao clicar no botão
  const startSlideShow = () => {
    navigate('/slide-show', {state: {albums: albums}}); // Navega para a página 'about'
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
              <img className="w-full h-full object-contain" src={Lupa} />
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
            onClick={handleDownloadButton}>
            Baixar
          </button>
        </div>
      </div>
      <div 
        className="p-4 flex flex-col justify-center items-center bg-black w-full"
        ref={divRef}>
        <div className='flex flex-row gap-10 items-end'> 
          <button onClick={startSlideShow}>
            <FaChevronDown color='white'/>
          </button>
        </div>
        <AlbumCollage numberPositions={15} />
      </div>
    </div>
  );
}

export default HomeScreen;