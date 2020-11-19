//Imports from local 'utils' directory
import type { PokemonInterface } from 'utils/Pokemon';

//Interface for the state
interface VarietyStateInterface {
    [url: string]: PokemonInterface | "LOADING"
}

//Interface for the action of adding multiple varieties
interface addVarietyInfo {
    type: "ADD_MULTIPLE_VARIETY_DETAILS",
    payload: VarietyStateInterface
}

//Interface for informing that multiple varieties are being loaded
interface addLoadingInfo {
    type: "ADD_MULTIPLE_VARIETY_LOADING_DETAILS",
    payload: string[]
}

//Interface for removing an item from the state
interface removeVarietyInfo {
    type: "REMOVE_MULTIPLE_VARIETY_DETAILS",
    payload: string[]
}

type actionTypes = addVarietyInfo
    | addLoadingInfo
    | removeVarietyInfo;

//Reducer for all currently loaded species
const varietyReducer = (state: VarietyStateInterface = {}, action: actionTypes) => {
    let changesMade: boolean = false;
    switch(action.type) {
        case "ADD_MULTIPLE_VARIETY_DETAILS":
            for (const key in action.payload) {
                if(state[key]!==action.payload[key]) {
                    changesMade=true;
                }
            }
            if (changesMade) {
                return {...Object.assign(state,action.payload)};
            }
            return state;
        case "ADD_MULTIPLE_VARIETY_LOADING_DETAILS":
            action.payload.forEach((key)=>{
                if(state[key]!=="LOADING") {
                    changesMade=true;
                    state[key] = "LOADING";
                }
            });
            if (changesMade) {
                return {...state};
            }
            return state;
        case "REMOVE_MULTIPLE_VARIETY_DETAILS":
            action.payload.forEach((key)=>{
                if(state[key]) {
                    changesMade=true;
                    delete state[key];
                }
            });
            if (changesMade) {
                return {...state};
            }
            return state;
        default:
            return state;
    }
}

export default varietyReducer;
export type { VarietyStateInterface };
