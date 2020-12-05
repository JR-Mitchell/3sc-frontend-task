//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';

//Interface for adding to the list
interface addFavouriteAction {
    type: "ADD_FAVOURITE",
    payload: SpeciesInterface
}

//Interface for removing an item from the list
interface removeFavouriteAction {
    type: "REMOVE_FAVOURITE",
    payload: number
}

type FavouritesStateInterface = SpeciesInterface[];

//Reducer for the state of the favourites list.
const favouritesReducer = (state: FavouritesStateInterface=[], action: addFavouriteAction | removeFavouriteAction) => {
    if (action.type === "ADD_FAVOURITE") {
        return state.concat([action.payload]);
    } else if (action.type === "REMOVE_FAVOURITE") {
        let end = state.splice(action.payload+1);
        return state.splice(0,action.payload).concat(end);
    }
    return state;
}

export default favouritesReducer;
export type { FavouritesStateInterface };
