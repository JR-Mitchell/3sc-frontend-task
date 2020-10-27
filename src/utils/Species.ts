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
    height?: number | {[id:number]: number},
    weight?: number | {[id:number]: number},
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
    id: number;
    biology: Biology;
    meta: Meta;
    varieties: {[id: number]: Pokemon};
    languageCode: string;
    updateCallback: ()=>void;
    name: string;
    names: {[id: number]: string};
    types: {[id: number]: string[]};
    sprites: {[id: number]: string};
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
        this.id = data.id;
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
        if (data.evolution_chain?.url) {
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

        this.names = {};
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
        this.varieties[pokemon.id] = pokemon;
        this.update();
    }

    /**
     * Updates all information from pokemon varieties
     */
    update() {
        let newVarieties: {[id: number]: Pokemon} = {};
        let newNames: {[id: number]: string} = {};
        //Heights
        let heights: {[id:number]: number} = {};
        let spreadHeights: {[key: number]: string[]} = {};
        //Weights
        let weights: {[id:number]: number} = {};
        let spreadWeights: {[key: number]: string[]} = {};
        //Base exp
        let exps: {[id:number]: number} = {};
        let spreadExp: {[key: number]: string[]} = {};
        //EV yields
        let evs: {[id:number]: string} = {};
        let spreadEvs: {[key: string]: string[]} = {};
        //Types
        let types: {[id:number]: string[]} = {};
        //Sprites
        let sprites: {[id:number]: string} = {};
        for (const id in this.varieties) {
            newVarieties[id] = this.varieties[id];
            newNames[id] = this.varieties[id].name;
            //Heights
            let height = this.varieties[id].biology.height;
            if (spreadHeights.hasOwnProperty(height)) {
                spreadHeights[height].push(id);
            } else {
                spreadHeights[height] = [id];
            }
            heights[id] = height;
            //Weights
            let weight = this.varieties[id].biology.weight;
            if (spreadWeights.hasOwnProperty(weight)) {
                spreadWeights[weight].push(id);
            } else {
                spreadWeights[weight] = [id];
            }
            weights[id] = weight;
            //Base exp
            let exp = this.varieties[id].meta.base_experience;
            if (spreadExp.hasOwnProperty(exp)) {
                spreadExp[exp].push(id);
            } else {
                spreadExp[exp] = [id];
            }
            exps[id] = exp;
            //EV yields
            let ev = this.varieties[id].meta.ev_yields;
            if (spreadEvs.hasOwnProperty(ev)) {
                spreadEvs[ev].push(id);
            } else {
                spreadEvs[ev] = [id];
            }
            evs[id] = ev;
            //Types
            types[id] = this.varieties[id].types;
            //Sprites
            sprites[id] = this.varieties[id].icon_url;
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
        this.names = {...newNames};
        this.updateCallback();
    }
}

export type { SpeciesInterface, Biology, Meta };
export { Species }
