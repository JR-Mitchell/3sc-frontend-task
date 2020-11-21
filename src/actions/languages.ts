//Imports from external 'axios' library
import axios from 'axios';
import type { AxiosResponse } from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { LanguageInterface } from 'utils/Language';
import type { ReferenceInterface } from 'utils/Reference';

//Imports from local 'reducers' directory
import type { TotalStateInterface } from 'reducers';

interface baseGetInterface {
    count: number,
    results: ReferenceInterface[]
}

const setLanguageList: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = () => async dispatch => {
    const response = await axios.get<baseGetInterface>(
        "https://pokeapi.co/api/v2/language"
    );
    const promises = response.data.results.map(item=>axios.get<LanguageInterface>(item.url)) || [];
    Promise.allSettled(promises).then((results)=>{
        dispatch({
            type: "SET_LANGUAGE_LIST",
            payload: Object.fromEntries(results.map((item)=>{
                return item.status === "fulfilled" ? [item.value.data.name,item.value.data]: ["loadfailed",false];
            }).filter(item=>item[1]!==false))
        });
    });
}

const setLanguageCode: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (language: string) => async (dispatch,getState) => {
    dispatch({
        type: "SET_LANGUAGE_CODE",
        payload: language
    });
    const state: TotalStateInterface = getState() as TotalStateInterface;
    dispatch({
        type:"SET_POKEMON_LIST",
        payload: {
            list: state.pokeList.rawList,
            locationHandle: state.pokeList.locationHandle,
            languageCode: language
        }
    });
}

export { setLanguageList, setLanguageCode };
