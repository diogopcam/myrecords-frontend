import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

function SlideShow() {
  const location = useLocation();
  
  // Recupere o array ou qualquer parâmetro que foi passado
  const receivedData = location.state?.albums || 'No data received';

  // Use efeito para logar o parâmetro recebido quando o componente é montado
  useEffect(() => {
    console.log('Received data:', receivedData);
  }, [receivedData]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-screen flex flex-col justify-center items-center">
      {/* Título */}
      <h1 className="text-5xl text-white font-bold mb-8">Random SlideShow</h1>

      {/* Parágrafo */}
      <p className="text-lg text-white mb-8 text-center w-[70%]">
        Welcome to the random slideshow page. This is a demo page with random elements, styles, and layout just to test the navigation.
      </p>

      {/* Imagem Aleatória */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-8">
        <img
          src="https://source.unsplash.com/random/400x300"
          alt="Random"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Exibir o parâmetro recebido */}
      <div className="text-white text-lg mb-8">
        <strong>Received Data: </strong>{JSON.stringify(receivedData)}
      </div>

      {/* Controle de Slideshow */}
      <div className="flex justify-center gap-4 text-2xl text-white mb-8">
        <button className="hover:text-yellow-400">
          <FaBackward />
        </button>
        <button className="hover:text-yellow-400">
          <FaPause />
        </button>
        <button className="hover:text-yellow-400">
          <FaPlay />
        </button>
        <button className="hover:text-yellow-400">
          <FaForward />
        </button>
      </div>

      {/* Botões Aleatórios */}
      <div className="flex gap-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Random Button 1
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Random Button 2
        </button>
      </div>
    </div>
  );
}

export default SlideShow;
