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

function getEvolutionText(evo: EvolutionDetail) {
    let base_text = "";
    if (evo.trigger) {
        base_text += "" + evo.trigger.name.split("-").join(" ") + " ";
    }
    if (evo.item) {
        base_text += "" + evo.item.name.split("-").join(" ") + " ";
    }
    switch(evo.gender) {
        case 1:
            base_text += " if female ";
            break;
        case 2:
            base_text += " if male ";
            break;
        case 3:
            base_text += " if genderless ";
            break;
    }
    if (evo.held_item) {
        base_text += "while holding item " + evo.held_item.name.split("-").join(" ") + " ";
    }
    if (evo.known_move) {
        base_text += "with the move " + evo.known_move.name.split("-").join(" ") + " learned ";
    }
    if (evo.known_move_type) {
        base_text += "with a " + evo.known_move_type.name.split("-").join(" ") + "-type move learned ";
    }
    if (evo.location) {
        base_text += "while in " + evo.location.name.split("-").join(" ") + " ";
    }
    if (evo.min_level) {
        base_text += "while at least lvl " + evo.min_level.toString() + " ";
    }
    if (evo.min_happiness) {
        base_text += "with at least " + evo.min_happiness.toString() + " happiness ";
    }
    if (evo.min_beauty) {
        base_text += "with at least " + evo.min_beauty.toString() + " beauty "
    }
    if (evo.needs_overworld_rain) {
        base_text += "while it is raining ";
    }
    if (evo.party_species) {
        base_text += "with a " + evo.party_species.name.split("-").join(" ") + " in the party ";
    }
    if (evo.party_type) {
        base_text += "with a " + evo.party_type + "-type pokemon in the party ";
    }
    switch(evo.relative_physical_stats) {
        case -1:
            base_text += " with greater defense than attack ";
            break;
        case 0:
            base_text += " with equal attack and defense ";
            break;
        case 1:
            base_text += " with greater attack than defense ";
            break;
    }
    if (evo.time_of_day) {
        base_text += "during " + evo.time_of_day + "time ";
    }
    if (evo.trade_species) {
        base_text += "when traded with a " + evo.trade_species.name.split("-").join(" ") + " ";
    }
    if (evo.turn_upside_down) {
        base_text += "with the screen turned upside-down ";
    }
    base_text = base_text.substring(0,1).toUpperCase() + base_text.substr(1);
    return base_text;
}

export default getEvolutionText;

export type { EvolutionInterface, EvolutionDetail, ChainLink };
