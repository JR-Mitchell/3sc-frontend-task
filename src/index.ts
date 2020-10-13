//Imports from external modules react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Import from local 'src/' directory
import App from 'App';

//Render
ReactDOM.render(
    React.createElement(App,{},null),
    document.getElementById('root')
);
