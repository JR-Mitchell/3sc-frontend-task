//Import from external 'axios' module
import axios from 'axios';

//Import from utils
import type { ReferenceInterface as Reference } from './Reference';
import type { SpritesInterface as Sprites } from './Sprites';
import type { PokemonInterface } from './Pokemon';
//import type { EvolutionInterface } from './Evolution';

/**
 * Interface for the entry on a local game dex
 */
interface GameIndex {
    entry_number: number,
    pokedex: Reference
}

/**
 * Interface for pokemon name
 */
interface Name {
    name: string,
    language: Reference
}

/**
 * Interface for pal park encounter
 */
interface ParkEnct {
    base_score: number,
    rate: number,
    area: Reference
}

/**
 * Interface for flavour text
 */
interface Flavour {
    flavor_text: string,
    language: Reference,
    version: Reference
}

/**
 * Interface for form description
 */
interface Form {
    description: string,
    language: Reference
}

/**
 * Interface for genera
 */
interface Genus {
    genus: string,
    language: Reference
}

/**
 * Interface for variety of the species
 */
interface Variety {
    is_default: boolean,
    pokemon: Reference
}

/**
 * TypeScript interface for information from a GET request
 * to pokeapi.co/api/v2/pokemon-species endpoints
 */
interface SpeciesInterface {
    id: number,
    name: string,
    order: number,
    gender_rate: number,
    capture_rate: number,
    base_happiness: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    hatch_counter: number,
    has_gender_differences: boolean,
    forms_switchable: boolean,
    growth_rate: Reference,
    pokedex_numbers: GameIndex[],
    egg_groups: Reference[],
    color: Reference,
    shape: Reference,
    evolves_from_species: Reference,
    evolution_chain: {url:string},
    habitat: Reference,
    generation: Reference,
    names: Name[],
    pal_park_encounters: ParkEnct[],
    flavor_text_entries: Flavour[],
    form_descriptions: Form[],
    genera: Genus[],
    varieties: Variety[]
}

function getLocalisedGenus(item: SpeciesInterface, localCode: string) {
    let filtered = item.genera?.filter(result=>result.language.name === localCode) || [];
    if (filtered.length > 0) {
        return filtered[0].genus;
    }
}

export default getLocalisedGenus;

export type { SpeciesInterface };
