//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Imports from local 'utils'
import type { GenerationInterface } from 'utils/Generation';
import type { ReferenceInterface } from 'utils/Reference';

//Local component imports
import BarButton from './BarButton';

/**
 * Interface for props of the MenuBar component
 */
interface MenuBarProps {
    /**
     * Position string for working out css classname
     */
    pos: string
    /**
     * Callback for the generation buttons
     */
    generationCallback: (pokemon: ReferenceInterface[]) => void
}

/**
 * Interface for state of the MenuBar component
 */
interface MenuBarState {
    /**
     * Array containing information about each generation
     */
    generations: GenerationInterface[]
}

/**
 * MenuBar component at top of page
 * Contains buttons for each generation of pokemon
 * Each button displays the pokemon of that gen
 */
class MenuBar extends React.Component<MenuBarProps,MenuBarState> {
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
        const pos = this.props.pos;
        const generations = this.state.generations.slice();

        return <div className={"menuBarDiv"+pos}>
            <h3 className={"menuBarTitle"+pos}>Pokemon by Generation</h3>
            {
                generations.map((item)=>{
                    item.pokemon_species.sort((a,b)=>{
                        return a.name < b.name ? -1 : 1;
                    });
                    return <BarButton
                        gen={item}
                        key={item.name}
                        callback={()=>{
                            this.props.generationCallback(
                                item.pokemon_species
                            );
                        }}
                        pos={pos}
                    />
                })
            }
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

//Default export is MenuBar component
export default MenuBar;
