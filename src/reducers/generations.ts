//Imports from local 'utils' directory
import type { GenerationInterface } from 'utils/Generation';

//Interface for adding a generation
interface generationAddAction {
    type: "ADD_GENERATION",
    payload: GenerationInterface
}

type GenerationsStateInterface = GenerationInterface[];

//Reducer for the state of the generations list.
const generationReducer = (state: GenerationsStateInterface=[], action: generationAddAction) => {
    if (action.type === "ADD_GENERATION") {
        return state.concat([action.payload]).sort((a,b)=>a.id - b.id);
    }
    return state;
}

export default generationReducer;
export type { GenerationsStateInterface };
