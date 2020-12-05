//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';

//Interface for a loaded species
interface SpeciesInfo {
    //The species in question
    species: SpeciesInterface,
    //The comparison slot that the pokemon is in, if any
    comparisonIndex?: number
}

//Interface for the state
interface SpeciesStateInterface {
    [id: number]: SpeciesInfo | "LOADING"
}

//Interface for the action of adding a species
interface addSpeciesInfo {
    type: "ADD_SPECIES_DETAILS",
    payload: SpeciesInterface
}

//Interface for the action of adding a species in specific comparison slot
interface addSpeciesComparisonInfo {
    type: "ADD_SPECIES_COMPARE_DETAILS",
    payload: {
        species: SpeciesInterface,
        comparisonIndex: number
    }
}

//Interface for informing that a species is being loaded
interface addLoadingInfo {
    type: "ADD_LOADING_DETAILS",
    payload: number
}

//Interface for removing an item from the state
interface removeSpeciesInfo {
    type: "REMOVE_SPECIES_DETAILS",
    payload: number
}

type actionTypes = addSpeciesInfo
    | addLoadingInfo
    | addSpeciesComparisonInfo
    | removeSpeciesInfo;

//Reducer for all currently loaded species
const speciesReducer = (state: SpeciesStateInterface = {}, action: actionTypes) => {
    switch(action.type) {
        case "ADD_SPECIES_DETAILS":
            if(state[action.payload.id] === undefined || state[action.payload.id] === "LOADING") {
                return {...Object.assign(state,{[action.payload.id]:{species:action.payload}})};
            }
            return state;
        case "ADD_SPECIES_COMPARE_DETAILS":
            if(state[action.payload.species.id] === undefined || state[action.payload.species.id] === "LOADING" || (state[action.payload.species.id] as SpeciesInfo).comparisonIndex === undefined) {
                return {...Object.assign(state,{[action.payload.species.id]:action.payload})};
            }
            return state;
        case "ADD_LOADING_DETAILS":
            if(state[action.payload]===undefined) {
                return {...Object.assign(state,{[action.payload]:"LOADING"})};
            }
            return state;
        case "REMOVE_SPECIES_DETAILS":
            if(state[action.payload]!==undefined) {
                delete state[action.payload];
                return {...state};
            }
            return state;
        default:
            return state;
    }
}

export default speciesReducer;
export type { SpeciesStateInterface, SpeciesInfo };
