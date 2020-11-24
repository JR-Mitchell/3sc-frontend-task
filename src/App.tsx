//Import from external 'react' module
import React from 'react';

//Import from external 'react-router-dom' module
import { BrowserRouter, Route } from 'react-router-dom';

//Import from external 'react-redux' module
import { Provider } from 'react-redux';

//Import from external 'redux' module
import { createStore, applyMiddleware } from 'redux';

//Import from external 'redux-thunk' module
import thunk from 'redux-thunk';

//Import stylesheet
import 'style.css';

//Import from local 'reducers' directory
import reducer from 'reducers';

//Import from local 'actions' directory
import { addGeneration } from 'actions/generations';
import { setLanguageList } from 'actions/languages';

//Import from local 'utils' directory
import { localStorageMiddleware, retrieveFavouritesState } from 'utils/Storage';

//Imports from local 'parts' directory
import {TopBar, MenuBar, DragBar, PokeList, Info} from 'parts';

function App(props) {
    const middleware = [thunk, localStorageMiddleware];
    const store = createStore(reducer,retrieveFavouritesState(),applyMiddleware(...middleware));
    const curr_gen_number = 8;
    for (let i=1; i<curr_gen_number; i++) {
        store.dispatch<any>(addGeneration(i,false))
    }
    store.dispatch<any>(addGeneration(curr_gen_number,true));
    store.dispatch<any>(setLanguageList());
    return <Provider store={store}>
        <BrowserRouter>
            <MenuBar />
            <DragBar />
            <TopBar />
            <PokeList />
            <Route path="/:pokelisttype/:pokelistinstance/info/">
                <Info />
            </Route>
        </BrowserRouter>
    </Provider>
};

export default App;
