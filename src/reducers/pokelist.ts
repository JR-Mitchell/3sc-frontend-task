//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import getLocalisedName from 'utils/Names';

type sortTypes = "ALPHA";

//Interface for setting the list
interface pokemonSetAction {
    type: "SET_POKEMON_LIST",
    payload: {
        list: SpeciesInterface[],
        locationHandle: string
    }
}

/**
 * Interface for the state of the list
 */
interface PokelistStateInterface {
    rawList: SpeciesInterface[],
    sortType: sortTypes,
    binnedList: {
        [key: string]: SpeciesInterface[]
    },
    binnedOrder: string[],
    locationHandle: string
}

let initialState: PokelistStateInterface = {
    rawList: [],
    sortType: "ALPHA",
    binnedList: {},
    binnedOrder: [],
    locationHandle: "/"
}

//Reducer for the state of the pokemon list.
const pokelistReducer = (state: PokelistStateInterface=initialState, action: pokemonSetAction) => {
    if (action.type === "SET_POKEMON_LIST") {
        let newState: PokelistStateInterface = {
            rawList: action.payload.list,
            sortType: "ALPHA",
            binnedList: {},
            binnedOrder: [],
            locationHandle: action.payload.locationHandle
        }
        newState.rawList.forEach((item)=>{
            let firstChar = getLocalisedName(item,"en").charAt(0);
            if (newState.binnedList.hasOwnProperty(firstChar)) {
                newState.binnedList[firstChar].push(item);
            } else {
                newState.binnedList[firstChar] = [item];
                newState.binnedOrder.push(firstChar);
            }
        });
        newState.binnedOrder = newState.binnedOrder.sort();
        return newState;
    }
    return state;
}

export default pokelistReducer;
export type { PokelistStateInterface };
