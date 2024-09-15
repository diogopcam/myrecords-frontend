import React, { useState } from 'react';
import axios from 'axios';
import AlbumFrame from '../src/components/AlbumFrame';
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

  // Função para lidar com o clique do botão
  const handleButtonClick = () => {
    fetchAlbums(); // Chama a função para buscar álbuns
  };

  return (
    <div className='FullScreen'>
      <div className='Menu'>
        <div className='MenuContent'>
          <h1>Bem vindo ao myrecords</h1>
          <p className='Text'>
            Aqui você pode criar e compartilhar uma colagem dos seus álbuns favoritos.
          </p>
          <label htmlFor="albumInput">Texto:</label>
          <input
            id="albumInput"
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
          <button onClick={handleButtonClick}>Buscar Álbuns</button> {/* Botão para buscar álbuns */}
        </div>
      </div>
      <div className="App">
        <div className="album-container">
          {albums.length > 0 ? (
            albums.map((album) => (
              <AlbumFrame
                key={album.id}
                imageUrl={album.images[0]?.url} // Usa a primeira imagem do álbum
              />
            ))
          ) : (
            <p>No albums found. Please search again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;