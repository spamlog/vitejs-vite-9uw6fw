const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export const pokeApi = {
  // Pokémon
  getPokemon: async (idOrName: number | string): Promise<Pokemon> => {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) throw new Error('Pokemon no encontrado');
    return response.json();
  },

  getPokemonSpecies: async (idOrName: number | string): Promise<PokemonSpecies> => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
    if (!response.ok) throw new Error('Especie no encontrada');
    return response.json();
  },

  // Berries
  getBerry: async (id: number) => {
    const response = await fetch(`${BASE_URL}/berry/${id}`);
    if (!response.ok) throw new Error('Baya no encontrada');
    return response.json();
  },

  // Types
  getType: async (id: number) => {
    const response = await fetch(`${BASE_URL}/type/${id}`);
    if (!response.ok) throw new Error('Tipo no encontrado');
    return response.json();
  },

  // Abilities
  getAbility: async (id: number) => {
    const response = await fetch(`${BASE_URL}/ability/${id}`);
    if (!response.ok) throw new Error('Habilidad no encontrada');
    return response.json();
  },

  // Items
  getItem: async (id: number) => {
    const response = await fetch(`${BASE_URL}/item/${id}`);
    if (!response.ok) throw new Error('Objeto no encontrado');
    return response.json();
  },
}; 