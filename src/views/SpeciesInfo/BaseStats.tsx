//Import from external 'react' module
import React from 'react';

function BaseStats(props:{[key:string]: number}) {
    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Base Stats:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                {Object.entries(props).map((item)=>{
                    return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0].toUpperCase()+":"}</th>
                        <td className="speciesDetailsTableCell">{item[1]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

//Default export is React BaseStats component
export default BaseStats;
