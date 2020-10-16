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
     * Variant to show info for
     */
    variant: string;
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
            variant:"",
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
        let variant = this.state.variant;
        variant = species.varieties.hasOwnProperty(variant)
            ? variant
            : species.name;

        let variantKeys = Object.keys(species.varieties);

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesDetailsTitle">
                {species.name}
                {variantKeys.length > 1 && " (form: "}
                {variantKeys.length > 1 &&
                    <select
                        onChange={(event)=>{
                            this.setState({variant:event.target.value});
                        }}
                    >
                        {variantKeys.map((key)=>{
                            return <option
                                key={key}
                                value={key}
                                selected={key===variant}
                            >
                                {key}
                            </option>
                        })}
                    </select>
                }
                {variantKeys.length > 1 && ")"}
            </h2>
            <div className="speciesDetailsOuter">
                <Types {...species.types} />
                <Biology {...species.biology} />
                <Meta {...species.meta} />
                {species.varieties.hasOwnProperty(variant) &&
                    <BaseStats {...species.varieties[variant].base_stats}/>
                }
            </div>
        </Overlay>
    }
}

//Default export is React SpeciesInfo component
export default SpeciesInfo;
