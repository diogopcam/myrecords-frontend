import React, { useState } from 'react';
import axios from 'axios';
import AlbumFrame from './components/AlbumFrame';
import AlbumCollage from './components/AlbumCollage';
import Lupa from './styles/icons/lupa.png'
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState(''); // Estado para o valor do input
  const [albums, setAlbums] = useState([]); // Estado para armazenar os álbuns

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Atualiza o valor do input
  };

  const fetchAlbums = async () => {
    const query = inputValue; // Obtém a string de busca do estado inputValue
    const url = 'http://127.0.0.1:5000/api/get_album_covers'; // URL do seu backend
  
    try {
      const response = await axios.get(url, {
        params: { query: query }
      });
      console.log("Retorno da API:", response.data); // Imprime o retorno da API
      setAlbums(response.data); // Atualiza o estado com as capas dos álbuns encontrados
    } catch (error) {
      console.error('Error fetching albums from backend:', error);
    }
  };

  const handleButtonClick = () => {
    fetchAlbums(); // Chama a função para buscar álbuns
    console.log(albums);
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className='bg-black w-[45%] p-6 flex flex-col justify-between'>
        <div className='text-4xl text-white'>
          <h1 className='pb-5'>Bem vindo ao myrecords</h1>
          <p className='pb-5 text-base'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <div className='pb-5 flex flex-row w-full h-[10%] justify-between'>
            <input
              className='p-2 text-base text-black w-[100%] rounded-xl'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  fetchAlbums(); // Busca álbuns quando a tecla Enter é pressionada
                }
              }}
              placeholder="Digite o nome do álbum..."
            />
            <button 
              className='w-[15%] text-base text-black bg-white rounded-xl p-2' 
              onClick={handleButtonClick}
            >  
              <img className="w-full h-full object-contain" src={Lupa}/>
              </button> {/* Botão para buscar álbuns */}
          </div>
          <div className="h-96 w-full overflow-auto border border-gray-300">
            {albums.length > 0 ? (
              albums.map((album) => (
                <AlbumFrame
                  imageUrl={album.albumCover}
                  albumName={album.albumName}
                  artistName={album.artistName}
                  albumType={album.albumType}
                  width={100}
                  height={100}
                />
              ))
            ) : (
              <p className='text-base'> No albums found. Please search again.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-cover bg-center bg-no-repeat h-screen w-full" style={{backgroundImage: `url('https://i.imgur.com/IC18bJ6.jpg')`}}>
        <AlbumCollage numberPositions={15}/>
      </div>
    </div>
  );
}

export default App;