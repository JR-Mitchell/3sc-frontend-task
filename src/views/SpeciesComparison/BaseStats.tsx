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
                    let bonusClassOne = "";
                    let bonusClassTwo = "";
                    let valOne = item[1];
                    let valTwo = props.two[item[0]];
                    if (typeof valOne === "number" && typeof valTwo === "number") {
                        if (valOne < valTwo) {
                            bonusClassOne = " red";
                            bonusClassTwo = " green";
                        } else if (valOne > valTwo) {
                            bonusClassOne = " green";
                            bonusClassTwo = " red";
                        } else {
                            bonusClassOne = " yellow";
                            bonusClassTwo = " yellow";
                        }
                    }
                    return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0].toUpperCase()+":"}</th>
                        <td className={"speciesDetailsTableCell"+bonusClassOne}>{item[1]}</td>
                        <td className={"speciesDetailsTableCell"+bonusClassTwo}>{props.two[item[0]]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

//Default export is React BaseStats component
export default BaseStats;
