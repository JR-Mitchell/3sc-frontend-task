//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { ReferenceInterface } from 'utils/Reference';
import type { SpeciesInterface } from 'utils/Species';
import type { PokemonInterface } from 'utils/Pokemon';

//Imports from local 'components'
import Pokemon from 'components/Pokemon';
import TopBar from 'parts/TopBar';

//Import stylesheet
import 'style.css';

/**
 * Interface for the state of the App component
 */
interface AppState {
    /**
     * A list of references to pokemon species for the selected generation
     */
    species: ReferenceInterface[],
    /**
     * A list of pokemon for the selected pokemon species
     */
    pokemon: PokemonInterface[]
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
        this.state = {species:[],pokemon:[]};
    }

    /**
     * React render method
     */
    render() {
        //Making copies of state variables
        let species = this.state.species.slice();
        let pokemon = this.state.pokemon.slice();

        return <>
            <TopBar
                callback={(species:ReferenceInterface[])=>{
                    this.setState({species:species,pokemon:[]});}
                }
            />
            {
                /** Buttons for all pokemon in the generation **/
                species.map((item)=>{
                    return <button
                        className="tempPokeNameButton"
                        key={item.name}
                        onClick={(()=>{this.selectSpecies(item);})}
                    >
                        {item.name}
                    </button>
                })
            }
            <br />
            {
                /** Data display for each pokemon in species **/
                pokemon.map((item)=>{
                    return <Pokemon key={item.name} data={item} />
                })
            }
        </>
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
