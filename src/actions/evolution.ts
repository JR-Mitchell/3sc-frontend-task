//Imports from external 'axios' library
import axios from 'axios';
import type { AxiosResponse } from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { SpeciesInterface } from 'utils/Species';
import type { EvolutionInterface, ChainLink } from 'utils/Evolution';

//Imports from local 'reducers' directory
import type { EvolutionStateInterface, TotalStateInterface } from 'reducers';

//Imports from local 'actions' directory
import { addSpeciesInfoById } from './species';

//Async add species by ID
const addSpeciesEvolutionInfo: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (species: SpeciesInterface) => async (dispatch,getState) => {
    const state: EvolutionStateInterface = (getState() as TotalStateInterface).evolutionChainInfo;
    const speciesInfo = state[species.id];
    if (speciesInfo === undefined && species?.evolution_chain?.url) {
        dispatch({
            type: "ADD_EVOLUTION_CHAIN_LOADING_DETAILS",
            payload: species.id
        })
        const response = await axios.get<EvolutionInterface>(
            species.evolution_chain.url
        );
        dispatch({
            type: "ADD_EVOLUTION_CHAIN_DETAILS",
            payload: {
                speciesID: species.id,
                data: response.data
            }
        });
        //Add all species in chain
        const addSpeciesIDs = (link: ChainLink) => {
            const thisURLSplit = link?.species?.url?.split("/");
            const thisID = thisURLSplit[thisURLSplit.length - 2];
            dispatch(addSpeciesInfoById(parseInt(thisID)));
            link?.evolves_to?.forEach?.(addSpeciesIDs);
        };
        addSpeciesIDs(response.data.chain);
    }
}

//Remove species by ID
const removeSpeciesEvolutionInfoById = (id: number) => {
    return {
        type: "REMOVE_EVOLUTION_CHAIN_DETAILS",
        payload: id
    };
}

export { addSpeciesEvolutionInfo, removeSpeciesEvolutionInfoById };
