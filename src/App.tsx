//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';

//Imports from local 'views'
import PokeList from 'views/PokeList';

//Imports from local 'parts'
import TopBar from 'parts/TopBar';
import MenuBar from 'parts/MenuBar';

//Import stylesheet
import 'style.css';

/**
 * Interface for the state of the App component
 */
interface AppState {
    /**
     * An object of alphabetised reference lists to pokemon species
     * for the selected generation
     */
    species: ReferenceInterface[],
    /**
     * String identifier for the position of the main body
     */
    bodyPos?: string
}

/**
 * The App component is rendered into the root div
 * It contains the header,
 * along with a simple visualisation for the selected pokemon
 */
class App extends React.Component<{},AppState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {species:[],bodyPos:" right"};
    }

    /**
     * React render method
     */
    render() {
        //Making copies of state variables
        let species = this.state.species.slice();
        let bodyPos = this.state.bodyPos || "";

        return <>
            <MenuBar
                pos={bodyPos}
                generationCallback={(species:ReferenceInterface[])=>{
                    this.selectGeneration(species);
                }}
            />
            <div className={"mainBody"+bodyPos}>
                <TopBar
                    menuCallback={()=>{
                        let newPos = bodyPos === "" ? " right" : "";
                        this.setState({bodyPos:newPos});
                    }}
                />
                <PokeList species={species}/>
            </div>
        </>
    }

    /**
     * Callback to select a particular generation of pokemon
     * Takes a list of references and alphabetises
     */
    selectGeneration(species:ReferenceInterface[]) {
        this.setState({species:species});
    }
}

//Default export is App React component
export default App;
