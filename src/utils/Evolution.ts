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
 * Simplified interface for evolution around a particular species
 */
interface SimpleChain {
    pre?: {
        species: Reference,
        evolution_details: EvolutionDetail[] | null,
        actual_name?: string,
        sprite_url?: string
    }
    post?: {
        species: Reference,
        evolution_details: EvolutionDetail[] | null,
        actual_name?: string,
        sprite_url?: string
    }
}

/**
 * Interface for the entire evolution chain
 */
interface EvolutionInterface {
    id: number,
    baby_trigger_item: Reference,
    chain: ChainLink
}

class EvolutionChain {
    simpleChains: SimpleChain[];
    updateCallback: ()=>void;
    language: string;

    constructor(speciesName: string, data: EvolutionInterface, updateCallback:()=>void, language: string) {
        this.language = language;
        this.updateCallback = updateCallback;
        //Recurse through chain to find relevant items
        this.simpleChains = [];
        let speciesURLs: string[] = [];
        let recurseThrough = (link: ChainLink, parent?: Reference)=>{
            link.evolves_to.forEach((sublink)=>{
                recurseThrough(sublink,link.species);
            })
            if (link.species.name === speciesName) {
                if (link.evolves_to.length > 0) {
                    link.evolves_to.forEach((sublink)=>{
                        if (parent) {
                            speciesURLs = speciesURLs.concat([parent.url,sublink.species.url]);
                            this.simpleChains.push({
                                pre: {
                                    species: parent,
                                    evolution_details: link.evolution_details
                                },
                                post: {
                                    species: sublink.species,
                                    evolution_details: sublink.evolution_details
                                }
                            })
                        } else {
                            speciesURLs.push(sublink.species.url);
                            this.simpleChains.push({post: {
                                species: sublink.species,
                                evolution_details: sublink.evolution_details
                            }})
                        }
                    })
                } else {
                    if (parent) {
                        speciesURLs.push(parent.url);
                        this.simpleChains.push({pre: {
                            species: parent,
                            evolution_details: link.evolution_details
                        }})
                    } else {
                        this.simpleChains.push({});
                    }
                }
            }
        }
        recurseThrough(data.chain);
        //Find unique urls
        speciesURLs = speciesURLs.filter((item,index)=>speciesURLs.indexOf(item)===index);
        //Get info for these species
        speciesURLs.forEach((url)=>{
            axios.get<SpeciesInterface>(url).then((response)=>{
                this.updateSpecies(url,response.data);
            })
        });
    }

    updateSpecies(url: string, data: SpeciesInterface) {
        let speciesName: string | undefined = data.names
            ?.filter((item)=>{
                return item.language.name === this.language
            })[0]?.name;
        let speciesIconURL: string = "https://raw.githubusercontent.com/PokeAPI/"
            + "sprites/master/sprites/pokemon/"
            + "versions/generation-viii/icons/"
            + data.id + ".png";
        //Update all entries with this url
        this.simpleChains.forEach((item)=>{
            if (item.pre && item.pre.species.url === url) {
                item.pre.actual_name = speciesName;
                item.pre.sprite_url = speciesIconURL;
            }
            if (item.post && item.post.species.url === url) {
                item.post.actual_name = speciesName;
                item.post.sprite_url = speciesIconURL;
            }
        });
        this.updateCallback();
    }
}

export type { EvolutionInterface, SimpleChain };
export { EvolutionChain };
