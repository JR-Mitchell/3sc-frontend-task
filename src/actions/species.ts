//Imports from external 'axios' library
import axios from 'axios';
import type { AxiosResponse } from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';

//Imports from local 'reducers' directory
import type { SpeciesStateInterface, TotalStateInterface } from 'reducers';

//Relative imports
import { addSpeciesVarieties, removeSpeciesVarieties } from './varieties';
import { addSpeciesEvolutionInfo, removeSpeciesEvolutionInfoById } from './evolution';

//Add info on a species that is already loaded
const addSpeciesInfo: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (species: SpeciesInterface) => async (dispatch,getState) => {
    const state: SpeciesStateInterface = (getState() as TotalStateInterface).speciesInfo;
    if (state[species.id] === undefined || state[species.id] === "LOADING") {
        dispatch({
            type: "ADD_SPECIES_DETAILS",
            payload: species
        });
        dispatch(addSpeciesVarieties(species));
        dispatch(addSpeciesEvolutionInfo(species));
    }
}

//Add comparison info on a species that is already loaded
const addSpeciesComparisonInfo: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (species: SpeciesInterface, index: number) => async (dispatch,getState) => {
    const state: SpeciesStateInterface = (getState() as TotalStateInterface).speciesInfo;
    const speciesInfo = state[species.id];
    if (speciesInfo === undefined || speciesInfo === "LOADING" || speciesInfo.comparisonIndex === undefined) {
        dispatch({
            type: "ADD_SPECIES_COMPARE_DETAILS",
            payload: {
                species: species,
                comparisonIndex: index
            }
        });
        dispatch(addSpeciesVarieties(species));
        dispatch(addSpeciesEvolutionInfo(species));
    }
}


//Async add species by ID
const addSpeciesInfoById: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (id: number) => async (dispatch,getState) => {
    const state: SpeciesStateInterface = (getState() as TotalStateInterface).speciesInfo;
    if (state[id] === undefined) {
        dispatch({
            type: "ADD_LOADING_DETAILS",
            payload: id
        });
        const response = await axios.get<SpeciesInterface>(
            "https://pokeapi.co/api/v2/pokemon-species/"+id.toString()
        );
        dispatch(addSpeciesInfo(response.data));
    }
}

//Async add comparison species by ID
const addSpeciesComparisonInfoById: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (id: number, index: number) => async (dispatch, getState) => {
    const state: SpeciesStateInterface = (getState() as TotalStateInterface).speciesInfo;
    const speciesInfo = state[id];
    if (speciesInfo === undefined || speciesInfo === "LOADING" || speciesInfo.comparisonIndex === undefined) {
        dispatch({
            type: "ADD_LOADING_DETAILS",
            payload: id
        });
        const response = await axios.get<SpeciesInterface>(
            "https://pokeapi.co/api/v2/pokemon-species/"+id.toString()
        );
        dispatch(addSpeciesComparisonInfo(response.data));
    }
}

const removeSpeciesInfoById: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (id: number) => async (dispatch, getState) => {
    const state: SpeciesStateInterface = (getState() as TotalStateInterface).speciesInfo;
    const speciesInfo = state[id];
    const varietyUrls = (speciesInfo && speciesInfo !== "LOADING") ? speciesInfo.species?.varieties?.map(item=>item.pokemon.url) || [] : [];
    dispatch(removeSpeciesVarieties(varietyUrls));
    dispatch({
        type: "REMOVE_SPECIES_DETAILS",
        payload: id
    })
    dispatch(removeSpeciesEvolutionInfoById(id));
}

export { addSpeciesInfo, addSpeciesInfoById, addSpeciesComparisonInfo, addSpeciesComparisonInfoById, removeSpeciesInfoById };
