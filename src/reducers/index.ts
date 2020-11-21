//Import from external 'redux' module
import { combineReducers } from 'redux';

//Imports from local directory
import sidebarReducer from './sidebar';
import type { SidebarStateInterface } from './sidebar';
import languageReducer from './languages';
import type { LanguageStateInterface } from './languages';
import generationReducer from './generations';
import type { GenerationsStateInterface } from './generations';
import pokelistReducer from './pokelist';
import type { PokelistStateInterface } from './pokelist';
import favouritesReducer from './favourites';
import type { FavouritesStateInterface } from './favourites';
import speciesReducer from './species';
import type { SpeciesStateInterface } from './species';
import varietyReducer from './varieties';
import type { VarietyStateInterface } from './varieties';
import formsReducer from './forms';
import type { FormStateInterface } from './forms';
import evolutionReducer from './evolution';
import type { EvolutionStateInterface } from './evolution';

const reducer = combineReducers({
    sidebar: sidebarReducer,
    language: languageReducer,
    generationList: generationReducer,
    pokeList: pokelistReducer,
    favourites: favouritesReducer,
    speciesInfo: speciesReducer,
    varietiesInfo: varietyReducer,
    formsInfo: formsReducer,
    evolutionChainInfo: evolutionReducer,
});

interface TotalStateInterface {
    sidebar: SidebarStateInterface,
    language: LanguageStateInterface,
    generationList: GenerationsStateInterface,
    pokeList: PokelistStateInterface,
    favourites: FavouritesStateInterface,
    speciesInfo: SpeciesStateInterface,
    varietiesInfo: VarietyStateInterface,
    formsInfo: FormStateInterface,
    evolutionChainInfo: EvolutionStateInterface,
}

export default reducer;

export type {
    SidebarStateInterface,
    LanguageStateInterface,
    GenerationsStateInterface,
    PokelistStateInterface,
    FavouritesStateInterface,
    SpeciesStateInterface,
    VarietyStateInterface,
    FormStateInterface,
    EvolutionStateInterface,
    TotalStateInterface
};
