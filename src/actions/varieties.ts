//Imports from external 'axios' library
import axios from 'axios';
import type { AxiosResponse } from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

//Imports from local 'actions' directory
import { addPokemonForms, removePokemonForms } from 'actions/forms';

//Imports from local 'reducers' directory
import type { TotalStateInterface, VarietyStateInterface } from 'reducers';

const addSpeciesVarieties: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (species: SpeciesInterface) => async dispatch => {
    if (species.varieties) {
        const urls = species.varieties.map(item=>item.pokemon.url);
        dispatch({
            type: "ADD_MULTIPLE_VARIETY_LOADING_DETAILS",
            payload: urls
        });
        const promises = urls.map(url=>{return axios.get<PokemonInterface>(url);});
        Promise.allSettled(promises).then((results)=>{
            dispatch({
                type: "ADD_MULTIPLE_VARIETY_DETAILS",
                payload: Object.fromEntries(results.map((item,index)=>{
                    return item.status === "fulfilled" ? [urls[index],item.value.data] : [urls[index],false];
                }).filter(item=>item[1]!==false))
            });
            dispatch(addPokemonForms(results.map((item)=>{
                return item.status === "fulfilled" ? item.value.data : false;
            }).filter(item=>item!==false)));
        });
    }
}

const removeSpeciesVarieties: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (varietyUrls: string[]) => async (dispatch, getState) => {
    const state: VarietyStateInterface = (getState() as TotalStateInterface).varietiesInfo;
    varietyUrls.forEach(url=>{
        removePokemonForms((state[url] as PokemonInterface)?.forms?.map(item=>item.url));
    });
    dispatch({
        type: "REMOVE_MULTIPLE_VARIETY_DETAILS",
        payload: varietyUrls
    });
}

export { addSpeciesVarieties, removeSpeciesVarieties };
