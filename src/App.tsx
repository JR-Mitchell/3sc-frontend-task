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
    species: {[key:string]:ReferenceInterface[]}
    /**
     * String identifier for the position of the main body
     */
    bodyPos?: string
    /**
     * Names of sections to scroll link to
     */
    scrollSections: string[]
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
        this.state = {
            species:{},
            bodyPos:" right",
            scrollSections: []
        };
    }

    /**
     * React render method
     */
    render() {
        //Making copies of state variables
        let species: {[key:string]:ReferenceInterface[]} = {};
        Object.entries(this.state.species).forEach((item)=>{
            species[item[0]] = item[1].slice();
        })
        let bodyPos = this.state.bodyPos || "";
        let scrollSections = this.state.scrollSections;

        return <>
            <MenuBar
                pos={bodyPos}
                generationCallback={(species:ReferenceInterface[])=>{
                    this.selectGeneration(species);
                }}
                scrollSections={scrollSections}
            />
            <div className={"mainBody"+bodyPos}>
                <TopBar
                    menuCallback={()=>{
                        let newPos = bodyPos === "" ? " right" : "";
                        this.setState({bodyPos:newPos});
                    }}
                />
                <PokeList
                    species={species}
                />
            </div>
        </>
    }

    /**
     * Callback to select a particular generation of pokemon
     * Takes a list of references and alphabetises
     */
    selectGeneration(species:ReferenceInterface[]) {
        // Alphabetically deal with species
        let alphabetisedSpecies: {[key: string]:ReferenceInterface[]} = {};
        let validCharacters: string[] = [];
        for (let i=0; i<species.length; i++) {
            let item = species[i];
            let firstChar = item.name.charAt(0);
            if (alphabetisedSpecies.hasOwnProperty(firstChar)) {
                alphabetisedSpecies[firstChar].push(item);
            } else {
                alphabetisedSpecies[firstChar] = [item];
                validCharacters.push(firstChar);
            }
        }

        //Sort valid characters
        validCharacters.sort();

        this.setState({
            species:alphabetisedSpecies,
            scrollSections:validCharacters
        });
    }
}

//Default export is App React component
export default App;
