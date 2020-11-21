//Imports from local 'utils' directory
import type { LanguageInterface } from 'utils/Language';

//Interface for setting the current language
interface languageSetAction {
    type: "SET_LANGUAGE_CODE",
    payload: string
}

//Interface for setting the language list
interface languageListSetAction {
    type: "SET_LANGUAGE_LIST",
    payload: {[name:string]: LanguageInterface}
}

//Interface for the total reducer state
interface LanguageStateInterface {
    currentLanguage: string,
    languageList: {[name:string]: LanguageInterface}
}

//Reducer for the language state
const languageReducer = (state: LanguageStateInterface={currentLanguage:"en",languageList:{}}, action: languageSetAction | languageListSetAction) => {
    switch(action.type) {
        case "SET_LANGUAGE_CODE":
            return {
                currentLanguage: action.payload,
                languageList: state.languageList
            };
        case "SET_LANGUAGE_LIST":
            return {
                currentLanguage: state.languageList,
                languageList: action.payload
            };
        default:
            return state;
    }
}

export default languageReducer;
export type { LanguageStateInterface };
