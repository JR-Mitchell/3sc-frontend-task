//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Biology as BiologyType } from 'utils/Species';

function Biology(props:BiologyType) {
    let height: React.ReactNode;
    if (props.height) {
        if (typeof props.height !== "number") {
            height = Object.entries(props.height).map((item)=>{
                return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0] + " Height:"}</th>
                        <td className="speciesDetailsTableCell">{item[1]}</td>
                    </tr>
            })
        } else {
            height = <tr>
                    <th className="speciesDetailsTableCell">Height:</th>
                    <td className="speciesDetailsTableCell">{props.height}</td>
                </tr>

        }
    }

    let weight: React.ReactNode;
    if (props.weight) {
        if (typeof props.weight !== "number") {
            weight = Object.entries(props.weight).map((item)=>{
                return <tr key={item[0]}>
                        <th className="speciesDetailsTableCell">{item[0] + " Weight:"}</th>
                        <td className="speciesDetailsTableCell">{item[1]}</td>
                    </tr>
            })
        } else {
            weight = <tr>
                    <th className="speciesDetailsTableCell">Weight:</th>
                    <td className="speciesDetailsTableCell">{props.weight}</td>
                </tr>

        }
    }

    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Biology:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                <tr>
                    <th className="speciesDetailsTableCell">Genus:</th>
                    <td className="speciesDetailsTableCell">{props.genus.genus}</td>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Gender ratio:</th>
                    <td className="speciesDetailsTableCell">
                        {
                            "F: "+props.female_percent.toString()
                            + " M: "+props.male_percent.toString()
                            + " ?: "+props.genderless_percent.toString()
                        }
                    </td>
                </tr>
                {height}
                {weight}
                <tr>
                    <th className="speciesDetailsTableCell">Hatch time:</th>
                    <td className="speciesDetailsTableCell">
                        {
                            props.hatch_time_min.toString() + " - "
                            + props.hatch_time_max.toString() + " steps"
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}

//Default export is React Biology component
export default Biology;
