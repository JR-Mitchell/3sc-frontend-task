//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Import from local 'parts'
import Overlay from 'parts/Overlay';

//Import from local 'components'
import TypeIcon from 'components/TypeIcon';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import { Species } from 'utils/Species';

//Imports from local directory
import Biology from './Biology';
import Meta from './Meta';

/**
 * Interface for the props of the SpeciesComparison component
 */
interface SpeciesProps {
    /**
     * Callback to close the info overlay
     */
    closeCallback: ()=>void
    /**
     * First species to show info for
     */
    speciesOne: SpeciesInterface
    /**
     * Second species to show info for
     */
    speciesTwo: SpeciesInterface
}

/**
 * Interface for the state of the SpeciesComparison component
 */
interface SpeciesState {
    /**
     * First Species object
     */
    speciesOne: Species;
    /**
     * Second Species object
     */
    speciesTwo: Species;
    /**
     * Sprites for pokemon varieties
     */
    sprites: string[];
}

/**
 * SpeciesComparison component displays information about a pokemon species
 */
class SpeciesComparison extends React.Component<SpeciesProps,SpeciesState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {
            speciesOne:new Species(props.speciesOne,()=>{this.forceUpdate();}),
            speciesTwo:new Species(props.speciesTwo,()=>{this.forceUpdate();}),
            sprites:[]
        }
    }

    /**
     * React componentWillUnmount method
     */
    componentWillUnmount() {
        this.state.speciesOne.updateCallback = ()=>{};
        this.state.speciesTwo.updateCallback = ()=>{};
    }

    /**
     * React render method
     */
    render() {
        //Copy of state variable
        let sprites = this.state.sprites.slice();
        let speciesOne = this.state.speciesOne;
        let speciesTwo = this.state.speciesTwo;
        let speciesOneVariant = Object.keys(speciesOne.varieties)[0]
        let speciesTwoVariant = Object.keys(speciesTwo.varieties)[0]

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesDetailsTitle">{speciesOne.name+" vs "+speciesTwo.name}</h2>
            <div className="speciesDetailsOuter">
                <Biology one={{...speciesOne.biology}} two={{...speciesTwo.biology}} oneVariant={speciesOneVariant} twoVariant={speciesTwoVariant}/>
                <Meta one={{...speciesOne.meta}} two={{...speciesTwo.meta}} oneVariant={speciesOneVariant} twoVariant={speciesTwoVariant}/>
            </div>
        </Overlay>
    }
}

//Default export is React SpeciesComparison component
export default SpeciesComparison;
