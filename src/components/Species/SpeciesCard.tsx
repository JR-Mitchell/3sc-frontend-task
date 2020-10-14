//Imports from external library 'react'
import React from 'react';

//Imports from external library 'axios'
import axios from 'axios';

//Imports from local 'utils'
import type { SpeciesInterface } from 'utils/Species';
import type { ReferenceInterface } from 'utils/Reference';

/**
 * Interface for the props of the Species component
 */
interface SpeciesProps {
    /**
     * Reference to the species
     */
    reference: ReferenceInterface
}

/**
 * Interface for the state of the Species component
 */
interface SpeciesState {
    /**
     * Species info
     */
    species?: SpeciesInterface
    /**
     * URL to sprite
     */
    spriteUrl?: string
}

/**
 * An element representing the information for one particular Species
 * Displays name, base experience, height, weight and a sprite
 *
 * @param {SpeciesInterface} props: the pokemon data to display
 */
class Species extends React.Component<SpeciesProps,SpeciesState> {
    /**
     * React constructor method
     */
    constructor(props) {
        super(props);
        this.state = {};
        //Get species info
        axios.get<SpeciesInterface>(
            props.reference.url
        ).then((response)=>{
            this.setState((state,props)=>({
                species: response.data,
                spriteUrl: "https://raw.githubusercontent.com/PokeAPI/"
                    + "sprites/master/sprites/pokemon/"
                    + "versions/generation-vii/icons/"
                    + response.data.id.toString() + ".png"
            }));
        });
    }

    /**
     * React render method
     */
    render() {
        let species = {...this.state.species};
        let sprAddress = this.state.spriteUrl;

        //Make name proper case
        let name: string = species?.name || this.props.reference.name;
        name = name.charAt(0).toUpperCase() + name.substr(1);

        return <div className="pokemonDiv" draggable>
            <h4>{name}</h4>
            {sprAddress
                ? <img
                    src={sprAddress}
                    className="spritePlaceholder"
                    draggable={false}
                />
                : <div className="spritePlaceholder" />}
        </div>
    }
}

//Default export is Species React component
export default Species;
