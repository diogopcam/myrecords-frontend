// Esse componente deverá ser um quadro. Inicialmente com 15 posições,
// mas que deve se adaptar para possuir mais ou menos posições, onde a capa
// dos álbuns será incluída.
import React from "react";
import { useState, useEffect } from "react";
import AlbumFrame from "./AlbumFrame";


function AlbumCollage({ numberPositions }) {
  // Inicializa as posições com o número especificado de molduras (sem imagem)
  const [positions, setPositions] = useState(
    Array(numberPositions).fill({
      imageUrl: null,
      albumUri: '',
      albumName: '',
      artistName: '',
      albumType: ''
    })
  );

  // Função para atualizar o estado ao soltar uma imagem
  const handleDrop = (index, album) => {
    const newPositions = [...positions]; // Copia o estado atual
    newPositions[index] = album; // Atualiza a posição com o novo objeto de álbum
    setPositions(newPositions); // Atualiza o estado
  };

  return (
    <div className="grid grid-cols-5 gap-4 overflow-auto p-6">
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
  );
}

export default AlbumCollage;