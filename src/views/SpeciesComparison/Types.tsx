//Import from external 'react' module
import React from 'react';

//Import from local 'components'
import TypeIcon from 'components/TypeIcon';

function Types(props:{[key:string]: string[]}) {
    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Types:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                {Object.entries(props).map((item)=>{
                    return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0]+":"}</th>
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
