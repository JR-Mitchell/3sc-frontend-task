//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Biology as BiologyType } from 'utils/Species';

//Imports from local 'components'
import InfoTable from 'components/InfoTable';

function Biology(props:BiologyType) {
    let data: {[key:string]: string|number} = {
        Genus: props.genus.genus
    }
    data["Gender Ratio"] = "F: "+props.female_percent.toString()
        + " M: "+props.male_percent.toString()
        + " ?: "+props.genderless_percent.toString();

    if (props.height) {
        if (typeof props.height !== "number") {
            Object.entries(props.height).forEach((item)=>{
                data[item[0] + " Height"] = item[1];
            })
        } else {
            data["Height"] = props.height;
        }
    }

    if (props.weight) {
        if (typeof props.weight !== "number") {
            Object.entries(props.weight).forEach((item)=>{
                data[item[0] + " Weight"] = item[1];
            })
        } else {
            data["Weight"] = props.weight;
        }
    }

    data["Hatch Time"] = props.hatch_time_min.toString() + " - "
        + props.hatch_time_max.toString() + " steps";


    let offData: {[key:string]:{[subkey:string]: string|number}} = {
        only: data
    }

    return <InfoTable title="Biology:" data={{...offData}} />
}

//Default export is React Biology component
export default Biology;
