//Import from external 'react' module
import React from 'react';

interface BaseStatsProps {
    one: {[key: string]: number},
    two: {[key: string]: number},
    oneVariant: string,
    twoVariant: string
}

function BaseStats(props:BaseStatsProps) {
    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Base Stats:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                <tr>
                    <th className="speciesDetailsTableCell">Stat</th>
                    <th className="speciesDetailsTableCell">{props.oneVariant}</th>
                    <th className="speciesDetailsTableCell">{props.twoVariant}</th>
                </tr>
                {Object.entries(props.one).map((item)=>{
                    return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0].toUpperCase()+":"}</th>
                        <td className="speciesDetailsTableCell">{item[1]}</td>
                        <td className="speciesDetailsTableCell">{props.two[item[0]]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

//Default export is React BaseStats component
export default BaseStats;
