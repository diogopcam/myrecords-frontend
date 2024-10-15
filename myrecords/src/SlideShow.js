import React from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

function SlideShow() {
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
