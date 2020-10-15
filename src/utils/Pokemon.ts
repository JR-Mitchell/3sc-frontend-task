//Imports from external 'axios' module
import axios from 'axios';

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

/**
 * Interface for the biology of a variety
 */
interface Biology {
    height?: number,
    weight?: number
}

/**
 * Interface for the metastats of a variety
 */
interface Meta {
    base_experience?: number,
    ev_yields?: string
}

/**
 * Class for processing data about a pokemon
 */
class Pokemon {
    name: string;
    biology: Biology;
    meta: Meta;
    types: string[];
    base_stats: {[key: string]: number};

    /**
     * Constructor for an instance of Pokemon
     *
     * @param {PokemonInterface} data: the raw data to process
     * @param {()=>void} updateCallback: callback when axios request for form name returns
     * @param {string} language: the language identifier
     */
    constructor(data:PokemonInterface,updateCallback:()=>void,language:string) {
        this.name = data.name;
        //Biology
        this.biology = {
            height: data.height,
            weight: data.weight
        };
        //Meta
        this.meta = {
            base_experience: data.base_experience,
        }
        //Types
        let types = data.types.slice();
        types.sort((a,b)=>{return a.slot - b.slot;});
        this.types = types.map(item=>item.type.name);
        //Stats and EVs
        this.base_stats = {};
        let stats = data.stats.slice();
        let evYieldsBase: string[] = [];
        stats.forEach((item)=>{
            this.base_stats[item.stat.name] = item.base_stat;
            if (item.effort) {
                evYieldsBase.push(
                    item.effort.toString() + " "
                        + item.stat.name.toUpperCase()
                        + " Point"
                        + (item.effort == 1 ? "" : "s")
                )
            }
        })
        this.meta.ev_yields = evYieldsBase.join(", ");
        //Name
        axios.get<{form_names:Name[]}>(data.forms[0].url).then((response)=>{
            this.name = response.data.form_names.filter(
                (item)=>item.language.name === language
            )[0]?.name || this.name;
            updateCallback();
        })
    }
}

export type { PokemonInterface };
export { Pokemon };
