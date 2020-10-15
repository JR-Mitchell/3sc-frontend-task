//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Biology as BiologyType } from 'utils/Species';

interface BiologyProps {
    one: BiologyType,
    two: BiologyType,
    oneVariant: string,
    twoVariant: string
}

function Biology(props:BiologyProps) {
    let one = props.one;
    let two = props.two;

    let height: React.ReactNode;
    if (one.height && two.height) {
        height = <tr>
            <th className="speciesDetailsTableCell">Height:</th>
            <td className="speciesDetailsTableCell">
                {typeof one.height === "number"
                    ? one.height
                    : one.height[props.oneVariant]
                }
            </td>
            <td className="speciesDetailsTableCell">
                {typeof two.height === "number"
                    ? two.height
                    : two.height[props.twoVariant]
                }
            </td>
        </tr>
    }

    let weight: React.ReactNode;
    if (one.weight && two.weight) {
        weight = <tr>
            <th className="speciesDetailsTableCell">Weight:</th>
            <td className="speciesDetailsTableCell">
                {typeof one.weight === "number"
                    ? one.weight
                    : one.weight[props.oneVariant]
                }
            </td>
            <td className="speciesDetailsTableCell">
                {typeof two.weight === "number"
                    ? two.weight
                    : two.weight[props.twoVariant]
                }
            </td>
        </tr>
    }

    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Biology:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                <tr>
                    <th className="speciesDetailsTableCell">Category</th>
                    <th className="speciesDetailsTableCell">{props.oneVariant}</th>
                    <th className="speciesDetailsTableCell">{props.twoVariant}</th>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Genus:</th>
                    <td className="speciesDetailsTableCell">{one.genus.genus}</td>
                    <td className="speciesDetailsTableCell">{two.genus.genus}</td>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Gender ratio:</th>
                    <td className="speciesDetailsTableCell">
                        {
                            "F: "+one.female_percent.toString()
                            + " M: "+one.male_percent.toString()
                            + " ?: "+one.genderless_percent.toString()
                        }
                    </td>
                    <td className="speciesDetailsTableCell">
                        {
                            "F: "+two.female_percent.toString()
                            + " M: "+two.male_percent.toString()
                            + " ?: "+two.genderless_percent.toString()
                        }
                    </td>
                </tr>
                {height}
                {weight}
                <tr>
                    <th className="speciesDetailsTableCell">Hatch time:</th>
                    <td className="speciesDetailsTableCell">
                        {
                            one.hatch_time_min.toString() + " - "
                            + one.hatch_time_max.toString() + " steps"
                        }
                    </td>
                    <td className="speciesDetailsTableCell">
                        {
                            two.hatch_time_min.toString() + " - "
                            + two.hatch_time_max.toString() + " steps"
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}

//Default export is React Biology component
export default Biology;
