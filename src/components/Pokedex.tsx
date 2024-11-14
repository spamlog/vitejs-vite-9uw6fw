import { useState } from 'react';
import './Pokedex.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}

export const Pokedex = () => {
  const [searchInput, setSearchInput] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState('');

  const searchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`
      );
      const data = await response.json();
      setPokemon(data);
      setError('');
    } catch (err) {
      setPokemon(null);
      setError('No se encontró el Pokémon. Intenta con otro nombre o ID.');
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex">
        <div className="pokedex-screen">
          <div className="search-container">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ingresa ID o nombre del Pokémon"
              className="search-input"
            />
            <button onClick={searchPokemon} className="search-button">
              Buscar
            </button>
          </div>

          <div className="pokemon-card">
            {error && <p className="error-message">{error}</p>}
            {pokemon && (
              <>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <h2 className="pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h2>
                <p>ID: {pokemon.id}</p>
                <p>
                  Tipo:{' '}
                  {pokemon.types.map((type) => type.type.name).join(', ')}
                </p>
                <p>Altura: {pokemon.height / 10}m</p>
                <p>Peso: {pokemon.weight / 10}kg</p>
              </>
            )}
          </div>
        </div>

        <div className="pokedex-buttons">
          <div className="circle-light"></div>
          <div className="control-buttons">
            <div className="button"></div>
            <div className="button"></div>
            <div className="button"></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 