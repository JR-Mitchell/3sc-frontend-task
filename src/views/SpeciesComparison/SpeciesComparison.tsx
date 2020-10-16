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
import BaseStats from './BaseStats';
import Types from './Types';

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
     * Name of variant of first species
     */
    variantOne: string;
    /**
     * Name of variant of second species
     */
    variantTwo: string;
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
            variantOne:"",
            variantTwo:"",
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
        let variantOne = this.state.variantOne;
        variantOne = speciesOne.varieties.hasOwnProperty(variantOne)
            ? variantOne
            : speciesOne.name;
        let variantTwo = this.state.variantTwo;
        variantTwo = speciesTwo.varieties.hasOwnProperty(variantTwo)
            ? variantTwo
            : speciesTwo.name;
        let variantOneKeys = Object.keys(speciesOne.varieties);
        let variantTwoKeys = Object.keys(speciesTwo.varieties);

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesDetailsTitle">
                {speciesOne.name}
                {variantOneKeys.length > 1 && " (form: "}
                {variantOneKeys.length > 1 &&
                    <select
                        onChange={(event)=>{
                            this.setState({variantOne:event.target.value})
                        }}
                    >
                        {variantOneKeys.map((key)=>{
                            return <option
                                key={key}
                                value={key}
                                selected={key===variantOne}
                            >
                                {key}
                            </option>
                        })}
                    </select>
                }
                {variantOneKeys.length > 1 && ")"}
                {" vs "}
                {speciesTwo.name}
                {variantTwoKeys.length > 1 && " (form: "}
                {variantTwoKeys.length > 1 &&
                    <select
                        onChange={(event)=>{
                            this.setState({variantTwo:event.target.value})
                        }}
                    >
                        {variantTwoKeys.map((key)=>{
                            return <option
                                key={key}
                                value={key}
                                selected={key===variantTwo}
                            >
                                {key}
                            </option>
                        })}
                    </select>
                }
                {variantTwoKeys.length > 1 && ")"}
            </h2>
            <div className="speciesDetailsOuter">
                <Types {...speciesOne.types} {...speciesTwo.types} />
                <Biology one={{...speciesOne.biology}} two={{...speciesTwo.biology}} oneVariant={variantOne} twoVariant={variantTwo}/>
                <Meta one={{...speciesOne.meta}} two={{...speciesTwo.meta}} oneVariant={variantOne} twoVariant={variantTwo}/>
                <BaseStats
                    one={{...speciesOne.varieties[variantOne]?.base_stats}}
                    two={{...speciesTwo.varieties[variantTwo]?.base_stats}}
                    oneVariant={variantOne}
                    twoVariant={variantTwo}
                />
            </div>
        </Overlay>
    }
}

//Default export is React SpeciesComparison component
export default SpeciesComparison;
