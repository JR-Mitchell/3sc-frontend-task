//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Import from local 'parts'
import Overlay from 'parts/Overlay';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import { Species } from 'utils/Species';

//Imports from local directory
import Biology from './Biology';
import Meta from './Meta';
import BaseStats from './BaseStats';
import Types from './Types';

/**
 * Interface for the props of the SpeciesInfo component
 */
interface SpeciesProps {
    /**
     * Callback to close the info overlay
     */
    closeCallback: ()=>void
    /**
     * Species to show info for
     */
    species: SpeciesInterface
}

/**
 * Interface for the state of the SpeciesInfo component
 */
interface SpeciesState {
    /**
     * Species object
     */
    species: Species;
    /**
     * Sprites for pokemon varieties
     */
    sprites: string[];
}

/**
 * SpeciesInfo component displays information about a pokemon species
 */
class SpeciesInfo extends React.Component<SpeciesProps,SpeciesState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {
            species:new Species(props.species,()=>{this.forceUpdate();}),
            sprites:[]
        }
    }

    /**
     * React componentWillUnmount method
     */
    componentWillUnmount() {
        this.state.species.updateCallback = ()=>{};
    }

    /**
     * React render method
     */
    render() {
        //Copy of state variable
        let sprites = this.state.sprites.slice();
        let species = this.state.species;

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesDetailsTitle">{species.name}</h2>
            <div className="speciesDetailsOuter">
                <Types {...species.types} />
                <Biology {...species.biology} />
                <Meta {...species.meta} />
                {species.varieties.hasOwnProperty(species.name) &&
                    <BaseStats {...species.varieties[species.name].base_stats}/>
                }
            </div>
        </Overlay>
    }
}

//Default export is React SpeciesInfo component
export default SpeciesInfo;
