import React, { useState, useEffect } from 'react';
import { pokeApi, Pokemon, PokemonSpecies } from '../services/pokeApi';

interface PokemonViewerProps {
  initialPokemonId?: number;
}

export const PokemonViewer: React.FC<PokemonViewerProps> = ({ initialPokemonId = 1 }) => {
  const [pokemonId, setPokemonId] = useState(initialPokemonId);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonData = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const [pokemonData, speciesData] = await Promise.all([
        pokeApi.getPokemon(id),
        pokeApi.getPokemonSpecies(id)
      ]);
      setPokemon(pokemonData);
      setSpecies(speciesData);
    } catch (err) {
      setError('Error al cargar el Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  const handlePrevious = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  const handleNext = () => {
    setPokemonId(pokemonId + 1);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon || !species) return null;

  const description = species.flavor_text_entries
    .find(entry => entry.language.name === 'es')?.flavor_text || 'Sin descripción disponible';

  return (
    <div className="pokemon-viewer">
      <div className="pokemon-card">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <p className="pokemon-description">{description}</p>
        
        <div className="pokemon-details">
          <div>
            <strong>Tipos:</strong>
            {pokemon.types.map(type => (
              <span key={type.type.name} className={`type ${type.type.name}`}>
                {type.type.name}
              </span>
            ))}
          </div>
          
          <div>
            <strong>Habilidades:</strong>
            {pokemon.abilities.map(ability => (
              <span key={ability.ability.name} className="ability">
                {ability.ability.name}
              </span>
            ))}
          </div>
          
          <div className="stats">
            <div>Altura: {pokemon.height / 10}m</div>
            <div>Peso: {pokemon.weight / 10}kg</div>
          </div>
        </div>

        <div className="navigation">
          <button onClick={handlePrevious} disabled={pokemonId === 1}>
            Anterior
          </button>
          <span>#{pokemonId}</span>
          <button onClick={handleNext}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}; 