import React, { useRef, useState } from 'react';
import axios from 'axios';
import AlbumFrame from './components/AlbumFrame';
import AlbumCollage from './components/AlbumCollage';
import Lupa from './styles/icons/lupa.png';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [albums, setAlbums] = useState([]);
  const divRef = useRef();
  
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

  const handleButtonClick = () => {
    fetchAlbums();
    console.log(albums);
  };

  // Substituímos o método downloadCollage com jsPDF e html2canvas
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

    // Adiciona a imagem ao PDF
    pdf.addImage(imgData, 'PNG', 0, 0, widthInMm, heightInMm);
    
    // Salva o PDF
    pdf.save('album-collage.pdf');
  });
  };

  const handleDownloadButton = () => {
    downloadCollage();
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className='bg-black w-[45%] p-4 flex flex-col justify-between'>
        <div className='text-4xl text-white'>
          <h1 className='pb-5'>Bem vindo ao myrecords</h1>
          <p className='pb-5 text-base'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <div className='pb-5 flex flex-row w-full h-[10%] justify-between'>
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
              placeholder="Digite o nome do álbum..."
            />
            <button 
              className='w-[15%] text-base text-black bg-white p-2' 
              onClick={handleButtonClick}
            >  
              <img className="w-full h-full object-contain" src={Lupa}/>
              </button>
          </div>
          <div className="h-96 w-full overflow-auto border border-gray-300">
            {albums.length > 0 ? (
              albums.map((album, index) => (
                <AlbumFrame
                  key={index}
                  imageUrl={album.albumCover}
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
            className='w-[15%] text-black text-base bg-white'
            onClick={handleDownloadButton}>
              Baixar
          </button>
        </div>
      </div>
      <div 
        className="flex justify-center items-center bg-cover bg-center bg-no-repeat h-screen w-full" style={{backgroundImage: `url('https://i.imgur.com/IC18bJ6.jpg')`}}
        ref={divRef}>
        <AlbumCollage numberPositions={15}/>
      </div>
    </div>
  );
}

export default App;
