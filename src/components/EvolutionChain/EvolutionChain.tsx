//Imports from external library 'react'
import React from 'react';

//Imports from 'utils'
import type { SimpleChain } from 'utils/Evolution';

/**
 * Interface for the props of the Evolution component
 */
interface EvolutionProps {
    /**
     * Name of the species to focus on
     */
    speciesName: string
    /**
     * URL of the species sprite to focus on
     */
    speciesSpriteURL?: string
    /**
     * Evolution chains for this species
     */
    simpleChains: SimpleChain[]
}

/**
 * An element representing the information for one particular Evolution
 * Displays name, base experience, height, weight and a sprite
 *
 * @param {EvolutionProps} props: the pokemon data to display
 */
function EvolutionChain(props: EvolutionProps) {
    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Evolves from/to:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                {props.simpleChains.map((item,index)=>{
                    return <tr key={index}>
                        {item.pre && <td className="speciesCard">
                            <h4 className="speciesTitle grey">
                                {item.pre.actual_name || item.pre.species.name}
                            </h4>
                            {item.pre.sprite_url
                                ? <img className="spritePlaceholder right" src={item.pre.sprite_url} />
                                : <div className="spritePlaceholder right" />
                            }
                        </td>
                        }
                        <td className="speciesCard">
                            <h4 className="speciesTitle grey">
                                {props.speciesName}
                            </h4>
                            <img className="spritePlaceholder right" src={props.speciesSpriteURL} />
                        </td>
                        {item.post && <td className="speciesCard">
                            <h4 className="speciesTitle grey">
                                {item.post.actual_name || item.post.species.name}
                            </h4>
                            {item.post.sprite_url
                                ? <img className="spritePlaceholder right" src={item.post.sprite_url} />
                                : <div className="spritePlaceholder right" />
                            }
                        </td>
                        }
                    </tr>
                })
                }
            </tbody>
        </table>
    </div>
}

//Default export is EvolutionChain React component
export default EvolutionChain;
