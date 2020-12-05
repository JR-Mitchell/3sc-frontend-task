//Import from external 'react' module
import React from 'react';

//Import from local 'utils' directory
import type { PokemonInterface } from 'utils/Pokemon';

//Import from local 'components' directory
import TypeIcon from 'components/TypeIcon';

interface TypesProps {
    varieties: PokemonInterface[],
    names: string[],
    spriteUrls: string[]
}

function TypeTable(props: TypesProps) {
    if (props.varieties.length > 0) {
        return <div className="info-overlay__details-group">
            <h3 className="info-overlay__details-group__title">
                Types:
            </h3>
            <table className="info-overlay__details-group__table">
                <tbody>
                    {props.varieties.map((item,index)=>{
                        return <tr key={item.name}>
                            <td className="species-card fill">
                                <h4 className="species-card__title grey">
                                    {props.names[index]}
                                </h4>
                                <img
                                    src={props.spriteUrls[index]}
                                    alt={"Front facing sprite of "+props.names[index]}
                                />
                            </td>
                            <td className="info-overlay__details-group__table-cell">
                                {item.types.map((type)=><TypeIcon key={type.type.name} type={type.type.name} />)}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
    return null;
}

export default TypeTable;
