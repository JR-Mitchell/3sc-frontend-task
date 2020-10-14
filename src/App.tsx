//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

//Imports from local 'components'
import SpeciesCard from 'components/Species';
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
    species: {[key:string]:ReferenceInterface[]},
    /**
     * A list of pokemon for the selected pokemon species
     */
    pokemon: PokemonInterface[],
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
        this.state = {species:{},pokemon:[]};
    }

    /**
     * React render method
     */
    render() {
        //Making copies of state variables
        let species: {[key:string]:ReferenceInterface[]} = {};
        for (const letter in this.state.species) {
            species[letter] = this.state.species[letter].slice();
        }
        let pokemon = this.state.pokemon.slice();
        let bodyPos = this.state.bodyPos || "";

        // Buttons for all pokemon in the generation
        let mainBody = [];
        for (const property in species) {
            mainBody.push(
                <h3
                    key={"AlphaTitle"+property}
                    className="speciesListAlphaTitle"
                >
                    {property.toUpperCase()}
                </h3>
            )
            let letterSpecies = species[property];
            mainBody.push(
                <div
                    key={"AlphaDiv"+property}
                    className="speciesListAlphaDiv"
                >
                    {letterSpecies.map((item)=>{
                        return <SpeciesCard
                            key={item.name}
                            reference={{...item}}
                        />
                    })}
                </div>
            )
        }


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
                {mainBody}
                <br />
                {
                    /** Data display for each pokemon in species **/
                   /* pokemon.map((item)=>{
                        return <Pokemon key={item.name} data={item} />
                    })*/
                }
            </div>
        </>
    }

    /**
     * Callback to select a particular generation of pokemon
     * Takes a list of references and alphabetises
     */
    selectGeneration(species:ReferenceInterface[]) {
        let newSpecies: {[key:string]:ReferenceInterface[]} = {};
        for (let i=0; i<species.length; i++) {
            let item = species[i];
            let firstChar = item.name.charAt(0);
            if (newSpecies.hasOwnProperty(firstChar)) {
                newSpecies[firstChar].push(item);
            } else {
                newSpecies[firstChar] = [item];
            }
        }
        this.setState({species:newSpecies,pokemon:[]});
    }

    /**
     * Selects a pokemon species to show all varieties off
     * TODO: future behaviour will show more complete info
     *
     * @param {ReferenceInterface} ref: a reference to the species
     */
    selectSpecies(ref: ReferenceInterface) {
        //Clear pokemon state
        this.setState({pokemon:[]});
        axios.get<SpeciesInterface>(ref.url).then((result)=>{
            //Go through the varieties of this species
            for (let i=0; i<result.data.varieties.length; i++) {
                axios.get<PokemonInterface>(
                    result.data.varieties[i].pokemon.url
                ).then((response)=>{
                    //Add this pokemon to state.pokemon
                    this.setState((state,props)=>({
                        pokemon: state.pokemon.concat([response.data])
                    }));
                })
            }
        });
    }
}

//Default export is App React component
export default App;
