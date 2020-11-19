//Imports from external 'axios' library
import axios from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { GenerationInterface } from 'utils/Generation';
import type { SpeciesInterface } from 'utils/Species';

const setGeneration: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (gen: GenerationInterface) => async dispatch => {
    dispatch({
        type: "SET_POKEMON_LIST",
        payload: {
            list: [],
            locationHandle: "/generation/"+gen.name
        }
    });
    const promises = gen.pokemon_species.map((item)=>{return axios.get<SpeciesInterface>(item.url);});
    Promise.allSettled(promises).then((results)=>{
        dispatch({
            type: "SET_POKEMON_LIST",
            payload: {
                list: results.filter(item=>item.status === "fulfilled").map((item)=>item.status === "fulfilled" && item.value.data),
                locationHandle: "/generation/"+gen.name
            }
        });
    });
}

export { setGeneration };
