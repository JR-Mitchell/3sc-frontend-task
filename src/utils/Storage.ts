//Import from local 'reducers' directory
import type { TotalStateInterface } from 'reducers';

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if (action.type === "ADD_FAVOURITE" || action.type === "REMOVE_FAVOURITE") {
            localStorage.setItem("favourites",JSON.stringify((getState() as TotalStateInterface).favourites));
        }
        return result;
    }
}

const retrieveFavouritesState = () => {
    const favourites = localStorage.getItem("favourites");
    return favourites ? {
        "favourites": JSON.parse(favourites)
    } : {};
}

export { localStorageMiddleware, retrieveFavouritesState };