//Imports from external 'axios' library
import axios from 'axios';

//Imports from external 'redux' library
import type { Action, ActionCreator } from 'redux';

//Imports from external 'redux-thunk' library
import type { ThunkAction } from 'redux-thunk';

//Imports from local 'utils' directory
import type { GenerationInterface } from 'utils/Generation';

const addGeneration: ActionCreator<ThunkAction<void,{},unknown,Action<string>>> = (genNum: number, searchAbove: boolean) => async dispatch => {
    try {
        const response = await axios.get<GenerationInterface>(
            "https://pokeapi.co/api/v2/generation/"+genNum.toString()
        );
        dispatch({
            type: "ADD_GENERATION",
            payload: response.data
        });
        if (searchAbove) {
            dispatch(addGeneration(genNum+1,true));
        }
    } catch(error) {
        if (searchAbove && error.response.status == 404) {
            //404 called if no such generation exists
            console.log(
                "Making the assumption that no generation "
                + genNum.toString()
                + " has been released... yet"
            );
        } else {
            throw error;
        }
    }
}

export { addGeneration };
