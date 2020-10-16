//Import from external 'react' module
import React from 'react';

//Import from local 'components'
import TypeIcon from 'components/TypeIcon';

interface TypesProps {
    data: {[key:string]: string[]},
    sprites: {[key:string]: string}
}

function Types(props:TypesProps) {
    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Types:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                {Object.entries(props.data).map((item)=>{
                    return <tr key={item[0]}>
                        <td className="speciesCard fill">
                            <h4 className="speciesTitle grey">
                                {item[0]+":"}
                            </h4>
                            <img className="spritePlaceholder right" src={props.sprites[item[0]]} />
                        </td>
                        <td className="speciesDetailsTableCell">
                            {item[1].map((type)=>{
                                return <TypeIcon key={type} type={type} />
                            })}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

//Default export is React Types component
export default Types;
