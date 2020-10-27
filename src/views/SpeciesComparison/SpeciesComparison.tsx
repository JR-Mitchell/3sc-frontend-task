//Import from external 'react' module
import React from 'react';

//Import from external 'axios' module
import axios from 'axios';

//Import from local 'parts'
import Overlay from 'parts/Overlay';

//Import from local 'components'
import TypeIcon from 'components/TypeIcon';
import Types from 'components/TypeTable';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import { Species } from 'utils/Species';

//Imports from local directory
import Biology from './Biology';
import Meta from './Meta';
import BaseStats from './BaseStats';

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
     * ID of variant of first species
     */
    variantOne: number;
    /**
     * ID of variant of second species
     */
    variantTwo: number;
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
            variantOne:0,
            variantTwo:0,
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
            : speciesOne.id;
        let variantTwo = this.state.variantTwo;
        variantTwo = speciesTwo.varieties.hasOwnProperty(variantTwo)
            ? variantTwo
            : speciesTwo.id;
        let variantOneKeys = Object.keys(speciesOne.varieties);
        let variantTwoKeys = Object.keys(speciesTwo.varieties);

        return <Overlay open closeCallback={()=>{this.props.closeCallback();}}>
            <h2 className="speciesDetailsTitle">
                {speciesOne.name}
                {variantOneKeys.length > 1 && " (form: "}
                {variantOneKeys.length > 1 &&
                    <select
                        onChange={(event)=>{
                            this.setState({variantOne:Number(event.target.value)})
                        }}
                        value={variantOne}
                    >
                        {variantOneKeys.map((key)=>{
                            return <option
                                key={key}
                                value={key}
                            >
                                {speciesOne.names[key]}
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
                            this.setState({variantTwo:Number(event.target.value)})
                        }}
                        value={variantTwo}
                    >
                        {variantTwoKeys.map((key)=>{
                            return <option
                                key={key}
                                value={key}
                            >
                                {speciesTwo.names[key]}
                            </option>
                        })}
                    </select>
                }
                {variantTwoKeys.length > 1 && ")"}
            </h2>
            <div className="speciesDetailsOuter">
                <Types data={{...speciesOne.types,...speciesTwo.types}} names={{...speciesOne.names, ...speciesTwo.names}} sprites={{...speciesOne.sprites,...speciesTwo.sprites}} />
                <Biology one={{...speciesOne.biology}} two={{...speciesTwo.biology}} oneVariant={variantOne} twoVariant={variantTwo} names={{...speciesOne.names, ...speciesTwo.names}}/>
                <Meta one={{...speciesOne.meta}} two={{...speciesTwo.meta}} oneVariant={variantOne} twoVariant={variantTwo} names={{...speciesOne.names, ...speciesTwo.names}}/>
                <BaseStats
                    one={{...speciesOne.varieties[variantOne]?.base_stats}}
                    two={{...speciesTwo.varieties[variantTwo]?.base_stats}}
                    oneName={speciesOne.names[variantOne] || variantOne.toString()}
                    twoName={speciesTwo.names[variantTwo] || variantTwo.toString()}
                />
            </div>
        </Overlay>
    }
}

//Default export is React SpeciesComparison component
export default SpeciesComparison;
