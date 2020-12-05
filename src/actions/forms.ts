//Imports from external 'axios' library
import axios from 'axios';
import type { AxiosResponse } from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { PokemonInterface } from 'utils/Pokemon';
import type { FormInterface } from 'utils/Forms';

const addPokemonForms: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (pokemon: PokemonInterface[]) => async dispatch => {
    let urls: string[] = [];
    pokemon.forEach(poke=>{
        if (poke.forms) {
            urls = urls.concat(poke.forms.map(item=>item.url));
        }
    });
    dispatch({
        type: "ADD_MULTIPLE_FORM_LOADING_DETAILS",
        payload: urls
    });
    const promises = urls.map(item=>axios.get<FormInterface>(item)) || [];
    Promise.allSettled(promises).then((results)=>{
        dispatch({
            type: "ADD_MULTIPLE_FORM_DETAILS",
            payload: Object.fromEntries(results.map((item,index)=>{
                return item.status === "fulfilled" ? [urls[index],item.value.data]: [urls[index],false];
            }).filter(item=>item[1]!==false))
        });
    });
}

const removePokemonForms = (formUrls: string[]) => {
    return {
        type: "REMOVE_MULTIPLE_FORM_DETAILS",
        payload: formUrls
    }
}

export { addPokemonForms, removePokemonForms };
