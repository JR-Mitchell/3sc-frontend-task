//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Meta as MetaType } from 'utils/Species';

interface MetaProps {
    one: MetaType,
    two: MetaType,
    oneVariant: string,
    twoVariant: string,
}

function Meta(props:MetaProps) {
    let one = props.one;
    let two = props.one;

    let base_experience: React.ReactNode;
    if (one.base_experience && two.base_experience) {
        base_experience = <tr>
            <th className="speciesDetailsTableCell">Base Experience:</th>
            <td className="speciesDetailsTableCell">
                {typeof one.base_experience === "number"
                    ? one.base_experience
                    : one.base_experience[props.oneVariant]
                }
            </td>
            <td className="speciesDetailsTableCell">
                {typeof two.base_experience === "number"
                    ? two.base_experience
                    : two.base_experience[props.twoVariant]
                }
            </td>
        </tr>
    }

    let ev_yields: React.ReactNode;
    if (one.ev_yields && two.ev_yields) {
        ev_yields = <tr>
            <th className="speciesDetailsTableCell">EV Yields:</th>
            <td className="speciesDetailsTableCell">
                {typeof one.ev_yields === "string"
                    ? one.ev_yields
                    : one.ev_yields[props.oneVariant]
                }
            </td>
            <td className="speciesDetailsTableCell">
                {typeof two.ev_yields === "string"
                    ? two.ev_yields
                    : two.ev_yields[props.twoVariant]
                }
            </td>
        </tr>
    }

    return <div className="speciesDetailsGroup">
        <h3 className="speciesDetailsTitle">Metainfo:</h3>
        <table className="speciesDetailsTable">
            <tbody>
                <tr>
                    <th className="speciesDetailsTableCell">Category</th>
                    <th className="speciesDetailsTableCell">{props.oneVariant}</th>
                    <th className="speciesDetailsTableCell">{props.twoVariant}</th>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Capture Rate:</th>
                    <td className="speciesDetailsTableCell">{one.capture_rate}</td>
                    <td className="speciesDetailsTableCell">{two.capture_rate}</td>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Base Happiness:</th>
                    <td className="speciesDetailsTableCell">{one.base_happiness}</td>
                    <td className="speciesDetailsTableCell">{two.base_happiness}</td>
                </tr>
                <tr>
                    <th className="speciesDetailsTableCell">Growth Rate:</th>
                    <td className="speciesDetailsTableCell">{one.growth_rate}</td>
                    <td className="speciesDetailsTableCell">{two.growth_rate}</td>
                </tr>
                {base_experience}
                {ev_yields}
            </tbody>
        </table>
    </div>
}

//Default export is React Meta component
export default Meta;
