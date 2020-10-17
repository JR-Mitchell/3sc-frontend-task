//Import from external 'axios' module
import axios from 'axios';

//Import from utils
import type { ReferenceInterface as Reference } from './Reference';
import type { SpritesInterface as Sprites } from './Sprites';
import type { PokemonInterface } from './Pokemon';
import type { EvolutionInterface } from './Evolution';
import { EvolutionChain } from './Evolution';
import { Pokemon } from './Pokemon';

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

/**
 * Interface for the biology of a species
 */
interface Biology {
    genus?: Genus,
    male_percent: number,
    female_percent: number,
    genderless_percent: number,
    hatch_time_min?: number,
    hatch_time_max?: number,
    height?: number | {[key:string]: number},
    weight?: number | {[key:string]: number},
    habitat?: Reference,
}

/**
 * Interface for the metastats of a species
 */
interface Meta {
    capture_rate?: number,
    base_happiness?: number,
    growth_rate?: string,
    base_experience?: number | {[key: string]: number},
    ev_yields?: string | {[key: string]: string}
}


/**
 * Class for processing data about a species
 */
class Species {
    biology: Biology;
    meta: Meta;
    varieties: {[name:string]: Pokemon};
    languageCode: string;
    updateCallback: ()=>void;
    name: string;
    types: {[name:string]: string[]};
    sprites: {[name:string]: string};
    evolution_chain?: EvolutionChain;

    /**
     * Constructor for an instance of Species
     *
     * @param {SpeciesInterface} data: the raw data to process
     * @param {()=>void} updateCallback: callback when axios request returns
     * @param {string, Optional} language: the language identifier,
     *      defaults to "en"
     */
    constructor(data:SpeciesInterface,updateCallback:()=>void,language?:string) {
        this.updateCallback = ()=>{updateCallback();}
        //Default language is english
        this.languageCode = language || "en";
        this.name = data.names
            ?.filter((item)=>{
                return item.language.name === this.languageCode
            })[0]?.name || data.name;
        const hasGender = data.gender_rate && data.gender_rate !== -1;
        //Biology
        this.biology = {
            genus: data.genera
                ?.filter((item)=>item.language.name === this.languageCode)[0],
            male_percent: hasGender ? 1-(0.125*data.gender_rate) : 0,
            female_percent: hasGender ? 0.125*data.gender_rate : 0,
            genderless_percent: hasGender ? 0 : 1,
            hatch_time_min: 257*data.hatch_counter,
            hatch_time_max: (257*(data.hatch_counter+1))-1,
        };
        //Meta
        this.meta = {
            capture_rate: data.capture_rate,
            base_happiness: data.base_happiness,
            growth_rate: data.growth_rate?.name
        };
        if (this.meta.growth_rate) {
             this.meta.growth_rate = this.meta.growth_rate.charAt(0).toUpperCase()
                + this.meta.growth_rate.substr(1);
        }
        //Get varieties
        this.varieties = {};
        for (let i=0; i<data.varieties.length; i++) {
            const url = data.varieties[i].pokemon.url;
            axios.get<PokemonInterface>(url).then((response)=>{
                this.addVariety(response.data);
            })
        }
        //Get evolution chain
        axios.get<EvolutionInterface>(data.evolution_chain.url).then((response)=>{
            this.evolution_chain = new EvolutionChain(
                data.name,
                response.data,
                ()=>{this.updateCallback();},
                this.languageCode
            );
            this.updateCallback();
        })
    }

    /**
     * Method to call upon completion of fetching a pokemon variety
     */
    addVariety(data: PokemonInterface) {
        let pokemon = new Pokemon(
            data,
            ()=>{this.update();},
            this.name,
            this.languageCode
        );
        this.varieties[pokemon.name] = pokemon;
        this.update();
    }

    /**
     * Updates all information from pokemon varieties
     */
    update() {
        let newVarieties: {[name:string]: Pokemon} = {};
        //Heights
        let heights: {[key:string]: number} = {};
        let spreadHeights: {[key: number]: string[]} = {};
        //Weights
        let weights: {[key:string]: number} = {};
        let spreadWeights: {[key: number]: string[]} = {};
        //Base exp
        let exps: {[key:string]: number} = {};
        let spreadExp: {[key: number]: string[]} = {};
        //EV yields
        let evs: {[key:string]: string} = {};
        let spreadEvs: {[key: string]: string[]} = {};
        //Types
        let types: {[key:string]: string[]} = {};
        //Sprites
        let sprites: {[key:string]: string} = {};
        for (const name in this.varieties) {
            let newName = this.varieties[name].name;
            newVarieties[newName] = this.varieties[name];
            //Heights
            let height = this.varieties[name].biology.height;
            if (spreadHeights.hasOwnProperty(height)) {
                spreadHeights[height].push(newName);
            } else {
                spreadHeights[height] = [newName];
            }
            heights[newName] = height;
            //Weights
            let weight = this.varieties[name].biology.weight;
            if (spreadWeights.hasOwnProperty(weight)) {
                spreadWeights[weight].push(newName);
            } else {
                spreadWeights[weight] = [newName];
            }
            weights[newName] = weight;
            //Base exp
            let exp = this.varieties[name].meta.base_experience;
            if (spreadExp.hasOwnProperty(exp)) {
                spreadExp[exp].push(newName);
            } else {
                spreadExp[exp] = [newName];
            }
            exps[newName] = exp;
            //EV yields
            let ev = this.varieties[name].meta.ev_yields;
            if (spreadEvs.hasOwnProperty(ev)) {
                spreadEvs[ev].push(newName);
            } else {
                spreadEvs[ev] = [newName];
            }
            evs[newName] = ev;
            //Types
            types[newName] = this.varieties[name].types;
            //Sprites
            sprites[newName] = this.varieties[name].icon_url;
        }
        //Heights
        if (Object.keys(spreadHeights).length == 1) {
            this.biology.height = Number(Object.keys(spreadHeights)[0]);
        } else {
            this.biology.height = {...heights};
        }
        //Weights
        if (Object.keys(spreadWeights).length == 1) {
            this.biology.weight = Number(Object.keys(spreadWeights)[0]);
        } else {
            this.biology.weight = {...weights};
        }
        //Base exp
        if (Object.keys(spreadExp).length == 1) {
            this.meta.base_experience = Number(Object.keys(spreadExp)[0]);
        } else {
            this.meta.base_experience = {...exps};
        }
        //EV yields
        if (Object.keys(spreadEvs).length == 1) {
            this.meta.ev_yields = Object.keys(spreadEvs)[0];
        } else {
            this.meta.ev_yields = {...evs};
        }
        //Types
        this.types = {...types};
        //Sprites
        this.sprites = {...sprites};
        this.varieties = {...newVarieties};
        this.updateCallback();
    }
}

export type { SpeciesInterface, Biology, Meta };
export { Species }
