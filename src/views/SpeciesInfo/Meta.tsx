//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Meta as MetaType } from 'utils/Species';

function Meta(props:MetaType) {
    let base_experience: React.ReactNode;
    if (props.base_experience) {
        if (typeof props.base_experience !== "number") {
            base_experience = Object.entries(props.base_experience).map((item)=>{
                return <tr>
                        <th>{item[0] + " Height:"}</th>
                        <td>{item[1]}</td>
                    </tr>
            })
        } else {
            base_experience = <tr>
                    <th>Base Experience:</th>
                    <td>{props.base_experience}</td>
                </tr>

        }
    }

    let ev_yields: React.ReactNode;
    if (props.ev_yields) {
        if (typeof props.ev_yields !== "string") {
            ev_yields = Object.entries(props.ev_yields).map((item)=>{
                return <tr>
                        <th>{item[0] + " EV Yields:"}</th>
                        <td>{item[1]}</td>
                    </tr>
            })
        } else {
            ev_yields = <tr>
                    <th>EV Yields:</th>
                    <td>{props.ev_yields}</td>
                </tr>

        }
    }

    return <div>
        <h3 className="speciesDetailsTitle">Metainfo:</h3>
        <table>
            <tbody>
                <tr>
                    <th>Capture Rate:</th>
                    <td>{props.capture_rate}</td>
                </tr>
                <tr>
                    <th>Base Happiness:</th>
                    <td>{props.base_happiness}</td>
                </tr>
                <tr>
                    <th>Growth Rate:</th>
                    <td>{props.growth_rate}</td>
                </tr>
                {base_experience}
                {ev_yields}
            </tbody>
        </table>
    </div>
}

//Default export is React Meta component
export default Meta;
