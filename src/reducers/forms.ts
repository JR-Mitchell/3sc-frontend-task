//Imports from local 'utils' directory
import type { FormInterface } from 'utils/Forms';

//Interface for the state
interface FormStateInterface {
    [url: string]: FormInterface | "LOADING"
}

//Interface for the action of adding multiple varieties
interface addFormInfo {
    type: "ADD_MULTIPLE_FORM_DETAILS",
    payload: FormStateInterface
}

//Interface for informing that multiple varieties are being loaded
interface addLoadingInfo {
    type: "ADD_MULTIPLE_FORM_LOADING_DETAILS",
    payload: string[]
}

//Interface for removing an item from the state
interface removeFormInfo {
    type: "REMOVE_MULTIPLE_FORM_DETAILS",
    payload: string[]
}

type actionTypes = addFormInfo
    | addLoadingInfo
    | removeFormInfo;

//Reducer for all currently loaded species
const formReducer = (state: FormStateInterface = {}, action: actionTypes) => {
    let changesMade: boolean = false;
    switch(action.type) {
        case "ADD_MULTIPLE_FORM_DETAILS":
            for (const key in action.payload) {
                if(state[key]!==action.payload[key]) {
                    changesMade=true;
                }
            }
            if (changesMade) {
                return {...Object.assign(state,action.payload)};
            }
            return state;
        case "ADD_MULTIPLE_FORM_LOADING_DETAILS":
            action.payload.forEach((key)=>{
                if(state[key]!=="LOADING") {
                    changesMade=true;
                    state[key] = "LOADING";
                }
            });
            if (changesMade) {
                return {...state};
            }
            return state;
        case "REMOVE_MULTIPLE_FORM_DETAILS":
            action.payload.forEach((key)=>{
                if(state[key]) {
                    changesMade=true;
                    delete state[key];
                }
            });
            if (changesMade) {
                return {...state};
            }
            return state;
        default:
            return state;
    }
}

export default formReducer;
export type { FormStateInterface };
