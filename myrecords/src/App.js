import React, { useState } from 'react';
import axios from 'axios';
import AlbumFrame from './components/AlbumFrame';
import AlbumCollage from './components/AlbumCollage';
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
    <div className='FullScreen'>
      <div className='bg-black w-[45%] p-6 flex flex-col justify-between'>
        <div className='text-4xl text-white'>
          <h1>Bem vindo ao myrecords</h1>
          <p className='text-base'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <div className='flex flex-row w-full justify-between'>
            <input
              className='text-base text-black w-[100%]'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  fetchAlbums(); // Busca álbuns quando a tecla Enter é pressionada
                }
              }}
              placeholder="Digite o nome do álbum..."
            />
            <button className='text-base text-black bg-white' onClick={handleButtonClick}>Buscar Álbuns</button> {/* Botão para buscar álbuns */}
          </div>
          <div className="h-96 w-full overflow-auto border border-gray-300">
            {albums.length > 0 ? (
              albums.map((album, index) => (
                <AlbumFrame
                  key={index}
                  imageUrl={album.albumCover}
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
      <div className="App">
        <AlbumCollage numberPositions={15} width={100} height={100}/>
      </div>
    </div>
  );
}

export default App;