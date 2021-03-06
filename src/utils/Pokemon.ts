//Import from utils
import type { ReferenceInterface as Reference } from './Reference';
import type { SpritesInterface as Sprites } from './Sprites';

/**
 * Interface for an ability info
 */
interface Ability {
    ability: Reference,
    is_hidden: boolean,
    slot: number
}

/**
 * Interface for the entry on a local game dex
 */
interface GameIndex {
    game_index: number,
    version: Reference
}

/**
 * Interface for a name entry
 */
interface Name {
    name: string,
    language: Reference
}

/**
 * Interface for a held item's version details
 */
interface HeldItemVersionDetails {
    rarity: number,
    version: Reference
}

/**
 * Interface for a held item's info
 */
interface HeldItem {
    item: Reference,
    version_details: HeldItemVersionDetails[]
}

/**
 * Interface for a move's version details
 */
interface MoveVersionDetails {
    level_learned_at: number,
    move_learn_method: Reference,
    version_group: Reference,
}

/**
 * Interface for a move's info
 */
interface Move {
    move: Reference,
    version_group_details: MoveVersionDetails[]
}

/**
 * Interface for a stat's info
 */
interface Stat {
    base_stat: number,
    effort: number,
    stat: Reference
}

/**
 * Interface for a type's info
 */
interface Type {
    slot: number,
    type: Reference
}

/**
 * TypeScript interface for information from a GET request
 * to pokeapi.co/api/v2/pokemon endpoints
 */
interface PokemonInterface {
    abilities: Ability[],
    base_experience: number,
    forms: Reference[],
    game_indices: GameIndex[],
    height: number,
    held_items: HeldItem[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Move[],
    name: string,
    order: number,
    species: Reference,
    sprites: Sprites,
    stats: Stat[],
    types: Type[],
    weight: number
}

export type { PokemonInterface };
