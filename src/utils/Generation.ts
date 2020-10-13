//Import from utils
import type { ReferenceInterface as Reference } from './Reference';

/**
 * Interface for the name of a generation
 */
interface GenName {
    language: Reference,
    name: string
}

/**
 * TypeScript interface for information from a GET request
 * to pokeapi.co/api/v2/generation endpoints
 */
interface GenerationInterface {
    abilities: any[],
    id: number,
    main_region: Reference,
    moves: Reference[],
    name: string,
    names: GenName[],
    pokemon_species: Reference[],
    types: Reference[],
    version_groups: Reference[]
}

export type { GenerationInterface };
