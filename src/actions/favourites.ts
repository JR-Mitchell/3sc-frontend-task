//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';

function addFavourite(data:SpeciesInterface) {
    return {
        type: "ADD_FAVOURITE",
        payload: data
    }
};

function removeFavourite(index:number) {
    return {
        type: "REMOVE_FAVOURITE",
        payload: index
    }
};

export { addFavourite, removeFavourite };
