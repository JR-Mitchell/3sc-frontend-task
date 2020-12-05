//Imports from local 'utils' directory
import type { EvolutionInterface } from 'utils/Evolution';

//Interface for the state
interface EvolutionStateInterface {
    [speciesID: number]: EvolutionInterface | "LOADING"
}

//Interface for the action of adding evolution chains for a species
interface addChainInfo {
    type: "ADD_EVOLUTION_CHAIN_DETAILS",
    payload: {
        speciesID: number,
        data: EvolutionInterface
    }
}

//Interface for informing that multiple varieties are being loaded
interface addLoadingInfo {
    type: "ADD_EVOLUTION_CHAIN_LOADING_DETAILS",
    payload: number
}

//Interface for removing an item from the state
interface removeChainInfo {
    type: "REMOVE_EVOLUTION_CHAIN_DETAILS",
    payload: number
}

type actionTypes = addChainInfo
    | addLoadingInfo
    | removeChainInfo;

//Reducer for all currently loaded species
const evolutionReducer = (state: EvolutionStateInterface = {}, action: actionTypes) => {
    switch(action.type) {
        case "ADD_EVOLUTION_CHAIN_DETAILS":
            if(state[action.payload.speciesID]===undefined || state[action.payload.speciesID]==="LOADING") {
                state[action.payload.speciesID] = action.payload.data;
                return {...state};
            }
            return state;
        case "ADD_EVOLUTION_CHAIN_LOADING_DETAILS":
            if(state[action.payload]===undefined) {
                state[action.payload] = "LOADING";
                return {...state};
            }
            return state;
        case "REMOVE_EVOLUTION_CHAIN_DETAILS":
            if (state[action.payload]) {
                delete state[action.payload];
                return {...state};
            }
            return state;
        default:
            return state;
    }
}

export default evolutionReducer;
export type { EvolutionStateInterface };
