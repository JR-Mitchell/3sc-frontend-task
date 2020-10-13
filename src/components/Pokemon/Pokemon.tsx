//Imports from external library 'react'
import React from 'react';

//Imports from local 'utils'
import type { PokemonInterface } from 'utils/Pokemon';

/**
 * An element representing the information for one particular Pokemon
 * Displays name, base experience, height, weight and a sprite
 *
 * @param {PokemonInterface} props: the pokemon data to display
 */
function Pokemon(props:{data:PokemonInterface}) {
    //Select the first non-null sprite
    //TODO: update in later iteration to switch between sprites
    let sprAddress: string | null = null;
    for (const property in props.data.sprites) {
        if (props.data.sprites[property] !== null) {
            sprAddress = props.data.sprites[property];
            break;
        }
    }

    //Make name proper case
    //TODO: Some names have variants with hyphen-separation; figure these out
    let name: string = props.data.name;
    name = name.charAt(0).toUpperCase() + name.substr(1);

    return <div className="pokemonDiv">
        <table>
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Base Experience</td>
                    <td>{props.data.base_experience}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{props.data.height}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{props.data.weight}</td>
                </tr>
            </tbody>
        </table>
        {sprAddress && <img src={sprAddress} />}
    </div>
}

//Default export is Pokemon React component
export default Pokemon;
