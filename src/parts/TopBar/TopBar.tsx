//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { GenerationInterface } from 'utils/Generation';
import type { ReferenceInterface } from 'utils/Reference';

//Local component imports
import TopBarButton from './TopBarButton';

/**
 * Interface for props of the TopBar component
 */
interface TopBarProps {
    /**
     * Callback for the generation buttons
     */
    callback: (pokemon: ReferenceInterface[]) => void
}

/**
 * Interface for state of the TopBar component
 */
interface TopBarState {
    /**
     * List containing information about each generation
     */
    generations: GenerationInterface[]
}

/**
 * TopBar component at top of page
 * Contains buttons for each generation of pokemon
 * Each button displays the pokemon of that gen
 */
class TopBar extends React.Component<TopBarProps,TopBarState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {generations:[]};
        //For quickly loading generations which we know exist
        const curr_gen_number = 8;
        for (let i=1; i<curr_gen_number; i++) {
            this.getNextGeneration(i,false);
        }
        this.getNextGeneration(curr_gen_number,true);
    }

    /**
     * React render method
     */
    render() {
        let generations = this.state.generations.slice();
        return <div className="topBarDiv">
            <h1>PokeAPI Web UI</h1>
            <span className="flex">
            {
                generations.map((item)=>{
                    item.pokemon_species.sort((a,b)=>{
                        return a.name < b.name ? -1 : 1;
                    });
                    return <TopBarButton
                        gen={item}
                        key={item.name}
                        callback={()=>{
                            this.props.callback(item.pokemon_species);
                        }}
                    />
                })
            }
            </span>
        </div>
    }

    /**
     * Makes a GET request to pokeapi for generation of a specific
     * number, adding to state.generations.
     * The option searchAbove will recursively search for newer gens
     * than the current one, so that future generations will not be missed.
     *
     * @param {number} genNum: The number of the generation to GET
     * @param {boolean} searchAbove: whether to start a recursive search
     *      for newer generations
     */
    getNextGeneration(genNum:number,searchAbove:boolean) {
        axios.get<GenerationInterface>(
           "https://pokeapi.co/api/v2/generation/"+genNum.toString()
        ).then(
            (response) => {
                this.setState((state,props)=>{
                    //Add the generation
                    let generations = state.generations
                        .concat([response.data]);
                    //Sort by id
                    generations.sort((a,b)=>{return a.id - b.id});
                    //Recursive searching for newer gens
                    if (searchAbove) {
                        this.getNextGeneration(genNum+1,true);
                    }
                    return {
                        generations:generations
                    };
                });
            }
        ).catch((error)=>{
            if (searchAbove && error.response.status == 404) {
                //404 called if no such generation exists
                console.log(
                    "Making the assumption that no generation "
                    + genNum.toString()
                    + " has been released... yet"
                );
            } else {
                throw error;
            }
        })
    }
}

//Default export is TopBar component
export default TopBar;
