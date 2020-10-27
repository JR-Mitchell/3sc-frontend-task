//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Meta as MetaType } from 'utils/Species';

//Imports from local 'components'
import InfoTable from 'components/InfoTable';

interface MetaProps extends MetaType {
    names: {[id: number]: string}
}

function Meta(props:MetaProps) {
    let data: {[key:string]: string|number} = {
        "Capture Rate": props.capture_rate,
        "Base Happiness": props.base_happiness,
        "Growth Rate": props.growth_rate
    }

    if (props.base_experience) {
        if (typeof props.base_experience !== "number") {
            Object.entries(props.base_experience).forEach((item)=>{
                data[props.names[item[0]] + " Base Experience"] = item[1];
            })
        } else {
            data["Base Experience"] = props.base_experience;
        }
    }

    if (props.ev_yields) {
        if (typeof props.ev_yields !== "string") {
            Object.entries(props.ev_yields).forEach((item)=>{
                data[props.names[item[0]] + " EV Yields"] = item[1];
            })
        } else {
            data["EV Yields"] = props.ev_yields;
        }
    }

    let offData: {[key:string]:{[subkey:string]: string|number}} = {
        only: data
    }

    return <InfoTable title="Metainfo:" data={{...offData}}/>
}

//Default export is React Meta component
export default Meta;
