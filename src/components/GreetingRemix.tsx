import { useEffect, useState } from 'react';

export default function GreeitingRemix(): JSX.Element {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          'https://rickandmortyapi.com/api/character/?page=1'
        );
        const data = await response.json();
        setCharacters(data.results || []); // Убедитесь, что данные получены корректно
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {characters.map((character, index) => (
        <div key={index}>
          <h2>{character.name}</h2>
        </div>
      ))}
    </div>
  );
}
