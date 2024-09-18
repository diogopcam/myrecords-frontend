// Esse componente deverá ser um quadro. Inicialmente com 15 posições,
// mas que deve se adaptar para possuir mais ou menos posições, onde a capa
// dos álbuns será incluída.

import React from "react";
import { useState, useEffect } from "react";
import AlbumFrame from "./AlbumFrame";


function AlbumCollage({ numberPositions }) {
  // Inicializa as posições com o número especificado de molduras (sem imagem)
  const [positions, setPositions] = useState(
    Array(numberPositions).fill({ imageUrl: null })
  );

  // Função para atualizar o estado ao soltar uma imagem
  const handleDrop = (index, imageUrl) => {
    const newPositions = [...positions]; // Copia o estado atual
    newPositions[index] = { imageUrl }; // Atualiza a posição com a nova imagem
    setPositions(newPositions); // Atualiza o estado
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {positions.map((position, index) => (
        <AlbumFrame
          key={index}
          imageUrl={position.imageUrl} // Passa a URL da imagem atual
          width={100}
          height={100}
          onDrop={(imageUrl) => handleDrop(index, imageUrl)} // Manipula o drop para cada moldura
        />
      ))}
    </div>
  );
}

export default AlbumCollage;