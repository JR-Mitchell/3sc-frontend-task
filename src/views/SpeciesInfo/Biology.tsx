//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Biology as BiologyType } from 'utils/Species';

function Biology(props:BiologyType) {
    let height: React.ReactNode;
    if (props.height) {
        if (typeof props.height !== "number") {
            height = Object.entries(props.height).map((item)=>{
                return <tr>
                        <th>{item[0] + " Height:"}</th>
                        <td>{item[1]}</td>
                    </tr>
            })
        } else {
            height = <tr>
                    <th>Height:</th>
                    <td>{props.height}</td>
                </tr>

        }
    }

    let weight: React.ReactNode;
    if (props.weight) {
        if (typeof props.weight !== "number") {
            weight = Object.entries(props.weight).map((item)=>{
                return <tr>
                        <th>{item[0] + " Weight:"}</th>
                        <td>{item[1]}</td>
                    </tr>
            })
        } else {
            weight = <tr>
                    <th>Weight:</th>
                    <td>{props.weight}</td>
                </tr>

        }
    }

    return <div>
        <h3 className="speciesDetailsTitle">Biology:</h3>
        <table>
            <tbody>
                <tr>
                    <th>Genus:</th>
                    <td>{props.genus.genus}</td>
                </tr>
                <tr>
                    <th>Gender ratio:</th>
                    <td>
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
                    <th>Hatch time:</th>
                    <td>
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
