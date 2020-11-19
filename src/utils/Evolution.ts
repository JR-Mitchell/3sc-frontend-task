//Import from external 'axios' module
import axios from 'axios';

//Import from utils
import type { ReferenceInterface as Reference } from './Reference';
import type { SpeciesInterface } from './Species';

/**
 * Interface for EvolutionDetail
 */
interface EvolutionDetail {
    item?: Reference,
    trigger?: Reference,
    gender?: number,
    held_item?: Reference,
    known_move?: Reference,
    known_move_type?: Reference,
    location?: Reference,
    min_level?: number,
    min_happiness?: number,
    min_beauty?: number,
    min_affection?: number,
    needs_overworld_rain?: number,
    party_species?: Reference,
    party_type?: Reference,
    relative_physical_stats?: number,
    time_of_day?: string,
    trade_species?: Reference,
    turn_upside_down?: boolean
}

/**
 * Interface for a particular evolution chain item
 */
interface ChainLink {
    is_baby: boolean,
    species: Reference,
    evolution_details: EvolutionDetail[] | null,
    evolves_to: this[]
}

/**
 * Interface for the entire evolution chain
 */
interface EvolutionInterface {
    id: number,
    baby_trigger_item: Reference,
    chain: ChainLink
}

export type { EvolutionInterface, ChainLink };
