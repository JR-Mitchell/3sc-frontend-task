//Import from external 'react' module
import React from 'react';

//Imports from local 'utils'
import type { Meta as MetaType } from 'utils/Species';

//Imports from local 'components'
import InfoTable from 'components/InfoTable';

interface MetaProps {
    one: MetaType,
    two: MetaType,
    oneVariant: number,
    twoVariant: number,
    names: {[id: number]: string}
}

function Meta(props:MetaProps) {
    let one = props.one;
    let two = props.two;

    let oneData: {[key:string]: string|number} = {
        "Capture Rate": one.capture_rate,
        "Base Happiness": one.base_happiness,
        "Growth Rate": one.growth_rate
    }

    let twoData: {[key:string]: string|number} = {
        "Capture Rate": two.capture_rate,
        "Base Happiness": two.base_happiness,
        "Growth Rate": two.growth_rate
    }

    if (one.base_experience && two.base_experience) {
        oneData["Base Experience"] = typeof one.base_experience === "number"
            ? one.base_experience
            : one.base_experience[props.oneVariant];
        twoData["Base Experience"] = typeof two.base_experience === "number"
            ? two.base_experience
            : two.base_experience[props.twoVariant];
    }

    if (one.ev_yields && two.ev_yields) {
        oneData["EV Yields"] = typeof one.ev_yields === "string"
            ? one.ev_yields
            : one.ev_yields[props.oneVariant];
        twoData["EV Yields"] = typeof two.ev_yields === "string"
            ? two.ev_yields
            : two.ev_yields[props.twoVariant];
    }

    let offData: {[key:string]:{[subkey:string]:string|number}} = {};
    offData[props.names[props.oneVariant]] = {...oneData};
    offData[props.names[props.twoVariant]] = {...twoData};

    return <InfoTable title="Metainfo:" data={{...offData}} />
}

//Default export is React Meta component
export default Meta;
