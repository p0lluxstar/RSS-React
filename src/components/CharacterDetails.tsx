import React from 'react';

interface ICharacter {
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

interface IProps {
  character: ICharacter;
  onClose: () => void; // Добавляем свойство для функции закрытия
}

export default function CharacterDetails({
  character,
  onClose,
}: IProps): JSX.Element {
  return (
    <>
      <button onClick={onClose}>X</button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </>
  );
}
